
<template>
    <div class="container">
        <div class="onChainChart">
            <n-card title="On Chain Data" size="huge">
                <div class="title"></div>
                <div class="chart" :id="priceChartID"></div>
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
            priceChart: null,
            priceChartID: 's' + util.makeid(5)
        };
    },
    props: {
        crypto: String,
        coins: Array,
        priceBetween: Number,
        time: Number,
    },
    watch: {
        time: {
            handler(newValue, oldValue) {
                if (newValue !== oldValue) {
                    if (this.priceChart) {
                        this.priceChart.destroy()
                    }
                    setTimeout(() => {
                        (async () => {
                            let compareData = await chainDataFetch.getComparePriceData()
                            this.renderPriceData(compareData.data)
                        })()
                    }, 0)
                }
            },
        },
        coins: {
            handler(newValue, oldValue) {
                if (newValue !== oldValue) {
                    if (this.priceChart) {
                        this.priceChart.destroy()
                    }
                    setTimeout(() => {
                        (async () => {
                            let compareData = await chainDataFetch.getComparePriceData()
                            this.renderPriceData(compareData.data)
                        })()
                    }, 0)
                }
            },
            deep: true
        },
    },
    mounted() {
        (async () => {
            if (this.priceChart) return
            let compareData = await chainDataFetch.getComparePriceData()
            this.renderPriceData(compareData.data)
        })()
    },
    destroy() {
        if (this.priceChart) {
            this.priceChart.destroy()
        }
    },
    methods: {
        renderPriceData(data) {
            data.forEach(item => {
                item.revelance = (item[this.coins[1]] * this.priceBetween) / item[this.coins[0]]
            })
            const chart = new Chart({
                container: this.priceChartID,
                autoFit: true,
                height: 500,
            });
            chart.data(data);
            chart.option('slider', {
                start: 0,
                end: 1,
                trendCfg: {
                    isArea: false,
                },
            });



            chart
                .line()
                .position('date*revelance')
                .color('#3401a0')
                .style({
                    fillOpacity: 1,
                });
            chart
                .area()
                .position('date*revelance')
                .color('#3401a0')
                .style({
                    fillOpacity: 0.5,
                });
            chart.line().position(`date*${this.coins[0]}`).color('#4eb673');
            chart.area().position(`date*${this.coins[0]}`).color('#4eb673');
            chart.line().position(`date*${this.coins[1]}`).color('#e1ab4b');
            chart.area().position(`date*${this.coins[1]}`).color('#e1ab4b');
            chart.render();
            this.priceChart = chart
        },
    },
}
</script>

<style>
.greeting {
    color: red;
    font-weight: bold;
}
</style>