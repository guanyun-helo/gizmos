<template>
  <n-layout class="home" has-sider>
    <n-layout-sider
      style="padding: 24px 0px 0px 0px"
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="200"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <n-menu
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        :render-label="renderMenuLabel"
        :render-icon="renderMenuIcon"
        :expand-icon="expandIcon"
        @update:value="handleUpdateValue"
      />
      <n-gradient-text type="info">{{ format(this.date, 'MM-dd:kk-mm-ss') }}</n-gradient-text>
      <n-gradient-text type="danger">Data refresh {{ time }} times</n-gradient-text>
    </n-layout-sider>
    <n-layout>
      <SingleCoin :time="time" :crypto="crypto" v-if="cryptoPair.length === 1"></SingleCoin>
      <Compare
        :time="time"
        :priceBetween="priceBetween"
        :crypto="crypto"
        :cryptoPair="cryptoPair"
        v-if="cryptoPair.length > 1"
      ></Compare>
      <n-card title="Click LIKE!" size="huge" style="padding: 0">
        <iframe :src="LikeButton"></iframe>
      </n-card>
    </n-layout>
  </n-layout>
</template>

<script>
import { h, ref } from "vue";
import { NIcon, useMessage } from "naive-ui";
import { BookmarkOutline, CaretDownOutline } from "@vicons/ionicons5";
import SingleCoin from "../components/SingleCoin.vue";
import Compare from "../components/Compare.vue";
import chainDataFetch from "../assets/data";
import { format } from "date-fns";

const menuOptions = [
  {
    label: "ATOM",
    key: "ATOM",
    coins: ['ATOM'],
  },
  {
    label: "OSMO",
    key: "OSMO",
    coins: ['OSMO'],
  },
  {
    label: "LIKE",
    key: "LIKE",
    coins: ['LIKE'],
  },
  {
    label: "ATOMLIKE",
    key: "ATOMLIKE",
    coins: ["ATOM", "LIKE"],
    between: 10000,
  },
  {
    label: "ATOMOSMO",
    key: "ATOMOSMO",
    coins: ["ATOM", "OSMO"],
    between: 1,

  },
  {
    label: "OSMOLIKE",
    key: "OSMOLIKE",
    coins: ["OSMO", "LIKE"],
    between: 10000,

  },
];
export default {
  name: "Home",
  props: {
    msg: String,
  },
  components: {
    SingleCoin,
    Compare,
  },
  data() {
    return {
      crypto: "ATOM",
      duration: 60000,
      cryptoPair: ['ATOM'],
      priceBetween: 1,
      time: 0,
      date: new Date(),
      LikeButton: `https://button.like.co/in/embed/editorlikersocial/button?referrer=${this.date}&type=gizmos`
    };
  },
  methods: {
    timepass() {
      setTimeout(() => {
        this.date = new Date()
        this.timepass()
      }, 1000)
    },
    format: format,
    handleUpdateValue(key, value) {
      this.crypto = key;
      this.cryptoPair = value.coins.slice()
      this.priceBetween = value.between
    },

    fetchData() {
      setTimeout(() => {
        chainDataFetch.fetchPriceData();
        chainDataFetch.fetchIBCsupply();
        chainDataFetch.fetchSupply();
        chainDataFetch.fetchLiquidity();
        chainDataFetch.fetchStakeToken();
        chainDataFetch.getAirdrop();
        this.time++
        this.LikeButton = `https://button.like.co/in/embed/editorlikersocial/button?referrer=${this.date}&type=gizmos`
        this.fetchData()
        this.message.info('Data has been feched!!')

      }, this.duration);
    }
  },
  mounted() {
    document.title = 'Gizmos'
    this.timepass()
    chainDataFetch.fetchPriceData();
    chainDataFetch.fetchIBCsupply();
    chainDataFetch.fetchSupply();
    chainDataFetch.fetchLiquidity();
    chainDataFetch.fetchStakeToken();
    chainDataFetch.getAirdrop();
    this.fetchData()
  },
  setup() {
    const message = useMessage()
    return {
      message: message,
      collapsed: ref(false),
      menuOptions,
      renderMenuLabel(option) {
        if ("href" in option) {
          return h("a", { href: option.href, target: "_blank" }, option.label);
        }
        return option.label;
      },
      renderMenuIcon(option) {
        if (option.key === "sheep-man") return true;
        if (option.key === "food") return null;
        return h(NIcon, null, { default: () => h(BookmarkOutline) });
      },
      expandIcon() {
        return h(NIcon, null, { default: () => h(CaretDownOutline) });
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>
