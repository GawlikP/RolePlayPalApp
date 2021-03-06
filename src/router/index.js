import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'Register', 
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
	{
		path: '/chat/:name',
		name: 'Chat',
		component: () => import('@/views/Chat.vue'),
		props: true,
	},
  {
		path: '/forum',
		name: 'Forum',
		component: () => import('@/views/Forum.vue'),
	
  
	},
  {
    path: '/profile/:slug',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    props: true,
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('@/views/Account')
  },
  {
    path: '/games',
    name: 'Games',
    component: () => import('@/views/Games'),
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('@/views/Logout')
  },
  {
    path: '/gamepanel/:slug',
    name: 'GamePanel',
    component: () => import('@/views/GamePanel'),
    props: true,
  },
  {
    path: '/messages',
    name: 'Messages',
    component: () => import('@/views/Messages')
  },
  {
    path: '/forgot',
    name: 'ForgotPassword',
    component: () => import('@/views/ForgotPassword')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  
  if (to.name !== 'Login' && to.name !=='Register' && to.name !=='ForgotPassword' && !store.state.user.isAuthenticated) { 
      next({
        path: 'login',
        replace: true
      })
  }
  else {
  next()
  }
});

export default router
