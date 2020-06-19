<template>
  <div class="home">
    <Leading v-if="IsLeading" />
    <div v-if="!IsLeading" class="clear">
      <div class="left">
        <div class="banner animated flipInX"></div>
        <div class="bloglist animated fadeInUpBig" :class="IsDark ? 'dark':''">
          <p class="headtitle">最新文章</p>
          <router-link
            tag="div"
            :to="{name:'blog',params:{id:item.blogID}}"
            v-for="item in BlogList"
            :v-key="'blog' + item.blogID"
            class="article"
          >
            <p>
              <span>{{item.blogName}}</span>
              <span>{{ item.blogTitle }}</span>
            </p>
            <p>{{ (item.blogHtml).replace(/\<\/?[^\>]+>/ig,'') }}</p>
          </router-link>
        </div>
      </div>
      <div class="right">
        <div class="myinfo animated lightSpeedIn" :class="IsDark ? 'dark':''">
          <img src="../assets/images/pohoto.gif" alt />
          <p>欢迎来到不二的秘密基地~</p>
          <div class="tell">
            <ul class="clear">
              <li>
                <a href="https://blog.csdn.net/qq_39157944" target="_blank">
                  <img src="../assets/images/csdn.png" alt />
                </a>
              </li>
              <li>
                <a href='http://wpa.qq.com/msgrd?v=3&uin=306967951&site=qq&menu=yes' target='_blank'>
                  <img src="../assets/images/qq.png" alt />
                </a>
              </li>
              <li>
                <a href="https://github.com/like-buer/BuerBlog" target='_blank'>
                  <img src="../assets/images/github.png" alt />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="articleinfo animated lightSpeedIn" :class="IsDark ? 'dark':''">
          <p class="headtitle">网站信息</p>
          <div class="artcle_box bloginfolist">
            <p>
              <span class="iconfont icon-wzzs"></span>文章总数：{{BlogServerInfo.blogdbcount}}
            </p>
            <p>
              <span class="iconfont icon-zyzs"></span>资源总数：{{BlogServerInfo.resourcecount}}
            </p>
            <p>
              <span class="iconfont icon-bqzs"></span>标签总数：{{BlogServerInfo.blogtypecount}}
            </p>
            <p>
              <span class="iconfont icon-llzs"></span>浏览总数：{{BlogServerInfo.blogdbreads}}
            </p>
            <p>
              <span class="iconfont icon-plzs"></span>留言总数：{{messageList.length}}
            </p>
            <p>
              <span class="iconfont icon-yxsc"></span>运行时长：{{ new Date( new Date() - WebServerTime ).getString() }}
            </p>
          </div>
        </div>
        <div class="articleinfo animated lightSpeedIn" :class="IsDark ? 'dark':''">
          <p class="headtitle">标签分类</p>
          <div class="artcle_box">
            <ul class="artcle_list clear">
              <li v-for="item in BlogTypeList" :v-key="item.blogtypeID">{{item.blogName}}</li>
            </ul>
          </div>
        </div>
        <div class="message animated fadeInUpBig" :class="IsDark ? 'dark':''">
          <p class="headtitle">留言板</p>
          <div class="message_box">
            <div class="messagebox">
              <p v-for="item in messageList" :key="'message' + item.messageID">
                {{item.timer.MyData()}}
                <br />
                {{item.messageText}}
              </p>
            </div>
            <div class="gomessage">
              <input type="text" placeholder="请输入20字符的" />
              <button>写 留 言</button>
            </div>
          </div>
        </div>
        <!-- <div class="articleinfo animated fadeInUpBig" :class="IsDark ? 'dark':''">
          <p class="headtitle">常用网站</p>
          <div class="artcle_box">
            <ul class="artcle_list clear">
              <li>博客园</li>
              <li>菜鸟教程</li>
              <li>博客园</li>
              <li>菜鸟教程</li>
            </ul>
          </div>
        </div>
        <div class="articleinfo animated fadeInUpBig" :class="IsDark ? 'dark':''">
          <p class="headtitle">友情链接</p>
          <div class="artcle_box">
            <ul class="artcle_list clear">
              <li>王二麻子的博客</li>
              <li>前端小站</li>
              <li>飞翔的企鹅</li>
              <li>张三博客</li>
            </ul>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
// 加载动画
import Leading from "../components/Loading.vue";

import { mapState, mapMutations } from "vuex";

import Axios from "axios";

// 获取博文分类
function getblogtype() {
  return Axios.get("/getblogtype");
}
// 获取留言表
function getmessage() {
  return Axios.get("/getmessage");
}


// 重置天时分秒
Date.prototype.getString = function(){
    var days = parseInt(this / (1000 * 60 * 60 * 24));
    var hours = parseInt((this % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((this % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor( (this % (1000 * 60)) / 1000 );
    return days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
}

export default {
  mounted() {

    // 定义天时分秒
    setInterval(()=>{
      this.WebServerTime --
    },1)

    Axios.all([
      this.getblog(),
      getblogtype(),
      getmessage(),
      this.blogserverinfo()
    ]).then(
      Axios.spread((getblog, getblogtype, getmessage, blogserverinfo) => {
        // 博客列表
        this.BlogList = getblog.data.result;
        // 博客分类
        this.BlogTypeList = getblogtype.data.result;
        // 网站留言板
        this.messageList = getmessage.data.result;
        // 网站信息
        this.BlogServerInfo = blogserverinfo.data.result[0];
        // 关闭动画
        this.IsLeading = false;
      })
    );
    // this.blogserverinfo().then(result => {
    //   console.log(result);
    //   this.IsLeading = false;
    // });
  },
  data() {
    return {
      IsLeading: true,// 动画
      BlogList: [],// 博客列表
      BlogServerInfo: [],// 网站信息
      WebServerTime:1590954192000, // '2020-6-1 3:43:12'
      BlogTypeList: [],// 博客分类
      messageList: [] // 留言信息
    };
  },
  components: {
    Leading
  },
  methods: {
    readblog(num) {
      console.log("阅读博客", num);
    },
    // 获取网站信息
    blogserverinfo() {
      return Axios.get("/blogserverinfo");
    },
    // 获取最新博文推荐
    getblog() {
      return Axios.get("/getblog");
    }
  },
  computed: {
    ...mapState(["IsDark"])
  }
};
</script>

<style scoped>
.home {
  width: 1200px;
  margin: 80px auto;
  box-sizing: border-box;
  box-sizing: border-box;
}

.left {
  width: 900px;
  float: left;
  padding-right: 20px;
  box-sizing: border-box;
}

.banner {
  width: 100%;
  height: 300px;
  background-color: #fff;
  box-shadow: 0 0px 10px 0 rgba(7, 17, 27, 0.1);
  background: url("../assets/images/banner.jpg") no-repeat;
  background-size: 100%;
  background-position: 0 60%;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 20px;
}

.bloglist {
  width: 100%;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 0px 10px 0 rgba(7, 17, 27, 0.1);
  margin-bottom: 20px;
  overflow: hidden;
}

.headtitle {
  border-bottom: 1px solid #eee;
  padding: 10px;
  display: flex;
}

.article {
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.article:last-child {
  border-bottom: none;
}

.article:hover {
  background-color: #eee;
}

.article > p:first-child {
  font-size: 18px;
}

.dark > p:first-child,
.dark .article:not(:last-child) {
  border-bottom: 1px solid gray;
}

.article > p > span:nth-of-type(1) {
  padding: 3px 5px;
  font-size: 10px;
  color: white;
  border-radius: 4px;
  background-color: #2253f4;
}

.article > p > span:nth-of-type(2) {
  padding: 3px 5px;
  font-size: 18px;
}

.article:hover > p > span:nth-of-type(2) {
  font-weight: bold;
}

.dark > .article > p > span:nth-of-type(2) {
  color: #7970ab !important;
}

.article > p:last-child {
  margin-top: 10px;
  font-size: 14px;
  color: #999aaa;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.article > p > a {
  margin-left: 8px;
  color: #333;
  font-size: 18px;
  font-weight: bold;
}

.right {
  width: 300px;
  float: right;
}

.myinfo {
  width: 300px;
  background-color: #fff;
  box-shadow: 0 0px 10px 0 rgba(7, 17, 27, 0.1);
  text-align: center;
  border-radius: 8px;
  box-sizing: border-box;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.myinfo > img {
  width: 80px;
  height: 80px;
  border-radius: 50px;
  margin: 30px 0;
}

.myinfo > p {
  color: rgba(0, 0, 0, 0.6);
}

.tell {
  display: inline-block;
  margin-top: 20px;
}

.tell li {
  float: left;
  margin: 0px 10px;
  cursor: pointer;
}

.tell li  img {
  width: 30px;
  height: 30px;
}

.articleinfo,
.message {
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  box-shadow: 0 0px 10px 0 rgba(7, 17, 27, 0.1);
}

.artcle_list > li {
  float: left;
  border: 1px solid #eee;
  margin: 10px;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
}

.artcle_list > li:hover {
  border: 1px solid #2253f4;
  color: #2253f4;
  background-color: #2253f444;
}

.message_box > div {
  padding: 10px 10px;
  font-size: 12px;
  color: #999aaa;
  line-height: 30px;
}

.message_box > div > p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bloginfolist {
  line-height: 32px;
  padding: 10px 10px 0 10px;
}

.bloginfolist p {
  font-size: 14px;
}

.bloginfolist span {
  padding: 0 5px;
}

.messagebox {
  max-height: 230px;
  overflow: hidden;
  overflow-y: scroll;
}

.gomessage {
  border-top: 1px solid #eee;
  padding: 10px 10px 0px 10px !important;
}

.gomessage::-webkit-scrollbar {
  display: none;
}

.gomessage > input {
  border-radius: 50px;
  height: 40px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #2253f4;
}

.gomessage > button {
  border: none;
  height: 40px;
  padding: 0 20px;
  font-size: 12px;
  color: white;
  border-radius: 50px;
  background: #2253f4;
  cursor: pointer;
  float: right;
}
</style>
