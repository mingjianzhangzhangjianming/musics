<template>
    <div class="progress" @click="progressClick" @touchstart="precentStart" @touchmove=
    "precentMove" @touchend="precentEnd" ref = "progress">
        <div class="scroll-t">

        </div>
        <div class="is-scrolling" ref="scroll"></div>
        <div class="scroll-btn" ref="btn"></div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                touch:{
                    x1:0,
                    x2:0,
                    w:0,

                },
                //进度条是否跟随歌曲变化（用于触摸时
                    s:true
            }
        },
        props:{
            precent : {
                type:Number,
                default:0.3
            }
        },
        mounted(){
            let x = this.$refs.progress.clientWidth*this.precent | 0;

            this.changeWidth(x);
            // console.log(this.precent)

        },
        watch:{
            precent(){
                if(!this.s){
                    return
                }
                let x = this.$refs.progress.clientWidth*this.precent | 0;
                this.changeWidth(x);
            }
        },
        methods:{
            changeWidth(x){
                this.$refs.scroll.style.width =x + 'px' ;
                this.$refs.btn.style.left = x + 'px';
            },
            //点击进度条改变当前播放时间
            progressClick(ev){
                // console.log(ev)
                let w = ev.pageX - this.$refs.progress.offsetLeft;
                this.changeWidth(w);
                this.sendPrecent();
            },
            //将新的时间传给父元素
            sendPrecent(){
                let barW = this.$refs.progress.clientWidth;
                let p = (this.$refs.scroll.clientWidth / barW).toFixed(4);
                this.$emit("precentChange",p);
            },
            precentStart(ev){
                this.s = false;

                // console.log(ev)
                this.touch.x1 = ev.touches[0].pageX;
                console.log(this.touch.w)

                let w =  this.touch.x1 - this.$refs.progress.offsetLeft;
                this.changeWidth(w);

                this.touch.w = this.$refs.scroll.clientWidth;

            },
            precentMove(ev){
                this.touch.x2 = ev.touches[0].pageX;
                let offset = this.touch.x2 -this.touch.x1 +this.touch.w;
               if(offset > this.$refs.progress.clientWidth){
                    offset = this.$refs.progress.clientWidth;
               }else if(offset<0){
                    offset = 0;
               }
                this.changeWidth(offset);

            },
            precentEnd(){
                this.sendPrecent();
                this.s = true;
            }
        }

    }
</script>

<style scoped lang="less">
    .progress{
        position:relative;
        width:100%;
        .is-scrolling{
            width:100%;
            height: 4px;
            background-color: orange;
        }

        .scroll-t{
            position:absolute;
            top: 0;
            left: 0;
            width:100%;
            height: 4px;
            background-color: rgba(0,0,0,0.1);
        }
        .scroll-btn{
            position:absolute;
            left:100%;
            width:8px;
            height: 8px;
            border:4px solid #fff;
            border-radius:50%;
            transform: translate(-10px, -10px);
            background-color:orange;
        }
    }

</style>