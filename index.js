/*jslint sloppy:true, white:true */
/*global Vue */

function isNumeric(num){
  return !isNaN(num)
}

new Vue({
  el: '#app',
  data: {
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ]
  }
});

new Vue({
  el: '#app-2',
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
