<template>
  <div class="loading" :class="IsDark ? 'dark':''">
    <h1 v-show="false">{{hitokotoAsy}}</h1>
    <p>{{hitokoto}}</p>
    <div class="loadinginfo">
      <div class="obj"></div>
      <div class="obj"></div>
      <div class="obj"></div>
      <div class="obj"></div>
      <div class="obj"></div>
      <div class="obj"></div>
      <div class="obj"></div>
      <div class="obj"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations,mapActions } from "vuex";
export default {
  data(){
    return {
    }
  },
  methods:{
  },
  computed: {
    ...mapActions(['hitokotoAsy']),
    ...mapState(['hitokoto']),
    ...mapState(["IsDark"])
  }
};
</script>

<style scoped>
.loading {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 100;
  background-color: #EDF2F6;
}

.loading>p{
  text-align: center;
  position: absolute;
  left: 50%;
  top: 80%;
  color: gray;
  transform: translate(-50%, -50%);
}

.loadinginfo {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 50px;
  display: flex;
  align-items: center;
}

.obj {
  width: 6px;
  height: 40px;
  background-color: #2254f4;
  margin: 0 3px;
  border-radius: 10px;
  animation: loading 0.8s infinite;
}

.obj:nth-child(2) {
  animation-delay: 0.1s;
}
.obj:nth-child(3) {
  animation-delay: 0.2s;
}
.obj:nth-child(4) {
  animation-delay: 0.3s;
}
.obj:nth-child(5) {
  animation-delay: 0.4s;
}
.obj:nth-child(6) {
  animation-delay: 0.5s;
}
.obj:nth-child(7) {
  animation-delay: 0.6s;
}
.obj:nth-child(8) {
  animation-delay: 0.7s;
}

@keyframes loading {
  0% {
    height: 0px;
  }
  50% {
    height: 40px;
  }
  100% {
    height: 0;
  }
}
</style>