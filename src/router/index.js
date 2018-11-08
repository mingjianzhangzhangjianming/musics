import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/view/Recommend'
import Singer from '@/view/Singer'
import Ranking from '@/view/Ranking'
import Search from '@/view/Search'
import RankingDetail from '@/view/ranking/RankingDetail.vue'
import RecommendDetail from '@/view/recommend/detail.vue'
import SingerDetail from '@/view/singer/singerDetail.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:to=>{
        return '/recommend';
      }
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend,
      children:[
        {
          path:'/recommend/:id',
          component:RecommendDetail
        }
      ]
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer,
      children:[
        {
          path:'/singer/:id',
          component:SingerDetail
        }
        ]
    },
    {
      path: '/ranking',
      name: 'Ranking',
      component: Ranking,
      children:[
        {
          path:'/ranking/:id',
          component:RankingDetail
        }
      ]
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
