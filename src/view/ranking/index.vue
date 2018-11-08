<template>
    <scroll class="ranking">
        <div class="ranking-lists content">
          <div class="list" v-for="item in rankings" @click="toDetail(item.id)">
              <img :src="item.picUrl" alt="">
              <div class="text" >
                  <p v-for="(song,index) in item.songList ">{{(++index)+' '+song.songname}}</p>
              </div>
          </div>
        </div>
        <router-view></router-view>
    </scroll>
</template>

<script>
    import axios from 'axios';
    import Scroll from '@/components/scroll';

    export default {
        name:'Ranking',
        data (){
            return {
                rankings:{}
            };
        },
        components:{
          Scroll,
        },
        created(){
            this.getRankingList();
        },
        methods:{
            getRankingList:function(){
                let _this = this;
                axios.get('https://www.easy-mock.com/mock/5bc052b3e1af39643c682197/musicranking').then(function(res){
                    _this.rankings = res.data.data.topList;
                    // console.log(_this.rankings)
                })
            },
            toDetail:function(id){
               this.$router.push({path:`/ranking/${id}`})
            }
        }
    }
</script>

<style scoped lang="less">
    .ranking{
        position: absolute;
        overflow: hidden;
        top:88px;
        bottom:0;
        left:0;
        right: 0;
      .ranking-lists{

        .list{
          display:flex;
          margin:25px;
          background-color: #333;
          >img{
            width:100px;
            height:100px;
          }
          .text{
            margin-left:30px;
            display:flex;
            flex-wrap:wrap;
            align-content:space-around;;
            >p{
              width:100%;
              font-size:12px;
              color:#666;
            }
          }
        }
      }
    }
</style>