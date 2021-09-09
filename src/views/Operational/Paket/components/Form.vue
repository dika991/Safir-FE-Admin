<template>
  <div>
    <div class="row">
      <div class="col-lg-12 full-width">
        <form>
          <h6 class="heading-small text-muted mb-4">User information</h6>
          <div class="pl-lg-4">
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-control-label" for="kodePaket"
                    >Kode Paket</label
                  >
                  <input
                    type="text"
                    class="form-control form-control-alternative"
                    id="kodePaket"
                    placeholder="Masukkan Kode paket"
                    v-model="this.package.code"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-control-label" for="namaPaket"
                    >Nama Paket</label
                  >
                  <input
                    type="text"
                    class="form-control form-control-alternative"
                    id="namaPaket"
                    placeholder="Masukkan Nama paket"
                    v-model="this.package.name"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-control-label" for="musimPaket"
                    >Maskapai Pilihan</label
                  >
                  <Multiselect
                    class="form-control-alternative"
                    v-model="this.package.airlines_id"
                    placeholder="Pilih Maskapai"
                    :options="this.mapingMaskapai()"
                    :searchable="true"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-control-label" for="musimPaket"
                    >Hotel Pilihan</label
                  >
                  <Multiselect
                    class="form-control-alternative"
                    v-model="this.package.hotel_id"
                    placeholder="Ketik untuk mencari"
                    :searchable="true"
                    :options="this.mapingHotel()"
                    @change="searchingHotel(query)"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-country-label" for="pickStartDate">
                    Tanggal Berangkat
                  </label>
                  <datepicker
                    v-model="this.package.start_date"
                    placeholder="Pilih Tanggal"
                    class="form-control"
                    :startingView="'year'"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-country-label" for="pickStartDate">
                    Tanggal Kembali
                  </label>
                  <datepicker
                    v-model="this.package.end_date"
                    placeholder="Pilih Tanggal"
                    class="form-control"
                    :startingView="'year'"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-control-label" for="musimPaket"
                    >Musim</label
                  >
                  <input
                    type="text"
                    class="form-control form-control-alternative"
                    id="musimPaket"
                    placeholder="Masukkan Musim paket"
                    v-model="this.package.season"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import Multiselect from "@vueform/multiselect";
import Datepicker from "vue3-datepicker";
// import moment from "moment";

export default {
  name: "Form Paket",
  components: {
    Multiselect,
    Datepicker,
  },
  data() {
    return {};
  },
  mounted() {},
  created() {
    this.initialized();
  },
  computed: {
    ...mapState("paket", {
      package: (state) => state.package,
    }),
    ...mapState("hotel", {
      hotels: (state) => state.hotels,
      listHotels: (state) => state.listHotels,
    }),
    ...mapState("maskapai", {
      maskapais: (state) => state.maskapais,
      listMaskapai: (state) => state.listMaskapai,
    }),
  },
  watch: {
    package: function (val) {
      this.package.start_date = new Date(String(val.start_date));
      this.package.end_date = new Date(String(val.end_date));
    },
  },
  methods: {
    ...mapMutations("paket", ["CLEAR_FORM"]), //PANGGIL MUTATIONS CLEAR_FORM
    ...mapActions("maskapai", ["getListMaskapai", "getMaskapais"]),
    ...mapActions("hotel", ["getHotel", "getListHotels"]),
    initialized() {
      this.getHotel();
      this.getListMaskapai();
      this.getListHotels();
    },
    mapingMaskapai() {
      return this.listMaskapai.map((item) => {
        return {
          value: item.id,
          label: item.nama + " (" + item.kode_maskapai + ")",
        };
      });
    },
    changedDate() {
      console.log(this.package);
    },
    mapingHotel() {
      return this.listHotels.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
    },
    searchingHotel(query) {
      console.log(query);
    },
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
