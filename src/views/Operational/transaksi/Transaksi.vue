<template>
  <div class="container-fluid mt--7">
    <div class="row">
      <div class="col">
        <div class="card shadow">
          <div class="card-header bg-transparent">
            <h3 class="mb-0">Daftar Transaksi</h3>
          </div>
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-4 mb-3">
                <div class="mb-3">
                  <label for="cari-transaksi" class="form-label">Search</label>
                  <input
                    type="text"
                    class="form-control"
                    id="cari-transaksi"
                    placeholder="Cari Nominal Transaksi"
                    v-model="search"
                  />
                </div>
              </div>
            </div>
            <div class="">
              <div class="row">
                <div class="col">
                  <!-- <table-paket type="light" title="Tabel hotel"></table-paket> -->
                  <tabel-transaksi></tabel-transaksi>
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
import { mapActions } from 'vuex';
import TabelTransaksi from "./components/TabelTransaksi.vue";
export default {
  name: "Transaksi",
  components: {
    TabelTransaksi,
  },
  data(){
      return{
          search: ""
      }
  },
  watch: {
    search() {
      this.getTransactions(this.search);
    },
  },
  methods:{
    ...mapActions("transaksi", ["getTransactions"]),
  }
};
</script>
