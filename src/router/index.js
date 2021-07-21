import { createRouter, createWebHashHistory } from 'vue-router';
import Index from '../views/frontend/Index.vue';

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/home',
    component: Index,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/frontend/Home.vue')
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/frontend/Products.vue'),
        props: (route) => ({
          ...route.query
        })
      },
      {
        path: 'product/:id',
        name: 'Product',
        component: () => import('../views/frontend/Product.vue')
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/frontend/Cart.vue')
      },
      {
        path: 'aboutUs',
        name: 'AboutUs',
        component: () => import('../views/frontend/AboutUs.vue')
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: () => import('../views/frontend/Checkout.vue')
      },
      {
        path: 'orderCompleted',
        name: 'OrderCompleted',
        component: () => import('../views/frontend/OrderCompleted.vue')
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/frontend/Orders.vue')
      },
      {
        path: 'order/:id',
        name: 'Order',
        component: () => import('../views/frontend/Order.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/backend/Login.vue')
  },
  {
    path: '/admin',
    name: 'Backstage',
    redirect: '/admin/products',
    component: () => import('../views/backend/Backstage.vue'),
    children: [
      {
        path: 'addProduct',
        name: 'AddProduct',
        component: () => import('../views/backend/AddProduct.vue'),
        props: (route) => ({
          ...route.params
        })
      },
      {
        path: 'products',
        name: 'BackendProducts',
        component: () => import('../views/backend/Products.vue'),
        props: (route) => ({
          ...route.query
        })
      },
      {
        path: 'orders',
        name: 'BackendOrders',
        component: () => import('../views/backend/Orders.vue')
      },
      {
        path: 'order/:id',
        name: 'BackendOrder',
        component: () => import('../views/backend/Order.vue')
      },
      {
        path: 'coupon',
        name: 'Coupon',
        component: () => import('../views/backend/Coupon.vue')
      }
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFound.vue') }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth'
    };
  }
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
