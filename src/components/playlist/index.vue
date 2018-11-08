<template>
    <div class="play-list" v-show="isOpenList">
        <div class="head">
            <span>{{modeTxt}}</span>
            <span class="icon-clear" @click="clearAll" ></span>
        </div>
        <scroll class="lists" ref = "listContent">
        <div>
            <ul>
                <li @click="changeSong(index)" :class="{current:currentIndex==index}" v-for="(item,index) in playList">
                    <span class="song-name">{{item.name}}</span>
                    <div class="icon-dismiss" @click.stop="del(item)"></div>
                </li>
            </ul>
        </div>

        </scroll>


        <div class="close" @click="close">关闭</div>
    </div>
</template>
<script>

import {mapGetters,mapMutations,mapActions} from 'vuex';
import Scroll from '@/components/scroll';
import { MessageBox } from 'mint-ui';
import 'mint-ui/lib/style.css';
export default{
    components:{
        Scroll
    },
    props:{
        isOpenList:{
            type:Boolean,
            default:false
        }
    },
    updated(){
        console.log(this.isOpenList,1)
        this.$refs.listContent.refresh();
    },
    computed:{
        modeTxt(){
            // console.log(this.playList)
            return this.mode == 0 ? '顺序播放' :this.mode =1 ? '随机播放' : "单曲循环";
        },
        ...mapGetters(['mode','playList','currentIndex'])
    },
    methods:{
        changeSong(index){
             this.changeCurrentIndex(index);
        },
        close(){
            this.$emit('changeShow',false)
        },
        del(item){
            this.delOne(item);
        },
        clearAll(){
            MessageBox.confirm('确定执行此操作?').then(action => {
                this.clear();
                this.close();

            });

        },
        ...mapMutations(['changeCurrentIndex']),
        ...mapActions(["delOne",'clear'])

    }
}



</script>
<style lang="less">
    .play-list{
        position:fixed;
        bottom:0;
        width:100%;
        background-color:#333;
        z-index:999;
        .head{
            height: 30px;
            padding:20px 0 10px 20px;
            span{
                font-size:14px;
                color:#ccc;
            }
            .icon-clear{
                float: right;
                margin-right:20px;
            }

        }
        .lists{
            width:100%;
            padding:0 20px;
            max-height:200px;
            overflow:hidden;
            ul{

                li{
                    height: 40px;
                    .song-name{
                        color:#ccc;
                        font-size:14px;
                    }
                    .icon-dismiss{
                        float: right;
                        margin-right:40px;
                        font-size:14px;
                    }
                    &.current{
                        .song-name,.icon-dismiss{
                            color:orange;
                        }
                    }
                }
            }
        }

        .close{
            width:100%;
            height: 60px;
            line-height:60px;
            background-color:#666;
            color:#ccc;
            text-align: center;
        }
    }
</style>