/*jslint sloppy:true, white:true */
/*global Vue */

function isNumeric(num){
  return !isNaN(num)
}

var epicSizes = {
  'S': [2, 5, 2, 8, 7],
  'M': [10, 12, 18, 9, 13],
  'L': [25, 34, 21, 31, 45]
};

var data = {
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  trainingData: {
    rows: [
      { size: 'S', values: epicSizes['S'] },
      { size: 'M', values: epicSizes['M'] },
      { size: 'L', values: epicSizes['L'] }
    ],
    columns: [{
      field: 'size',
      label: 'Size',
    }]
  },
  draggingRow: null,
  draggingRowIndex: null,
  backlog: [
    {size: 'S', count: 8},
    {size: 'M', count: 10},
    {size: 'L', count: 6}
  ],
  results: {}
};

var runs = new Array();

function select(size) {
  var values = data.trainingData.find(function(item) {
    return item.size === size;
  }).values;
  var index = Math.floor(Math.random() * values.length);
  return values[index];
}

// for (runIndex = 0; runIndex < 1000; ++runIndex) {
//   var run = { count: 0 };
//   data.backlog.forEach(function(item) {
//     for (j = 0; j < item.count; ++j) {
//       run.count += select(item.size);
//     }
//   });
//   runs.push(run);
// }
//
// runs.sort(function(a, b) {
//   return a.count - b.count;
// });
//
// data.results = [10, 25, 50, 75, 90].map(function(percentile) {
//   return { percentile: percentile, count: runs[percentile * 10].count };
// });


Vue.component('training-data', {
  props: ['rows'],
  template: `
    <table class="table">
      <thead>
        <tr>
          <th>Size</th>
          <th>Story Counts</th>
        </tr>
      </thead>
      <draggable v-model="rows" group="rows" tag="tbody">
        <tr v-for="item in rows" :key="rows.size">
          <td>{{ item.size }}</td>
          <td>
            <b-taginput
                v-model="item.values"
                v-bind:allow-duplicates="true">
            </b-taginput>
          </td>
        </tr>
      </draggable>
    </table>
  `
});

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

new Vue({
  el: '#app',
  data() {
      return data;
  },
  methods: {
    beforeAdding(tag) {
      return isNumeric(tag);
    },
    formatCurrency(value) {
      return formatter.format(value);
    },
    dragstart (payload) {
      this.draggingRow = payload.row
      this.draggingRowIndex = payload.index
      payload.event.dataTransfer.effectAllowed = 'copy'
    },
    dragover(payload) {
      payload.event.dataTransfer.dropEffect = 'copy'
      payload.event.target.closest('tr').classList.add('is-selected')
      payload.event.preventDefault()
    },
    dragleave(payload) {
      payload.event.target.closest('tr').classList.remove('is-selected')
      payload.event.preventDefault()
    },
    drop(payload) {
      payload.event.target.closest('tr').classList.remove('is-selected')
      const droppedOnRowIndex = payload.index
      this.$buefy.toast.open(`Moved ${this.draggingRow.size} from row ${this.draggingRowIndex + 1} to ${droppedOnRowIndex + 1}`)
      [this.trainingData.rows[this.draggingRowIndex], this.trainingData.rows[droppedOnRowIndex]] =
          [this.trainingData.rows[droppedOnRowIndex], this.trainingData.rows[this.draggingRowIndex]]
    }
  }
})
