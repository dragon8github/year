import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
Vue.use(Router)

// login
const Login = r => require.ensure([], () => r(require('@/pages/Login.vue')), 'Login')

// index
const Chat = r => require.ensure([], () => r(require('@/pages/Chat.vue')), 'Chat')

// 路由配置
var router = new Router({
  // 哈希模式
  mode: 'hash',
  // 路由导航
  routes: [
    // 首页 > 重定向 > 工作室
    { path: '/', redirect: '/Login' },
    // 登录页
    { path: '/Login', name: 'Login', meta: { title: '欢迎参加年会' }, component: Login },
    // 聊天室
    { path: '/Chat', name: 'Chat', meta: { title: '创慧&纳海川年会' }, component: Chat },
  ]
})


// 解决微信、QQ、闪银等内置浏览器单页应用无法刷新title的问题
var setTitle = title => {
    var i = document.createElement('iframe');
    i.src = 'https://www.baidu.com/favicon.ico';
    i.style.display = 'none';
    i.onload = function() {
        setTimeout(function(){
            i.remove();
        }, 9)
    }
    document.title = title;
    document.body.appendChild(i);
}


// 全局路由钩子
router.afterEach((to, from) => {

})

router.beforeEach((to, from, next) => {
    // 设置标题
    setTitle(to.meta.title)
  
    // 放行页面
    next()
})

export default router