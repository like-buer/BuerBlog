<template>
  <div id="app" v-title data-title="不二博客 | 王飞的个人网站">
    <div>
      <div id="nav" :class="IsDark ? 'dark':'disdark'">
        <div class="center">
          <router-link to="/">不二博客</router-link>
          <!-- <div class="Isdark">
            <div class="darkrdo" @click="dark">
              <i :style="IsDark ? 'left:20px;':'left:0px;'"></i>
            </div>
          </div> -->
          <ul class="menu">
            <router-link tag="li" to="/home">
              首页
              <div style="display:none"></div>
            </router-link>
            <router-link tag="li" to="/blog">
              学习
              <div style="display:none"></div>
            </router-link>
            <router-link tag="li" to="/resource">
              资源
              <div style="display:none"></div>
            </router-link>
            <!-- <router-link tag="li" to="/life">
              生活
              <div style="display:none"></div>
            </router-link> -->
            <router-link tag="li" to="/admin">
              登录
              <div style="display:none"></div>
            </router-link>
            <router-link tag="li" to="/about">
              关于
              <div style="display:none"></div>
            </router-link>
            <!-- <router-link tag="li" to="/about">
              管理博客
              <div style="display:none"></div>
            </router-link> -->
          </ul>
        </div>
      </div>
      <router-view/>
      <div class="floot">
        <div class="centent">
            <p>世界巨大，我以渺小来爱他。时间悠长，我以短暂来爱他。</p>
            <ul class="webinfo clear">
              <li>Copyright &copy; 2020 不二博客</li>
              <li>|</li>
              <li>鄂ICP备 19003496号-1</li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import Axios from "axios";

export default {
  beforeCreate(){
    // 非管理员界面销毁回话
    Axios.get('/clearCookies').then(()=>{
      console.log('清除成功')
    })
  },
  mounted(){
    // 判断用户当前使用的模式
    if(sessionStorage.getItem('dark') != undefined && ((this.IsDark && sessionStorage.getItem('dark') != 'true') || (!this.IsDark && sessionStorage.getItem('dark') != 'false'))){
      this.setDark();
    }
    document.body.style.backgroundColor = this.IsDark ? "#2F2F2F" : "#EDF2F6";
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
    document.body.style.backgroundColor = this.IsDark ? "#2F2F2F" : "#EDF2F6";
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

.active{
  color: #2254f4;
  font-weight: bold;
}

.active > div {
  display: block !important;
}


/* .active-exact {
  color: #2254f4;
  font-weight: bold;
}

.active-exact > div {
  display: block !important;
} */

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

.floot{
  width: 100%;
  background-color: #fff;
  box-shadow: 0 -4px 8px 0 rgba(7, 17, 27, 0.1);
  color: #5f6471;
}

.floot>.centent{
  width: 1200px;
  margin: auto;
  text-align: center;
}

.centent>p{
  padding-top: 20px;
  cursor: pointer;
}

.centent>p:hover{
  color: pink;
}

.webinfo{
  display: inline-block;
}

.webinfo>li{
  float: left;
  padding: 20px 6px;
}
</style>
