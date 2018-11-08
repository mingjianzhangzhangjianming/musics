<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll">
      <div class="content">
      <div class=" swiper-container" id="banner">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in slide">
            <img :src="item.picUrl"  alt="">
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="hot">
        <p>热门歌曲推荐</p>
        <div class="lists">
          <div class="list" v-for="item in hotList" @click="detail(item.id)">
            <img :src="item.picUrl" alt="" />
            <div class="text" >
              <p class="name">{{item.songListDesc}}</p>
              <p class="from">{{item.songListAuthor}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </scroll>
    <loading v-show="isLoading" :title="loadingTitle"  ></loading>
    <router-view></router-view>
  </div>

</template>

<script>
import Swiper from 'swiper';
import axios from 'axios';
import {getRecommend} from '@/api';
import 'swiper/dist/css/swiper.css';
import Scroll from '@/components/scroll';
import Loading from '@/components/loading';
import {myMixin} from '@/assets/js/mixin';
export default {
  mixins:[myMixin],
  name: 'Recommend',
  data () {
    return {
      slide:{},
      hotList:{},
      isLoading:true,
      loadingTitle:'正在努力加载中'
    }
  },
  components:{
    Scroll,
    Loading

  },
  mounted(){
    let mySwiper = new Swiper('#banner',{
      pagination:{
        el:'.swiper-pagination'
      },
      loop:true,
      observeParents:true,
      observer:true,
    })


  },
  created(){
    this.getSlide();
  },
  methods:{
    watchPlayList(playList){
      if(playList.length>0){
        this.$refs.recommend.style.bottom = '60px';
        this.$refs.scroll.refresh();
      }else{
        this.$refs.recommend.style.bottom = 0;
        this.$refs.scroll.refresh();
      }
    },
    getSlide:function(){
      let _this = this;

      getRecommend().then(res=>{
        console.log(res)
        _this.slide = res.data.slider
        _this.hotList = res.data.songList
        _this.isLoading = false;

      })
    },
    detail:function(id){
      this.$router.push({path:`/recommend/${id}`});
    }
  },
}
</script>

<style  lang="less">
  @import '~@/assets/less/variable.less';
  .recommend{
    position:absolute;
    top:88px;
    bottom:0;
    left:0;
    right: 0;

    .wrapper{
      color:#ccc;
      position: absolute;
      overflow:hidden;
      width: 100%;
      top:0;
      bottom:0;
        .content{
          #banner{
            .swiper-slide{
              img{
                width:100%;
              }
            }
          }
          .hot{
            margin-top:20px;

            >p{
              text-align: center;
              color:orange;
              font-size:14px;
            }
            .lists{
              margin-top: 10px;
              .list{
                padding:5px 20px;
                display:flex;
                img{
                  display:block;
                  width:60px;
                  height: 60px;
                }
                .text{
                  display:flex;
                  align-content: space-around;
                  flex-wrap:wrap;
                  >p{
                    width:100%;
                    font-size:12px;
                    color:#ccc;
                    margin-left: 20px;
                  }
                }
              }

            }
          }
        }

    }

  }


</style>
