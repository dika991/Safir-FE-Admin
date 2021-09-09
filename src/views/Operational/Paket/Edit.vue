<template>
  <div class="container-fluid mt--9">
    <div class="row">
      <div class="col">
        <div class="row mb-3">
          <button class="btn btn-primary btn-sm" @click="$router.go(-1)">
            <i class="fas fa-arrow-left"></i> Back
          </button>
        </div>
        <div class="card shadow">
          <div class="card-header bg-transparent">
            <h3 class="mb-0">{{ this.$route.meta.title }}</h3>
          </div>
          <div class="card-body">
            <form-paket></form-paket>
            <div class="row">
              <div class="col-lg-8"></div>
              <div class="col-lg-4">
                <button
                  class="btn btn-success float-right text-right"
                  @click="submitPaket()"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import FormPaket from "./components/Form.vue";
export default {
  name: "Edit Paket",
  components: {
    FormPaket,
  },
  data() {
    return {
      modals: {
        create: false,
      },
    };
  },
  computed: {
    ...mapState(["errors"]),
  },
  mounted() {
    this.initialized();
  },
  methods: {
    ...mapActions("paket", ["getPackages", "editPackages", "updatePackages"]),
    ...mapMutations("paket", ["CLEAR_FORM"]),
    ...mapActions("maskapai", ["getMaskapais"]),
    ...mapActions("hotel", ["getHotel"]),
    initialized() {
      this.getHotel();
      this.getMaskapais();
      this.editPackages(this.$route.params.id);
    },
    submitPaket() {
      this.updatePackages(this.$route.params.id).then(() => {
        this.CLEAR_FORM();
        this.$router.push({ name: "Detail Paket" });
      });
    },
  },
};
</script>
