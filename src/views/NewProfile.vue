<template>
  <div>
    <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center">
      <!-- Mask -->
      <span class="mask bg-gradient-success opacity-8"></span>
      <!-- Header container -->
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Hello {{ name.name }}</h1>
            <p class="text-white mt-0 mb-5">This is your profile page.</p>
            <!-- <a href="#!" class="btn btn-info">Edit profile</a> -->
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-8 order-xl-1">
          <card shadow type="secondary">
            <template v-slot:header>
              <div class="bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">My account</h3>
                  </div>
                  <!-- <div class="col-4 text-right">
                    <a href="#!" class="btn btn-sm btn-primary">Settings</a>
                  </div> -->
                </div>
              </div>
            </template>

            <form>
              <h6 class="heading-small text-muted mb-4">User information</h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="nama">Nama</label>
                      <input
                        type="text"
                        class="form-control form-control-alternative"
                        id="nama"
                        placeholder="Masukkan Nama"
                        v-model="model.name"
                      />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="email"
                        >Email</label
                      >
                      <input
                        type="text"
                        class="form-control form-control-alternative"
                        id="email"
                        placeholder="Masukkan Email"
                        v-model="model.email"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6"></div>
                  <div class="col-lg-6">
                    <button
                      class="float-right btn btn-success"
                      @click.prevent="putUser()"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
                <hr class="my-4" />
                <div class="row">
                  <div class="col-lg-8">
                    <h6 class="heading-small text-muted mb-4">Info Password</h6>
                    <div class="form-group">
                      <label class="form-control-label" for="pwdOld"
                        >Password Lama</label
                      >
                      <input
                        type="password"
                        class="form-control form-control-alternative"
                        id="pwdOld"
                        placeholder="Password Lama"
                        v-model="password.old"
                      />
                    </div>

                    <div class="form-group">
                      <label class="form-control-label" for="pwdNew"
                        >Password Baru</label
                      >
                      <input
                        type="password"
                        class="form-control form-control-alternative"
                        id="pwdNew"
                        placeholder="Password Baru"
                        v-model="password.new"
                      />
                    </div>

                    <div class="form-group">
                      <label class="form-control-label" for="pwdConf"
                        >Konfirmasi Password Baru</label
                      >
                      <input
                        type="password"
                        class="form-control form-control-alternative"
                        id="pwdConf"
                        placeholder="Masukkan kembali password baru"
                        v-model="password.new_conf"
                      />
                    </div>

                    <button
                      class="btn btn-primary"
                      @click.prevent="postPassword()"
                    >
                      Ubah Password
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $axios from "../api";
export default {
  name: "new-user-profile",
  data() {
    return {
      model: {
        name: "",
        email: "",
        password: "",
      },
      password: {
        old: "",
        new: "",
        new_conf: "",
      },
    };
  },
  computed: {
    name() {
      return this.$store.getters.user;
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getuser();
    },
    getuser() {
      $axios.get(`/whoami`).then((response) => {
        this.model.name = response.data.data.name;
        this.model.email = response.data.data.email;
      });
    },
    putUser() {
      $axios.put(`/putUser`, this.model).then((response) => {
        if (response.data.meta.status) {
          this.$swal({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Data User diubah!",
            showConfirmButton: false,
            timer: 1500,
          });
          this.getuser();
        }
      });
    },
    postPassword() {
      if (this.password.old != "" && this.password.new != "") {
        if (this.password.new === this.password.new_conf) {
          $axios
            .post(`/putPassword`, this.password)
            .then((response) => {
              if (response.data.meta.status) {
                this.$swal({
                  toast: true,
                  position: "top-end",
                  icon: "success",
                  title: response.data.meta.message,
                  showConfirmButton: false,
                  timer: 1500,
                });

                this.password = {
                  old: "",
                  new: "",
                  new_conf: "",
                };
              }
            })
            .catch((error) => {
              this.$swal({
                toast: true,
                position: "top-end",
                icon: "error",
                title: error.response.data.meta.message,
                showConfirmButton: false,
                timer: 1500,
              });
            });
        } else {
          this.$swal({
            toast: true,
            position: "top-end",
            icon: "error",
            title: "Password Baru Tidak Sesuai!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        this.$swal({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Data Tidak Boleh Kosong!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  },
};
</script>
<style></style>
