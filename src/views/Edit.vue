<template>
  <div v-title data-title="写博客 | 不二博客后台管理系统">
    <Leading v-if="IsLeading" />
    <div v-else class="edit">
      <mavon-editor
        ref="md"
        placeholder="请输入文档内容..."
        :boxShadow="false"
        style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;"
        v-model="content"
        :ishljs="true"
        @save="save"
      />

      <el-dialog title="发布文章" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-row class="padding">
          <el-col :span="4">
            <div class="grid-content bg-purple">文章标题</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple-light">
              <el-input placeholder="请输入文章标题" v-model="contenttitle"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row class="padding">
          <el-col :span="4">
            <div class="grid-content bg-purple">文章标题</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple-light">
              <el-tag
                class="margin-xs-notfirst"
                closable
                v-for="item in bloglist"
                v-if="item.ischecked"
                :v-key="'nowbloglist' + item.blogtypeID"
              >{{item.blogName}}</el-tag>
            </div>
          </el-col>
        </el-row>
        <el-row class="padding">
          <el-col :span="4">
            <div class="grid-content bg-purple">文章分类</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple-light">
              <el-checkbox
                v-model="item.ischecked"
                v-for="item in bloglist"
                :v-key="'bloglist' + item.blogtypeID"
              >{{item.blogName}}</el-checkbox>
            </div>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button type="text">保存至草稿箱</el-button>
          <el-button type="text">取消</el-button>
          <el-button type="primary" @click="puslish">发布</el-button>
        </span>
      </el-dialog>


      <router-link tag="div" to="/home" class="eqit">退出</router-link>
      
    </div>
  </div>
</template>
 
<script>
// 加载动画
import Leading from "../components/Loading.vue";

import Axios from "axios";
import qs from "qs";

export default {
  beforeCreate() {
    // 判断回话是否有效
    Axios.post("/checkedtoken").then(result => {
      if (!result.data) {
        this.errorinfo("当前会话已过期，请重新登录");
        this.$router.push("login");
      }
    });
  },
  mounted() {
    this.getblogtype().then(result => {
      result.data.result = result.data.result.map(item => {
        item.ischecked = false;
        return item;
      });
      this.bloglist = result.data.result;
      this.IsLeading = false;
    });
  },
  data() {
    return {
      IsLeading:true,
      bloglist: [], // 博客分类列表
      dialogVisible: false, // 模态框显示隐藏
      /**
       * 以下是makedown编辑器
       */
      contenttitle: "", // 文章标题
      content: "", // 源代码
      html: "", // 摘要
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    };
  },
  components:{
    Leading
  },
  methods: {
    save(md, html) {
      // console.log(md)
      this.content = md;
      this.html = html;
      // console.log(html.replace(/\<\/?[^\>]+>/ig,''));

      if (md.trim() != "") {
        this.dialogVisible = true;
      } else {
        this.errorinfo("博客内容为空，请编辑博客后在保存！");
      }
    },
    // 关闭模态框
    handleClose() {
      this.dialogVisible = false;
    },
    // 获取博文分类
    getblogtype() {
      return Axios.get("/getblogtype");
    },
    // 上传图片方法
    // $imgAdd(pos, $file) {
    //   console.log(pos, $file);
    // },
    // 保存到草稿箱
    saveedit() {
      this.blogup(0);
    },
    // 发布
    puslish() {
      this.blogup(1);
    },
    blogup(num) {
      if (this.contenttitle.trim() == "") {
        this.errorinfo("请填写文章标题后发布！");
      } else if (this.checkType() != 1) {
        this.errorinfo("请选择 1 个文章分类后提交发布！");
      } else {
        this.PostAxios("/saveblog", {
          BlogTitle: this.contenttitle,
          BlogText: this.content,
          BlogHtml: this.html,
          BlogStatus: num,
          BlogTypeID: this.selectID()
        })
          .then(result => {
            if (result.data.code == 0) {
              this.errorinfo("发布失败，请重试");
            } else if (result.data.code == 1) {
              this.successinfo("发布成功即将自动跳转至当前博客");
              setTimeout(() => {
                this.$router.push("/blog/" + result.data.result.blogid);
              }, 2000);
            }
          })
          .catch(err => {
            this.errorinfo("服务器异常，请稍后再试");
          });
      }
    },
    // 提示框
    errorinfo(info) {
      this.$message.error(info);
    },
    // 成功提示框
    successinfo(info) {
      this.$message({
        message: info,
        type: "success"
      });
    },
    // 检测选中了几个分类
    checkType() {
      var i = 0;
      this.bloglist.forEach(item => {
        item.ischecked ? i++ : "";
      });
      return i;
    },
    // 获取当前分类ID
    selectID() {
      return this.bloglist.find(item => item.ischecked).blogtypeID;
    },
    // 封装Axios POST方法
    PostAxios(url, data) {
      return Axios.post(url, qs.stringify(data));
    }
  }
};
</script>


<style scoped>
.eqit{
  width: 60px;
  height: 60px;
  border-radius: 50px;
  background-color: #2254f6;
  position: absolute;
  z-index: 2000;
  color: white;
  text-align: center;
  line-height: 60px;
  top: calc(100% - 80px);
  left: calc(100% - 80px);
  cursor: pointer;
}


.blog_box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1600;
  background-color: hsla(0, 0%, 63%, 0.5);
}

.blog_info {
  width: 600px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  top: calc(50% - 300px);
  left: calc(50% - 300px);
  padding: 20px;
}

.blog_info_list > div {
  float: left;
  line-height: 50px;
}

.blog_info_list > div:first-child {
  width: 80px;
  height: 50px;
}

.blog_info_list > div:last-child:not(.typelist) {
  height: 50px;
}

.blog_info_list > div:last-child > input {
  width: 480px;
  height: 50px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 0 10px;
  font-size: 18px;
}

.typelist {
  width: 480px;
  border: 1px solid #e8e8ee;
}

.typelist > label {
  line-height: 0px;
  display: inline-block;
  padding: 10px;
  margin: 10px;
  border: 1px solid #409eff;
  font-size: 12px;
  cursor: pointer;
  border-radius: 4px;
}

.typelist > label:hover {
  border: 1px solid #2253f4;
  color: #2253f4;
}
</style>