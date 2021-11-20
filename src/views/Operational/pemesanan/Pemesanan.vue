<template>
  <div class="container-fluid mt--7">
    <div class="row">
      <div class="col">
        <div class="card shadow">
          <div class="card-header bg-transparent">
            <h3 class="mb-0">Daftar Pemesanan</h3>
          </div>
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-4 mb-3">
                <div class="mb-3">
                  <label for="cari-pemesanan" class="form-label">Search</label>
                  <input
                    type="text"
                    class="form-control"
                    id="cari-pemesanan"
                    placeholder="Cari Kode Pemesanan"
                    v-model="search"
                  />
                </div>
              </div>
            </div>
            <div class="">
              <div class="row">
                <div class="col">
                  <tabel-pemesanan></tabel-pemesanan>
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
import TabelPemesanan from "./components/TabelPemesanan.vue";
export default({
    name: "Pemesanan",
    components:{
        TabelPemesanan
    },
    data(){
        return{
            search: ""
        }
    },
    watch: {

    },
    methods:{
        
    }
});
</script>
