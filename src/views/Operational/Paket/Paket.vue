<template>
  <div class="container-fluid mt--7">
    <div class="row">
      <div class="col">
        <div class="card shadow">
          <div class="card-header bg-transparent">
            <h3 class="mb-0">Daftar Paket</h3>
          </div>
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-4 mb-3">
                <div class="mb-3">
                  <label for="cari-hotel" class="form-label">Search</label>
                  <input
                    type="text"
                    class="form-control"
                    id="cari-paket"
                    placeholder="Cari Paket"
                    v-model="search"
                  />
                </div>
              </div>
              <div class="col-8 text-right mb-3">
                <router-link
                  :to="{ path: '/operasional/paket/create/' }"
                  type="button"
                  class="btn btn-xl btn-primary"
                >
                  <i class="fas fa-plus"></i> Add
                </router-link>
              </div>
            </div>
            <div class="">
              <div class="row">
                <div class="col">
                  <table-paket type="light" title="Tabel hotel"></table-paket>
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
import { mapActions, mapMutations, mapState } from "vuex";
import TablePaket from "./components/TablePaket.vue";
export default {
  name: "Paket",
  components: {
    TablePaket,
  },
  data() {
    return {
      modals: {
        create: false,
      },
      search: "",
    };
  },
  computed: {
    ...mapState(["errors"]),
    ...mapState("paket", {
      package: (state) => state.package,
    }),
  },
  watch: {
    search() {
      this.getPackages(this.search);
    },
  },
  methods: {
    ...mapActions("paket", ["getPackages", "editPackages"]),
    ...mapMutations("paket", ["CLEAR_FORM"]),
  },
};
</script>
