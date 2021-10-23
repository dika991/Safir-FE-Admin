<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Safir"
      title="Safir"
    >
      <template v-slot:links>
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'ni ni-tv-2 text-primary',
            path: '/dashboard',
          }"
        />
        <!--Heading-->
        <h6 class="navbar-heading text-muted px-4">Operational</h6>
        <sidebar-item
          :link="{
            name: 'Paket',
            icon: 'ni ni-collection text-blue',
            path: '/operasional/paket',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Transaksi',
            icon: 'ni ni-money-coins text-teal',
            path: '/operasional/transaksi',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Inventaris',
            icon: 'ni ni-archive-2 text-red',
            path: '/operasional/inventaris',
          }"
        />
        <!-- <sidebar-item
          :link="{
            name: 'Icons',
            icon: 'ni ni-planet text-blue',
            path: '/icons',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Maps',
            icon: 'ni ni-pin-3 text-orange',
            path: '/maps',
          }"
        />
        <sidebar-item
          :link="{
            name: 'User Profile',
            icon: 'ni ni-single-02 text-yellow',
            path: '/profile',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Tables',
            icon: 'ni ni-bullet-list-67 text-red',
            path: '/tables',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Login',
            icon: 'ni ni-key-25 text-info',
            path: '/login',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Register',
            icon: 'ni ni-circle-08 text-pink',
            path: '/register',
          }"
        /> -->
        <!--Heading-->
        <h6 class="navbar-heading text-muted px-4">Settings</h6>
        <sidebar-item
          :link="{
            name: 'Maskapai',
            icon: 'ni ni-send text-green',
            path: '/settings/maskapai',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Hotel',
            icon: 'ni ni-building text-primary',
            path: '/settings/hotel',
          }"
        />
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <!-- your content here -->
        <router-view></router-view>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
  },
  data() {
    return {
      sidebarBackground: "vue", //vue|blue|orange|green|red|primary
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
<style lang="scss"></style>
