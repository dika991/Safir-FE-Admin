<template>
  <div>
    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        thead-classes="thead-light"
        tbody-classes="list"
        :data="transactions.data"
      >
        <template v-slot:columns>
          <th>Kode Pemesanan</th>
          <th>Nama Pemesan</th>
          <th>Keterangan</th>
          <th>Status</th>
          <th>Nominal</th>
          <th>Verifikasi</th>
        </template>

        <template v-slot:default="row">
          <td class="">
            {{ row.item.pemesanan.code }}
          </td>
          <td class="">
            {{ row.item.pemesanan.nama }}
          </td>
          <td class="">
            {{ row.item.deskripsi }}
          </td>
          <td class="">
            <badge type="warning" size="sm" v-if="row.item.status == 1" disable
              >Pending</badge
            >
            <badge type="success" size="sm" v-if="row.item.status == 2" disable
              >Terkonfirmasi</badge
            >
          </td>
          <td class="">
            {{ row.item.nominal }}
          </td>

          <td class="text-right">
            <div
              class="btn-group btn-group-sm"
              role="group"
              aria-label="Basic example"
            >
              <button
                type="button"
                class="btn btn-secondary btn-success"
                @click="openModal(row.item.id)"
                v-if="row.item.status==1"
              >
                <i class="fas fa-check"></i>
              </button>
            </div>
          </td>
        </template>
      </base-table>
    </div>
  </div>
  <div class="card-footer d-flex">
    <div class="col-md-8">
      <p v-if="transactions.data">
        <i class="fa fa-bars"></i> {{ transactions.from }} hingga
        {{ transactions.to }} dari {{ transactions.total }} total data
      </p>
    </div>
    <div class="col-md-4">
      <div class="pull-right">
        <base-pagination
          @input="setValue"
          v-model="page"
          :value="page"
          :total="transactions.total"
          :perPage="transactions.per_page"
        ></base-pagination>
      </div>
    </div>
  </div>
  <div>
    <modal
      v-model:show="modals.openDetail"
      body-classes="p-0"
      modal-classes="modal-dialog-centered modal-md"
    >
      <card
        type="secondary"
        shadow
        header-classes="bg-white pb-5"
        body-classes="px-lg-5 py-lg-5"
        class="border-0"
      >
        <form role="form">
          <div class="">
            <label for="namaPemesan" class="form-label">Nama Pemesan</label>
            <input
              disabled
              type="text"
              class="form-control"
              id="tanggalTransaksi"
              placeholder="Tanggal Transaksi"
              v-model="transaction.pemesanan.nama"
            />
          </div>

          <div class="">
            <label for="keteranganPembayaran" class="form-label"
              >Keterangan Pembayaran</label
            >
            <input
              disabled
              type="text"
              class="form-control"
              id="keteranganPembayaran"
              placeholder="Keterangan Pembayaran"
              v-model="transaction.deskripsi"
            />
          </div>

          <div class="">
            <label for="nominalTransaksi" class="form-label"
              >Nominal Transaksi</label
            >
            <input
              disabled
              type="text"
              class="form-control"
              id="nominalTransaksi"
              placeholder="Nominal Transaksi"
              v-model="transaction.nominal"
            />
          </div>

          <div class="">
            <label for="tanggalTransaksi" class="form-label"
              >Tanggal Transaksi</label
            >
            <input
              disabled
              type="text"
              class="form-control"
              id="tanggalTransaksi"
              placeholder="Tanggal Transaksi"
              v-model="transaction.pictures.created_at"
            />
          </div>

          <div class="">
            <label for="tanggalTransaksi" class="form-label"
              >Bukti Pembayaran</label
            >
            <br />
            <a :href="transaction.pictures.url" target="_blank"
              >Lihat Bukti Pembayaran</a
            >
          </div>
        </form>
      </card>
      <template v-slot:footer>
        <base-button type="link" class="ml-auto" @click.prevent="closeModal()"
          >Close
        </base-button>
        <base-button type="success" @click.prevent="postVerifikasi()"
          >Verifikasi Pembayaran</base-button
        >
      </template>
    </modal>

    <loading
      v-model:active="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    />
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "tabel-transaksi",
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      modals: {
        openDetail: false,
      },
    };
  },
  computed: {
    ...mapState("transaksi", {
      transactions: (state) => state.transactions,
    }),
    ...mapState("transaksi", {
      transaction: (state) => state.transaction,
    }),
    page: {
      get() {
        return this.$store.state.paket.page;
      },
      set(val) {
        this.$store.commit("transaksi/SET_PAGE", val);
      },
    },
  },
  created() {
    this.getTransactions();
  },
  watch: {
    page() {
      this.getTransactions();
    },
    search() {
      this.getTransactions(this.search);
    },
  },
  methods: {
    ...mapActions("transaksi", [
      "getTransactions",
      "detailTransaction",
      "putVerifikasiTransaksi",
    ]),
    ...mapMutations("transaksi", ["CLEAR_DETAIL"]),
    setValue(val) {
      this.page = val;
    },
    openModal(id) {
      this.detailTransaction(id);
      this.modals.openDetail = true;
    },
    closeModal() {
      this.modals.openDetail = false;
      this.CLEAR_DETAIL();
    },
    postVerifikasi() {
      this.$swal({
        title: "Anda Yakin?",
        text: "Tindakan ini akan mengupdate data transaksi!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Iya, Lanjutkan!",
      }).then((result) => {
        this.isLoading = true;
        if (result.value) {
          this.putVerifikasiTransaksi()
            .then(() => {})
            .finally(() => {
              this.$swal({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Verifikasi Berhasil",
                showConfirmButton: false,
                timer: 3000,
              });
              this.isLoading = false;
              this.modals.openDetail = false;
              this.getTransactions();
            });
        }
      });
    },
  },
};
</script>
