import Vue from "vue";
import VueRouter from "vue-router";
import Nav from "../views/Nav.vue";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  linkExactActiveClass: "active-exact",
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "nav",
      component: Nav,
      redirect: "home",
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("../views/Home.vue"),
        },
        {
          path: "/blog/:id",
          name: "blog",
          component: () => import("../views/ReadBlog.vue"),
        },
        {
          path: "/blog",
          name: "blog",
          component: () => import("../views/Blog.vue"),
        },
        {
          path: "/resource",
          name: "resource",
          component: () => import("../views/Resource.vue"),
        },
        {
          path: "/life",
          name: "life",
          component: () => import("../views/Life.vue"),
        },
        {
          path: "/about",
          name: "about",
          component: () => import("../views/About.vue"),
        },
      ],
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/Admin.vue"),
      redirect: "/admin/login",
      meta:{
          root: "-1"
      },
      children: [
        {
          path: "login",
          name: "login",
          component: () => import("../views/Login.vue"),
        },
        {
          path: "edit",
          name: "edit",
          component: () => import("../views/Edit.vue"),
        },
      ],
    },
  ],
});
