<template>
  <div class="container-fluid mt--9">
    <div class="row mb-3">
      <button class="btn btn-primary btn-sm" @click="$router.go(-1)">
        <i class="fas fa-arrow-left"></i> Back
      </button>
    </div>
    <div class="row">
      <div class="col-xl-12">
        <tabs fill class="flex-column flex-md-row mb-5">
          <card shadow type="secondary">
            <tab-pane icon="fas fa-info" title="Info">
              <detail></detail>
            </tab-pane>
            <tab-pane icon="ni ni-ungroup" title="Tipe Paket">
              <tipe-paket></tipe-paket>
            </tab-pane>
            <tab-pane icon="ni ni-image" title="Foto Paket">
              <galery></galery>
            </tab-pane>
            <!-- <tab-pane icon="ni ni-calendar-grid-58" title="Messages">
              <p class="description">
                Raw denim you probably haven't heard of them jean shorts Austin.
                Nesciunt tofu stumptown aliqua, retro synth master cleanse.
                Mustache cliche tempor, williamsburg carles vegan helvetica.
                Reprehenderit butcher retro keffiyeh dreamcatcher synth.
              </p>
            </tab-pane>
            <tab-pane icon="ni ni-calendar-grid-58" title="Messages">
              <p class="description">
                Raw denim you probably haven't heard of them jean shorts Austin.
                Nesciunt tofu stumptown aliqua, retro synth master cleanse.
                Mustache cliche tempor, williamsburg carles vegan helvetica.
                Reprehenderit butcher retro keffiyeh dreamcatcher synth.
              </p>
            </tab-pane> -->
          </card>
        </tabs>
      </div>
    </div>
  </div>
</template>
<script>
import Detail from "./Detail.vue";
import TipePaket from "./components/TipePaket.vue";
import Galery from "./components/Galery.vue";
export default {
  name: "Layout Paket",
  components: {
    Detail,
    TipePaket,
    Galery,
  },
};
</script>
