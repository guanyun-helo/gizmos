<template>
    <div class="container">
        <div class="onChainChart">
            <n-card title="On Chain Data" size="huge">
                <div class="title"></div>
                <div id="v1"></div>
            </n-card>
        </div>
        <div class="priceChart">
            <n-card title="Price Data" size="huge">
                <div class="title"></div>
                <div id="v2"></div>
            </n-card>
        </div>
    </div>
</template>

<script>
import chainDataFetch from "../assets/data";
import { Chart } from '@antv/g2';

export default {
    data() {
        return {
            onChainChart: null,
            priceChart: null
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
                    }
                    setTimeout(() => {
                        this.getPrice(this.crypto);
                        this.getOnChainData(this.crypto);
                    }, 0)
                }
            },
        },
        crypto(newValue, oldValue) {
            if (newValue !== oldValue) {
                if (this.onChainChart) {
                    this.onChainChart.destroy()
                    this.priceChart.destroy()
                }
                setTimeout(() => {
                    this.getPrice(newValue);
                    this.getOnChainData(newValue);
                }, 0)
            }
        },
    },
    mounted() {
        this.getPrice(this.crypto);
        this.getOnChainData(this.crypto);
    },
    methods: {
        async getOnChainData(symbol) {
            let onChainData = await chainDataFetch.getOnChainData(symbol);
            let priceData = await chainDataFetch.getPriceData(symbol);
            this.renderPriceData(priceData)
            this.renderOnChinaData(onChainData);
        },
        getPrice() { },
        renderOnChinaData(data) {
            let chartData = [];

            for (let i in data) {
                data[i].forEach((ele) => {
                    ele.series = i
                    chartData.push(ele);
                });
            }
            const chart = new Chart({
                container: 'v1',
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
                container: 'v2',
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
            chart.render();
            this.priceChart = chart
        },
    },
};
</script>

<style>
.container {
    margin: 20px;
}
</style>
