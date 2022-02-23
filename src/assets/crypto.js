const cryptos = {
    ATOM: {
        symbol: 'ATOM',
        rpc: 'https://cosmos.api.ping.pub',
        pool: 1,
        IBC: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
        unit: 1000000,
        denom: 'uatom',
        airdrop: false,
        airdropWallet: []
    },
    OSMO: {
        symbol: 'OSMO',
        // rpc: 'https://lcd-osmosis.keplr.app',
        rpc: 'https://osmo.api.ping.pub',
        pool: 1,
        IBC: 'uosmo',
        unit: 1000000,
        denom: 'uosmo',
        airdrop: false,
        airdropWallet: []

    },
    LIKE: {
        symbol: 'LIKE',
        rpc: 'https://mainnet-node.like.co',
        pool: 553,
        IBC: 'ibc/9989AD6CCA39D1131523DB0617B50F6442081162294B4795E26746292467B525',
        unit: 1000000000,
        denom: 'nanolike',
        airdrop: true,
        airdropWallet: ['cosmos13pl87qed5vw07nvr794y57suzt9xep3vef95nz','cosmos19gxt5gg8mxglzthjs2zezvdccexnekv2vm8l35']

    }, 
    UST: {
        symbol: 'UST',
        rpc: 'https://fcd.terra.dev',
        pool: 560,
        IBC: 'ibc/BE1BB42D4BE3C30D50B68D7C41DB4DFCE9678E8EF8C539F6E6A9345048894FCC',
        unit: 1000000,
        denom: 'uusd',
        airdrop: false,
        airdropWallet: []
    }
}
export default cryptos;