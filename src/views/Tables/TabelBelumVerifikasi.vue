<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Pembayaran Pending</h3>
        </div>
        <div class="col text-right">
          <a href="/operasional/pemesanan" class="btn btn-sm btn-primary">See all</a>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table thead-classes="thead-light" :data="tableData">
        <template v-slot:columns>
          <th>Nama Jemaah</th>
          <th>Paket</th>
          <th>Status</th>
          <th>Nominal</th>
        </template>

        <template v-slot:default="row">
          <th scope="row">
            {{ row.item.page }}
          </th>
          <td>
            {{ row.item.visitors }}
          </td>
          <td>
            {{ row.item.unique }}
          </td>
          <td>
            {{ row.item.bounceRate }}
          </td>
        </template>
      </base-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "tabel-belum-verifikasi",
  data() {
    return {
      tableData: [
        {
          page: "BAMBANG",
          visitors: "PKT0512",
          unique: "belum_terkonfirmasi",
          bounceRate: "Rp. 5.000.000",
        },
        {
          page: "ALI LALI",
          visitors: "TRK001",
          unique: "belum_terkonfirmasi",
          bounceRate: "Rp. 10.000.000",
        },
        {
          page: "DIKA",
          visitors: "PKT0512",
          unique: "belum_terkonfirmasi",
          bounceRate: "Rp. 25.000.000",
        },
        {
          page: "DIKA",
          visitors: "PKT1234",
          unique: "belum_terkonfirmasi",
          bounceRate: "Rp. 32.000.000",
        },
        {
          page: "AJI",
          visitors: "TRK001",
          unique: "belum_terkonfirmasi",
          bounceRate: "Rp. 3.000.000",
        },
      ],
    };
  },
};
</script>
<style></style>
