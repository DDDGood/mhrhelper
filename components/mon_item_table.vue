<template>
  <div>
    <table class="interval-y-large">
      <caption class="text-bold margin text-left">{{$t('low_rank')}}</caption>
      <tbody id="hitdata_table_tbody">
        <tr class="card-text text-bold">
          <th>{{$t('item.material_name')}}</th>
          <th class="item-rate-th">{{$t('item.target_rewards')}}</th>
          <th class="item-rate-th">{{$t('item.capture_rewards')}}</th>
          <th class="item-rate-th">{{$t('item.broken_part_rewards')}}</th>
          <th class="item-rate-th">{{$t('item.carves')}}</th>
          <th class="item-rate-th">{{$t('item.dropped_materials')}}</th>
          <th class="item-rate-th">{{$t('item.items_obtained_by_palico')}}</th>
        </tr>
        <template v-for="(data,iID) in items.low_rank">
          <tr class="card-text" :key="iID">
            <td>{{GetData('items')[iID]?.name}}</td>
            <td>
              <div
                class="text-right item-rate-text"
              >{{(data.target_rewards == undefined? "--" : +data.target_rewards.rate) + " %"}}</div>
            </td>
            <td>
              <div
                class="text-right item-rate-text"
              >{{(data.capture_rewards == undefined? "--" : +data.capture_rewards.rate) + "%"}}</div>
            </td>
            <td>
              <div
                class="text-right item-rate-text"
              >{{(data.broken_part_rewards == undefined? "--" : +data.broken_part_rewards.rate) + "%"}}</div>
            </td>
            <td>
              <div
                class="text-right item-rate-text"
              >{{(data.carves == undefined? "--" : +data.carves.rate) + "%"}}</div>
            </td>
            <td>
              <div
                class="text-right item-rate-text"
              >{{(data.dropped_materials == undefined? "--" : +data.dropped_materials.rate) + "%"}}</div>
            </td>
            <td>
              <div
                class="text-right item-rate-text"
              >{{(data.items_obtained_by_palico == undefined? "--" : +data.items_obtained_by_palico.rate) + "%"}}</div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <table class="interval-y-large">
      <caption class="text-bold margin text-left">{{$t('high_rank')}}</caption>
      <tbody id="hitdata_table_tbody">
        <tr class="card-text text-bold">
          <th>{{$t('item.material_name')}}</th>
          <th class="item-rate-th">{{$t('item.target_rewards')}}</th>
          <th class="item-rate-th">{{$t('item.capture_rewards')}}</th>
          <th class="item-rate-th">{{$t('item.broken_part_rewards')}}</th>
          <th class="item-rate-th">{{$t('item.carves')}}</th>
          <th class="item-rate-th">{{$t('item.dropped_materials')}}</th>
          <th class="item-rate-th">{{$t('item.items_obtained_by_palico')}}</th>
        </tr>
        <template v-for="(data,iID) in items.high_rank">
          <tr class="card-text" :key="iID">
            <td>{{GetData('items')[iID]?.name}}</td>
            <td>
              <div
                class="text-right item-rate-text"
              >{{(data.target_rewards == undefined? "--" : +data.target_rewards.rate) + " %"}}</div>
            </td>
            <td>
              <div
                class="text-right item-rate-text"
              >{{(data.capture_rewards == undefined? "--" : +data.capture_rewards.rate) + "%"}}</div>
            </td>
            <td>
              <div
                class="text-right item-rate-text"
              >{{(data.broken_part_rewards == undefined? "--" : +data.broken_part_rewards.rate) + "%"}}</div>
            </td>
            <td>
              <div
                class="text-right item-rate-text"
              >{{(data.carves == undefined? "--" : +data.carves.rate) + "%"}}</div>
            </td>
            <td>
              <div
                class="text-right item-rate-text"
              >{{(data.dropped_materials == undefined? "--" : +data.dropped_materials.rate) + "%"}}</div>
            </td>
            <td>
              <div
                class="text-right item-rate-text"
              >{{(data.items_obtained_by_palico == undefined? "--" : +data.items_obtained_by_palico.rate) + "%"}}</div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script>
module.exports = {
  props: ["items"],
  mounted: function () {
  }
}
</script>
<style scoped>
.item-rate-th {
  width: 11%;
}
.item-rate-text {
  max-width: 32px;
  margin-left: auto;
  margin-right: auto;
}

table {
  background-color: #4b9aff;
  padding: 2px;
  border-radius: 2px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

th {
  background-color: #bdd5ff;
}
th.number {
  width: 8%;
}
td {
  text-align: center;
  background-color: #ffffff;
}
/* mobile */
@media (max-width: 1199.98px) {
}

/* desktops */
@media (min-width: 1200px) {
}
</style>
