<template>
  <div id="app" v-title data-title="不二博客">
    <router-view />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  mounted() {
    // 判断用户当前使用的模式
    if (
      sessionStorage.getItem("dark") != undefined &&
      ((this.IsDark && sessionStorage.getItem("dark") != "true") ||
        (!this.IsDark && sessionStorage.getItem("dark") != "false"))
    ) {
      this.setDark();
    }
  },
  data() {
    return {
      IsLeading: false
    };
  },
  methods: {
    // 暗黑模式
    ...mapMutations(["setDark"]),
    show() {
      this.IsLeading = false;
    },
    dark() {
      this.setDark();
      sessionStorage.setItem("dark", this.IsDark);
    }
  },
  computed: {
    ...mapState(["IsDark"])
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#nav {
  width: 100%;
  height: 60px;
  box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.1);
  position: fixed;
  top: 0px;
  z-index: 99;
  transition: all 0.4s;
}

.center {
  width: 1200px;
  height: 60px;
  margin: auto;
}

.center > a:first-child {
  height: 60px;
  float: left;
  line-height: 60px;
  font-weight: bold;
  font-size: 18px;
  color: #000;
  padding: 0 10px;
}

.menu {
  height: 60px;
  line-height: 60px;
  float: right;
  font-size: 14px;
}

.menu > li {
  height: 60px;
  float: left;
  padding: 0 20px;
  cursor: pointer;
}

.menu > li:hover {
  color: #2254f4;
  font-weight: bold;
}

.active-exact {
  color: #2254f4;
  font-weight: bold;
}

.active-exact > div {
  display: block !important;
}

.active-exact > div {
  display: block !important;
}

.menu > li > div {
  width: 24px;
  height: 4px;
  background-color: #2254f4;
  border-radius: 50px;
  position: relative;
  top: -4px;
  margin: auto;
}

.Isdark {
  height: 60px;
  float: right;
  display: flex;
  align-items: center;
}

.darkrdo {
  width: 46px;
  height: 26px;
  border-radius: 100px;
  background-color: rgb(204, 204, 204);
  cursor: pointer;
}

.darkrdo > i {
  width: 20px;
  height: 20px;
  display: block;
  background-color: #2253f4cc;
  border-radius: 100px;
  margin: 3px;
  position: relative;
  left: 0px;
  transition: all 0.4s ease;
}
</style>
