
<template>
    <div class="container">
        <div class="onChainChart">
            <n-card title="On Chain Data" size="huge">
                <div class="title"></div>
                <div id="v1"></div>
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
        cryptoPair: Array,
        priceBetween: Number
    },
    watch: {
        cryptoPair: {
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
            let compareData = await chainDataFetch.getComparePriceData()
            this.renderPriceData(compareData.data)
        })()
    },
    methods: {
        renderPriceData(data) {
            // console.log(data1)
            data.forEach(item => {
                item.revelance = (item[this.cryptoPair[1]] * this.priceBetween) / item[this.cryptoPair[0]]
            })
            const chart = new Chart({
                container: 'v1',
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
                .color('#8d8d8d')
                .style({
                    fillOpacity: 1,
                });

            chart.line().position(`date*${this.cryptoPair[0]}`).color('#009688');
            chart.area().position(`date*${this.cryptoPair[0]}`).color('#009688');
            chart.line().position(`date*${this.cryptoPair[1]}`).color('#170f34');
            chart.area().position(`date*${this.cryptoPair[1]}`).color('#170f34');
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