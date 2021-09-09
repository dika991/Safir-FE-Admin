<template>
  <div>
    <div class="row">
      <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
        <div class="card card-profile shadow">
          <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0">
            <div class="d-flex justify-content-between">
              <div class="bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-12">
                    <h3>Informasi Lain</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body pt-0">
            <hr class="mt-0 mb-0" />
            <div class="row">
              <div class="col">
                <base-progress
                  type="primary"
                  :height="8"
                  :value="60"
                  label="Kapasitas Jemaah"
                ></base-progress>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <base-progress
                  type="warning"
                  :height="8"
                  :value="90"
                  label="Total Pembayaran"
                ></base-progress>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-8 order-xl-1">
        <card>
          <template v-slot:header>
            <div class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">{{ this.$route.meta.title }}</h3>
                </div>
                <div class="col-4 text-right">
                  <button
                    class="btn btn-success btn-sm"
                    disabled
                    v-if="this.package.status == 'process'"
                  >
                    Berjalan
                  </button>
                  <button
                    class="btn btn-danger btn-sm"
                    disabled
                    v-else-if="this.package.status == 'canceled'"
                  >
                    Dibatalkan
                  </button>
                  <button
                    class="btn btn-primary btn-sm"
                    disabled
                    v-else-if="this.package.status == 'done'"
                  >
                    Selesai
                  </button>
                  <router-link
                    :to="{
                      path: '/operasional/paket/edit/' + this.$route.params.id,
                    }"
                    type="button"
                    class="btn btn-sm btn-outline-default"
                  >
                    <i class="fas fa-edit"></i> Edit
                  </router-link>
                </div>
              </div>
            </div>
          </template>
          <form>
            <h6 class="heading-small text-muted mb-4">Informasi Paket</h6>
            <div class="pl-lg-4">
              <div class="row mb-2">
                <div class="col-lg-6">
                  <label class="form-control-label">Kode Paket </label><br />
                  <span class="textGrey">{{ this.package.code }}</span>
                </div>
                <div class="col-lg-6">
                  <label class="form-control-label">Nama Paket</label><br />
                  <span class="textGrey">{{ this.package.name }}</span>
                </div>
              </div>
              <div class="row mb-2">
                <div class="col-lg-6">
                  <label class="form-control-label">Musim</label><br />
                  <span class="textGrey">{{ this.package.season }}</span>
                </div>
                <div class="col-lg-6">
                  <label class="form-control-label">Total Hari</label><br />
                  <span class="textGrey"
                    >{{ this.package.total_days }} Hari</span
                  >
                </div>
              </div>
              <div class="row mb-2">
                <div class="col-lg-6">
                  <label class="form-control-label">Tanggal Berangkat</label
                  ><br />
                  <span class="textGrey">{{ this.package.start_date }}</span>
                </div>
                <div class="col-lg-6">
                  <label class="form-control-label">Tanggal Kembali</label
                  ><br />
                  <span class="textGrey">{{ this.package.end_date }}</span>
                </div>
              </div>
            </div>
            <hr class="my-4" />
            <!-- Maskapai & Hotel -->
            <h6 class="heading-small text-muted mb-4">
              Informasi Hotel & Maskapai
            </h6>
            <div class="pl-lg-4">
              <div class="row mb-2">
                <div class="col-lg-6">
                  <label class="form-control-label">Nama Hotel </label><br />
                  <span class="textGrey">{{ this.package.hotel.name }}</span>
                </div>
                <div class="col-lg-6">
                  <label class="form-control-label">Alamat Hotel</label><br />
                  <span class="textGrey"
                    >{{ this.package.hotel.lokasi }}.
                    {{ this.package.hotel.alamat }}</span
                  >
                </div>
              </div>
              <div class="row mb-2">
                <div class="col-lg-6">
                  <label class="form-control-label">Kode Maskapai</label><br />
                  <span class="textGrey">{{
                    this.package.airlines.kode_maskapai
                  }}</span>
                </div>
                <div class="col-lg-6">
                  <label class="form-control-label">Nama Maskapai</label><br />
                  <span class="textGrey">{{ this.package.airlines.nama }}</span>
                </div>
              </div>
            </div>
            <file></file>
          </form>
        </card>
      </div>
    </div>
  </div>
</template>
<style>
.textGrey {
  color: #adb5bd;
  font-size: 0.875rem;
}
</style>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import File from "./components/File.vue";
export default {
  name: "Paket",
  components: {
    File,
  },
  data() {
    return {
      modals: {
        create: false,
        tipePaket: false,
      },
      tableData: [
        {
          name: "Paket Tipe Mantap",
          prices: "Rp. 2500000",
          quota: "15",
        },
        {
          name: "Argon Design System",
          prices: "Rp. 3000000",
          quota: "20",
        },
      ],
    };
  },
  computed: {
    ...mapState(["errors"]),
    ...mapState("paket", {
      package: (state) => state.package,
    }),
  },
  created() {
    this.editPackages(this.$route.params.id);
  },
  methods: {
    ...mapActions("paket", ["getPackages", "editPackages"]),
    ...mapMutations("paket", ["CLEAR_FORM"]),
  },
};
</script>
