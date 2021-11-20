<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <div class="row">
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Total Jemaah Aktif"
            type="gradient-red"
            :sub-title="card.jemaahAkt"
            icon="ni ni-single-02"
            class="mb-4 mb-xl-0"
          >
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Total Paket Aktif"
            type="gradient-orange"
            :sub-title="card.totalPaket"
            icon="ni ni-chart-pie-35"
            class="mb-4 mb-xl-0"
          >
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Total Pembayaran"
            type="gradient-green"
            icon="ni ni-money-coins"
            class="mb-4 mb-xl-0"
          >
            <template v-slot:footer>
              <span class="mr-2">{{reformatCurrency(card.totalTransaksi)}} </span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Belum Verifikasi"
            type="gradient-info"
            icon="ni ni-chart-bar-32"
            class="mb-4 mb-xl-0"
          >
            <template v-slot:footer>
              <span class="mr-2">{{card.tagihan}} </span>
            </template>
          </stats-card>
        </div>
      </div>
    </base-header>

    <!-- <div class="container-fluid mt--7">
      <div class="row mt-5">
        <div class="col-xl-8 mb-5 mb-xl-0">
          <tabel-belum-verifikasi></tabel-belum-verifikasi>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});
// Charts
// import { ordersChart } from "@/components/Charts/Chart";
import Chart from "chart.js";
import $axios from "../api";

// import TabelBelumVerifikasi from "./Tables/TabelBelumVerifikasi.vue";
let chart;

export default {
  // components: { TabelBelumVerifikasi },
  data() {
    return {
      card: {
        jemaahAkt: 0,
        totalPaket: 0,
        totalTransaksi: 0,
        tagihan: 0
      },
      salesChartID: "salesChart",
      ordersChartID: "ordersChart",
      bigLineChart: {
        allData: [
          [0, 20, 10, 30, 15, 40, 20, 60, 60],
          [0, 20, 5, 25, 10, 30, 15, 40, 40],
        ],
        activeIndex: 0,
      },
    };
  },
  methods: {
    initBigChart(index) {
      chart.destroy();
      chart = new Chart(
        document.getElementById(this.salesChartID).getContext("2d"),
        {
          type: "line",
          data: {
            labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
              {
                label: "Performance",
                tension: 0.4,
                borderWidth: 4,
                borderColor: "#5e72e4",
                pointRadius: 0,
                backgroundColor: "transparent",
                data: this.bigLineChart.allData[index],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            tooltips: {
              enabled: true,
              mode: "index",
              intersect: false,
            },
            scales: {
              yAxes: [
                {
                  barPercentage: 1.6,
                  gridLines: {
                    drawBorder: false,
                    color: "rgba(29,140,248,0.0)",
                    zeroLineColor: "transparent",
                  },
                  ticks: {
                    padding: 0,
                    fontColor: "#8898aa",
                    fontSize: 13,
                    fontFamily: "Open Sans",
                  },
                },
              ],
              xAxes: [
                {
                  barPercentage: 1.6,
                  gridLines: {
                    drawBorder: false,
                    color: "rgba(29,140,248,0.0)",
                    zeroLineColor: "transparent",
                  },
                  ticks: {
                    padding: 10,
                    fontColor: "#8898aa",
                    fontSize: 13,
                    fontFamily: "Open Sans",
                  },
                },
              ],
            },
            layout: {
              padding: 0,
            },
          },
        }
      );
      this.bigLineChart.activeIndex = index;
    },
    initDashboard() {
      $axios.get(`/dashboard`).then((response) => {
        console.log( this.card);
        this.card.jemaahAkt = response.data.data.jemaahAkt;
        this.card.tagihan = response.data.data.tagihan;
        this.card.totalPaket = response.data.data.totalPaket;
        this.card.totalTransaksi = response.data.data.totalTransaksi;
      });
    },
    reformatCurrency(nominal) {
      return formatter.format(nominal);
    },
  },
  mounted() {
    // chart = new Chart(
    //   document.getElementById(this.salesChartID).getContext("2d"),
    //   {
    //     type: "line",
    //     data: {
    //       labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    //       datasets: [
    //         {
    //           label: "Performance",
    //           tension: 0.4,
    //           borderWidth: 4,
    //           borderColor: "#5e72e4",
    //           pointRadius: 0,
    //           backgroundColor: "transparent",
    //           data: this.bigLineChart.allData[1],
    //         },
    //       ],
    //     },
    //     options: {
    //       responsive: true,
    //       maintainAspectRatio: false,
    //       legend: {
    //         display: false,
    //       },
    //       tooltips: {
    //         enabled: true,
    //         mode: "index",
    //         intersect: false,
    //       },
    //       scales: {
    //         yAxes: [
    //           {
    //             barPercentage: 1.6,
    //             gridLines: {
    //               drawBorder: false,
    //               color: "rgba(29,140,248,0.0)",
    //               zeroLineColor: "transparent",
    //             },
    //             ticks: {
    //               padding: 0,
    //               fontColor: "#8898aa",
    //               fontSize: 13,
    //               fontFamily: "Open Sans",
    //             },
    //           },
    //         ],
    //         xAxes: [
    //           {
    //             barPercentage: 1.6,
    //             gridLines: {
    //               drawBorder: false,
    //               color: "rgba(29,140,248,0.0)",
    //               zeroLineColor: "transparent",
    //             },
    //             ticks: {
    //               padding: 10,
    //               fontColor: "#8898aa",
    //               fontSize: 13,
    //               fontFamily: "Open Sans",
    //             },
    //           },
    //         ],
    //       },
    //       layout: {
    //         padding: 0,
    //       },
    //     },
    //   }
    // );
    // ordersChart.createChart(this.ordersChartID);
  },
  created(){
    this.initDashboard();
  }
};
</script>
<style></style>
