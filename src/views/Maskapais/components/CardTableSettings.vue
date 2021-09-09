<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3
            class="font-semibold text-lg"
            :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']"
          >
            Tabel Daftar Maskapai
          </h3>
        </div>
        <div class="float-right">
          <button
            class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            v-on:click="toggleAddModal()"
          >
            <i class="fas fa-plus"></i> Add
          </button>
        </div>
      </div>
      <div class="flex flex-wrap items-center">
        <div
          class="relative flex w-full flex-wrap items-stretch mb-3 px-4 mt-3"
        >
          <span
            class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-1"
          >
            <i class="fas fa-search"></i>
          </span>
          <input
            type="text"
            placeholder="Type here to search"
            class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline pl-10"
            v-model="search"
          />
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Kode
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Nama
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="maskapai in maskapais.data" :key="maskapai.id">
            <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
            >
              <!--            <img-->
              <!--                :src="bootstrap"-->
              <!--                class="h-12 w-12 bg-white rounded-full border"-->
              <!--                alt="..."-->
              <!--            />-->
              <span
                class="ml-3 font-bold"
                :class="[
                  color === 'light' ? 'text-blueGray-600' : 'text-white',
                ]"
              >
                {{ maskapai.kode_maskapai }}
              </span>
            </th>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ maskapai.name }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
            >
              <router-link
                :to="{ name: 'maskapai.edit', params: { id: maskapai.id } }"
                class="text-amber-500 bg-transparent border border-solid border-amber-500 hover:bg-amber-500 hover:text-white active:bg-amber-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                <i class="fas fa-pencil-alt"></i> Edit
              </router-link>
              <button
                class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                <i class="fas fa-trash"></i> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex flex-wrap items-center mb-4">
        <div class="w-full px-4 max-w-full flex-grow flex-1">
          <p v-if="maskapais.data">
            <i class="fas fa-bars"></i>
            {{ maskapais.data.length }} item dari {{ maskapais.total }}
          </p>
        </div>
        <div class="float-right px-4">
          <div class="py-2">
            <nav class="block">
              <ul class="flex pl-0 rounded list-none flex-wrap">
                <li v-for="link in maskapais.links" :key="link">
                  <button
                    @click="page = changeLink(link.url)"
                    class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-emerald-500"
                    :class="[
                      link.active
                        ? 'text-white bg-emerald-500 hover:bg-transparent hover:text-emerald-500'
                        : 'bg-transparent text-emerald-600 hover:bg-emerald-500 hover:text-white',
                    ]"
                  >
                    {{ changePage(link.label) }}
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="showAdd"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div class="relative w-auto my-6 mx-auto max-w-sm">
        <!--content-->
        <div
          class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          <!--header-->
          <div
            class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t"
          >
            <h3 class="text-3xl font-semibold">Modal Title</h3>
            <button
              class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              v-on:click="toggleAddModal()"
            >
              <span
                class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"
              >
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <p class="my-4 text-blueGray-500 text-lg leading-relaxed">
              I always felt like I could do anything. That’s the main thing
              people are controlled by! Thoughts- their perception of
              themselves! They're slowed down by their perception of themselves.
              If you're taught you can’t do anything, you won’t do anything. I
              was taught I could do everything.
            </p>
          </div>
          <!--footer-->
          <div
            class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b"
          >
            <button
              class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              v-on:click="toggleAddModal()"
            >
              Close
            </button>
            <button
              class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              v-on:click="toggleAddModal()"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "maskapai-list",
  data() {
    return {
      search: "",
      showAdd: false,
    };
  },
  components: {},
  props: {
    color: {
      default: "light",
      validator: function (value) {
        // The value must match one of these strings
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
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
    ...mapActions("maskapai", ["getMaskapais", "removeMaskapai"]),
    toggleAddModal() {
      this.showAdd = !this.showAdd;
    },
    changePage(label) {
      if (label == "&laquo; Previous") return "<";
      else if (label == "Next &raquo;") return ">";
      else return label;
    },
    changeLink(link) {
      var captured = link != null ? /page=([^&]+)/.exec(link)[1] : "";
      var result = captured ? captured : "myDefaultValue";
      return result;
    },
    // deleteMaskapai(id){
    //
    // }
  },
};
</script>
