<template>
  <div>
    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="packages.data"
      >
        <template v-slot:columns>
          <!-- <th>#</th> -->
          <th>Kode</th>
          <th>Nama Paket</th>
          <th>Musim</th>
          <th>Tanggal</th>
          <th>Target Hotel</th>
          <th>Target Maskapai</th>
          <th></th>
        </template>

        <template v-slot:default="row">
          <td class="">
            {{ row.item.code }}
          </td>
          <td class="">
            {{ row.item.name }}
          </td>
          <td class="">
            {{ row.item.season }}
          </td>
          <td class="">
            {{ row.item.start_date }} |
            {{ row.item.end_date }}
          </td>
          <td class="">
            {{ row.item.hotel.name }}
          </td>
          <td class="">
            {{ row.item.airlines.nama }}
          </td>

          <td class="text-right">
            <div
              class="btn-group btn-group-sm"
              role="group"
              aria-label="Basic example"
            >
              <router-link
                :to="{ path: '/operasional/paket/detail/' + row.item.uid }"
                type="button"
                class="btn btn-secondary"
                @click="showDetail(row.item.id)"
              >
                <i class="fas fa-search-plus"></i>
              </router-link>
              <button
                type="button"
                class="btn btn-secondary btn-danger"
                @click="deletePackages(row.item.id)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </td>
        </template>
      </base-table>
    </div>
    <div
      class="card-footer d-flex"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="col-md-8">
        <p v-if="packages.data">
          <i class="fa fa-bars"></i> {{ packages.from }} hingga
          {{ packages.to }} dari {{ packages.total }} total data
        </p>
      </div>
      <div class="col-md-4">
        <div class="pull-right">
          <base-pagination
            @input="setValue"
            v-model="page"
            :value="page"
            :total="packages.total"
            :perPage="packages.per_page"
          ></base-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "packages-table",
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  data() {
    return {
      no: 0,
    };
  },
  created() {
    this.getPackages();
  },
  watch: {
    page() {
      this.getPackages();
    },
    search() {
      this.getPackages(this.search);
    },
  },
  computed: {
    ...mapState("paket", {
      packages: (state) => state.packages,
    }),
    page: {
      get() {
        return this.$store.state.paket.page;
      },
      set(val) {
        this.$store.commit("paket/SET_PAGE", val);
      },
    },
  },
  methods: {
    ...mapActions("paket", ["getPackages"]),
    setValue(val) {
      this.page = val;
    },
    showDetail(val) {
      this.$emit("editId", val);
    },
    deletePackages(val) {
      this.$emit("deleteId", val);
    },
    // deleteMaskapai(id){
    //
    // }
  },
};
</script>
<style></style>
