<template>
  <div>
    <Leading v-if="IsLeading" />

    <div class="resource" v-if="!IsLeading">
      <!-- <div class="searchapp">
        <div class="inputsearch">
          <input type="text" placeholder="请输入你要搜索的资源名称或者分类">
          <button>搜索</button>
        </div>
      </div>-->
      <div class="apptypelist">
        <ul class="clear">
          <li
            :class="nowapplistnum == 0 ? 'active' : ''"
            data-nowresource="0"
            @click="toresource"
          >全部</li>
          <li
            v-for="item in apptypelist"
            :key="item.resourceID"
            :class="nowapplistnum == item.resourceID ? 'active':''"
            @click="toresource"
            :data-nowresource="item.resourceID"
          >{{item.resourceText}}</li>
        </ul>
      </div>
      <div class="resourcelist">
        <div
          v-for="item in applist"
          :v-key="'applist' + item.resourceID"
          class="applist animated zoomIn"
        >
          <p>{{item.resourceName}}</p>
          <div class="btndown">
            <button
              :data-url="item.resourceUrl"
              :data-pwd="item.resourceUrlPwd"
              @click="downapp"
            >立即下载</button>
            <a :href="item.resourceSet" title="不二博客" target="_blank">安装教程</a>
          </div>
        </div>
      </div>
      <div class="readdate" v-if="IsReadDate">{{leadingstr}}</div>
    </div>
  </div>
</template>

<script>
// 加载动画
import Leading from "../components/Loading.vue";

import axios from "axios";
import qs from "qs";

// 封装post函数
const PostAxios = function(url, data) {
  return axios.post(url, qs.stringify(data));
};

// 给数组添加随机排序方法
Array.prototype.RandomSort = function() {
  return this.sort((n1, n2) => {
    return Math.random() - 0.5;
  });
};

export default {
  mounted() {
    // 监听滚动事件
    window.addEventListener("scroll", this.handleScroll, true);
    axios.all([this.getresourcetype(), this.getoverresource(0)]).then(
      axios.spread((getresourcetype, getoverresource) => {
        this.apptypelist = getresourcetype.data.result;
        this.applist = getoverresource.data.result.RandomSort();
        console.log(this.applist);
        this.IsLeading = false;
      })
    );
  },
  data() {
    return {
      IsLeading: true, // 动画
      nowapplistnum: 0, // 当前列表索引
      apptypelist: [], // 资源分类信息
      applist: [], // 资源信息,
      IsReadDate: false, // 是否在读取数据
      leadingstr: "努力加载中..."
    };
  },
  components: {
    Leading
  },
  methods: {
    handleScroll() {
      // console.log('滚动条的高度：',document.documentElement.scrollHeight)
      // console.log('滚动条的距离上方高度：',document.documentElement.scrollTop)
      // console.log('文档的高度：',document.documentElement.clientHeight)
      if (
        document.documentElement.scrollHeight -
          document.documentElement.scrollTop -
          document.documentElement.clientHeight <=
        100
      ) {
        if (!this.IsReadDate) {
          // console.log('开始加载数据',this.nowapplistnum)
          this.IsReadDate = true;
          // 取三条数据
          this.getthreesource(this.nowapplistnum).then(result => {
            if (result.data.result.length < 3) {
              this.leadingstr = "没有更多了";
              this.applist = this.applist.concat(
                result.data.result.RandomSort()
              );
              this.IsReadDate = true;
              return;
            }
            this.applist = this.applist.concat(result.data.result.RandomSort());
            this.IsReadDate = false;
          });
        }
      }
    },
    // 获取软件分类
    toresource(e) {
      this.IsReadDate = false; // 重置加载状态
      this.leadingstr = "努力加载中...";
      axios.all([this.getoverresource(e.target.dataset.nowresource)]).then(
        axios.spread(getoverresource => {
          this.applist = [];
          setTimeout(() => {
            this.nowapplistnum = e.target.dataset.nowresource;
            this.applist = getoverresource.data.result;
          }, 0);
        })
      );
    },
    // 下载软件
    downapp(e) {
      this.copyToClip(e.target.dataset.pwd, () => {
        alert("提取密码已复制");
        window.open( 'https://' + e.target.dataset.url + '#' + e.target.dataset.pwd);
      })
    },
    // 复制文本
    copyToClip(content, callback) {
      var aux = document.createElement("input");
      aux.setAttribute("value", content);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      callback();
    },
    // 获取软件分类
    getresourcetype() {
      return axios.get("/getresourcetype");
    },
    // 获取软件集合
    getoverresource(num) {
      return PostAxios("/getoverresource", {
        resourceid: num
      });
    },
    // 取三条数据
    getthreesource(num) {
      return PostAxios("/querythreeresource", {
        resourceid: num,
        resourcesum: this.applist.length
      });
    }
  }
};
</script>

<style scoped>
.resource {
  width: 1200px;
  margin: 80px auto;
}

.apptypelist {
  margin-bottom: 20px;
}

.apptypelist > ul > li {
  float: left;
  font-size: 12px;
  padding: 5px 10px;
  margin: 12px 10px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.apptypelist > ul > :not(.active):hover {
  color: #2253f4;
  font-weight: bold;
  border-bottom: 2px solid #2253f4;
}

.apptypelist > ul > .active {
  background-color: #2253f4;
  color: white;
}

.apptypelist > ul > li:first-of-type {
  margin-left: 0px !important;
}

.resourcelist {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
}

.resourcelist:after {
  content: "";
  width: 32%;
}

.applist {
  width: 360px;
  height: 220px;
  margin-bottom: 50px;
  background-color: #fff;
  cursor: pointer;
  padding: 20px;
  border-radius: 0 0 2px 2px;
  border-top: 3px solid #ffffff;
  box-shadow: 0 0px 10px 0 rgba(7, 17, 27, 0.1);
  transition: all 0.4s !important;
  text-align: center;
  line-height: 80px;
}

.applist:hover .btndown > button {
  background-color: #2253f4;
  color: white;
  cursor: pointer;
}

.applist:hover {
  transform: translateY(-10px);
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1);
  border-top: 3px solid #2253f4;
}

.applist > p {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #1c1e21;
}

.btndown {
  text-align: center;
}

.btndown > button {
  padding: 10px 20px;
  border: none;
  border: 1px solid #2253f4;
  background-color: #fff;
  color: #2253f4;
  transition: all 0.6s;
}

.btndown > a {
  font-size: 12px;
  padding: 10px;
  color: gray;
}

.btndown > a:hover {
  color: #2253f4;
}

.readdate {
  text-align: center;
  font-size: 14px;
  color: gray;
}
</style>
