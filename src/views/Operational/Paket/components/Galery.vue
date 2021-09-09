<template>
  <div>
    <h3 class="heading text-muted mb-4">Galeri Foto</h3>
    <div class="pl-lg-4">
      <div class="row">
        <div class="col-lg-12">
          <button
            class="btn btn-sm btn-success float-right"
            @click="modals.addPhoto = !modals.addPhoto"
          >
            <i class="fas fa-plus"></i> Add
          </button>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-lg-3 galery" v-for="i in this.photo" :key="i.id">
          <img :src="i.link" alt="..." class="img-thumbnail image" />
          <div class="middle">
            <button
              class="btn btn-sm btn-danger mx-auto"
              @click="submitDelete(i.id)"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Create -->
    <modal
      v-model:show="modals.addPhoto"
      body-classes="p-0"
      modal-classes="modal-dialog-centered modal-lg"
    >
      <card
        type="secondary"
        shadow
        header-classes="bg-white pb-5"
        body-classes="px-lg-5 py-lg-5"
        class="border-0"
      >
        <div class="text-center text-muted mb-4">
          <h3>Formulir Upload Foto</h3>
        </div>
        <UploadImages @changed="handleImages" />

        <div class="text-center text-muted mt-4">
          <button class="btn btn-primary" @click="submitUpload()">
            Upload
          </button>
        </div>
      </card>
    </modal>
    <loading
      v-model:active="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
    />
  </div>
</template>
<style>
.middle {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}
.galery:hover .image {
  opacity: 0.3;
}

.galery:hover .middle {
  opacity: 1;
}
</style>
<script>
import $axios from "../../../../api.js";
import UploadImages from "vue-upload-drop-images";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "Galery Paket",
  components: {
    UploadImages,
    Loading,
  },
  data() {
    return {
      photo: [],
      modals: {
        addPhoto: false,
      },
      uploadFoto: [],
      isLoading: false,
      fullPage: true,
    };
  },
  created() {
    this.initialized();
  },
  methods: {
    initialized() {
      $axios.get(`/paket/${this.$route.params.id}/photo`).then((response) => {
        this.photo = response.data.data.photo;
      });
    },
    submitDelete(id) {
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
            .delete(`/paket/${this.$route.params.id}/photo/${id}`)
            .then((response) => {
              if (response.data.meta.status) {
                this.initialized();
                this.isLoading = false;
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
        }
      });
    },
    handleImages(files) {
      this.uploadFoto = files;
    },
    async submitUpload() {
      this.isLoading = true;
      await Promise.all(
        this.uploadFoto.map(async (value) => {
          let data = new FormData();
          data.append("image", value);
          await this.postUpload(data);
        })
      );
      this.$swal({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Upload Image Success",
        showConfirmButton: false,
        timer: 3000,
      });
      this.isLoading = false;
      this.initialized();
      this.uploadFoto = [];
      this.modals.addPhoto = false;
    },
    onCancel() {
      console.log("User cancelled the loader.");
    },
    postUpload(data) {
      return $axios.post(`/paket/${this.$route.params.id}/photo`, data);
    },
  },
};
</script>
