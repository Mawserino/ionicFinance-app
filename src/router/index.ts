import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue';
import AuthView from "../views/AuthView.vue";
import Setting from '../views/Setting.vue';
import Calendar from '../views/Calendar.vue';
import Register from '../views/Register.vue';

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "@/firebase";

const routes = [
  {
    path: '/',
    redirect: '/auth'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthView
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
  
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
        auth,
        (user) => {
          removeListener();
          resolve(user)
        },
        reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiredAuth)) {
    if (await getCurrentUser()) {
      next()
    } else {
      next({ name: 'Auth' })
    }
  }
  else next()
})

export default router;
