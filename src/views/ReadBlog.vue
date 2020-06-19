<template>
  <div class="blog" v-title :data-title="blogTitle">
    <Leading v-if="IsLeading" />
    <div v-if="IsContent" class="clear">
      <mavon-editor
        :value="itemDes"
        defaultOpen="preview"
        style="z-index:0;box-shadow: 0 0px 10px 0 rgba(7, 17, 27, 0.1);"
        :boxShadow="false"
        :editable="false"
        :subfield="false"
        :toolbarsFlag="false"
      ></mavon-editor>
    </div>
  </div>
</template>

<script>
// 加载动画
import Leading from "../components/Loading.vue";

import axios from "axios";

import qs from "qs";

// 封装axios 请求
const PostAxios = function(url, data) {
  return axios.post(url, qs.stringify(data));
};

export default {
  mounted() {
    PostAxios("/getblog", {
      blogid: this.$route.params.id
    }).then(result => {
      const data = result.data;
      if (data.code == 1) {
        this.$data.itemDes =
          "# " + data.result.blogTitle + "\n" + data.result.blogText;
        this.$data.blogTitle = data.result.blogTitle;
      } else if (data.code == 0) {
        this.$data.itemDes = "博文消失不见了";
      }
      this.$data.IsContent = true;


      // 关闭动画
      setTimeout(()=>{
        /**
         *  此处给500ms解决md文编编辑器渲染的时间差，暂未有更好的办法，日后需要优化
         *  time：2020年6月10日20:49:53  author：王飞 
         **/ 
        this.$data.IsLeading = false;
      },300)
    });
  },
  data() {
    return {
      IsLeading: true,
      IsContent: false,
      blogTitle: '',
      itemDes: "博文消失不见了"
    };
  },
  components: {
    Leading
  }
};
</script>

<style scoped>
.blog {
  width: 1200px;
  min-height: 900px;
  margin: 80px auto;
}
</style>
