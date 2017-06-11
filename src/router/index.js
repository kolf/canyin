import Vue from 'vue';
import Router from 'vue-router';
import Qt from '@/components/Qt';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'qt',
      component: Qt,
    },
  ],
});
