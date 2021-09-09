<template>
  <div>
    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="hotels.data"
      >
        <template v-slot:columns>
          <!-- <th>#</th> -->
          <th>Nama Hotel</th>
          <th>Lokasi</th>
          <th>Alamat</th>
          <th></th>
        </template>

        <template v-slot:default="row">
          <!-- <th scope="row">
            <div class="media align-items-center">
              <a href="#" class="avatar rounded-circle mr-3">
                <img alt="Image placeholder" :src="row.item.img" />
              </a>
              <div class="media-body">
                <span class="name mb-0 text-sm">{{ row.item.title }}</span>
              </div>
            </div>
          </th> -->
          <!-- <td>{{row}}</td> -->
          <td class="budget">
            {{ row.item.name }}
          </td>
          <td class="budget">
            {{ row.item.location }}
          </td>
          <td class="budget">
            {{ row.item.address }}
          </td>

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
              <a class="dropdown-item" @click="showEditModal(row.item.id)"
                >Edit</a
              >
              <a class="dropdown-item" @click="deleteHotel(row.item.id)"
                >Delete</a
              >
            </base-dropdown>
          </td>
        </template>
      </base-table>
    </div>

    <div
      class="card-footer d-flex"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="col-md-8">
        <p v-if="hotels.data">
          <i class="fa fa-bars"></i> {{ hotels.from }} hingga
          {{ hotels.to }} dari {{ hotels.total }} total data
        </p>
      </div>
      <div class="col-md-4">
        <div class="pull-right">
          <base-pagination
            @input="setValue"
            v-model="page"
            :value="page"
            :total="hotels.total"
            :perPage="hotels.per_page"
          ></base-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "projects-table",
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
    this.getHotel();
  },
  watch: {
    page() {
      this.getHotel();
    },
    search() {
      this.getHotel(this.search);
    },
  },
  computed: {
    ...mapState("hotel", {
      hotels: (state) => state.hotels,
    }),
    page: {
      get() {
        return this.$store.state.hotel.page;
      },
      set(val) {
        this.$store.commit("hotel/SET_PAGE", val);
      },
    },
  },
  methods: {
    ...mapActions("hotel", ["getHotel"]),
    setValue(val) {
      this.page = val;
    },
    showEditModal(val) {
      this.$emit("editId", val);
    },
    deleteHotel(val) {
      this.$emit("deleteId", val);
    },
    // deleteMaskapai(id){
    //
    // }
  },
};
</script>
<style></style>
