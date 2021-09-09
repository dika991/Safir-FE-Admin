<template>
  <div>
    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="maskapais.data"
      >
        <template v-slot:columns>
          <!-- <th>#</th> -->
          <th>Kode</th>
          <th>Nama</th>
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
            {{ row.item.kode_maskapai }}
          </td>
          <td class="budget">
            {{ row.item.name }}
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
              <a class="dropdown-item" @click="deleteMaskapai(row.item.id)"
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
        <p v-if="maskapais.data">
          <i class="fa fa-bars"></i> {{ maskapais.from }} hingga
          {{ maskapais.to }} dari {{ maskapais.total }} total data
        </p>
      </div>
      <div class="col-md-4">
        <div class="pull-right">
          <base-pagination
            @input="setValue"
            v-model="page"
            :value="page"
            :total="maskapais.total"
            :perPage="maskapais.per_page"
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
    this.getMaskapais();
  },
  watch: {
    page() {
      this.getMaskapais();
    },
    search() {
      this.getMaskapais(this.search);
    },
  },
  computed: {
    ...mapState("maskapai", {
      maskapais: (state) => state.maskapais,
    }),
    page: {
      get() {
        return this.$store.state.maskapai.page;
      },
      set(val) {
        this.$store.commit("maskapai/SET_PAGE", val);
      },
    },
  },
  methods: {
    ...mapActions("maskapai", ["getMaskapais"]),
    setValue(val) {
      this.page = val;
    },
    showEditModal(val) {
      this.$emit("editId", val);
    },
    deleteMaskapai(val) {
      this.$emit("deleteId", val);
    },
    // deleteMaskapai(id){
    //
    // }
  },
};
</script>
<style></style>
