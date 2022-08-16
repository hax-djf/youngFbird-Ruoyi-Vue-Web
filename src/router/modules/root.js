export default [
    {
        path: '/account/validate',
        meta: {requireLogin: false},
        component: () => import(/* webpackChunkName: 'root' */ '@/views/account/activation/validate'),
        hidden: true
    },
    {
        path: '/forget/password',
        meta: {requireLogin: false},
        component: () => import(/* webpackChunkName: 'root' */ '@/views/account/activation/ForgetPwd'),
        hidden: true
    },
    {
        path: '/official',
        meta: {requireLogin: false},
        component: () => import(/* webpackChunkName: 'root' */ '@/views/official/index'),
        hidden: true
    },
    {
        path: '/official/login',
        meta: {requireLogin: false},
        component: () => import(/* webpackChunkName: 'root' */ '@/views/account/login/index'),
        hidden: true
    }
]
