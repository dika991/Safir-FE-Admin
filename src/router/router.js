import { createRouter, createWebHistory } from "vue-router";
import store from "../store.js";

import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";

import Dashboard from "../views/Dashboard.vue";
import Icons from "../views/Icons.vue";
import Maps from "../views/Maps.vue";
import Profile from "../views/UserProfile.vue";
import Tables from "../views/Tables.vue";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

// Maskapai view
import IndexMaskapai from "../views/Maskapais/Index.vue";
import Maskapai from "../views/Maskapais/Maskapai.vue";
// Hotel view
import IndexHotel from "../views/Hotels/Index.vue";
import Hotel from "../views/Hotels/Hotel.vue";

//Operational
/**
 * Paket
 */
import IndexPaket from "../views/Operational/Paket/Index.vue";
import Paket from "../views/Operational/Paket/Paket.vue";
import DetailPaket from "../views/Operational/Paket/Layout.vue";
import AddPaket from "../views/Operational/Paket/Add.vue";
import EditPaket from "../views/Operational/Paket/Edit.vue";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        components: {
          default: Dashboard,
        },
      },
      {
        path: "/icons",
        name: "icons",
        components: {
          default: Icons,
        },
      },
      {
        path: "/maps",
        name: "maps",
        components: {
          default: Maps,
        },
      },
      {
        path: "/profile",
        name: "profile",
        components: {
          default: Profile,
        },
      },
      {
        path: "/tables",
        name: "tables",
        components: {
          default: Tables,
        },
      },
    ],
  },
  {
    path: "/operasional",
    redirect: "/operasional/paket",
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "paket",
        component: IndexPaket,
        children: [
          {
            path: "",
            name: "Paket",
            component: Paket,
            meta: {
              title: "Manajemen Paket",
            },
          },
          {
            path: "create",
            name: "Tambah Paket",
            component: AddPaket,
            meta: {
              title: "Tambah Paket",
            },
          },
          {
            path: "detail/:id",
            name: "Detail Paket",
            component: DetailPaket,
            meta: {
              title: "Detail Paket",
            },
          },
          {
            path: "edit/:id",
            name: "Edit Paket",
            component: EditPaket,
            meta: {
              title: "Edit Paket",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/settings",
    redirect: "/settings/maskapai",
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/settings/maskapai",
        component: IndexMaskapai,
        children: [
          {
            path: "",
            name: "Maskapai",
            component: Maskapai,
            meta: {
              title: "Manage Maskapai",
            },
          },
        ],
      },
      {
        path: "/settings/hotel",
        component: IndexHotel,
        children: [
          {
            path: "",
            name: "Hotel",
            component: Hotel,
            meta: {
              title: "Manage Hotel",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        components: {
          default: Login,
        },
      },
      {
        path: "/register",
        name: "register",
        components: {
          default: Register,
        },
      },
    ],
  },
];

// const router = createRouter({
//   history: createWebHashHistory(),
//   linkActiveClass: "active",
//   routes,
// });

const router = new createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    let auth = store.getters.isAuth;
    if (!auth) {
      next({
        name: "login",
      });
    }
  }
  next();
});

export default router;
