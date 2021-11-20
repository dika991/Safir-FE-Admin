<template>
  <div>
    <button
      class="float-right btn btn-sm btn-success mb-2"
      @click="this.modals.form = true"
    >
      <i class="fas fa-plus"></i> Tambah Inventaris
    </button>
    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        thead-classes="thead-light"
        tbody-classes="list"
        :data="inventarises.data"
      >
        <template v-slot:columns>
          <th>Nama Barang</th>
          <th>Jenis Barang</th>
          <!-- <th>Keterangan</th> -->
          <th>Deskripsi Barang</th>
          <th>Jumlah Barang</th>
          <th>Aksi</th>
        </template>

        <template v-slot:default="row">
          <td class="">
            {{ row.item.nama }}
          </td>
          <td>
            {{ row.item.jenis }}
          </td>
          <td>
            {{ row.item.catatan }}
          </td>
          <td>
            {{ row.item.jumlah }}
          </td>

          <td class="text-right">
            <div
              class="btn-group btn-group-sm"
              role="group"
              aria-label="Basic example"
            >
              <button
                type="button"
                class="btn btn-secondary btn-warning"
                @click="openEditModal(row.item.id)"
              >
                <i class="fas fa-pencil-alt"></i>
              </button>
              <button
                type="button"
                class="btn btn-secondary btn-danger"
                @click="deleteModal(row.item.id)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </td>
        </template>
      </base-table>
    </div>
  </div>
  <div class="card-footer d-flex">
    <div class="col-md-8">
      <p v-if="inventarises.data">
        <i class="fa fa-bars"></i> {{ inventarises.from }} hingga
        {{ inventarises.to }} dari {{ inventarises.total }} total data
      </p>
    </div>
    <div class="col-md-4">
      <div class="pull-right">
        <base-pagination
          @input="setValue"
          v-model="page"
          :value="page"
          :total="inventarises.total"
          :perPage="inventarises.per_page"
        ></base-pagination>
      </div>
    </div>
  </div>

  <modal
    v-model:show="modals.form"
    body-classes="p-0"
    modal-classes="modal-dialog-centered modal-sm"
  >
    <card
      type="secondary"
      shadow
      header-classes="bg-white pb-5"
      body-classes="px-lg-5 py-lg-5"
      class="border-0"
    >
      <form role="form">
        <div class="mb-3">
          <label for="inputNama" class="form-label">Nama Barang</label>
          <input
            type="text"
            class="form-control"
            id="inputNama"
            v-model="inventaris.nama"
          />
        </div>
        <div class="mb-3">
          <label for="inputJenisBarang" class="form-label">Jenis Barang</label>
          <input
            type="text"
            class="form-control"
            id="inputJenisBarang"
            v-model="inventaris.jenis"
          />
        </div>
        <div class="mb-3">
          <label for="inputDeskripsi" class="form-label"
            >Deskripsi Barang</label
          >
          <textarea
            class="form-control"
            placeholder="Deskripsi Barang"
            id="inputDeskripsi"
            v-model="inventaris.catatan"
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="inputJumlahBarang" class="form-label"
            >Jumlah Barang</label
          >
          <input
            type="number"
            class="form-control"
            id="inputJumlahBarang"
            v-model="inventaris.jumlah"
          />
        </div>
        <div class="text-center">
          <button class="my-4 btn btn-primary" @click.prevent="newInventaris()">
            Submit
          </button>
        </div>
      </form>
    </card>
  </modal>

  <modal
    v-model:show="modals.editForm"
    body-classes="p-0"
    modal-classes="modal-dialog-centered modal-sm"
  >
    <card
      type="secondary"
      shadow
      header-classes="bg-white pb-5"
      body-classes="px-lg-5 py-lg-5"
      class="border-0"
    >
      <form role="form">
        <div class="mb-3">
          <label for="inputNama" class="form-label">Nama Barang</label>
          <input
            type="text"
            class="form-control"
            id="inputNama"
            v-model="inventaris.nama"
          />
        </div>
        <div class="mb-3">
          <label for="inputJenisBarang" class="form-label">Jenis Barang</label>
          <input
            type="text"
            class="form-control"
            id="inputJenisBarang"
            v-model="inventaris.jenis"
          />
        </div>
        <div class="mb-3">
          <label for="inputDeskripsi" class="form-label"
            >Deskripsi Barang</label
          >
          <textarea
            class="form-control"
            placeholder="Deskripsi Barang"
            id="inputDeskripsi"
            v-model="inventaris.catatan"
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="inputJumlahBarang" class="form-label"
            >Jumlah Barang</label
          >
          <input
            type="number"
            class="form-control"
            id="inputJumlahBarang"
            v-model="inventaris.jumlah"
          />
        </div>
        <div class="text-center">
          <button
            class="my-4 btn btn-primary"
            @click.prevent="submitUpdate(inventaris.id)"
          >
            Submit
          </button>
        </div>
      </form>
    </card>
  </modal>
  <div>
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
import $axios from "../../../../api";

export default {
  name: "Tabel Inventaris",
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      modals: {
        form: false,
        editForm: false,
      },
      iterate: 0,
    };
  },
  computed: {
    ...mapState("inventaris", {
      inventarises: (state) => state.list_inventaris,
    }),
    ...mapState("inventaris", {
      inventaris: (state) => state.inventaris,
    }),
    page: {
      get() {
        return this.$store.state.inventaris.page;
      },
      set(val) {
        this.$store.commit("inventaris/SET_PAGE", val);
      },
    },
  },
  created() {
    this.getListInventaris();
  },
  watch: {
    page() {
      this.getListInventaris();
    },
    search() {
      this.getListInventaris(this.search);
    },
  },
  methods: {
    ...mapActions("inventaris", [
      "getListInventaris",
      "postInventaris",
      "detailInvetaris",
      "updateInventaris",
      "deleteInventaris",
    ]),
    setValue(val) {
      this.page = val;
    },
    getNumber() {
      return (this.iterate += 1);
    },
    newInventaris() {
      this.postInventaris().then((response) => {
        console.log(response);
        this.$swal({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Barang Berhasil ditambahkan!",
          showConfirmButton: false,
          timer: 3000,
        });
        this.modals.form = false;
        this.getListInventaris();
      });
    },
    openEditModal(id) {
      this.modals.editForm = true;
      this.detailInvetaris(id);
    },
    submitUpdate(id) {
      this.updateInventaris(id).then(() => {
        this.$swal({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Barang Berhasil disimpan!",
          showConfirmButton: false,
          timer: 3000,
        });
        this.modals.editForm = false;
        this.getListInventaris();
      });
    },
    deleteModal(id) {
      this.$swal({
        title: "Anda Yakin?",
        text: "Tindakan ini akan menghapus data secara permanent!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Iya, Lanjutkan!",
      }).then((result) => {
        this.isLoading = true;
        if (result.value) {
          $axios
            .delete(`/inventaris/${id}`)
            .then(() => {
              this.$swal({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Barang berhasil dihapus!",
                showConfirmButton: false,
                timer: 3000,
              });
            })
            .finally(() => {
              this.isLoading = false;
              this.getListInventaris();
            });
        }
      });
    },
  },
};
</script>
 