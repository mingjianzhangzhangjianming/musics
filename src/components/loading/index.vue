<template>
    <div class="loading">
        <div class="loading-pic">
            <img src="./5-121204193R5-50.gif" height="32" width="32" alt="">
        </div>
        <p>{{title}}</p>
    </div>
</template>
<script>
    export default {
      name:'loading',
      props:{
        title:{
          type:String,
          default : 'loading...'
        }
      }
    }
</script>
<style lang="less">
    .loading{
      position:absolute;
      width:100%;
      top:0;
      left:0;
      right:0;
      bottom:0;
      z-index: 1;
      background-color: #222;
      display:flex;
      flex-wrap:wrap;
      justify-content: center;
      align-content: center;
      font-size: 12px;
      color:#ccc;
      .loading-pic,p{
        width:100%;
        text-align: center;
      }
      p{
        margin-top:20px;
      }
    }
</style>
