package cosmos

import (
	"testing"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/store"
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/store/storetest"

	db "github.com/tendermint/tm-db"
)

func TestCosmosStore(t *testing.T) {
	for _, cdc := range []store.Codec{
		&store.ProtoCodec{},
		&store.GobCodec{},
	} {
		t.Run(cdc.String(), func(t *testing.T) {
			f := func() (store.Store, func()) {
				db := db.NewMemDB()
				return NewStore(db, cdc), func() { db.Close() }
			}

			storetest.TestSuite(t, f)
		})
	}
}
