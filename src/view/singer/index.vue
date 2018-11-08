<template>
    <singer-list :singerList = "newList"></singer-list>
</template>

<script>
import SingerList from '@/view/singer/singer';
import {getSingerList} from '@/api';


export default{
    components:{
        SingerList
    },
    created(){
            this.getSinger();
        },
    data(){
        return {
            singerList:[],
        }
    },
    methods:{

        getSinger:function(){
            let _this = this;
            getSingerList().then(res=>{
                this.singerList = res.data.list;
            })
        }
    },
    computed:{
        newList:function(){
            /*
                list  = [
                    {title:'热门',list:[{name:"薛之谦",,imUrl:'safds']}},
                    {title:'a',list:[{name:"周杰伦"},imUrl:'safds']},

                ]

             */
            let arr = [];
            let hot = {title:'热门',list:[]}
            for(var i = 0 ; i< this.singerList.length;i++){
                if(i<10){
                    hot.list.push({name:this.singerList[i].Fsinger_name,imgUrl:this.singerList[i].Fsinger_mid,id:this.singerList[i].Fsinger_mid});
                }
            }
            let other = [];
            for(var i = 0 ; i< this.singerList.length;i++){
                var status = false;
                for(var j = 0 ; j < other.length;j++){
                    if(other[j].title == this.singerList[i].Findex ){
                        status = true;
                    }
                }
                if(!status){
                    other.push({title:this.singerList[i].Findex,list:[]});
                }
                if(!other){
                    other.push({title:`${this.singerList[i].Findex}`,list:[]})
                }
                for(var j = 0 ; j < other.length;j++){
                    if(other[j].title == this.singerList[i].Findex){
                        other[j].list.push({name:this.singerList[i].Fsinger_name,imgUrl:this.singerList[i].Fsinger_mid,id:this.singerList[i].Fsinger_mid});
                    }
                }
                other.sort((a,b)=>{
                    return parseInt(a.title.charCodeAt(0))-parseInt(b.title.charCodeAt(0));
                })

            }
            other.splice(0,1)

            arr.push(hot)
            arr = arr.concat(other);
            return arr;
        }
    }
}
</script>

<style scoped lang = "less">

</style>