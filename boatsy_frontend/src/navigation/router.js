import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterList from './routes/routes-list'

Vue.use(VueRouter)

var router = new VueRouter({
  mode:'history',
  routes: RouterList,
})

router.beforeEach((to, from, next) => {
  try {
    document.title = to.meta.title
    to.meta.metaTags.forEach((element) => {
      var link = document.createElement('meta')
      link.setAttribute(element.type, element.name)
      link.content = element.content
      document.getElementsByTagName('head')[0].appendChild(link)
    })
  } catch (error) {}

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      // Vue.swal.fire('Yetkisiz istek!', "Bu Sayfayı görüntülemek için giriş yapmanız gerekmektedir.", 'error')

      next({
        path: '/',
        params: { nextUrl: to.fullPath },
      })
      return
    } else {
      var user = JSON.parse(localStorage.getItem('profileModel') || ' {}')
      if (
        to.matched.some((record) =>
          record.meta.authorize.includes(user.userGroupId),
        )
      ) {
        next()
      } else {
        Vue.swal.fire(
          'Yetkisiz istek!',
          'Bu Sayfayı görüntülemek için giriş yapmanız gerekmektedir.',
          'error',
        )
      }
      return
    }
  } else {
    next()
    return
  }
})
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

export default router
