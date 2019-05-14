package abci

import (
	"go-kosu/abci/types"
	"log"

	abci "github.com/tendermint/tendermint/abci/types"
)

func (app *App) checkRebalanceTx(tx *types.TransactionRebalance) error {
	// Next round should matches the next block number
	if (tx.RoundInfo.Number - app.state.RoundInfo.Number) != 1 {
		return errProposalRejected
	}
	return nil
}

func (app *App) deliverRebalance(tx *types.TransactionRebalance) abci.ResponseDeliverTx {
	if err := app.checkRebalanceTx(tx); err != nil {
		return abci.ResponseDeliverTx{Code: 1, Info: err.Error()}
	}

	info := &app.state.RoundInfo

	// Begin state update
	info.FromProto(tx.RoundInfo)

	if info.Number != 0 {
		limits := app.state.GenLimits()
		for addr, l := range limits {
			log.Printf("addr(%s) %d", addr, l)
		}
	}

	return abci.ResponseDeliverTx{
		Code: 0,
		Tags: NewTagsFromRoundInfo(info),
	}
}
