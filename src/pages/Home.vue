<template>
  <n-layout class="home" has-sider>
    <n-layout-sider
      style="padding: 24px 0px 0px 0px"
      bordered
      collapse-mode="width"
      :collapsed-width="10"
      :width="200"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <n-scrollbar style="max-height: 500px">
        <n-menu
          class="menu"
          :default-value="this.crypto"
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          :render-label="renderMenuLabel"
          :render-icon="renderMenuIcon"
          :expand-icon="expandIcon"
          @update:value="handleUpdateValue"
        />
      </n-scrollbar>
      <n-gradient-text type="info">
        {{
          format(this.date, "MM-dd:kk-mm-ss")
        }}
      </n-gradient-text>
      <n-gradient-text type="danger">Data refresh {{ time }} times</n-gradient-text>

      <n-avatar style="position: absolute; bottom: 50px; left: 42%">
        <n-icon>
          <a
            target="_blank"
            href="https://github.com/LikeCoinDAO/gizmos/blob/main/src/assets/crypto.js"
          >
            <LogoGithub />
          </a>
        </n-icon>
      </n-avatar>
      <!-- <n-log
        font-size="11"
        style="position: absolute; bottom: 80px; left: 4%;font-size: 10px;"
        :rows="8"
        :log="`点击进入 github 增加你想追踪的空投，注意配置 RPC/IBC/和airdropWallet，然后提交 pr 就能追踪你的空投了`"
      />-->
    </n-layout-sider>

    <n-layout>
      <n-alert style="margin: 20px 20px 0px 20px;" title="Important notice" type="info">
        You need to keep this site open in order to collect data for you, if you want other coin's data track, please go to github and request.
        你要保持网站处于开启状态才能为你收集链上数据，点击进入 github 增加你想追踪的空投，注意配置 RPC/IBC/和airdropWallet，然后提交 pr 就能追踪你的空投了
      </n-alert>
      <SingleCoin :time="time" :crypto="crypto" v-if="coins.length === 1"></SingleCoin>
      <Compare
        :time="time"
        :priceBetween="priceBetween"
        :crypto="crypto"
        :coins="coins"
        v-if="coins.length > 1"
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
import { LogoGithub } from "@vicons/ionicons5";

const menuOptions = [
  {
    label: "ATOM",
    key: "ATOM",
    coins: ["ATOM"],
  },
  {
    label: "UST",
    key: "UST",
    coins: ["UST"],
  },
  {
    label: "LUNA",
    key: "LUNA",
    coins: ["LUNA"],
  },
  {
    label: "OSMO",
    key: "OSMO",
    coins: ["OSMO"],
  },
  {
    label: "LIKE",
    key: "LIKE",
    coins: ["LIKE"],
  },
  {
    label: "ATOMLUNA",
    key: "ATOMLUNA",
    coins: ["ATOM", "LUNA"],
    priceBetween: 1,
  },
  {
    label: "ATOMbitcoin",
    key: "ATOMbitcoin",
    coins: ["ATOM", "bitcoin"],
    priceBetween: 1,
  },
  {
    label: "ATOMethereum",
    key: "ATOMethereum",
    coins: ["ATOM", "ethereum"],
    priceBetween: 1,
  },
  {
    label: "ATOMLIKE",
    key: "ATOMLIKE",
    coins: ["ATOM", "LIKE"],
    priceBetween: 10000,
  },
  {
    label: "ATOMOSMO",
    key: "ATOMOSMO",
    coins: ["ATOM", "OSMO"],
    priceBetween: 1,
  },
  {
    label: "OSMOLIKE",
    key: "OSMOLIKE",
    coins: ["OSMO", "LIKE"],
    priceBetween: 10000,
  },
];
export default {
  name: "HOME",
  props: {
    msg: String,
  },
  components: {
    SingleCoin,
    Compare,
    LogoGithub,
  },
  data() {
    return {
      crypto: this.routeParams().key,
      duration: 120000,
      coins: this.routeParams().coins,
      priceBetween: this.routeParams().priceBetween,
      time: 0,
      date: new Date(),
      LikeButton: `https://button.like.co/in/embed/editorlikersocial/button?referrer=${this.date}&type=gizmos`,
    };
  },
  methods: {
    timepass() {
      setTimeout(() => {
        this.date = new Date();
        this.timepass();
      }, 1000);
    },
    format: format,
    handleUpdateValue(key, value) {
      this.crypto = key;
      this.coins = value.coins.slice();
      this.priceBetween = value.priceBetween;
      this.$router.push(key);
    },

    fetchData() {
      setTimeout(() => {
        chainDataFetch.fetchPriceData();
        chainDataFetch.fetchIBCsupply();
        chainDataFetch.fetchSupply();
        chainDataFetch.fetchLiquidity();
        chainDataFetch.fetchStakeToken();
        chainDataFetch.getAirdrop();
        this.time++;
        this.LikeButton = `https://button.like.co/in/embed/editorlikersocial/button?referrer=${this.date}&type=gizmos`;
        this.fetchData();
        this.message.info("Data has been feched!!");
      }, this.duration);
    },
  },
  mounted() {
    this.timepass();
    chainDataFetch.fetchPriceData();
    chainDataFetch.fetchIBCsupply();
    chainDataFetch.fetchSupply();
    chainDataFetch.fetchLiquidity();
    chainDataFetch.fetchStakeToken();
    chainDataFetch.getAirdrop();
    this.fetchData();
  },
  setup() {
    const message = useMessage();
    return {
      message: message,
      collapsed: ref(true),
      menuOptions,
      routeParams() {
        if (this.$route.params.coin === "") {
          return menuOptions[0];
        } else {
          let coin = menuOptions.find(
            (item) => item.key === this.$route.params.coin
          );
          return coin;
        }
      },
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
