import { createRouter, createWebHistory } from "vue-router";
import store from "../store.js";

import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";

import Dashboard from "../views/Dashboard.vue";
import Icons from "../views/Icons.vue";
import Maps from "../views/Maps.vue";
import NewProfile from "../views/NewProfile.vue";
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

import IndexTransaksi from "../views/Operational/transaksi/Index.vue";
import Transaksi from "../views/Operational/transaksi/Transaksi.vue";
// import DetailTransaksi from "../views/Operational/transaksi/Detail.vue";

import IndexPemesanan from "../views/Operational/pemesanan/Index.vue";
import Pemesanan from "../views/Operational/pemesanan/Pemesanan.vue";
import DetailPemesanan from "../views/Operational/pemesanan/Detail.vue";

import IndexInventaris from "../views/Operational/inventaris/Index.vue";
import Inventaris from "../views/Operational/inventaris/Inventaris.vue";

import indexAdmin from "../views/Admin/Index.vue";
import Admin from "../views/Admin/Admin.vue";

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
      {
        path: "transaksi",
        component: IndexTransaksi,
        children: [
          {
            path: "",
            name: "Transaksi",
            component: Transaksi,
            meta: {
              title: "Manajemen Transaksi",
            },
          },
          // {
          //   path: "create",
          //   name: "Tambah Paket",
          //   component: AddPaket,
          //   meta: {
          //     title: "Tambah Paket",
          //   },
          // },
          // {
          //   path: "detail/:id",
          //   name: "Detail Paket",
          //   component: DetailPaket,
          //   meta: {
          //     title: "Detail Paket",
          //   },
          // },
          // {
          //   path: "edit/:id",
          //   name: "Edit Paket",
          //   component: EditPaket,
          //   meta: {
          //     title: "Edit Paket",
          //   },
          // },
        ],
      },
      {
        path: "pemesanan",
        component: IndexPemesanan,
        children: [
          {
            path: "",
            name: "Pemesanan",
            component: Pemesanan,
            meta: {
              title: "Manajemen Pemesanan",
            },
          },
          {
            path: "detail/:id",
            name: "Detail Pemesanan",
            component: DetailPemesanan,
            meta: {
              title: "Detail Pemesanan",
            },
          },
        ],
      },
      {
        path: "inventaris",
        component: IndexInventaris,
        children: [
          {
            path: "",
            name: "Inventaris",
            component: Inventaris,
            meta: {
              title: "Manajemen Inventaris",
            },
          },
        ],
      },
      {
        path: "admin",
        component: indexAdmin,
        children: [
          {
            path: "",
            name: "Admin",
            component: Admin,
            meta: {
              title: "Manajemen User Admin",
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
      {
        path: "/settings/profile",
        name: "profile",
        components: {
          default: NewProfile,
        },
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
