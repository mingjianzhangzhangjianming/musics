/*
* @Author: name
* @Date:   2018-10-18 11:24:24
* @Last Modified by:   name
* @Last Modified time: 2018-10-22 10:30:21
*/

'use strict';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        //播放模式(顺序0，随机1，单曲2)
        mode:1,
        //记录播放列表
        playList:[],
        //记录播放器是否全屏
        fullScreen:false,
        //暂停还是播放
        playing:false,
        //当前播放的列表索引
        currentIndex:-1,
    },
    getters:{
        playList:state=>state.playList,
        fullScreen:state=>state.fullScreen,
        playing:state=>state.playing,
        currentIndex:state=>state.currentIndex,
        mode:state=>state.mode,

        //当前播放的歌曲的信息
        currentSong:(state)=>{
            return state.playList[state.currentIndex] || {} ;
        }
    },
    mutations:{

        changePlayList(state,playList){
            state.playList = playList
        },
        changeFullScreen(state,fullScreen){
            state.fullScreen = fullScreen
        },
        changePlaying(state,playing){
            state.playing = playing
        },
        changeCurrentIndex(state,currentIndex){
            state.currentIndex = currentIndex
        },
        changeMode(state,mode){
            state.mode = mode
        },
        changeMode(state,mode){
            state.mode = mode
        },
    },
    actions:{
        addPlayer({commit},{list,index}){
            commit('changePlayList',list)
            commit('changeFullScreen',true)
            commit('changePlaying',true)
            commit('changeCurrentIndex',index);
            commit('changeMode',0);

        },
        //删除一首歌
        delOne({commit,state},item){
            let index = 0;
            let playList = state.playList;
            let currentIndex = state.currentIndex;
            for(let  j = 0 ; j < playList.length;j++ ){
                if(playList[j].id == item.id){
                    index = j;
                }
            }
            if(index<currentIndex ){
                currentIndex--;
            }

            playList.splice(index,1,);
            commit('changePlayList',playList)
            commit('changePlaying',true)
            commit('changeCurrentIndex',currentIndex)
        },
        clear({commit}){
             commit('changePlayList',[])
            commit('changePlaying',false)
            commit('changeCurrentIndex',-1)
        }
    }
})