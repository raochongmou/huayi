import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
export const constantRoutes = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
        path: '/redirect/:path(.*)',
        component: () =>
            import('@/views/redirect/index')
    }]
},
{
    path: '/login',
    component: () =>
        import('@/views/login/index'),
    hidden: true
},
{
    path: '/auth-redirect',
    component: () =>
        import('@/views/login/auth-redirect'),
    hidden: true
},
{
    path: '/404',
    component: () =>
        import('@/views/error-page/404'),
    hidden: true
},
{
    path: '/401',
    component: () =>
        import('@/views/error-page/401'),
    hidden: true
},
{
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
        path: 'dashboard',
        component: () =>
            import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
    }]
},
{
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [{
        path: 'index',
        component: () =>
            import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
    }]
},
{
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [{
        path: 'index',
        component: () =>
            import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
    }]
}
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [{
    path: '/foreign-trade',
    component: Layout,
    redirect: '/foreign-trade/page',
    alwaysShow: true,
    name: '外贸服务',
    meta: {
        title: '外贸服务',
        icon: 'lock'
    },
    children: [{
        path: 'online-order',
        name: 'online-order',
        meta: {
            title: '在线下单'
        },
        component: () =>
            import('@/views/foreign-trade/online-order')
    }, {
        path: 'order-manager',
        name: 'order-manager',
        meta: {
            title: '订单管理'
        },
        component: () =>
            import('@/views/foreign-trade/order-manager')
    }
    ]
},
{
    path: '/query-count',
    component: Layout,
    redirect: '/query-count/page',
    alwaysShow: true,
    name: '查询统计',
    meta: {
        title: '查询统计',
        icon: 'lock'
    },
    children: [{
        path: 'shipment-info',
        name: 'shipment-info',
        meta: {
            title: '出运信息查询'
        },
        component: () =>
            import('@/views/query-count/shipment-info')
    }, {
        path: 'receive-money-info',
        name: 'receive-money-info',
        meta: {
            title: '收款信息查询'
        },
        component: () =>
            import('@/views/query-count/receive-money-info')
    }, {
        path: 'pay-money-info',
        name: 'pay-money-info',
        meta: {
            title: '付款信息查询'
        },
        component: () =>
            import('@/views/query-count/pay-money-info')
    }, {
        path: 'settlement-info',
        name: 'settlement-info',
        meta: {
            title: '结算信息查询'
        },
        component: () =>
            import('@/views/query-count/settlement-info')
    }, {
        path: 'invoice-info',
        name: 'invoice-info',
        meta: {
            title: '开票信息查询'
        },
        component: () =>
            import('@/views/query-count/invoice-info')
    }, {
        path: 'consignor-accounts',
        name: 'consignor-accounts',
        meta: {
            title: '委托方台账'
        },
        component: () =>
            import('@/views/query-count/consignor-accounts')
    }, {
        path: 'invoice-pay-info',
        name: 'invoice-pay-info',
        meta: {
            title: '开票付款查询'
        },
        component: () =>
            import('@/views/query-count/invoice-pay-info')
    }]
},
{
    path: '/domestic',
    component: Layout,
    redirect: '/domestic/page',
    alwaysShow: true,
    name: '国内业务',
    meta: {
        title: '国内业务',
        icon: 'lock'
    },
    children: [{
        path: 'purchase',
        name: 'purchase',
        meta: {
            title: '国内采购'
        },
        component: () =>
            import('@/views/domestic/purchase')
    }, {
        path: 'inlandsale',
        name: 'inlandsale',
        meta: {
            title: '国内销售'
        },
        component: () =>
            import('@/views/domestic/inlandsale')
    }]
},
{ path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router 