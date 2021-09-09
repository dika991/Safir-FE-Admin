<template>
  <div class="container-fluid mt--7">
    <div class="row">
      <div class="col">
        <div class="card shadow">
          <div class="card-header bg-transparent">
            <h3 class="mb-0">Daftar Hotel</h3>
          </div>
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-4 mb-3">
                <div class="mb-3">
                  <label for="cari-hotel" class="form-label">Search</label>
                  <input
                    type="text"
                    class="form-control"
                    id="cari-hotel"
                    placeholder="Cari Hotel"
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
                  <table-hotel
                    type="light"
                    title="Tabel hotel"
                    @editId="openEditModal"
                    @deleteId="deleteHotel"
                  ></table-hotel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL CREATE HOTEL -->
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
            <h3>Form Hotel</h3>
          </div>
          <form role="form">
            <div class="mb-3">
              <label for="nama-hotel" class="form-label">Nama Hotel</label>
              <input
                type="text"
                class="form-control"
                id="nama-hotel"
                placeholder="Nama Hotel"
                v-model="hotel.name"
              />
            </div>
            <div class="mb-3">
              <label for="lokasi-hotel" class="form-label">Lokasi</label>
              <input
                type="text"
                class="form-control"
                id="lokasi-hotel"
                placeholder="Lokasi Hotel"
                v-model="hotel.location"
              />
            </div>
            <div class="mb-3">
              <label for="alamat-hotel" class="form-label">Alamat</label>
              <textarea
                class="form-control"
                id="alamat-hotel"
                placeholder="Alamat Hotel"
                v-model="hotel.address"
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
              <label for="edit-nama-hotel" class="form-label">Nama Hotel</label>
              <input
                type="text"
                class="form-control"
                id="edit-nama-hotel"
                placeholder="Nama Hotel"
                v-model="hotel.name"
              />
            </div>
            <div class="mb-3">
              <label for="edit-lokasi-hotel" class="form-label">Lokasi</label>
              <input
                type="text"
                class="form-control"
                id="edit-lokasi-hotel"
                placeholder="Lokasi Hotel"
                v-model="hotel.location"
              />
            </div>
            <div class="mb-3">
              <label for="edit-alamat-hotel" class="form-label">Alamat</label>
              <textarea
                class="form-control"
                id="edit-alamat-hotel"
                placeholder="Alamat Hotel"
                v-model="hotel.address"
              />
            </div>
            <div class="text-center">
              <button type="button" class="btn btn-success" @click="putHotel()">
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
import TableHotel from "./components/TableHotel.vue";
export default {
  name: "Hotel",
  components: {
    TableHotel,
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
    ...mapState("hotel", {
      hotel: (state) => state.hotel,
    }),
  },
  watch: {
    search() {
      this.getHotel(this.search);
    },
  },
  methods: {
    ...mapActions("hotel", [
      "getHotel",
      "submitHotel",
      "editHotel",
      "updateHotel",
      "removeHotel",
    ]),
    ...mapMutations("hotel", ["CLEAR_FORM"]),
    submit() {
      this.submitHotel().then(() => {
        this.getHotel();
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
      this.editHotel(val);
    },
    putHotel() {
      this.updateHotel(this.hotel.id).then(() => {
        this.getHotel();
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
    deleteHotel(val) {
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
          this.removeHotel(val);
        }
      });
    },
  },
};
</script>
