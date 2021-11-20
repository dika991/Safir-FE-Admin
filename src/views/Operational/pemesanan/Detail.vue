<template>
  <div class="col-lg-12">
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
                  :value="presentaseTransaksi(pesanan.transaksi)"
                  label="Pembayaran"
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
                <div class="col-6">
                  <h3 class="mb-0">{{ this.$route.meta.title }}</h3>
                </div>
                <div class="col-6 text-right">
                  <div class="row">
                    <div class="col">
                      <badge type="default" disabled v-if="pesanan.status == 0">
                        Belum DP
                      </badge>
                      <badge
                        type="primary"
                        disabled
                        v-else-if="pesanan.status == 1"
                      >
                        Sudah DP
                      </badge>
                      <badge
                        type="secondary"
                        disabled
                        v-else-if="pesanan.status == 2"
                      >
                        Sudah DP
                      </badge>
                      <badge
                        type="secondary"
                        disabled
                        v-else-if="pesanan.status == 3"
                      >
                        Proses Cicilan
                      </badge>
                      <badge
                        type="danger"
                        disabled
                        v-else-if="pesanan.status == 4"
                      >
                        Batal
                      </badge>
                    </div>
                    <div class="col">
                      <badge type="info"
                        >Tgl Trx : {{ formatDate(pesanan.created_at) }}</badge
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <form>
            <h6 class="heading-small text-muted mb-4">Informasi Pemesanan</h6>
            <div class="pl-lg-4">
              <div class="row mb-2">
                <div class="col-lg-6">
                  <label class="form-control-label">Kode Pemesanan </label
                  ><br />
                  <span class="textGrey">{{ pesanan.code }}</span>
                </div>
                <div class="col-lg-6">
                  <label class="form-control-label">Nama Pemesanan</label><br />
                  <span class="textGrey">{{ pesanan.nama }}</span>
                </div>
              </div>
              <div class="row mb-2">
                <div class="col-lg-6">
                  <label class="form-control-label">Nomor HP</label><br />
                  <span class="textGrey">{{ pesanan.no_hp }}</span>
                </div>
                <div class="col-lg-6">
                  <label class="form-control-label">Email</label><br />
                  <span class="textGrey">{{ pesanan.email }}</span>
                </div>
              </div>
            </div>
          </form>
        </card>
        <card class="mt-3">
          <template v-slot:header>
            <div class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-6">
                  <h3 class="mb-0">Data Jemaah</h3>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <detail-tabel-jemaah
                    :detail="pesanan.jemaah"
                    :header="headerJemaah"
                  ></detail-tabel-jemaah>
                </div>
              </div>
            </div>
          </template>
        </card>

        <card class="mt-3">
          <template v-slot:header>
            <div class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-6">
                  <h3 class="mb-0">Data Tagihan</h3>
                </div>
              </div>
              <div class="row" v-if="pesanan.tagihan">
                <div class="col-lg-12">
                  <div class="row">
                    <div class="col-lg-12">
                      <button
                        type="button"
                        class="btn btn-sm btn-success"
                        @click.prevent="openModal()"
                        v-if="
                          countTagihan(pesanan.tagihan) !=
                          pesanan.transaksi.total_harga
                        "
                      >
                        <i class="fas fa-plus"></i> Tambah Tagihan
                      </button>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      Total Tagihan :
                      {{ reformatCurrency(countTagihan(pesanan.tagihan)) }}
                    </div>
                    <div class="col-lg-6">
                      <h4>
                        Total Transaksi :
                        {{ reformatCurrency(pesanan.transaksi.total_harga) }}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <base-table
                    class="table align-items-center table-flush"
                    thead-classes="thead-light"
                    tbody-classes="list"
                    :data="pesanan.tagihan"
                  >
                    <template v-slot:columns>
                      <th>Deskripsi</th>
                      <th>Nominal</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </template>

                    <template v-slot:default="row">
                      <td class="">
                        {{ row.item.deskripsi }}
                      </td>
                      <td class="">
                        {{ reformatCurrency(row.item.nominal) }}
                      </td>
                      <td class="">
                        <badge type="danger" v-if="row.item.status == 0"
                          >Belum dibayar</badge
                        >
                        <badge type="warning" v-else-if="row.item.status == 1"
                          >Menunggu Verifikasi</badge
                        >
                        <badge type="success" v-else-if="row.item.status == 2"
                          >Lunas</badge
                        >
                      </td>

                      <td class="text-center">
                        <div
                          class="btn-group btn-group-sm"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            type="button"
                            class="btn btn-secondary btn-success"
                            @click.prevent="detailTagihan(row.item.id)"
                          >
                            <i class="fas fa-eye"></i>
                          </button>
                          <button
                            type="button"
                            class="btn btn-danger"
                            v-if="row.item.status == 0"
                            @click.prevent="deleteTagihan(row.item.id)"
                          >
                            <i class="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </template>
                  </base-table>
                </div>
              </div>
            </div>
          </template>
        </card>
      </div>
    </div>
    <modal v-model:show="modals.postTagihan">
      <template v-slot:header>
        <h6 class="modal-title" id="modal-title-default">Tambah Tagihan</h6>
      </template>
      <form class="form-floating">
        <div class="form-floating mb-3">
          <label for="floatingInput">Deskripsi Tagihan</label>
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="Tagihan Uang Muka"
            v-model="tagihan.deskripsi"
          />
        </div>

        <div class="form-floating mb-3">
          <label for="floatingNominal">Nominal</label>
          <input
            type="text"
            class="form-control"
            id="floatingNominal"
            placeholder="3.500.000"
            v-model="tagihan.nominal"
          />
        </div>
        <div class="form-floating mb-3">
          <label for="floatingLimit">Batas Pembayaran</label>
          <input
            type="date"
            class="form-control"
            id="floatingLimit"
            placeholder="3.500.000"
            v-model="tagihan.limit"
          />
        </div>
      </form>

      <template v-slot:footer>
        <base-button
          type="link"
          class="ml-auto"
          @click="modals.postTagihan = false"
          >Close
        </base-button>
        <button class="btn btn-sm btn-success" @click.stop="newTagihan()">
          Tambah Tagihan
        </button>
      </template>
    </modal>

    <modal v-model:show="modals.updateTagihan">
      <template v-slot:header>
        <h6 class="modal-title" id="modal-title-default">Update Tagihan</h6>
      </template>
      <form class="form-floating">
        <div class="form-floating mb-3">
          <label for="floatingInput">Deskripsi Tagihan</label>
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="Tagihan Uang Muka"
            v-model="tagihan.deskripsi"
            :disabled="tagihan.status > 0 ? true : false"
          />
        </div>

        <div class="form-floating mb-3">
          <label for="floatingNominal">Nominal</label>
          <input
            type="text"
            class="form-control"
            id="floatingNominal"
            placeholder="3.500.000"
            v-model="tagihan.nominal"
            :disabled="tagihan.status > 0 ? true : false"
          />
        </div>
        <div class="form-floating mb-3">
          <label for="floatingLimit">Batas Pembayaran</label>
          <input
            type="date"
            class="form-control"
            id="floatingLimit"
            placeholder="3.500.000"
            v-model="tagihan.limit_at"
            :disabled="tagihan.status > 0 ? true : false"
          />
        </div>
        <hr />
        <div class="form-floating mb-3" v-if="tagihan.pembayaran">
          <label for="floatingPaidDate">Dibayar Tanggal</label><br />
          <label for="floatingPaidDate">
            {{ formatDate(tagihan.pembayaran.created_at) }}</label
          >
        </div>
        <div
          class="form-floating mb-3"
          v-if="tagihan.pembayaran && tagihan.pictures"
        >
          <label for="floatingPaidDate">Bukti Pembayaran</label><br />
          <a :href="tagihan.pictures.url" target="_blank">{{
            tagihan.pictures.name
          }}</a>
        </div>
      </form>

      <template v-slot:footer>
        <base-button
          type="link"
          class="ml-auto"
          @click="modals.updateTagihan = false"
          >Close
        </base-button>
        <button
          class="btn btn-sm btn-success"
          @click.stop="updateTagihan()"
          v-if="tagihan.status == 0"
        >
          Simpan
        </button>
      </template>
    </modal>
  </div>
</template>
<style>
.textGrey {
  color: #adb5bd;
  font-size: 0.875rem;
}
</style>
<script>
const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

import { mapActions, mapState } from "vuex";
import Badge from "../../../components/Badge.vue";
import DetailTabelJemaah from "./components/TabelJemaah.vue";
import $axios from "../../../api.js";
import moment from "moment";
export default {
  name: "Detail Pemesanan",
  components: { Badge, DetailTabelJemaah },
  data() {
    return {
      headerJemaah: ["nama", "Jenis Kelamin", "Usia", "Aksi"],
      modals: {
        postTagihan: false,
        updateTagihan: false,
      },
      tagihan: {
        deskripsi: "",
        nominal: null,
        limit: null,
      },
    };
  },
  computed: {
    ...mapState("pemesanan", {
      pesanan: (state) => state.pesanan,
    }),
  },
  created() {
    this.detailPemesanan(this.$route.params.id);
  },
  methods: {
    ...mapActions("pemesanan", ["detailPemesanan"]),
    presentaseTransaksi(transaksi) {
      var persent = 0;
      if (transaksi) {
        persent = transaksi.sudah_dibayar / transaksi.belum_dibayar;
      }
      return Math.round(persent * 100);
    },
    openModal() {
      this.modals.postTagihan = true;
    },
    async newTagihan() {
      await this.postTagihan();
    },
    postTagihan() {
      let data = {
        deskripsi: this.tagihan.deskripsi,
        nominal: this.tagihan.nominal,
        limited_at: this.tagihan.limit,
      };
      $axios
        .post(`tagihan/${this.$route.params.id}`, data)
        .then((response) => {
          console.log(response);
        })
        .finally(() => {
          this.modals.postTagihan = false;
          this.detailPemesanan(this.$route.params.id);
          this.tagihan = {
            deskripsi: "",
            nominal: null,
            limit: null,
          };
          this.$swal({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Tagihan Berhasil ditambahkan",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    deleteTagihan(id) {
      this.$swal({
        title: "Anda Yakin?",
        text: "Tindakan ini akan menghapus data secara permanent!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Iya, Lanjutkan!",
      }).then((result) => {
        if (result.value) {
          $axios
            .delete(`tagihan/${id}`)
            .then((response) => {
              this.$swal({
                toast: true,
                position: "top-end",
                icon: "success",
                title: response.data.meta.message,
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .finally(() => {
              this.detailPemesanan(this.$route.params.id);
            });
        }
      });
    },
    detailTagihan(id) {
      $axios
        .get(`tagihan/${id}`)
        .then((response) => {
          this.tagihan = response.data.data;
        })
        .finally(() => {
          this.modals.updateTagihan = true;
        });
    },
    updateTagihan() {
      $axios
        .put(`tagihan/${this.tagihan.id}`, this.tagihan)
        .then((response) => {
          this.$swal({
            toast: true,
            position: "top-end",
            icon: "success",
            title: response.data.meta.message,
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .finally(() => {
          this.modals.updateTagihan = false;
          this.detailPemesanan(this.$route.params.id);
        });
    },
    formatDate(date) {
      return moment(date).locale("id").format("dddd, Do MMMM YYYY");
    },
    countTagihan(tagihan) {
      let total = 0;
      tagihan.map((item) => {
        total = total + item.nominal;
      });
      return total;
    },
    reformatCurrency(nominal) {
      return formatter.format(nominal);
    },
  },
};
</script>
