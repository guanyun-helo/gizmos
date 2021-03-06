import api from "./api/api";
import cryptos from "./crypto";
import storage from "localforage";
import { format } from "date-fns";
import assets from './OsmoAssets'
const chainDataFetch = {
    fetchPriceData: async () => {
        let date = new Date();
        let cryptosCompare = {}
        for (let i in cryptos) {
            let data = await api.getPrice(i, cryptos[i].type);
            if(cryptos[i].type !== 'cosmos') {
                // eslint-disable-next-line no-debugger
                let temData = Number(data[i].usd)
                data = [{
                    price: temData
                }]
            }
            cryptosCompare[i] = Number(data[0].price)
            await storage.getItem(i, (err, value) => {
                if (err) {
                    return storage.setItem(i, [
                        {
                            date: format(date, "MM-dd:kk-mm"),
                            symbol: i,
                            value: data[0].price,
                        },
                    ]);
                } else {
                    let historyData = value ? value : [];

                    if (historyData.length > 3000000) {
                        historyData = historyData.slice(10, historyData.length);
                    }
                    historyData.push({
                        date: format(date, "MM-dd:kk-mm"),
                        symbol: i,
                        value: data[0].price,
                    });
                    return storage.setItem(i, historyData);
                }
            });
        }
        storage.getItem(`comparePrice`, (err, value) => {
            if (err) {
                storage.setItem(`comparePrice`, [
                    {
                        date: format(date, "MM-dd:kk-mm"),
                        ...cryptosCompare
                    },
                ]);
            } else {
                let historyData = value ? value : [];

                if (historyData.length > 3000000) {
                    historyData = historyData.slice(10, historyData.length);
                }
                historyData.push({
                    date: format(date, "MM-dd:kk-mm"),
                    ...cryptosCompare
                });
                storage.setItem(`comparePrice`, historyData);
            }
        });
    },
    fetchIBCsupply: async () => {
        let date = new Date();
        for (let i in cryptos) {
            if(cryptos[i].type !== 'cosmos') return

            let storageKey = await storage.getItem(cryptos[i].IBC);

            let data = await api.getIBCSupply(
                cryptos[i].IBC,
                storageKey ? storageKey : null
            );
            let ibcAmount = Number(data.amount) / cryptos[i].unit
            storage.getItem(`${i}IBCsupply`, (err, value) => {
                if (err) {
                    storage.setItem(`${i}IBCsupply`, [
                        {
                            date: format(date, "MM-dd:kk-mm"),
                            symbol: i,
                            value: ibcAmount,
                        },
                    ]);
                } else {
                    let historyData = value ? value : [];

                    if (historyData.length > 3000000) {
                        historyData = historyData.slice(10, historyData.length);
                    }
                    historyData.push({
                        date: format(date, "MM-dd:kk-mm"),
                        symbol: i,
                        value: ibcAmount,
                    });
                    storage.setItem(`${i}IBCsupply`, historyData);
                }
            });
        }
    },
    fetchSupply: async () => {
        let date = new Date();
        for (let i in cryptos) {
            if(cryptos[i].type !== 'cosmos') return

            let data = await api.getNativeChainSupply(
                cryptos[i].rpc,
                cryptos[i].denom
            );
            let amount = Number(data.amount.amount) / cryptos[i].unit;
            storage.getItem(`${i}supply`, (err, value) => {
                if (err) {
                    storage.setItem(`${i}supply`, [
                        {
                            date: format(date, "MM-dd:kk-mm"),
                            symbol: i,
                            value: amount,
                        },
                    ]);
                } else {
                    let historyData = value ? value : [];

                    if (historyData.length > 3000000) {
                        historyData = historyData.slice(10, historyData.length);
                    }
                    historyData.push({
                        date: format(date, "MM-dd:kk-mm"),
                        symbol: i,
                        value: amount,
                    });
                    storage.setItem(`${i}supply`, historyData);
                }
            });
        }
    },
    fetchLiquidity: async () => {
        // eslint-disable-next-line no-unused-vars
        let date = new Date();
        for (let i in cryptos) {
            if(cryptos[i].type !== 'cosmos') return
            let data = await api.getOsmosisLiquidity(cryptos[i].pool);
            data.pool.poolAssets.forEach((item)=>{
                item.symbol = assets.find((ele)=>ele.IBC === item.token.denom)
            })
            let asset = data.pool.poolAssets.find(
                (item) => item.token.denom === cryptos[i].IBC
            );
            let amount = Number(asset.token.amount) / cryptos[i].unit;
            storage.getItem(`${i}liquidity`, (err, value) => {
                if (err) {
                    storage.setItem(`${i}liquidity`, [
                        {
                            date: format(date, "MM-dd:kk-mm"),
                            symbol: i,
                            value: amount,
                        },
                    ]);
                } else {
                    let historyData = value ? value : [];

                    if (historyData.length > 3000000) {
                        historyData = historyData.slice(10, historyData.length);
                    }
                    historyData.push({
                        date: format(date, "MM-dd:kk-mm"),
                        symbol: i,
                        value: amount,
                    });
                    storage.setItem(`${i}liquidity`, historyData);
                }
            });
            let poolData = { date: format(date, "MM-dd:kk-mm")}
            data.pool.poolAssets.forEach((item)=>{
                poolData[item.symbol.symbol] = (Number(item.token.amount)/item.symbol.unit)
            })
            storage.getItem(`${cryptos[i].pool}poolliquidity`, (err, value) => {
                if (err) {
                    storage.setItem(`${cryptos[i].pool}poolliquidity`, [
                        poolData,
                    ]);
                } else {
                    let historyData = value ? value : [];

                    if (historyData.length > 3000000) {
                        historyData = historyData.slice(10, historyData.length);
                    }
                    historyData.push(poolData);
                    storage.setItem(`${cryptos[i].pool}poolliquidity`, historyData);
                }
            });
        }
    },
    fetchStakeToken: async () => {
        let date = new Date();
        for (let i in cryptos) {
            if(cryptos[i].type !== 'cosmos') return

            let data = await api.getStakedToken(cryptos[i].rpc);
            let bonded = Number(data.result.bonded_tokens) / cryptos[i].unit;
            let notBonded = Number(data.result.not_bonded_tokens) / cryptos[i].unit;

            storage.getItem(`${i}bonded`, (err, value) => {
                if (err) {
                    storage.setItem(`${i}bonded`, [
                        {
                            date: format(date, "MM-dd:kk-mm"),
                            symbol: i,
                            value: bonded,
                        },
                    ]);
                } else {
                    let historyData = value ? value : [];

                    if (historyData.length > 3000000) {
                        historyData = historyData.slice(10, historyData.length);
                    }
                    historyData.push({
                        date: format(date, "MM-dd:kk-mm"),
                        symbol: i,
                        value: bonded,
                    });
                    storage.setItem(`${i}bonded`, historyData);
                }
            });

            storage.getItem(`${i}notbonded`, (err, value) => {
                if (err) {
                    storage.setItem(`${i}notbonded`, [
                        {
                            date: format(date, "MM-dd:kk-mm"),
                            symbol: i,
                            value: notBonded,
                        },
                    ]);
                } else {
                    let historyData = value ? value : [];

                    if (historyData.length > 3000000) {
                        historyData = historyData.slice(10, historyData.length);
                    }
                    historyData.push({
                        date: format(date, "MM-dd:kk-mm"),
                        symbol: i,
                        value: notBonded,
                    });
                    storage.setItem(`${i}notbonded`, historyData);
                }
            });
        }
    },
    getOnChainData: async (symbol) => {
        let supply = await storage.getItem(`${symbol}supply`);
        let IBCsupply = await storage.getItem(`${symbol}IBCsupply`);
        let liquidity = await storage.getItem(`${symbol}liquidity`);
        let bonded = await storage.getItem(`${symbol}bonded`);
        let notBonded = await storage.getItem(`${symbol}notbonded`);
        let airdrop = await storage.getItem(`${symbol}airdrop`) || []
        return {
            airdrop,
            supply,
            IBCsupply,
            liquidity,
            bonded,
            notBonded,
        };
    },
    getPriceData: async (symbol) => {
        let price = await storage.getItem(`${symbol}`)
        return { price }
    },
    getComparePriceData: async () => {
        let data = await storage.getItem(`comparePrice`)
        return { data }
    },
    getPoolData:async (symbol)=>{
        if(cryptos[symbol].type !== 'cosmos') return
        let data = await storage.getItem(`${cryptos[symbol].pool}poolliquidity`)
        return { data }
    },
    getAirdrop: async () => {
        let date = new Date()
        for (let i in cryptos) {
            if(cryptos[i].type !== 'cosmos') return

            if (cryptos[i].airdrop) {
                let airdropBalance = 0
                try {
                    await Promise.all(cryptos[i].airdropWallet.map(async (wallet) => {
                        let data = await api.getWallet(cryptos[i].rpc, wallet)
                        airdropBalance += (data.result[0].amount / 1000000000)
                    }));
                } catch (err) {
                    throw new Error(`Something failed`);
                } finally {
                    if (airdropBalance !== 0) {
                        console.log(airdropBalance)
                        storage.getItem(`${i}airdrop`, (err, value) => {
                            if (err) {
                                storage.setItem(`${i}airdrop`, [
                                    {
                                        date: format(date, "MM-dd:kk-mm"),
                                        symbol: i,
                                        value: airdropBalance,
                                    },
                                ]);
                            } else {
                                let historyData = value ? value : [];

                                if (historyData.length > 3000000) {
                                    historyData = historyData.slice(10, historyData.length);
                                }
                                historyData.push({
                                    date: format(date, "MM-dd:kk-mm"),
                                    symbol: i,
                                    value: airdropBalance,
                                });
                                storage.setItem(`${i}airdrop`, historyData);
                            }
                        });
                    }
                }
            }
        }
    }
};

export default chainDataFetch;
