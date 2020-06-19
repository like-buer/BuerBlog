<template>
  <div class="blog" v-title data-title="博客">
    <Leading v-if="IsLeading" />
    <div v-if="!IsLeading" class="clear">
      <router-link
        class="bloglist animated"
        :class="(index % 2) == 0 ? 'fadeInLeftBig' : 'fadeInRightBig'"
        v-for="(item,index) in BlogList"
        :key="item.blogID"
        tag="div"
        :to="{name:'blog',params:{id:item.blogID}}"
      >
        <div class="bingbg" :style="BlogListBg[index]">{{item.blogTitle}}</div>
        <div class="blogbox">
          <p>{{(item.blogHtml).replace(/\<\/?[^\>]+>/ig,'')}}</p>
          <div class="likelist">
            <ul class="clear">
              <li><span class="iconfont icon-fbsj"></span>{{item.timer.MyData()}}</li>
              <li><span class="iconfont icon-ydl"></span>{{item.blogReads}}</li>
              <li><span class="iconfont icon-dz"></span>{{item.blogLikes}}</li>
            </ul>
          </div>
        </div>
      </router-link>
      <div class="paging">
        <ul class="clear">
          <li @click="up">&laquo;</li>

          <!-- 基本分页（不超过7页） -->
          <template v-if="Math.ceil(blognum / 5) < 7">
            <li 
              v-for="(item,index) in Math.ceil(blognum / 5)" 
              :v-key="'erer' + index" 
              :class="nowpage == index + 1  ? 'active' : ''"
              @click="to(index + 1)"
              v-if="index < 5 "
            >
              {{index + 1}}
            </li>
          </template>

          <!-- 超过5页 -->
          <template v-if="Math.ceil(blognum / 5) >= 7">
            <!-- 当前页面在前3页 -->
            <template v-if="nowpage <= 3">
              <li 
                v-for="(item,index) in Math.ceil(blognum / 5)" 
                :v-key="'erer' + index" 
                :class="nowpage == index + 1  ? 'active' : ''"
                @click="to(index + 1)"
                v-if="index < 5"
              >
                {{index + 1}}
              </li>
              <li>···</li>
              <li @click="to(Math.ceil(blognum / 5))">
                {{Math.ceil(blognum / 5)}}
              </li>
            </template>

            <!-- 当前页面大于3页且小于位数3 -->
            <template v-if="nowpage > 3 && Math.ceil(blognum / 5) - 3 > nowpage">
              <li @click="to(1)">1</li>
              <li>···</li>
              <li @click="to(nowpage - 1)">{{nowpage - 1}}</li>
              <li class="active">{{nowpage}}</li>
              <li @click="to(nowpage + 1)">{{nowpage + 1}}</li>
              <li>···</li>
              <li @click="to(Math.ceil(blognum / 5))">
                {{Math.ceil(blognum / 5)}}
              </li>
            </template>

            <!-- 当前页面位于最后3位-->
            <template v-if="Math.ceil(blognum / 5) - 3 <= nowpage">
              <li @click="to(1)">1</li>
              <li>···</li>
              <li v-for="(item,index) in 5" :class="nowpage == Math.ceil(blognum / 5) - ( 4 - index)  ? 'active' : ''">
                {{Math.ceil(blognum / 5) - ( 4 - index)}}
              </li>
            </template>
          </template>

          
          <li @click="next">&raquo;</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// 加载动画
import Leading from "../components/Loading.vue";
import Axios from "axios";
import qs from "qs";

// 封装post请求
const PostAxios = function(url, data) {
  return Axios.post(url, qs.stringify(data));
};

// bing接口一共可以获取15张图片，每次取8张，去两次全部取出
function getBing(num) {
  return Axios.get("/getbing?format=js&idx=" + (num % 3) * 5 + "&n=5");
}

// 获取当前页博文
function getnowpageblog(num) {
  return PostAxios("/getpageblog", { nowpage: num });
}

// 获取博客总数量
function getblognums(){
  return Axios.get('/getblognums')
}

export default {
  mounted() {
    // 当前为第一页
    if(this.$route.query.nowpage == undefined){
      this.axiosleading(0);
    }else{
      // 考虑刷新页面
      this.axiosleading(this.$route.query.nowpage - 1);
      this.nowpage = this.$route.query.nowpage;
    }
  },
  data() {
    return {
      IsLeading: true,
      BlogList: [], // 博客数据和bing背景图片结合
      BlogListBg: [], // 为背景渲染样式
      nowpage: 1, // 当前页数
      blognum:0, // 博客总数量
    };
  },
  components: {
    Leading
  },
  methods:{
    // 上一页
    up(){
      if(this.nowpage > 1){
        this.nowpage--;
        this.$router.push('/blog?nowpage=' + this.nowpage);
        // 再次获取数据
        this.IsLeading = true;
        this.axiosleading(this.nowpage - 1);
      }else{
        console.log('到顶了')
      }
    },
    // 下一页
    next(){
      if(this.nowpage < Math.ceil(this.blognum / 5)){
        this.nowpage++;
        this.$router.push('/blog?nowpage=' + this.nowpage);
        // 再次获取数据
        this.IsLeading = true;
        
        this.axiosleading(this.nowpage - 1);
      }else{
        console.log('到底了')
      }
    },
    // 指定页
    to(num){
      this.nowpage = num;
      this.$router.push('/blog?nowpage=' + this.nowpage);
      // 再次获取数据
      this.IsLeading = true;
      this.axiosleading(this.nowpage - 1);
    },
    axiosleading(num){
      const that = this;
      Axios.all([
        getBing(num),
        getnowpageblog(num),
        getblognums()
      ]).then(
        Axios.spread((getBing, getnowpageblog,getblognums) => {
          that.blognum = getblognums.data.result;
          console.log(getBing)
          // 结合博客数据和bing背景图片
          getnowpageblog.data.result.forEach((ele, index) => {
            ele.bgimg = "https://www.bing.com" + getBing.data.images[index].url;
          });

          that.$data.BlogList = getnowpageblog.data.result;
          that.$data.BlogListBg = [];
          that.$data.BlogList.forEach(item => {
            that.$data.BlogListBg.push({
              background: 'url("' + item.bgimg + '")'
            });
          });

          // 关闭动画
          that.$data.IsLeading = false;
        })
      );
    }
  }
};
</script>

<style scoped>
.blog {
  width: 1200px;
  margin: 80px auto;
}

.bloglist {
  width: 100%;
  margin: 20px 0;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  background-color: #fff;
  box-shadow: 0 0px 10px 0 rgba(7, 17, 27, 0.1);
}

.bloglist:hover .bingbg {
  background-size: 120% !important;
}

.bloglist:hover .bingbg::after {
  background-color: rgba(255, 255, 255, 0.4) !important;
}

.bingbg {
  width: 100%;
  height: 300px;
  color: white;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  line-height: 300px;
  background-size: 100% !important;
  background-position: 50% !important;
  transition: all 0.6s;
}

.bingbg::after {
  content: "";
  display: block;
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  height: 300px;
  z-index: 999;
  top: -300px;
  transition: all 0.6s;
}

.blogbox {
  padding: 10px;
}

.blogbox > p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  color: gray;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.paging {
  text-align: center;
}

.paging > ul {
  display: inline-block;
}

.paging > ul > li {
  float: left;
  /* border: 1px solid #2253f4; */
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  margin: 0 10px;
  font-weight: bold;
  cursor: pointer;
  box-sizing: border-box;
  border: 1px solid transparent;
  border-radius: 5px;
}

.paging > ul > .active {
  background-color: #2253f4;
  color: white;
}

.paging > ul > li:hover {
  border: 1px solid #2253f4;
}

.likelist{
  padding: 10px 0 0 0;
  /* border: 1px solid red; */
}

.likelist > ul > li{
  color: #5f6471;
  display: inline-block;
}

.likelist > ul >li :first-of-type{
  float: left;
}



.likelist > ul >li:not(:first-of-type){
  float: right;
  margin-left: 20px;
}

.likelist > ul >li > span{
  margin: 0 10px;
  color: #999aaa;
}
</style>
