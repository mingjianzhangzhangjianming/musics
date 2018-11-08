<template>
  <div id="ranking-detail">
    <music-list  :title="title" :bgUrl="bgUrl" :list="list" :isRanking = true ></music-list>
  </div>
</template>

<script>
import MusicList from '@/components/musiclist';
import {getRankInfo} from '@/api';
export default {
    data(){
        return {
            title : '',
            bgUrl:'',
            list:[]
        }
    },
    components:{
        MusicList
    },
    created(){
        let id = parseInt(this.$route.params.id);
        console.log(id)
        this.getRingList(id);
    },
    methods:{
        getRingList:function(id){
            getRankInfo(id).then(res => {
                console.log(res)
                this.title = res.topinfo.ListName;
                this.bgUrl = res.topinfo.pic_v12;
                this.list = this.editSongs(res.songlist)


            })
        },
        editSongs(list){
                let nSongList = [];
                for(let i = 0 ; i < list.length;i++){
                    let item={
                        //歌曲id
                        id:list[i].data.songid,
                        //mid
                        mid:list[i].data.songmid,
                        //歌曲名
                        name:list[i].data.songname,
                        //专辑名
                        album:list[i].data.albumname,
                        //歌曲时长
                        interval:list[i].data.interval,
                        //专辑封面
                        img:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${list[i].data.albummid}.jpg?max_age=2592000`,
                        //歌曲链接
                        url:`http://dl.stream.qqmusic.qq.com/C400${list[i].data.songmid}/${list[i].songid}.m4a?guid=983915916&fromtag=66`,
                        //歌手
                        singer:list[i].data.singer
                    }
                    nSongList.push(item);
                }
                return nSongList;
            }

    }
}

</script>

<style lang="less">

</style>