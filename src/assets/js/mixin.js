/*
* @Author: name
* @Date:   2018-10-22 19:40:19
* @Last Modified by:   name
* @Last Modified time: 2018-10-22 20:15:21
*/

'use strict';
import {mapGetters} from 'vuex';

export const myMixin = {
    computed:{
        ...mapGetters(["playList"])
    },
    mounted(){
        this.watchPlayList(this.playList);
    },
    activated(){
        this.watchPlayList(this.playList);
    },
    watch:{
        playList(val){
            this.watchPlayList(val);
        }
    },
    methods:{
        watchPlayList(){
            console.log("请添加watchPlayList方法");
        }
    }
}