package abci

import (
	"fmt"
	"go-kosu/abci/types"
	"go-kosu/store"
	"regexp"
	"strings"

	"github.com/gogo/protobuf/proto"
	abci "github.com/tendermint/tendermint/abci/types"
)

// A QueryHandler respond to a Query Request
type QueryHandler func(req *abci.RequestQuery) (proto.Message, error)

// HandlePath let you register a handler for a given Path.
// Path is a regexp compatible expression
//
// Example:
//		HandlePath("/posters/\\S+", handler)
func (app *App) HandlePath(path string, fn QueryHandler) {
	expr, err := regexp.Compile(path)
	if err != nil {
		panic(err)
	}

	app.handlers[expr] = fn
}

// Query .
func (app *App) Query(req abci.RequestQuery) abci.ResponseQuery {
	path := req.GetPath()
	for expr, fn := range app.handlers {
		if !expr.MatchString(path) {
			continue
		}

		pb, err := fn(&req)
		if err != nil {
			return abci.ResponseQuery{Code: 1, Log: err.Error()}
		}

		value, err := proto.Marshal(pb)
		if err != nil {
			return abci.ResponseQuery{Code: 1, Log: err.Error()}
		}

		return abci.ResponseQuery{Key: []byte(path), Value: value}
	}

	return abci.ResponseQuery{Code: 404, Log: fmt.Sprintf("Path %s not found", path)}
}

func (app *App) registerHandlers() {
	app.HandlePath("/consensusparams", app.handleConsensusParams)
	app.HandlePath("/roundinfo", app.handleRoundInfo)
	app.HandlePath("/posters/\\S+", app.handlePoster)
}

func (app *App) handleConsensusParams(req *abci.RequestQuery) (proto.Message, error) {
	var param store.ConsensusParams
	if err := app.tree.Get(store.ConsensusParamsKey, &param); err != nil {
		return nil, err
	}

	pb := &types.ConsensusParams{
		FinalityThreshold:     param.FinalityThreshold,
		PeriodLimit:           param.PeriodLimit,
		PeriodLength:          param.PeriodLength,
		MaxOrderBytes:         param.MaxOrderBytes,
		ConfirmationThreshold: param.ConfirmationThreshold,
	}

	return pb, nil

}

func (app *App) handleRoundInfo(req *abci.RequestQuery) (proto.Message, error) {
	var info store.RoundInfo
	if err := app.tree.Get(store.RoundInfoKey, &info); err != nil {
		return nil, err
	}

	p := new(types.RoundInfo)
	info.ToProto(p)
	return p, nil
}

func (app *App) handlePoster(req *abci.RequestQuery) (proto.Message, error) {
	path := req.GetPath()
	addr := strings.Replace(path, "/posters/", "", 1)
	poster, err := app.tree.GetPoster(addr)
	if err != nil {
		return nil, err
	}

	if poster == nil || poster.Balance == nil {
		return nil, fmt.Errorf("query: poster@%s not found", addr)
	}

	pb := &types.Poster{
		Balance:    types.NewBigInt(poster.Balance.Bytes()),
		OrderLimit: poster.Limit,
	}

	return pb, nil
}