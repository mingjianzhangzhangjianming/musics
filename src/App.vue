<template>
  <div id="app">
  <!-- 头部 -->
    <musicHeader></musicHeader>
  <!-- 选项卡 -->
  <tab></tab>
  <!-- 路由导航 -->
  <transition name="slide" mode="out-in">
    <router-view/>
  </transition>
  <player></player>
  </div>
</template>

<script>
import MusicHeader from '@/components/MusicHeader';
import Tab from '@/components/Tab';
import Player  from '@/components/player';
import '@/assets/fontsize/iconfont.css';

export default {
  name: 'App',
  components:{
    MusicHeader,
    Tab,
    Player
  },

  }

</script>

<style lang="less">
  @import '~@/assets/less/index.less';
  #app{
    width:100%;
    height: 100%;
    overflow:hidden;
  }
</style>
