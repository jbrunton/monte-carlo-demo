/*jslint sloppy:true, white:true */
/*global Vue */

function isNumeric(num){
  return !isNaN(num)
}

var data = {
  trainingData: [
    {size: 'S', values: [1, 2, 3, 2]},
    {size: 'M', values: [3, 3, 5, 8]},
    {size: 'L', values: [5, 7, 7, 8]}
  ]
};

new Vue({
  el: '#app',
  data() {
      return data;
  },
  methods: {
    beforeAdding(tag) {
      return isNumeric(tag);
    },
  },
})
