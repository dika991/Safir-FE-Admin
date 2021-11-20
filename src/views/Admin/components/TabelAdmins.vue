<template>
  <div>
    <button
      class="float-right btn btn-sm btn-success mb-2"
      @click="this.modals.form = true"
    >
      <i class="fas fa-plus"></i> Tambah Admin
    </button>
    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        thead-classes="thead-light"
        tbody-classes="list"
        :data="listAdmin.data"
      >
        <template v-slot:columns>
          <th>Nama</th>
          <th>Email</th>
          <!-- <th>Keterangan</th> -->
          <th>Role</th>
          <th>Aksi</th>
        </template>

        <template v-slot:default="row">
          <td class="">
            {{ row.item.name }}
          </td>
          <td>
            {{ row.item.email }}
          </td>
          <td>
            <badge v-if="row.item.roles == 0" type="primary">Super Admin</badge>
            <badge v-else-if="row.item.roles == 1" type="info"
              >Operasional</badge
            >
            <badge v-else-if="row.item.roles == 2" type="success"
              >Inventaris</badge
            >
            <badge v-else-if="row.item.roles == 3" type="warning"
              >Keuangan</badge
            >
          </td>

          <td class="text-left">
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
      <p v-if="listAdmin.data">
        <i class="fa fa-bars"></i> {{ listAdmin.from }} hingga
        {{ listAdmin.to }} dari {{ listAdmin.total }} total data
      </p>
    </div>
    <div class="col-md-4">
      <div class="pull-right">
        <base-pagination
          @input="setValue"
          v-model="page"
          :value="page"
          :total="listAdmin.total"
          :perPage="listAdmin.per_page"
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
          <label for="inputNama" class="form-label">Nama</label>
          <input
            type="text"
            class="form-control"
            id="inputNama"
            v-model="admin.name"
          />
        </div>
        <div class="mb-3">
          <label for="inputJenisBarang" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            id="inputJenisBarang"
            v-model="admin.email"
          />
        </div>
        <div class="mb-3">
          <label for="inputDeskripsi" class="form-label">Posisi</label>
          <select
            class="form-select form-control"
            aria-label="Default select example"
            v-model="admin.roles"
          >
            <option selected>Pilih Posisi User</option>
            <option value="1">Operasional</option>
            <option value="2">Inventaris</option>
            <option value="3">Keuangan</option>
          </select>
        </div>
        <div class="text-center">
          <button class="my-4 btn btn-primary" @click.prevent="newAdmin()">
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
            v-model="admin.name"
          />
        </div>
        <div class="mb-3">
          <label for="inputJenisBarang" class="form-label">Jenis Barang</label>
          <input
            type="email"
            class="form-control"
            id="inputJenisBarang"
            v-model="admin.email"
          />
        </div>
        <div class="mb-3">
          <label for="inputDeskripsi" class="form-label">Role</label>
          <select
            class="form-select form-control"
            aria-label="Default select example"
            v-model="admin.roles"
          >
            <option selected>Pilih Posisi User</option>
            <option value="1">Operasional</option>
            <option value="2">Inventaris</option>
            <option value="3">Keuangan</option>
          </select>
        </div>
        <div class="text-center">
          <button
            class="my-4 btn btn-primary"
            @click.prevent="submitUpdate(admin.id)"
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
import $axios from "../../../api";

export default {
  name: "Tabel Admin",
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
    ...mapState("admin", {
      listAdmin: (state) => state.list_admin,
    }),
    ...mapState("admin", {
      admin: (state) => state.admin,
    }),
    page: {
      get() {
        return this.$store.state.admin.page;
      },
      set(val) {
        this.$store.commit("admin/SET_PAGE", val);
      },
    },
  },
  created() {
    this.getListAdmins();
  },
  watch: {
    page() {
      this.getListAdmins();
    },
    search() {
      this.getListAdmins(this.search);
    },
  },
  methods: {
    ...mapActions("admin", [
      "storeAdmins",
      "getListAdmins",
      "detailAdmins",
      "updateAdmins",
    ]),
    setValue(val) {
      this.page = val;
    },
    getNumber() {
      return (this.iterate += 1);
    },
    newAdmin() {
      this.isLoading = true;
      this.storeAdmins()
        .then((response) => {
          console.log(response);
        })
        .finally(() => {
          this.isLoading = false;
          this.$swal({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Berhasil diubah!",
            showConfirmButton: false,
            timer: 3000,
          });
          this.modals.form = false;
          this.getListAdmins();
        });
    },
    openEditModal(id) {
      this.modals.editForm = true;
      this.detailAdmins(id);
    },
    submitUpdate(id) {
      this.isLoading = true;
      this.updateAdmins(id)
        .then(() => {
          this.modals.editForm = false;
          this.getListAdmins();
        })
        .finally(() => {
          this.isLoading = false;
          this.$swal({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Berhasil diubah!",
            showConfirmButton: false,
            timer: 3000,
          });
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
            .delete(`/admins/${id}`)
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
              this.getListAdmins();
            });
        }
      });
    },
  },
};
</script>
 