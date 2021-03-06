package abci

import (
	"encoding/hex"
	"errors"
	"math"
	"math/big"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types"

	abci "github.com/tendermint/tendermint/abci/types"
	"github.com/tendermint/tendermint/crypto/tmhash"
)

func (app *App) checkWitnessTx(tx *types.TransactionWitness) error {
	if app.store.LastEvent() > tx.Block {
		return errors.New("transaction is older than the recorded state")
	}

	return nil
}

func (app *App) deliverWitnessTx(tx *types.TransactionWitness, nodeID []byte) abci.ResponseDeliverTx {
	if err := app.checkWitnessTx(tx); err != nil {
		return abci.ResponseDeliverTx{Code: 1, Info: err.Error()}
	}

	if err := app.pushTransactionWitness(tx, nodeID); err != nil {
		return abci.ResponseDeliverTx{Code: 1, Info: err.Error()}
	}

	return abci.ResponseDeliverTx{}
}

func (app *App) pruneWitnessTxs(block uint64) {
	params := app.store.ConsensusParams()
	fn := func(tx *types.TransactionWitness) {
		if block-tx.Block >= params.BlocksBeforePruning {
			app.log.Debug("Pruning tx", "id", hex.EncodeToString(tx.Id))
			app.store.DeleteWitnessTx(tx.Id)
		}
	}
	app.store.IterateWitnessTxs(fn)
}

func (app *App) pushTransactionWitness(tx *types.TransactionWitness, nodeID []byte) error {
	if app.store.LastEvent() > tx.Block {
		return errors.New("transaction is older than the recorded state")
	}

	app.pruneWitnessTxs(tx.Block)

	if tx.Amount == nil {
		tx.Amount = types.NewBigIntFromInt(0)
	}
	app.store.SetLastEvent(tx.Block)

	if !app.store.WitnessTxExists(tx.Id) {
		app.store.SetWitnessTx(tx)
	}

	wTx := app.store.WitnessTx(tx.Id)

	v := app.store.Validator(nodeID)
	if v == nil {
		err := errors.New("validator does not exists")
		app.log.Error("store.Validator()", "err", err)
		return err
	}

	app.log.Info("adding confirmations", "+power", v.Power, "current", wTx.Confirmations)
	wTx.Confirmations += uint64(v.Power)
	app.store.SetWitnessTx(wTx)

	app.log.Info("info", "threshold", app.confirmationThreshold, "conf", wTx.Confirmations)
	if app.confirmationThreshold > wTx.Confirmations {
		return nil
	}

	switch tx.Subject {
	case types.TransactionWitness_POSTER:
		if tx.Amount.Zero() {
			app.store.DeletePoster(tx.Address)
		} else {
			app.store.SetPoster(tx.Address, types.Poster{Balance: tx.Amount})
		}
	case types.TransactionWitness_VALIDATOR:
		id := tmhash.SumTruncated(tx.PublicKey)
		app.store.SetValidator(id, &types.Validator{
			Balance:    tx.Amount,
			Power:      ScaleBalance(tx.Amount.BigInt()),
			PublicKey:  tx.PublicKey,
			EthAccount: tx.Address,
			Applied:    false,
		})
	}
	return nil
}

// ScaleBalance scales a balance down to a consensus Power representation
func ScaleBalance(balance *big.Int) int64 {
	if balance.Cmp(big.NewInt(0)) == 0 {
		return int64(0)
	}

	scaled := &big.Int{}
	ether := &big.Int{}
	scaled.Set(balance)

	// scale balance by 10**18 (base units for KOSU)
	// linter disabled for outdated gosec rule
	// nolint:gosec
	ether.Exp(big.NewInt(10), big.NewInt(18), big.NewInt(0))
	scaled.Div(balance, ether)

	if !scaled.IsInt64() {
		return math.MaxInt64
	}
	return scaled.Int64()
}
