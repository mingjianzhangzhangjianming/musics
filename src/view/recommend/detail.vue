<template>
    <transition name="slide">
        <music-list :title="title" :bgUrl="bgUrl" :list="list" :isLoading="isLoading"></music-list>
    </transition>
</template>

<script>
    import MusicList from '@/components/musiclist';
    import {getCdInfo} from '@/api';
    export default {
        name:'detail',
        components:{
            MusicList
        },
        data(){
            return {
                title:'歌单名称',
                bgUrl:'',
                list:[],
                isLoading:true
            }
        },
        created(){
            this.getCdInfo();
        },
        methods:{
            getCdInfo:function(){
                let _this = this;
                getCdInfo().then(res=>{
                    console.log(res)
                    _this.title = res.data.cdlist[0].dissname;
                    _this.bgUrl = res.data.cdlist[0].logo;
                    _this.list = this.editSongs(res.data.cdlist[0].songlist);
                    console.log(_this.list)
                    _this.isLoading = false;

                })
            },
            editSongs(list){
                let nSongList = [];
                for(let i = 0 ; i < list.length;i++){
                    let item={
                        //歌曲id
                        id:list[i].songid,
                        //mid
                        mid:list[i].songmid,
                        //歌曲名
                        name:list[i].songname,
                        //专辑名
                        album:list[i].albumname,
                        //歌曲时长
                        interval:list[i].interval,
                        //专辑封面
                        img:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${list[i].albummid}.jpg?max_age=2592000`,
                        //歌曲链接
                        url:`http://dl.stream.qqmusic.qq.com/C400${list[i].songmid}/${list[i].songid}.m4a?guid=983915916&fromtag=66`,
                          //`http://dl.stream.qqmusic.qq.com/C400${list[i].songmid}/${list[i].songid}.m4a?guid=983915916&fromtag=66`,

                        //歌手
                        singer:list[i].singer
                    }
                    nSongList.push(item);
                }
                return nSongList;
            }
        }
    }
</script>

<style scoped lang ="less">
    .slide-enter-active,.slide-leave-active{
        transition:all 0.3s;
    }
    .slide-enter,.slide-leave{
        transform:translate3d(100%, 0, 0);
    }
</style>