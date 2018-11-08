<template>
  <div class="header">
    <div class="logo"></div>
    <span class="title">Water Music</span>
    <div class="userIcon ">
    </div>
  </div>
</template>
<script>
  export default{
      name:'musicHeader',
  }
</script>

<style scoped  lang="less">
  .header{
    margin:10px 0;
    text-align: center;
    position: relative;
    .logo,.title{
      vertical-align: middle;
    }
    .logo{
      width:32px;
      height: 32px;
      background:url('./default.png');
      background-size: 100% 100%;
      display: inline-block;
    }
    .title{
      margin-left:10px;
      color:orange;
    }
    .userIcon{
      margin-left:20%;
      color:orange;
      font-size:20px;
    }
  }
</style>