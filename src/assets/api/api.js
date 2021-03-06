import storage from "localforage";
// import cryptos from "../crypto";
const api = {
    getOffCosmosPrice: (symbol)=>{
        return fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`).then(
            (res) => {
                return res.json()
            }
        );
    },
    getPrice: (Symbol,type) => {
        let baseUrl = type === 'cosmos' ? `https://api-osmosis.imperator.co/tokens/v2/${Symbol}` :`https://api.coingecko.com/api/v3/simple/price?ids=${Symbol}&vs_currencies=usd`
        return fetch(baseUrl).then(
            (res) => {
                return res.json()
            }
        );
    },

    getNativeChainSupply(rpc,denom) {
        // cosmos/bank/v1beta1/supply
        return fetch(`${rpc}/cosmos/bank/v1beta1/supply/${denom}`).then(
            (data) => {
                return data.json();
            }
        );
    },
    async getIBCSupply(IBC, key) {
        return fetch(
            `https://lcd-osmosis.blockapsis.com/cosmos/bank/v1beta1/supply${key ? `?pagination.key=${key}` : ``
            }`
        ).then((res) => {
            return res.json().then((data) => {
                let supply = data.supply.find((item) => item.denom === IBC);
                if (supply) {
                    storage.setItem(IBC, key)
                    return supply;
                } else {
                    return api.getIBCSupply(IBC, data.pagination.next_key);
                }
            });
        });
    },
    getOsmosisLiquidity(pool) {
        return fetch(`https://lcd-osmosis.keplr.app/osmosis/gamm/v1beta1/pools/${[pool]}`).then((res)=>{
            return res.json()
        })
    },
    getStakedToken(rpc){
        return fetch(`${rpc}/staking/pool`).then((res)=>{
            return res.json()
        })
    },
    getWallet(rpc,wallet){
        return fetch(`${rpc}/bank/balances/${wallet}`).then((res)=>{
            return res.json().finally()
        })
    }
};

export default api;
