<template>
  <div>
    <hr class="my-4" />
    <!-- Maskapai & Hotel -->
    <h6 class="heading-small text-muted mb-4">File Brosur</h6>
    <div class="pl-lg-4">
      <div class="row mb-2">
        <div class="col-lg-8">
          <label class="form-control-label">File</label><br />
          <div class="row">
            <div class="col-lg-8" v-if="this.file">
              <button
                class="btn btn-link"
                href=""
                @click="newTab(this.file.url)"
              >
                {{ this.file.name }}
              </button>
            </div>
            <div class="col-lg-8" v-else>
              <button class="btn btn-link" href="" disabled>
                Silahkan Upload File Terlebih Dahulu
              </button>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <a
            class="btn btn-sm btn-success float-right"
            @click="modals.createFile = !modals.createFile"
          >
            <i class="fas fa-plus"></i> Add
          </a>
        </div>
      </div>
    </div>
    <!-- Modal Create -->
    <modal
      v-model:show="modals.createFile"
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
          <h3>Upload File Brosur</h3>
        </div>
        <form role="form" enctype="multipart/form-data">
          <div class="mb-3">
            <label for="formFile" class="form-label"
              >Masukkan File Brosur</label
            >
            <input
              class="form-control"
              type="file"
              id="formFile"
              accept="application/pdf"
              @change="handleInput"
            />
          </div>
          <div class="text-center">
            <button
              type="primary"
              class="my-4 btn btn-primary"
              @click.prevent="postSubmit()"
            >
              Submit
            </button>
          </div>
        </form>
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
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "File Paket",
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      file: {},
      modals: {
        createFile: false,
      },
      uploadFile: {},
    };
  },
  created() {
    this.initialized();
  },
  methods: {
    initialized() {
      $axios.get(`/paket/${this.$route.params.id}/file`).then((response) => {
        this.file = response.data.data;
      });
    },
    newTab(url) {
      window.open(url);
    },
    handleInput(event) {
      this.uploadFile = event.target.files[0];
    },
    postSubmit() {
      this.isLoading = true;
      let data = new FormData();
      data.append("file", this.uploadFile);
      $axios
        .post(`/paket/${this.$route.params.id}/file`, data)
        .then(() => {})
        .catch((error) => {
          console.log(error.response.data);
        })
        .finally(() => {
          this.isLoading = false;
          this.initialized();
          this.modals.createFile = false;
        });
    },
  },
};
</script>
