<template>
  <div>
    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        thead-classes="thead-light"
        tbody-classes="list"
        :data="detail"
      >
        <template v-slot:columns>
          <th v-for="(h, i) in header" :key="i">{{ h }}</th>
        </template>

        <template v-slot:default="row">
          <td class="">
            {{ row.item.nama }}
          </td>
          <td class="">
            {{ row.item.jenis_kelamin }}
          </td>
          <td class="">
            {{ row.item.usia }}
          </td>

          <td class="text-center">
            <div
              class="btn-group btn-group-sm"
              role="group"
              aria-label="Basic example"
            >
              <button
                type="button"
                class="btn btn-secondary btn-success"
                @click="openModal(row.item.id)"
              >
                <i class="fas fa-search"></i>
              </button>
            </div>
          </td>
        </template>
      </base-table>
    </div>

    <!-- Modal Section -->
    <div class="row">
      <div class="col-md-4">
        <modal v-model:show="modals.detailDokumen">
          <template v-slot:header>
            <h6 class="modal-title" id="modal-title-default">
              Detail Jemaah
            </h6>
          </template>

          <form>
            <h6 class="heading-small text-muted mb-4">Detail Jemaah</h6>
            <div class="pl-lg-4">
              <div class="row mb-2">
                <div class="col-lg-6">
                  <label class="form-control-label">Nama Jemaah</label><br />
                  <span class="textGrey">{{ jemaah.nama }}</span>
                </div>
                <div class="col-lg-6">
                  <label class="form-control-label">Usia</label><br />
                  <span class="textGrey">{{ jemaah.usia }}</span>
                </div>
              </div>
              <div class="row mb-2">
                <div class="col-lg-6">
                  <label class="form-control-label">Jenis Kelamin</label><br />
                  <span class="textGrey">{{ jemaah.jenis_kelamin }}</span>
                </div>
                <!-- <div class="col-lg-6">
                  <label class="form-control-label">Email</label><br />
                  <span class="textGrey">{{ pesanan.email }}</span>
                </div> -->
              </div>
            </div>
          </form>

          <base-table
            class="table align-items-center table-flush"
            thead-classes="thead-light"
            tbody-classes="list"
            :data="jemaah.dokumen"
          >
            <template v-slot:columns>
              <th>Dokumen</th>
              <th class="text-right">Detail Dokumen</th>
            </template>

            <template v-slot:default="row">
              <td class="">
                {{ row.item.jenis }}
              </td>

              <td class="text-right">
                <a :href="row.item.url" target="_blank">
                  <base-button
                    size="sm"
                    type="primary"
                    icon="ni ni-archive-2"
                  ></base-button>
                </a>
              </td>

              <!-- <td class="text-center">
                <div
                  class="btn-group btn-group-sm"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    class="btn btn-secondary btn-success"
                    @click="openModal(row.item.id)"
                  >
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </td> -->
            </template>
          </base-table>

          <template v-slot:footer>
            <base-button
              type="link"
              class="ml-auto"
              @click="modals.detailDokumen = false"
              >Close
            </base-button>
          </template>
        </modal>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "DetailTabelJemaah",
  props: ["header", "detail"],
  data() {
    return {
      modals: {
        detailDokumen: false,
      },
    };
  },
  computed: {
    ...mapState("jemaah", {
      jemaah: (state) => state.jemaah,
    }),
  },
  methods: {
    ...mapActions("jemaah", ["getDetailJemaah"]),
    openModal(id) {
      this.modals.detailDokumen = true;
      this.getDetailJemaah(id);
    },
  },
};
</script>