import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Analytics from '../views/Analytics.vue'
import MainLayout from '../components/layouts/MainLayout.vue'
import Profile from '../views/users/Profile.vue'

const appTitle = "Chochos Admin";

const routes: Array<RouteRecordRaw> = [
  { 
    path: '/',
    component: MainLayout,
    children: [

      {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        meta: {
          title: `Dashboard`,
          metaTags: [
            {
              name: 'description',
              content: 'Summary of all your stores activity.'
            },
            {
              property: 'og:description',
              content: 'Summary of all your stores activity.'
            }
          ]
        }
      },
      {
        path: '/analytics',
        name: 'analytics',
        component: Analytics,
        meta: {
          title: `Analytics`,
        }
      },
      {
        path: '/products',
        name: 'products',
        component: () => import('../views/products/ProductList.vue'),
        meta: {
          title: `All Products`,
        }
      },
      {
        path: '/products/:id',
        name: 'edit-product',
        component: () => import('../views/products/ProductEdit.vue'),
        meta: {
          title: `Edit Product`,
        }
      },
      {
        path: '/products/new',
        name: 'new-product',
        component: () => import('../views/products/ProductEdit.vue'),
        meta: {
          title: `New Products`,
        }
      },
      {
        path: '/categories',
        name: 'Categories',
        component: () => import('../views/products/Categories.vue'),
        meta: {
          title: `Categories`,
        }
      },
      {
        path: '/jobs',
        name: 'jobs',
        component: () => import('../views/jobs/Jobs.vue'),
        meta: {
          title: `All Products`,
        }
      },
      {
        path: '/job-requests',
        name: 'jobRequests',
        component: () => import('../views/jobs/JobRequests.vue'),
        meta: {
          title: `Job Requests`,
        }
      },
      {
        path: '/jobs-delivered',
        name: 'jobsDelivered',
        component: () => import('../views/jobs/JobsDelivered.vue'),
        meta: {
          title: `Jobs Delivered`,
        }
      },
      {
        path: '/orders',
        name: 'orders',
        component: () => import('../views/orders/OrderList.vue'),
        meta: {
          title: `All Orders`,
        }
      },
      {
        path: '/orders/:id',
        name: 'edit-order',
        component: () => import('../views/orders/OrderEdit.vue'),
        meta: {
          title: `Edit Order`,
        }
      },
      {
        path: '/orders/new',
        name: 'new-order',
        component: () => import('../views/orders/OrderEdit.vue'),
        meta: {
          title: `New Order`,
        }
      },/*
      {
        path: '/banners',
        name: 'banners',
        component: () => import('../views/promotions/Banners.vue'),
        meta: {
          title: `Banners`,
        }
      }, */
      {
        path: '/customers',
        name: 'customers',
        component: () => import('../views/users/Customers.vue'),
        meta: {
          title: `All Customers`,
        }
      },
      {
        path: '/artisans',
        name: 'artisans',
        component: () => import('../views/users/Artisans.vue'),
        meta: {
          title: `All Artisans`,
        }
      },
      {
        path: '/vendors',
        name: 'vendors',
        component: () => import('../views/users/Vendors.vue'),
        meta: {
          title: `All Vendors`,
        }
      },
      {
        path: '/admins',
        name: 'administrators',
        component: () => import('../views/users/AdminList.vue'),
        meta: {
          title: `Administrators`,
        }
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('../views/settings/Settings.vue'),
        meta: {
          title: 'Settings', 
        },
        children: [
          {
            alias: '/settings',
            name: "payment-method",
            path: 'payment-method',
            component: () => import('../views/settings/PaymentMethods.vue'),
          },
          {
            name: "delivery-method",
            path: 'delivery-method',
            component: () => import('../views/settings/DeliveryMethods.vue'),
          },
        ]
      },
      {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: {
          title: `Profile`,
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/404.vue')
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // eslint-disable-next-line
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: 'smooth',
      }
    }
  },
})


// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  // eslint-disable-next-line
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = `${nearestWithTitle.meta.title} | ${appTitle}`;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map((el) => {
    if (el.parentNode) { return el.parentNode.removeChild(el); }
    return el;
  });

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map((tagDef: Record<string, string>) => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
    // Add the meta tags to the document head.
    .forEach((tag: any) => document.head.appendChild(tag));

  next();
});

export default router
