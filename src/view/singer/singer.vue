<template>
    <div ref="singer" class="singer">
        <scroll class="scroll" ref="scroll" @scroll="scroll" :listenScroll=true :probeType=3>
            <div class="content">
                <div class="singer-list">
                    <div class="list" ref='list' v-for="item in singerList">
                        <p class="name">{{item.title}}</p>
                        <div class="singer-item" v-for="singer in item.list" @click="goDetail(singer.id)">
                            <img :src="singer.imgUrl | imgSrc" alt="">
                            <p>{{singer.name}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <!--右侧快速定位列表-->
            <div class="list-shortcut" @touchstart="touchStart" @touchmove.stop.prevent="touchMove" >
                <ul>
                    <li class="item"  v-for="(item,index) in newList" :data-index="index" :class="{current:currentIndex == index}">{{item}}</li>
                </ul>
            </div>

    </scroll>
        <router-view></router-view>

    </div>

</template>

<script>
    import Scroll from '@/components/scroll';
    import {myMixin} from '@/assets/js/mixin';

    export default {
        mixins:[myMixin],

        name : 'Singer',
        props:{
            singerList:{
                type:Array
            }
        },
        data(){
            //建立一个对象来储存第一次手指触摸的位置及index
            return {
                touch:{},
                currentIndex:0,
                listHeight:[],
                scrollY:0
            }
        },
        updated(){
                this.getLiHeight();
        },
        components:{
            Scroll
        },
        computed:{
            newList:function(){
                let arr = [];
                for(var i = 0 ; i < this.singerList.length ; i++){
                    arr.push(this.singerList[i].title.substring(0,1));
                }
                return arr;
            }
        },
        filters:{
            imgSrc:function(value){
                // https://y.gtimg.cn/music/photo_new/002J4UUk29y8BY.jpg?max_age=2592000
                // https://y.gtimg.cn/music/photo_new/T001R300x300M000001fNHEf1SFEFN.jpg?max_age=2592000
                return `https://y.gtimg.cn/music/photo_new/T001R300x300M000${value}.jpg?max_age=2592000`
            }

        },
        watch:{
            scrollY(v){
                if(v>0){
                    this.currentIndex=0;
                    return
                }
                //zhong
                for(let i = 0 ; i< this.listHeight.length;i++){
                    let h1 = this.listHeight[i];
                    let h2 = this.listHeight[i+1];
                    if(-v>h1 && -v< h2){
                        this.currentIndex = i;
                        return
                    }
                }
            }
        },
        methods:{
            watchPlayList(playList){
              if(playList.length>0){
                this.$refs.singer.style.bottom = '60px';
                this.$refs.scroll .refresh();
              }else{
                this.$refs.singer.style.bottom = 0;
                this.$refs.scroll .refresh();
              }
            },
            goDetail(id){
                this.$router.push({path:`/singer/${id}`});
            },
            touchStart(ev){
                let cIndex = ev.target.attributes[0].nodeValue;

                this.touch.index = cIndex;
                this.touch.y1 = ev.touches[0].pageY;

                this.$refs.scroll.scrollToElement(this.$refs.list[cIndex]);
                this.currentIndex = parseInt(cIndex);
            },
            touchMove(ev){
                this.touch.y2 = ev.touches[0].pageY;

                let aIndex = (this.touch.y2-this.touch.y1)/ 18 | 0;
                let cIndex = aIndex  + parseInt(this.touch.index);

                this.$refs.scroll.scrollToElement(this.$refs.list[cIndex]);
                this.currentIndex = parseInt(cIndex);

            },
            scroll(pos){
                this.scrollY = pos.y;
            },
            getLiHeight(){
                const list = this.$refs.list;
                let height= 0;
                this.listHeight.push(height);
                for(let i=0;i<list.length;i++){
                    height+= list[i].clientHeight;
                    this.listHeight.push(height);
                }
            }
        }
    }
</script>

<style  lang="less">
    @import '~@/assets/less/variable.less';
    .singer{
        position:absolute;
        width:100%;
        top:88px;
        bottom:0;
        overflow:hidden;

        .scroll{
            width:100%;
            height: 100%;
            .content{
                .search-box{
                    padding:0 10px;
                    input{
                        width:100%;
                        height: 30px;
                        font-size: 12px;
                        text-indent: 30px;
                        background-color: #666;
                        color:#ccc;
                        border-radius: 4px;

                        }
                    }
                        .singer-list{
                            .list{
                                .singer-item{
                                    padding:20px;
                                    display: flex;
                                    align-items: center;
                                    img{
                                        width:60px;
                                        height: 60px;
                                        border-radius:50%;
                                    }
                                    p{
                                        font-size:14px;
                                        margin-left:20px;
                                        color:#999;
                                    }
                                }

                                p.name{
                                    font-size:14px;
                                    padding:5px 20px;
                                    background-color:#333;
                                    color:#999;
                                }
                            }
                        }
                    }

                .list-shortcut{
                  position: absolute;
                  z-index: 30;
                  right: 0;
                  top: 50%;
                  transform: translateY(-50%);
                  width: 20px;
                  padding: 20px 0;
                  border-radius: 10px;
                  text-align: center;
                  background: @color-background-d;
                  font-family: Helvetica;
                  .item{
                     padding: 3px;
                     line-height: 1;
                     color: @color-text-l;
                     font-size: @font-size-small;
                     &.current{
                       color: @color-theme;
                     }
                  }
                }
            }
        }


</style>