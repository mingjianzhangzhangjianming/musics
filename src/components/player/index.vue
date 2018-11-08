<template>
    <div class="sing-box" v-show="this.playList.length>0">
        <transition name="full">
            <div class="full-screen"  v-show="fullScreen">
                <div class="top">
                    <span class="icon-back drop" @click="toToggleScreen"></span>
                    <h1>{{currentSong.name}}</h1>
                    <p>
                        <span v-for="(item,index) in currentSong.singer">
                            {{item.name}}<i v-if="index != currentSong.singer.length-1">/</i>
                        </span>
                    </p>
                </div>

                <div class="swiper-container middle">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide ">
                             <div class="middle-l">
                                <div class="mid-banner "  :class="{play:playing}"  :style="currentSong.img | bgShow" ></div>
                                <p class="single-lyc">{{this.currentLyric}}</p>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="middle-r">
                                <scroll class="t-lyc" ref="lycScroll">
                                    <div class="content">
                                        <p ref="lyricLine" v-for="(item,index) in lyric.lines" :class="{active:index==currentLine}">{{item.txt}}</p>
                                    </div>
                                </scroll>
                            </div>
                        </div>
                    </div>
                    <div class="page"></div>

                </div>

                <div class="bottom">
                    <div class="progress-wrapper">
                        <span class="start-time">{{playTime}}</span>
                        <div class="progress-box">
                            <progress-bar @precentChange="changeCurrentTime"  ref="progress" :precent="precent"></progress-bar >
                        </div>
                        <span class="end-time">{{songTime}}</span>
                    </div>
                    <div class="menu">
                        <ul>
                        <li :class="getMode " @click="onchangeMode"></li>
                        <li class="icon-prev" @click="prev"></li>
                        <li :class="cdState" @click="togglePlaying"></li>
                        <li class="icon-next" @click="next"></li>
                        <li class="icon-not-favorite"></li>
                    </ul>
                    </div>

                </div>

            </div>
        </transition>
        <transition name="mini">
            <div class="mini-screen" v-if="!fullScreen" @click="toToggleScreen" >
                <div class="mini-img">
                    <img :src="currentSong.img" alt="" :class="{rotate:this.playing}">
                    <div class="song-mess">
                        <p class="song-name">{{currentSong.name}}</p>
                        <p class="singer-name">
                            <span v-for="item in currentSong.singer">{{item.name}}</span>
                        </p>
                    </div>

                </div>
                <div class="play-status" :class="cdState" @click.stop="togglePlaying">

                </div>
                <div class="icon-playlist" @click.stop="openList">

                </div>
            </div>
        </transition>
        <audio ref="audio" :src="currentSong.url" @canplay="changePlayState" @ended="endPlaying" @error="changePlayState" @timeupdate="updateTime"></audio>
        <play-list v-show="isOpenList" :isOpenList="isOpenList"  @changeShow="closeList"></play-list>

    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';
import ProgressBar from '@/components/progress';
import {getLyric} from '@/api';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
import {Base64} from 'js-base64';
import lyric from 'lyric-parser';
import Scroll from '@/components/scroll';
import PlayList from '@/components/playlist';
    export default {
        data(){
            return {
                //播放器链接的加载状态
                isReady:false,
                //当前播放时间
                currentTime:0,
                //当前播放进度
                precent:0,
                lyric:{},
                currentLyric:"",
                currentLine:0,
                isOpenList:false
            }
        },
        components:{
            ProgressBar,
            Scroll,
            PlayList
        },
        mounted(){
            setTimeout(function(){
                let mySwiper = new Swiper('.middle',{
                      pagination:{
                        el:'.page',
                        clickable:true
                      },
                      observeParents:true,
                      observer:true,
                    })
            },500)
        },
        computed:{
            getMode(){
                switch(this.mode){
                    case 0:
                        return 'icon-sequence';
                        break;
                    case 1:
                        return 'icon-random';
                        break;
                    case 2:
                        return 'icon-loop';
                        break;
                }

            },
            cdState(){
                return this.playing ? 'icon-play' : 'icon-pause';
            },
            ...mapGetters([
                'playing',
                'fullScreen',
                'playList',
                'currentSong',
                'currentIndex',
                'mode'
            ]),
            songTime(){
                return this.timeConvert(this.currentSong.interval);
            },
            playTime(){
                return this .timeConvert(this.currentTime);
            },
            fullBg(){
                return `background:url('${this.currentSong.img}') no-repeat 100%;background-size:100% 100%`;
            }

        },
        watch:{
            currentSong(val){
                this.$nextTick(()=>{
                     this.getLyc();
                    val ? this.$refs.audio.play() : this.$refs.audio.pause();
                })
            },
            playing(val){
                //监听playing的状态控制播放
                this.$nextTick(()=>{
                    val ? this.$refs.audio.play() : this.$refs.audio.pause();
                })
            },
            currentTime(val){
                 this.precent =Number((val / this.currentSong.interval).toFixed(4));
                 // console.log( this.precent)
            }
        },
        created(){
            // console.log(this.playList)
        },
        filters:{
            bgShow(val){
                return `background-image:url('${val}')`;
            }
        },
        methods:{
            toToggleScreen(){
                this.changeFullScreen(!this.fullScreen);
            },
            togglePlaying:function(){
                this.changePlaying(!this.playing);
                this.lyric.togglePlay();
            },
            next(){
                if(!this.isReady){
                    return
                }
                let index = this.currentIndex+1;
                if(index==this.playList.length){
                    index=0;
                }
                if(!this.playing){
                    this.togglePlaying();
                }
                console.log(this.playing)
                this.isReady=false;
                this.changeCurrentIndex(index);
            },
            prev(){
                if(!this.isReady){
                    return
                }
                let index = this.currentIndex - 1;
                if(index==-1){
                    index=this.playList.length-1;
                }
                this.changeCurrentIndex(index);
                if(!this.playing){
                    this.togglePlaying();
                }
                this.isReady=false;
            },
            changePlayState(){
                this.isReady = true;
            },
            //当播放器播放时更新播放时间
            updateTime(ev){
                // console.log(ev)
                this.currentTime = Number(ev.target.currentTime) | 0;
            },
            timeConvert(time){
                let m = time / 60 | 0;
                let s = time % 60 | 0;
                s = s.toString().length<2 ? ('0'+s) :s;
                return `${m}:${s}`
            },
            getLyc(){
                getLyric(this.currentSong.id).then(res=>{
                    this.lyric = new lyric(Base64.decode(res.lyric),this.handler);
                    console.log(this.lyric)
                    if(this.playing){
                        this.lyric.play()
                    }
                    // this.$nextTick(function(){
                    // let mySwiper = new Swiper('.middle',{
                    //       pagination:{
                    //         el:'.page',
                    //         clickable:true
                    //       },
                    //       observeParents:true,
                    //       observer:true,
                    //     })
                    // });
                    // console.log(this.lyric)

                });
            },
            handler({lineNum,txt}){
                this.currentLyric = txt;
                if(lineNum>5){
                    let lineEl = this.$refs.lyricLine[lineNum-5];
                    this.$refs.lycScroll.scrollToElement(lineEl,300);
                }
                this.currentLine = lineNum;
                console.log(this.currentLyric)
            },
            //根据子组件传回来的百分比来计算当前需要播放的歌曲时间
            changeCurrentTime(v){
                let t  = v * this.currentSong.interval;
                 this.$refs.audio.currentTime = t;

            },
            onchangeMode(){
                let mode = (this.mode+1)%3;
                this.changeMode(mode);
                console.log(mode)
            },
            endPlaying(){
                if(this.mode==0){
                    this.next();
                }else if(this.mode==1){
                    this.next();
                }else if(this.mode == 2){
                    this.loop();
                }
            },
            openList(){
                this.isOpenList = true;
                console.log(this.isOpenList)
            },
            loop(){
                this.$refs.audio.currentTime = 0;
                this.$refs.audio.play();
                this.lyric.seek(0);
            },
            closeList(val){
                this.isOpenList = val;
            },
            ...mapMutations([
                'changePlaying',
                'changeFullScreen',
                'changeCurrentIndex',
                'changeMode'
            ])

        }
    }
</script>


<style scoped lang="less">
    @import url('~@/assets/less/icon.less');
        .full-leave-active{
            animation:leave 1s;

            // transition:.5;
        }
        @keyframes leave{
            from{

            }
            to{
                transform: translate3d(0, 100%, 0);
            }
        }
    .sing-box{
        .full-screen{
            position:fixed;
            top: 0;
            left:0;
            right:0;
            bottom:0;
            z-index: 999;
            background-color:#333;


            .top{
                position:absolute;
                width:100%;
                height: 60px;
                top:0;
                >h1,>p{
                    text-align:center;
                }
                >h1{
                    font-size: 18px;
                    margin-top:20px;
                }
                >p{
                    font-size:14px;
                    margin-top: 10px;
                }
                .drop{
                    position:absolute;
                    left:20px;
                    top: 20px;
                    font-size:24px;
                    color:orange;
                    transform: rotate(-90deg)
                }
            }
            .middle{
                width:100%;
                position:absolute;
                top:150px;
                // left:50%;
                // transform: translateX(-50%);
                background-size:100% 100%;
                background-repeat:no-repeat;
                .page{
                    text-align: center;
                    span{
                        margin-right: 20px;
                    }
                }
                .middle-l{
                    width:100%;
                    padding:20px 0;
                    .mid-banner{
                        width:250px;
                        height: 250px;
                        @media screen  and (max-width:350px){
                        width:200px;
                        height: 200px;
                        }
                        border-radius: 50%;
                        background-size:100% 100%;
                        background-repeat:no-repeat;
                        margin: 0 auto;

                        &.play{
                            animation:rotate 10s linear infinite;
                        }
                        &::after{
                            content:'';
                            display:block;
                            width:100%;
                            height: 100%;
                            border-radius:50%;
                            transform: translate(-20px, -20px);
                            border:20px solid rgba(255,255,255,0.1);
                        }
                    }
                    .single-lyc{
                        text-align: center;
                        margin-top:50px;
                        height: 30px;
                        line-height:30px;
                    }

                }
                .middle-r{
                    height: 320px;
                    .t-lyc{
                        height: 100%;
                        overflow:hidden;
                        .content{
                            >p{
                                text-align: center;
                                line-height:30px;
                                font-size:14px;
                                &.active{
                                    color:orange;
                                }
                            }
                        }

                    }
                }

            }

            .bottom{
                width:100%;
                position:absolute;
                bottom:0;
                padding:20px 0;

                .progress-wrapper{
                    display:flex;
                    padding:5% 15%;
                    justify-content: space-between;
                    align-content: flex-start;
                    height: 20px;
                    line-height:20px;
                    >span{
                        margin-top:2px;
                    }
                    .progress-box{
                        flex:1;
                        padding: 0 5%;
                        display:flex;
                        align-items: center;

                    }
                }
                .menu{
                    height: 40px;
                    margin:0 20px;
                    ul{
                        display:flex;
                        align-items:center;
                        justify-content:space-between;
                        >li{
                        font-size:30px;
                        color:orange;
                    }
                    }

                }
            }

        }

        .mini-screen{
            position:fixed;
            bottom:0;
            width:100%;
            height: 60px;
            z-index: 999;

            background-color:#666;
            display:flex;
            align-items: center;
            .mini-img{
                width:100%;
                height: 80%;
                overflow: hidden;
                padding:5px 20px;
                flex:1;
                display:flex;
                img{
                    height: 100%;
                    border-radius:50%;
                    &.rotate{
                        animation:rotate 10s linear infinite;
                    }
                }
                .song-mess{
                    margin-left: 20px;
                    >p{
                        color:#eee;
                        font-size:12px;
                    }
                    >p.song-name{
                        color:#eee;
                        margin-top:8px;
                    }
                    >p.singer-name{
                        margin-top:8px;
                        color:#ccc
                    }
                }


            }
            .play-status{
                margin-right:20px;
                font-size:24px;
                margin-top:4px;
                color:orange;
            }
            .icon-playlist{
                font-size:20px;
                margin-right: 10px;
                color:orange;

            }
        }
    }
    @keyframes rotate {
        0%{
            transform:rotate(0);
        }
        100%{
            transform:rotate(-360deg);
        }
}
</style>