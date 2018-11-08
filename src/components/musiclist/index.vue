<template>
  <div class="musiclist">
    <div class="top-mess" ref = "topMess" >
      <div class="back icon-back " @click="back" >
      </div>
      <h2>{{title}}</h2>
      <div class="bgImage" ref="bgImage" :style="bImage">
        <div class="playAll" ref="playBtn">
          <span></span>
          <p>随机播放全部</p>
      </div>
      </div>

    </div>
    <div class="bg-layer" ref="layer"></div>

    <scroll class="wrapper scroll" @scroll="scroll" ref = 'scroll' :probeType=3 :listenScroll="true">
      <ul class="song-list content">
        <li v-for="(item,index) in list" @click="addPlayerList(item,index)">
        <div v-if="isRanking" class="i-pic " :class="[{rank1:index==0},{rank2:index==1},{rank3:index==2}] ">{{index}}</div>
        <div class="t-text">
          <h3>{{item.name}}</h3>
          <p>
            <span v-for="singerItem in item.singer" >
              {{singerItem.name}}
            </span>
          </p>
        </div>

        </li>
      </ul>
    </scroll>
  <loading v-show="isLoading"></loading>
  </div>
</template>
<script>
    import Scroll from '@/components/scroll';
    import Loading from '@/components/loading';
    import {mapActions} from 'vuex';
    export default{
        name:'MusicList',
        components:{
          Scroll,
          Loading,
        },
        data(){
          return {
            scrollY : 0,
            bgHeigth:0,
            ty : 0,
          }
        },
        mounted(){
          this.bgHeigth =  this.$refs.bgImage.clientHeight;
          this.$refs.scroll.$el.style.top = `${this.bgHeigth}px`;
          this.ty = -this.bgHeigth + 50;
        },
        props:{
          title:{
            type:String,
            default:'主题'

          },
          bgUrl:{
            type:String,
          },
          //[
          //{songname:'',singer:[]}
          //]
          list:{
            type:Array,
          },
          isLoading:{
            type:Boolean,
            default:false
          },
          isRanking:{
            type:Boolean,
            default:false
          }
        },
        methods:{
          back:function(){
            this.$router.back();
          },
          scroll:function(pos){
              this.scrollY = pos.y
          },
          addPlayerList(item,index){
            // console.log(this.list)
            this.addPlayer({
              list:this.list,
              index:index
            })
          },
          ...mapActions([
              'addPlayer'
            ])

        },
        watch:{
          scrollY(v){
            let translateY = Math.max(this.ty,v);
            let zIndex = 0;
            let scale = 1;
            const p = Math.abs(v/this.bgHeigth);
            if(v>0){
              zIndex = 10;
              scale += p;
            }
            this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px,0)`;
            if(v<this.ty){
              zIndex = 10;
              this.$refs.bgImage.style.paddingTop = '50px';
              this.$refs.playBtn.style.display = 'none';
            }else{
              this.$refs.bgImage.style.paddingTop = '70%';
              this.$refs.playBtn.style.display = 'block';
            }
            this.$refs.topMess.style.zIndex = zIndex;
            this.$refs.bgImage.style.transform = `scale(${scale})`;

          },
          bgHeigth(y){
             this.$refs.scroll.$el.style.top = this.y + 'px';
          }
        },
        computed:{
          bImage:function(){
            return `background-image:url(${this.bgUrl})`;
          }
        }
    }
</script>

<style scoped lang="less">
@import '~@/assets/less/variable.less';

.musiclist{
     position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index : 999;
    background-color:#222;

    .top-mess{
        position:relative;
        width:100%;
        overflow: hidden;
        .back{
            position:absolute;
            top:20px;
            left:20px;
            width:20px;
            height: 20px;
            z-index:2;
            font-size:20px;
            color:orange;
        }
        h2{
          position:absolute;
          top:0;
          left:10%;
          width:80%;
          text-align: center;
          text-align: center;
          margin-top: 20px;
          font-size: 20px;
          z-index:2;

        }
        .bgImage{
          padding-top:70%;
          position:relative;
          background-repeat: no-repeat;
          background-size:100% 100%;
          .playAll{
            position:absolute;
            bottom:30px;
            left:50%;
           transform: translateX(-50%);
           border:1px solid darkorange;
           height: 30px;
           line-height: 30px;
           font-size:12px;
           color:darkorange;
           padding:0 10px;
           border-radius: 15px;
        }
        }


    }

    .bg-layer{
        position: relative;
        height: 100%;
        top:0;
        background-color:#222;
    }
    .scroll{
      position:absolute;
      width:100%;
      bottom:0;
      overflow:visible;
    .song-list{
      li{
        padding:20px;
        display:flex;
        .i-pic{
          width:50px;
          height: 50px;
          line-height:30px;
          text-align: center;
          color:orange;
          margin-right:20px;
        }
        .rank1{
          font-size:0;
          background-image: url('~@/assets/image/first@2x.png');
          background-size:50% 50%;
          background-repeat:no-repeat;
          background-position: center 20%
        }
        .rank2{
          font-size:0;
          background-image: url('~@/assets/image/second@2x.png');
          background-size:50% 50%;
          background-repeat:no-repeat;
          background-position: center 20%
        }
        .rank3{
          font-size:0;
          background-image: url('~@/assets/image/third@2x.png');
          background-size:50% 50%;
          background-repeat:no-repeat;
          background-position: center 20%
        }
        .t-text{
           width:80%;

          h3,p{
            width:80%;
            overflow:hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          h3{
            font-size:14px;
          }
          p{
            font-size:14px;
            color:#666;
            margin-top:10px;
          }
        }
      }
    }
  }
  }
</style>