<template>
  <div>
    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        thead-classes="thead-light"
        tbody-classes="list"
        :data="pesanans.data"
      >
        <template v-slot:columns>
          <th>Kode Pemesanan</th>
          <th>Nama Pemesan</th>
          <!-- <th>Keterangan</th> -->
          <th>Status</th>
          <th>Total Jemaah</th>
          <th>Aksi</th>
        </template>

        <template v-slot:default="row">
          <td class="">
            {{ row.item.code }}
          </td>
          <td class="">
            {{ row.item.nama }}
          </td>
          <!-- <td class="">
            {{ row.item.deskripsi }}
          </td> -->
          <td class="">
            <badge type="danger" size="sm" v-if="row.item.status == 0" disable
              >Belum DP</badge
            >
            <badge type="warning" size="sm" v-if="row.item.status == 1" disable
              >Sudah DP</badge
            >
            <badge type="success" size="sm" v-if="row.item.status == 2" disable
              >Proses Cicilan</badge
            >
            <badge type="primary" size="sm" v-if="row.item.status == 3" disable
              >Lunas</badge
            >
          </td>
          <td class="">
            {{ countJumlahJemaah(row.item.detail) }}
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
              >
                <i class="fas fa-search"></i>
              </button>
            </div>
          </td>
        </template>
      </base-table>
    </div>
  </div>
  <div class="card-footer d-flex">
    <div class="col-md-8">
      <p v-if="pesanans.data">
        <i class="fa fa-bars"></i> {{ pesanans.from }} hingga
        {{ pesanans.to }} dari {{ pesanans.total }} total data
      </p>
    </div>
    <div class="col-md-4">
      <div class="pull-right">
        <base-pagination
          @input="setValue"
          v-model="page"
          :value="page"
          :total="pesanans.total"
          :perPage="pesanans.per_page"
        ></base-pagination>
      </div>
    </div>
  </div>
  <div>
    <!-- <modal
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

      </card>
      <template v-slot:footer>
        <base-button type="link" class="ml-auto" @click.prevent="closeModal()"
          >Close
        </base-button>
        <base-button type="success" @click.prevent="postVerifikasi()"
          >Verifikasi Pembayaran</base-button
        >
      </template>
    </modal> -->

    <loading
      v-model:active="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    />
  </div>
</template>
Î

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { mapActions, mapState } from "vuex";

export default {
  name: "Tabel Pemesanan",
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapState("pemesanan", {
      pesanans: (state) => state.pesanans,
    }),
    ...mapState("pemesanan", {
      pesanan: (state) => state.pesanan,
    }),
    page: {
      get() {
        return this.$store.state.pemesanan.page;
      },
      set(val) {
        this.$store.commit("pemesanan/SET_PAGE", val);
      },
    },
  },
  created() {
    this.getPemesanan();
  },
  methods: {
    ...mapActions("pemesanan", ["getPemesanan"]),
    countJumlahJemaah(detail) {
      var total = 0;
      detail.map((item) => {
        total = total + item.total_jemaah;
      });

      return total;
    },
    openModal(id){
        this.$router.push({path: `/operasional/pemesanan/detail/${id}`});
    }
  },
};
</script>
 