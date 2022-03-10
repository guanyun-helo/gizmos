<template>
    <div class="container">
        <div class="onChainChart">
            <n-card title="On Chain Data" size="huge">
                <div class="title"></div>
                <div class="chart" :id="onChainChartID"></div>
            </n-card>
        </div>
        <div class="priceChart">
            <n-card title="Price Data" size="huge">
                <div class="title"></div>
                <div class="chart" :id="priceChartID"></div>
            </n-card>
        </div>
        <div class="poolChart">
            <n-card title="Pool Data" size="huge">
                <div class="title"></div>
                <div class="chart" :id="poolChartID"></div>
            </n-card>
        </div>
    </div>
</template>

<script>
import chainDataFetch from "../assets/data";
import { Chart } from '@antv/g2';
import util from '../assets/util'
export default {
    data() {
        return {
            priceChartID: 'z' + util.makeid(5),
            onChainChartID: 'z' + util.makeid(5),
            poolChartID: 'z' + util.makeid(5),
            onChainChart: null,
            priceChart: null,
            poolChart: null,
        };
    },
    props: {
        crypto: String,
        time: Number,
    },
    watch: {
        time: {
            handler(newValue, oldValue) {
                if (newValue !== oldValue) {
                    if (this.onChainChart) {
                        this.onChainChart.destroy()
                        this.priceChart.destroy()
                        this.poolChart.destroy()
                    }
                    setTimeout(() => {
                        this.getCoinData(this.crypto);
                    }, 0)
                }
            },
        },
        crypto(newValue, oldValue) {
            if (newValue !== oldValue) {
                if (this.onChainChart) {
                    this.onChainChart.destroy()
                    this.priceChart.destroy()
                    this.poolChart.destroy()
                }
                setTimeout(() => {
                    this.getCoinData(newValue);
                }, 0)
            }
        },
    },
    mounted() {
        this.getCoinData(this.crypto);
    },
    destroy() {
        if (this.priceChart) {
            this.onChainChart.destroy()
            this.priceChart.destroy()
            this.poolChart.destroy()
        }
    },
    methods: {
        async getCoinData(symbol) {
            let onChainData = await chainDataFetch.getOnChainData(symbol);
            let priceData = await chainDataFetch.getPriceData(symbol);
            let poolData = await chainDataFetch.getPoolData(symbol);
            this.renderPriceData(priceData)
            this.renderOnChinaData(onChainData);
            this.renderPoolData(poolData)
        },
        renderOnChinaData(data) {
            let chartData = [];

            for (let i in data) {
                data[i].forEach((ele) => {
                    ele.series = i
                    chartData.push(ele);
                });
            }
            const chart = new Chart({
                container: this.onChainChartID,
                autoFit: true,
                height: 500,
            });
            chart.data(chartData);
            chart.option('slider', {
                start: 0,
                end: 1,
                trendCfg: {
                    isArea: false,
                },
            });
            chart.legend('series', {
                selected: {
                    airdrop: true,
                    IBCsupply: true,
                    supply: false,
                    liquidity: false,
                    bonded: false,
                    notBonded: false,
                },
            });
            chart.line().position('date*value').color('series');
            chart.area().position('date*value').color('series');
            chart.animate(false)
            chart.render();
            this.onChainChart = chart
        },
        renderPriceData(data) {
            let chartData = [];

            for (let i in data) {
                data[i].forEach((ele) => {
                    ele.series = i
                    chartData.push(ele);
                });
            }
            const chart = new Chart({
                container: this.priceChartID,
                autoFit: true,
                height: 500,
            });
            chart.data(chartData);
            chart.option('slider', {
                start: 0,
                end: 1,
                trendCfg: {
                    isArea: false,
                },
            });
            chart.line().position('date*value').color('series');
            chart.area().position('date*value').color('series');
            chart.animate(false)
            chart.render();
            this.priceChart = chart
        },
        renderPoolData(data) {
            // eslint-disable-next-line no-debugger
            let chartData = data.data;
            const chart = new Chart({
                container: this.poolChartID,
                autoFit: true,
                height: 500,
            });
            chart.data(chartData);
            chart.option('slider', {
                start: 0,
                end: 1,
                trendCfg: {
                    isArea: false,
                },
            });
            // eslint-disable-next-line no-debugger
            for (let i in chartData[0]) {
                if (i !== 'date' && i !== 'series') {
                    let color = this.getRandomColor()
                    chart.line().position(`date*${i}`).color(color);
                    chart.area().position(`date*${i}`).color(color);
                }
            }
            chart.animate(false)
            chart.render();
            this.poolChart = chart
        },
        async updateCoinData(symbol) {
            let onChainData = await chainDataFetch.getOnChainData(symbol);
            let priceData = await chainDataFetch.getPriceData(symbol);
            let poolData = await chainDataFetch.getPoolData(symbol);
            this.updatePriceData(priceData)
            this.updateOnChainData(onChainData);
            this.updatePoolData(poolData)
        },
        updatePriceData(data) {
            if (!this.priceChart) return
            let chartData = [];

            for (let i in data) {
                data[i].forEach((ele) => {
                    ele.series = i
                    chartData.push(ele);
                });
            }
            this.priceChart.changeData(chartData);


        },
        updatePoolData(data) {
            if (!this.poolChart) return
            this.poolChart.changeData(data.data)
        },
        updateOnChainData(data) {
            let chartData = [];

            for (let i in data) {
                data[i].forEach((ele) => {
                    ele.series = i
                    chartData.push(ele);
                });
            }
            this.onChainChart.changeData(chartData)
        },
        getRandomColor() {
            let colorList = ["#FFFF99", "#B5FF91", "#94DBFF", "#FFBAFF", "#FFBD9D", "#C7A3ED", "#CC9898", "#8AC007", "#CCC007", "#FFAD5C"];

            function getColorByRandom(colorList) {
                let colorIndex = Math.floor(Math.random() * colorList.length);
                let color = colorList[colorIndex];
                colorList.splice(colorIndex, 0);
                return color;
            }
            return getColorByRandom(colorList)
        }
    },
};
</script>

<style>
.container {
    margin: 20px;
}
</style>
