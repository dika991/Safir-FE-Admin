<template>
  <div class="container-fluid mt--7">
    <div class="row">
      <div class="col">
        <div class="card shadow">
          <div class="card-header bg-transparent">
            <h3 class="mb-0">Daftar Inventaris</h3>
          </div>
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-4 mb-3">
                <div class="mb-3">
                  <label for="cari-inventaris" class="form-label">Search</label>
                  <input
                    type="text"
                    class="form-control"
                    id="cari-pemesanan"
                    placeholder="Cari Inventaris"
                    v-model="search"
                  />
                </div>
              </div>
            </div>
            <div class="">
              <div class="row">
                <div class="col">
                  <tabel-inventaris></tabel-inventaris>
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
import TabelInventaris from "./components/TabelInventaris.vue";
export default {
  name: "Inventaris",
  components: {
    TabelInventaris,
  },
  data() {
    return {
      search: "",
    };
  },
  watch: {
    search() {
      this.getListInventaris(this.search);
    },
  },
  computed: {
  },
  methods: {
    ...mapActions("inventaris", ["getListInventaris"]),
  },
};
</script>
