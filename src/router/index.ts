import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Analytics from '../views/Analytics.vue'
import MainLayout from '../components/layouts/MainLayout.vue'
import OtherLayout from '../components/layouts/OtherLayout.vue'
import Profile from '../views/users/Profile.vue'
import Login from '../views/auth/Login.vue'
import { hasAccess, setPageTitle } from './utils'

/**
 * A few things to note:
 * - Every route is guarded by default except you specify the meta 'noAuth'
 * - You can prevent logged in users from accessing a page by making 'guestOnly' = true
 */

const appTitle = "Chochos Admin";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    component: OtherLayout,
    children: [
      // route will become /auth/login if we remove the '/' at the begining of each path
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/Login.vue'),
        meta: {
          title: "Sign in",
          noAuth: true,
          guestOnly: true,
        }
      },
      {
        path: '/reset-password/init',
        name: 'init-reset-password',
        component: () => import('../views/auth/InitResetPassword.vue'),
        meta: {
          title: "Request password reset",
          noAuth: true,
          guestOnly: true,
        }
      },
      {
        path: '/reset-password',
        name: 'reset-password',
        component: () => import('../views/auth/ResetPassword.vue'),
        meta: {
          title: "Reset",
          noAuth: true,
          guestOnly: true,
        }
      },
    ]
  },

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
        path: '/occupations',
        name: 'Occupations',
        component: () => import('../views/jobs/Occupations.vue'),
        meta: {
          title: `Occupations`,
        }
      },
      {
        path: '/occupations/:id',
        name: 'occupation-details',
        component: () => import('../components/job/OccupationCard.vue'),
        meta: {
          title: `Occupation Details`,
        }
      },
      {
        path: '/occupations/:id/artisans',
        name: 'occupation-artisans',
        component: () => import('../components/job/OccupationUserCard.vue'),
        meta: {
          title: `Occupation Artisans`,
        }
      },
      // {
      //   path: '/occupations/:id/artisans',
      //   name: 'occupation-artisans',
      //   component: () => import('../components/job/OccCard.vue'),
      //   meta: {
      //     title: `Occupation Artisans`,
      //   }
      // },
      {
        path: '/categories',
        name: 'Categories',
        component: () => import('../views/products/Categories.vue'),
        meta: {
          title: `Product Categories`,
        }
      },
      {
        path: '/skills',
        name: 'Skills',
        component: () => import('../views/users/Skills.vue'),
        meta: {
          title: `Skills`,
        }
      },
      {
        path: '/artisan-category',
        name: 'ArtisanCategory',
        component: () => import('../views/users/ArtisanCategories.vue'),
        meta: {
          title: `Artisans`,
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
      },
      {
        path: '/new-users',
        name: 'NewUsers',
        component: () => import('../views/users/NewUsers.vue'),
        meta: {
          title: `New Users`,
        }
      },
      {
        path: '/users-category',
        name: 'users-category',
        component: () => import('../views/users/UsersCategory.vue'),
        meta: {
          title: `All Users`,
        }
      },
      {
        path: '/customers',
        name: 'customers',
        component: () => import('../views/users/Customers.vue'),
        meta: {
          title: `All Customers`,
        }
      },
      {
        path: '/customers/:id',
        name: 'customer-profile',
        component: () => import('../components/users/CustomerCard.vue'),
        meta: {
          title: `Customer Profile`,
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
        path: '/artisans/:id',
        name: 'artisan-profile',
        component: () => import('../components/users/ArtisanCard.vue'),
        meta: {
          title: `Artisan Profile`,
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
        path: '/vendors/:id',
        name: 'vendor-profile',
        component: () => import('../views/users/VendorCard.vue'),
        meta: {
          title: `Vendor Profile`,
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
        path: '/admins/:id',
        name: 'edit-admin',
        component: () => import('../views/users/AdminEdit.vue'),
        meta: {
          title: `Edit Admin`,
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
    path: '/unauthorised',
    name: 'unauthorised',
    component: () => import('../views/403.vue'),
    meta: {
      noAuth: true,
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/404.vue'),
    meta: {
      noAuth: true,
    }
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

router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  to.meta.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
})


// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  const userIsLoggedOut = !window.localStorage.getItem("token");
  const routeIsGaurded = !to.meta.noAuth;
  const routeIsGuestOnly = !!to.meta.guestOnly;

  setPageTitle(to, from);

  window.scrollTo(window.scrollX, 0);

  if (routeIsGaurded) {
    if (userIsLoggedOut) {
      return next({ name: "login", query: { redirect: to.path } });
    }
    // console.log(to.fullPath, hasAccess(to.meta.permit))
    // if (!hasAccess(to.meta.permit)) {
    //   return next({ name: "unauthorised", query: { page: to.path } })
    // }
 
    return next()

  } else {

    // this is so that you can't access the guestOnly except you are logged out
    if (routeIsGuestOnly && !userIsLoggedOut) {
      return next({ name: "dashboard" })
    }

    return next()

  }
});

export default router
