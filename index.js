/*jslint sloppy:true, white:true */
/*global Vue */

function isNumeric(num){
  return !isNaN(num)
}

new Vue({
  el: '#app',
  data() {
      return {
          tags: [
              '123',
              '456',
              '789'
          ]
      }
  },
  methods: {
    beforeAdding(tag) {
      return isNumeric(tag);
    },
  },
})
