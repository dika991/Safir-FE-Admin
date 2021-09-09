<template>
  <div class="container-fluid mt--7 col-md-8">
    <div class="row">
      <div class="col">
        <div class="card shadow">
          <div class="card-header bg-transparent">
            <h3 class="mb-0">Daftar Maskapai</h3>
          </div>
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-4 mb-3">
                <div class="mb-3">
                  <label for="cari-maskapai" class="form-label">Search</label>
                  <input
                    type="text"
                    class="form-control"
                    id="cari-maskapai"
                    placeholder="Cari Maskapai"
                    v-model="search"
                  />
                </div>
              </div>
              <div class="col-8 text-right mb-3">
                <a class="btn btn-xl btn-primary" @click="modals.create = true"
                  >Add</a
                >
              </div>
            </div>
            <div class="">
              <div class="row">
                <div class="col">
                  <table-maskapai
                    type="light"
                    title="Tabel Maskapai"
                    @editId="openEditModal"
                    @deleteId="deleteMaskapai"
                  ></table-maskapai>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL CREATE MASKAPAI -->
    <div class="col-md-4">
      <modal
        v-model:show="modals.create"
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
          <div class="text-center text-muted mb-4">
            <h3>Form Maskapai</h3>
          </div>
          <form role="form">
            <div class="mb-3">
              <label for="kode-maskapai" class="form-label"
                >Kode Maskapai</label
              >
              <input
                type="text"
                class="form-control"
                id="kode-maskapai"
                placeholder="Kode Maskapai"
                v-model="maskapai.kode"
              />
            </div>
            <div class="mb-3">
              <label for="nama-maskapai" class="form-label"
                >Nama Maskapai</label
              >
              <input
                type="text"
                class="form-control"
                id="nama-maskapai"
                placeholder="Nama Maskapai"
                v-model="maskapai.name"
              />
            </div>
            <div class="text-center">
              <button type="button" class="btn btn-success" @click="submit()">
                Submit
              </button>
            </div>
          </form>
        </card>
      </modal>
    </div>
    <!-- MODAL CREATE MASKAPAI -->
    <div class="col-md-4">
      <modal
        v-model:show="modals.edit"
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
          <div class="text-center text-muted mb-4">
            <h3>Form Maskapai</h3>
          </div>
          <form role="form">
            <div class="mb-3">
              <label for="edit-kode-maskapai" class="form-label"
                >Kode Maskapai</label
              >
              <input
                type="text"
                class="form-control"
                id="edit-kode-maskapai"
                placeholder="Kode Maskapai"
                v-model="maskapai.kode"
              />
            </div>
            <div class="mb-3">
              <label for="edit-nama-maskapai" class="form-label"
                >Nama Maskapai</label
              >
              <input
                type="text"
                class="form-control"
                id="edit-nama-maskapai"
                placeholder="Nama Maskapai"
                v-model="maskapai.name"
              />
            </div>
            <div class="text-center">
              <button
                type="button"
                class="btn btn-success"
                @click="putMaskapai()"
              >
                Save
              </button>
            </div>
          </form>
        </card>
      </modal>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import TableMaskapai from "./components/TableMaskapai.vue";
export default {
  name: "Maskapai",
  components: {
    TableMaskapai,
  },
  data() {
    return {
      modals: {
        create: false,
      },
      search: "",
    };
  },
  computed: {
    ...mapState(["errors"]),
    ...mapState("maskapai", {
      maskapai: (state) => state.maskapai,
    }),
  },
  watch: {
    search() {
      this.getMaskapais(this.search);
    },
  },
  methods: {
    ...mapActions("maskapai", [
      "getMaskapais",
      "submitMaskapai",
      "editMaskapai",
      "updateMaskapai",
      "removeMaskapai",
    ]),
    ...mapMutations("maskapai", ["CLEAR_FORM"]),
    submit() {
      this.submitMaskapai().then(() => {
        this.getMaskapais();
        this.modals.create = false;
        this.CLEAR_FORM();
        this.$swal({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Your data has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    },
    openEditModal(val) {
      this.modals.edit = true;
      this.editMaskapai(val);
    },
    putMaskapai() {
      this.updateMaskapai(this.maskapai.id).then(() => {
        this.getMaskapais();
        this.modals.edit = false;
        this.$swal({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Your data has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    },
    deleteMaskapai(val) {
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
          this.removeMaskapai(val);
        }
      });
    },
  },
};
</script>
