/*jslint sloppy:true, white:true */
/*global Vue */

function isNumeric(num){
  return !isNaN(num)
}

var data = {
  trainingData: [
    {size: 'S', values: [2, 5, 2, 8, 7]},
    {size: 'M', values: [10, 12, 18, 9, 13]},
    {size: 'L', values: [25, 34, 21, 31, 45]}
  ],
  backlog: [
    {size: 'S', count: 8},
    {size: 'M', count: 10},
    {size: 'L', count: 6}
  ]
};

var runs = new Array();

function select(size) {
  var values = data.trainingData.find(function(item) {
    return item.size === size;
  }).values;
  var index = Math.floor(Math.random() * values.length);
  return values[index];
}

for (runIndex = 0; runIndex < 1000; ++runIndex) {
  var run = { count: 0 };
  data.backlog.forEach(function(item) {
    for (j = 0; j < item.count; ++j) {
      run.count += select(item.size);
    }
  });
  runs.push(run);
}

runs.sort(function(a, b) {
  return a.count - b.count;
});

data.results = [10, 25, 50, 75, 90].map(function(percentile) {
  return { percentile: percentile, count: runs[percentile * 10].count };
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
    }
  },
})
