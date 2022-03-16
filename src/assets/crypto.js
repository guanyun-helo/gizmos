// 在这里增加你想追踪的空投，注意配置 RPC/IBC/和airdropWallet，然后提交 pr 就能追踪你的空投了

const cryptos = {
  ATOM: {
    type: "cosmos",
    symbol: "ATOM",
    rpc: "https://cosmos.api.ping.pub",
    pool: 1,
    IBC: "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2",
    unit: 1000000,
    denom: "uatom",
    airdrop: false,
    airdropWallet: [],
  },
  OSMO: {
    type: "cosmos",
    symbol: "OSMO",
    // rpc: 'https://lcd-osmosis.keplr.app',
    rpc: "https://osmo.api.ping.pub",
    pool: 1,
    IBC: "uosmo",
    unit: 1000000,
    denom: "uosmo",
    airdrop: false,
    airdropWallet: [],
  },
  JUNO: {
    type: "cosmos",
    symbol: "JUNO",
    // rpc: 'https://lcd-osmosis.keplr.app',
    rpc: "https://lcd-juno.itastakers.com",
    pool: 497,
    IBC: "ibc/46B44899322F3CD854D2D46DEEF881958467CDD4B3B10086DA49296BBED94BED",
    unit: 1000000,
    denom: "ujuno",
    airdrop: false,
    airdropWallet: [],
  },
  HUAHUA: {
    type: "cosmos",
    symbol: "HUAHUA",
    // rpc: 'https://lcd-osmosis.keplr.app',
    rpc: "https://api.chihuahua.wtf",
    pool: 605,
    IBC: "ibc/B9E0A1A524E98BB407D3CED8720EFEFD186002F90C1B1B7964811DD0CCC12228",
    unit: 1000000,
    denom: "uhuahua",
    airdrop: false,
    airdropWallet: [],
  },
  CRO: {
    type: "cosmos",
    symbol: "CRO",
    // rpc: 'https://lcd-osmosis.keplr.app',
    rpc: "https://mainnet.crypto.org:1317",
    pool: 10,
    IBC: "ibc/E6931F78057F7CC5DA0FD6CEF82FF39373A6E0452BF1FD76910B93292CF356C1",
    unit: 1000000,
    denom: "nanocro",
    airdrop: false,
    airdropWallet: [],
  },
  LIKE: {
    type: "cosmos",
    symbol: "LIKE",
    rpc: "https://mainnet-node.like.co",
    pool: 553,
    IBC: "ibc/9989AD6CCA39D1131523DB0617B50F6442081162294B4795E26746292467B525",
    unit: 1000000000,
    denom: "nanolike",
    airdrop: true,
    airdropWallet: [
      "cosmos13pl87qed5vw07nvr794y57suzt9xep3vef95nz",
      "cosmos19gxt5gg8mxglzthjs2zezvdccexnekv2vm8l35",
    ],
  },
  UST: {
    type: "cosmos",

    symbol: "UST",
    rpc: "https://fcd.terra.dev",
    pool: 560,
    IBC: "ibc/BE1BB42D4BE3C30D50B68D7C41DB4DFCE9678E8EF8C539F6E6A9345048894FCC",
    unit: 1000000,
    denom: "uusd",
    airdrop: false,
    airdropWallet: [],
  },
  LUNA: {
    type: "cosmos",

    symbol: "LUNA",
    rpc: "https://fcd.terra.dev",
    pool: 562,
    IBC: "ibc/0EF15DF2F02480ADE0BB6E85D9EBB5DAEA2836D3860E9F97F9AADE4F57A31AA0",
    unit: 1000000,
    denom: "uluna",
    airdrop: false,
    airdropWallet: [],
  },
  STARS: {
    type: "cosmos",
    symbol: "STARS",
    rpc: "https://rest.stargaze-apis.com",
    pool: 604,
    IBC: "ibc/987C17B11ABC2B20019178ACE62929FE9840202CE79498E29FE8E5CB02B7C0A4",
    unit: 1000000,
    denom: "ustars",
    airdrop: false,
    airdropWallet: [],
  },
  bitcoin: {
    type: "bitcoin",
    symbol: "bitcoin",
    api: "https://api.coingecko.com/",
    rpc: "",
    pool: 0,
    IBC: "",
    unit: 1,
    denom: "bitcoin",
    airdrop: false,
    airdropWallet: [],
  },
  ethereum: {
    type: "ethereum",
    symbol: "ethereum",
    api: "https://api.coingecko.com/",
    rpc: "",
    pool: 0,
    IBC: "",
    unit: 1,
    denom: "ether",
    airdrop: false,
    airdropWallet: [],
  },
};
export default cryptos;