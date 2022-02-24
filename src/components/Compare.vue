
<template>
    <div class="container">
        <div class="onChainChart">
            <n-card title="On Chain Data" size="huge">
                <div class="title"></div>
                <div id="s1"></div>
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
            priceChart: null
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
            // console.log(data1)
            data.forEach(item => {
                item.revelance = (item[this.coins[1]] * this.priceBetween) / item[this.coins[0]]
            })
            const chart = new Chart({
                container: 's1',
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