<template>
  <div class="about">
    <img
      src="../assets/images/pohoto.gif"
      alt="不二博客"
      class="animated rollIn music rotate"
    />
    <audio loop controls autoplay muted hidden id="audio" src="../assets/mp3/Sleep Alone.mp3"></audio>
    <h2>王 飞</h2>
    <p>一个喜欢探索新鲜事物的双鱼座男生~</p>
    <div class="tell">
      <ul class="clear">
        <li>热爱互联网</li>
        <li>吃货</li>
        <li>阅读</li>
      </ul>
    </div>
    <!-- <b>关于不二博客</b>
    <div class="buer">
      <p>不二是出自作家安东尼的《陪安东尼度过漫长岁月》散文集中</p>
      <p>不二在安东尼的文字中是一只长耳朵的兔子</p>
      <p>在书中不二就像是一个特别熟悉的存在</p>
      <p>就这样便喜欢了不二和不二这个名字</p>
      <p>于是为自己博客取名不二博客</p>
      <p>在不二博客中记录学习过程中的点点滴滴</p>
      <p>目前博客是第一版，比较简陋</p>
      <p>后面我也会更加的完善整个博客系统</p>
      <p>不断的将自己的想法和创意融入进去</p>
      <p>2020-06-14 王飞</p>
    </div> -->
  </div>
</template>

<script>
</script>

<style scoped>
.about {
  width: 1200px;
  margin: 80px auto 0px auto;
  text-align: center;
  padding: 50px;
  color: #3a3a3a;
}

.about > img {
  width: 300px;
  height: 300px;
  margin-top: 50px;
  border-radius: 300px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: inset 14px 14px 28px #e3e3e3, inset -14px -14px 28px #ffffff;
  cursor: pointer;
}

.rotate {
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

h2 {
  font-size: 36px;
  margin-top: 50px;
  text-align: left;
  text-align: center;
}

.about > p {
  padding: 20px;
}


.tell>ul{
  display: inline-block;  
}

.tell>ul>li{
  margin: auto;
  float: left;
  padding: 5px 10px;
  background-color: #2254f4;
  color: white;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.buer {
  padding: 20px;
}

.buer > p {
  line-height: 32px;
}

b {
  display: block;
  margin-top: 20px;
}
</style>
