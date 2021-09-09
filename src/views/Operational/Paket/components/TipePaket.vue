<template>
  <div>
    <card>
      <template v-slot:header>
        <div class="bg-white border-0">
          <div class="row align-items-center">
            <div class="col-lg-8">
              <h6 class="heading-small text-muted mb-4">Tipe paket</h6>
            </div>
            <div class="col-lg-4">
              <button
                class="btn btn-sm btn-success float-right"
                @click="showCreateModal()"
              >
                <i class="fas fa-plus"></i> Add
              </button>
            </div>
          </div>
        </div>
      </template>
      <div class="row">
        <div class="col-md-12">
          <base-table
            class="table align-items-center table-flush"
            :class="''"
            :thead-classes="'thead-light'"
            tbody-classes="list"
            :data="this.typePackages"
          >
            <template v-slot:columns>
              <!-- <th>#</th> -->
              <th>Nama</th>
              <th>Harga</th>
              <th>Kuota</th>
              <th></th>
            </template>

            <template v-slot:default="row">
              <td class="budget">{{ row.item.name }}</td>
              <td class="budget">Rp {{ formatPrice(row.item.prices) }}</td>
              <td class="budget">{{ row.item.quota }}</td>

              <td class="text-right">
                <base-dropdown position="right">
                  <template v-slot:title>
                    <a
                      class="btn btn-sm btn-icon-only text-light"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="fas fa-ellipsis-v"></i>
                    </a>
                  </template>
                  <a
                    class="dropdown-item"
                    @click="modalDetail(row.item.id, row.item.packages_id)"
                    >Edit</a
                  >
                  <a
                    class="dropdown-item"
                    @click="modalRemoveTipe(row.item.id, row.item.packages_id)"
                    >Delete</a
                  >
                </base-dropdown>
              </td>
            </template></base-table
          >
        </div>
      </div>
    </card>
    <!-- Tipe Paket -->
    <div class="pl-lg-4"></div>
    <!-- Modal Create -->
    <modal
      v-model:show="modals.tipePaket"
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
          <h3>Formulir Tipe Paket</h3>
        </div>
        <form role="form">
          <div class="form-group">
            <label for="namePaket">Nama</label>
            <input
              type="text"
              class="form-control"
              id="namePaket"
              v-model="this.typePackage.name"
            />
          </div>
          <div class="form-group">
            <label for="hargaPaket">Harga</label>
            <input
              type="text"
              class="form-control"
              id="hargaPaket"
              v-model="this.typePackage.prices"
            />
          </div>
          <div class="form-group">
            <label for="kuotaPaket">Kuota</label>
            <input
              type="text"
              class="form-control"
              id="kuotaPaket"
              v-model="this.typePackage.quota"
            />
          </div>
          <div class="text-center">
            <button
              type="primary"
              class="my-4 btn btn-primary"
              @click.prevent="submitType()"
            >
              Submit
            </button>
          </div>
        </form>
      </card>
    </modal>

    <!-- Modal Edit -->
    <modal
      v-model:show="modals.editTipe"
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
          <h3>Update Tipe Paket</h3>
        </div>
        <form role="form">
          <div class="form-group">
            <label for="editNamePaket">Nama</label>
            <input
              type="text"
              class="form-control"
              id="editNamePaket"
              v-model="this.typePackage.name"
            />
          </div>
          <div class="form-group">
            <label for="editHargaPaket">Harga</label>
            <input
              type="text"
              class="form-control"
              id="editHargaPaket"
              v-model="this.typePackage.prices"
            />
          </div>
          <div class="form-group">
            <label for="editKuotaPaket">Kuota</label>
            <input
              type="text"
              class="form-control"
              id="editKuotaPaket"
              v-model="this.typePackage.quota"
            />
          </div>
          <div class="text-center">
            <button
              type="primary"
              class="my-4 btn btn-primary"
              @click.prevent="putType()"
            >
              Save
            </button>
          </div>
        </form>
      </card>
    </modal>

    <!-- Modal Destroy -->
    <modal
      v-model:show="modals.destroy"
      gradient="danger"
      modal-classes="modal-danger modal-dialog-centered"
    >
      <template v-slot:header>
        <h6 class="modal-title" id="modal-title-notification">
          Your attention is required
        </h6>
      </template>
      <div class="py-3 text-center">
        <i class="ni ni-bell-55 ni-3x"></i>
        <h4 class="heading mt-4">You should read this!</h4>
        <p>
          A small river named Duden flows by their place and supplies it with
          the necessary regelialia.
        </p>
      </div>

      <template v-slot:footer>
        <base-button type="white">Ok, Got it</base-button>
        <base-button
          type="link"
          text-color="white"
          class="ml-auto"
          @click="modals.modal2 = false"
        >
          Close
        </base-button>
      </template>
    </modal>
    <loading
      v-model:active="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
    />
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "Tipe Paket",
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      file: {},
      modals: {
        tipePaket: false,
        editTipe: false,
        destroyTipe: false,
      },
    };
  },
  created() {
    this.getTypeList(this.$route.params.id);
  },
  computed: {
    ...mapState("tipe", {
      typePackages: (state) => state.typePackages,
      typePackage: (state) => state.typePackage,
    }),
  },
  methods: {
    ...mapActions("tipe", [
      "getTypeList",
      "getDetailTypes",
      "postType",
      "updateType",
      "removeType",
    ]),
    ...mapMutations("tipe", ["CLEAR_FORM"]),
    modalDetail(id, package_id) {
      this.modals.editTipe = !this.modals.editTipe;
      this.getDetailTypes({ id: id, package_id: package_id });
    },
    showCreateModal() {
      this.CLEAR_FORM();
      this.modals.tipePaket = !this.modals.tipePaket;
    },
    submitType() {
      this.isLoading = true;
      this.typePackage.package_id = this.$route.params.id;
      this.postType().then(() => {
        this.getTypeList(this.$route.params.id);
        this.modals.tipePaket = false;
        this.CLEAR_FORM();
        this.isLoading = false;
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
    putType() {
      this.updateType().then(() => {
        this.getTypeList(this.$route.params.id);
        this.modals.editTipe = false;
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
    modalRemoveTipe(id, package_id) {
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
          this.isLoading = true;
          this.removeType({ id: id, package_id: package_id }).then(
            () => (this.isLoading = false)
          );
          this.$swal({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Your data has been deleted",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    },
    onCancel() {
      console.log("User cancelled the loader.");
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>
