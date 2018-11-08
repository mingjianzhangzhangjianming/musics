<template>
    <ul class="nav">
        <li @click="deal(index)" v-for="(item,index) in itemLists">
          <router-link :to="'/'+item.area">{{item.msg}}</router-link>
        </li>
      </ul>
</template>
<script>
    export default{
        name:'Tab',
        data:function(){
        return {
            itemLists:[
              {
                area:'recommend',
                msg:'推荐',
                isActive:true
              },
              {
                area:'singer',
                msg:'歌手',
                isActive:false
              },
              {
                area:'ranking',
                msg:'排行',
                isActive:false
              },
              {
                area:'search',
                msg:'搜索',
                isActive:false
              }
            ]
        }
      },
      methods:{
        deal:function(index){
          for(var i of this.itemLists){
            i.isActive = false;
          }
          this.itemLists[index].isActive = true
       }
    }
}

</script>
<style scoped lang='less'>
    .nav{
      display: flex;
      >li{
        width:25%;
        text-align: center;
        >a{
          font-size:14px;
          color:#ccc;
          padding-bottom: 2px ;
          position: relative;
          &.router-link-active{
            color:orange;
            border-bottom: 2px solid orange;
          }
        }

      }
    }
</style>