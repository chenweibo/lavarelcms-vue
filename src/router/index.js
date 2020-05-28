import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '主页',
        icon: 'dashboard',
        noCache: true,
        affix: true
      }
    }]
  },
  {
    path: '/site',
    component: Layout,
    redirect: '/site',
    children: [{
      path: 'index',
      name: 'Site',
      component: () => import('@/views/site/index'),
      meta: {
        title: '站点管理',
        icon: 'site'
      }
    }]
  },
  {
    path: '/banner',
    component: Layout,
    redirect: '/banner',
    children: [{
      path: 'index',
      name: 'Banner',
      component: () => import('@/views/banner/index'),
      meta: {
        title: '幻灯片管理',
        icon: 'example'

      }
    }]
  },
  {
    path: '/message',
    component: Layout,
    redirect: '/message/index',
    children: [{
      path: 'index',
      name: 'Message',
      component: () => import('@/views/message/index'),
      meta: {
        title: '留言管理',
        icon: 'message'

      }
    }]
  },
  {
    path: '/menu',
    component: Layout,
    redirect: '/menu',
    children: [{
      path: 'list',
      name: 'Menu',
      component: () => import('@/views/menu/list'),
      meta: {
        title: '栏目管理',
        icon: 'tree-table'
      }
    },
    {
      path: 'create',
      name: 'CreateMenu',
      component: () => import('@/views/menu/create'),
      meta: {
        title: '创建栏目',
        noCache: true
      },
      hidden: true
    },
    {
      path: 'edit/:id',
      name: 'EditMenu',
      component: () => import('@/views/menu/edit'),
      meta: {
        title: '编辑栏目',
        noCache: true
      },
      hidden: true
    }
    ]
  },

  {
    path: '/content',
    component: Layout,
    redirect: '/content',

    children: [{
      path: 'index',
      name: 'Content',
      component: () => import('@/views/content/list'),
      meta: {
        title: '内容管理',
        icon: 'form'

      }
    },

    {
      path: 'create',
      name: 'CreateContent',
      component: () => import('@/views/content/create'),
      meta: {
        title: '创建内容',
        noCache: true
      },
      hidden: true
    },
    {
      path: 'edit/:id',
      name: 'EditContent',
      component: () => import('@/views/content/edit'),
      meta: {
        title: '编辑内容',
        noCache: true
      },
      hidden: true
    }
    ]
  },
  {
    path: '/custom',
    component: Layout,
    redirect: '/custom/index',
    children: [{
      path: 'index',
      name: 'Custom',
      component: () => import('@/views/custom/index'),
      meta: {
        title: '自定义组件',
        icon: 'list'

      }
    }]
  },

  // {
  //   path: '/file',
  //   component: Layout,
  //   redirect: '/file/index',
  //   meta: {
  //     title: '文件管理',
  //     icon: 'tab'

  //   },

  //   children: [{
  //     path: 'index',
  //     name: 'File',
  //     component: () => import('@/views/file/index'),
  //     meta: {
  //       title: '资源文件'

  //     }
  //   },
  //   {
  //     path: 'view',
  //     name: 'FileView',
  //     component: () => import('@/views/file/view'),
  //     meta: {
  //       title: '视图文件'

  //     }
  //   }

  //   ]
  // },
  {
    path: '/recycle',
    component: Layout,
    redirect: '/recycle',
    children: [{
      path: 'index',
      name: 'Recycle',
      component: () => import('@/views/recycle/index'),
      meta: {
        title: '内容回收站',
        icon: 'table'

      }
    }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
