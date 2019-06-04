import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Solar from '@/components/Solar'
import Nav from '@/components/Nav'
import Content from '@/components/Content'
import Modal from '@/components/Modal'

Vue.use(Router)

export default new Router({
  routes: [ //顶级视图
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/solar/:id',
      name: 'Solar',
      component: Solar,
      children: [ //二级视图
        {path: '',
          components: {
            nav: Nav,
            content: Content
          },
          children: [ //三级视图
            {path: 'detail/:detail_id',
              component: Modal
            }
          ]
        }
      ]
    }
  ]
})
