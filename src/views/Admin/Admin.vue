<template>
  <div class="container-fluid mt--7">
    <div class="row">
      <div class="col">
        <div class="card shadow">
          <div class="card-header bg-transparent">
            <h3 class="mb-0">Daftar Admin</h3>
          </div>
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-4 mb-3">
                <div class="mb-3">
                  <label for="cari-admin" class="form-label">Search</label>
                  <input
                    type="text"
                    class="form-control"
                    id="cari-pemesanan"
                    placeholder="Cari Admin"
                    v-model="search"
                  />
                </div>
              </div>
            </div>
            <div class="">
              <div class="row">
                <div class="col">
                    <table-admin></table-admin>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { mapActions } from "vuex";
import TableAdmin from "./components/TabelAdmins.vue";
export default {
  name: "Admin",
  components: {
    TableAdmin,
  },
  data() {
    return {
      search: "",
    };
  },
  watch: {
    search() {
      this.getListAdmin(this.search);
    },
  },
  computed: {
  },
  methods: {
    ...mapActions("admin", ["getListAdmin"]),
  },
};
</script>
