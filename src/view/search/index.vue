<template>
    <div class="search">
        <scroll>
            <div class="s-box">
                <span class="s-search icon-search"></span>
                <input type="text" name="" placeholder="请输入歌曲/歌手" v-model="searchVal" @input="search">
                    <scroll class="s-result">
                    <ul>
                        <li v-for="item in searchList">
                            <span class="song">{{item.name}}</span>
                            <span class="album">{{item.album.name}}</span>
                        </li>
                    </ul>
                </scroll>
            </div>
            <div class="s-hot">
                <p>热门搜索</p>
                <div class="history" >
                    <span v-if="index<10" v-for="(item,index) in hotSongList">{{item.k}}</span>

                </div>
            </div>
        </scroll>

    </div>
</template>

<script>
import {getHotKey} from '@/api';
import {search} from '@/api';
import scroll from '@/components/scroll';
    export default {
        name:'Search',
        data (){
            return {
                searchVal:'',
                hotSongList:[],
                searchList:[]
            };
        },
        components:{
            scroll
        },
        created(){
            this.getHotKey();
        },
        methods:{
            getHotKey:function(){
                getHotKey().then(res=>{
                    // console.log(res)
                    this.hotSongList= res.data.hotkey;
                })
            },
            search:function(){
                search(this.searchVal,2,100).then(res => {
                    this.searchList = res.data.song.list;
                    console.log(res)

                })
            }
        }
    }
</script>

<style scoped lang="less">
    @import '~@/assets/less/variable.less';
    .search{
        margin-top:20px;
        position: absolute;

        .s-box{
            background-color: #333;
            border-radius: 8px;
            position:relative;
            .s-search{
                position:absolute;
                left:10px;
                top: 10px;
                font-size:20px;
            }
            input{
                width:100%;
                height: 40px;
                color:#eee;
                font-size:12px;
                text-indent: 20px;
                margin-left:40px;
                background-color: #333;
                outline: none;
                &:focus{
                    opacity: 0.5;
                    color:#eee;
                }

            }
            .s-result{
                position:absolute;
                top:100%;
                background-color:#444;
                width:100%;
                overflow: hidden;
                max-height: 200px;
                border-radius:0 0 8px 8px;
                ul{
                    li{
                    font-size:12px;
                    padding:5px 20px;
                    .song{
                        color:#eee;
                        margin-right:20px;
                    }
                    .album{
                        color:#999;
                    }
                }
                }
            }
        }
        .s-hot{
            margin:20px;
            >p{
                font-size:14px;
                color:#999;
                margin:10px;
            }
            .history{
                display:flex;
                flex-wrap:wrap;
                >span{
                    font-size:12px;
                    color:#666;
                    border-radius:4px;
                    background-color:#333;
                    padding: 4px;
                    cursor: pointer;
                    margin-right: 15px;
                    margin-bottom: 10px;
                    &:hover{
                        color:#999
                    }
                }
            }
        }
    }
</style>