<template>
    <singer-list :title="title" :bgUrl="bgUrl" :list="list" :isLoading="isLoading"></singer-list>
</template>

<script>
    import SingerList from  '@/components/musiclist';

    import {getSingerInfo} from '@/api';
    import {getCdInfo} from '@/api';

    export default {
        components:{
            SingerList
        },
        data(){
            return {
                id: 0,
                title:'',
                bgUrl:'',
                list:[],
                isLoading:true
            }
        },
        created(){
            this.id = this.$route.params.id;
            this.getSingerList();
        },
        methods:{
            getSingerList:function(){
                // console.log(this.id)
                getSingerInfo(this.id).then(res=>{
                    // console.log(res)
                    this.title = res.data.singer_name;
                    this.bgUrl = 'https://y.gtimg.cn/music/photo_new/T001R300x300M000'+res.data.singer_mid+'.jpg?max_age=2592000';
                    this.list = this.editSongs(res.data.list);
                    // console.log(this.list)
                    this.isLoading = false;
                })
            },
           editSongs(list){
                let nSongList = [];
                for(let i = 0 ; i < list.length;i++){
                    let item={
                        //歌曲id
                        id:list[i].musicData.songid,
                        //mid
                        mid:list[i].musicData.songmid,
                        //歌曲名
                        name:list[i].musicData.songname,
                        //专辑名
                        album:list[i].musicData.albumname,
                        //歌曲时长
                        interval:list[i].musicData.interval,
                        //专辑封面
                        img:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${list[i].musicData.albummid}.jpg?max_age=2592000`,
                        //歌曲链接
                        url:`http://dl.stream.qqmusic.qq.com/C400${list[i].musicData.songmid}/${list[i].musicData.songid}.m4a?guid=983915916&fromtag=66`,
                        //歌手
                        singer:list[i].musicData.singer
                    }
                    nSongList.push(item);
                }
                return nSongList;
            }
        }

    }
</script>

<style>

</style>