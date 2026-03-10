var promises = [];
for (var i = 0; i < 100; i++) {
  promises.push(
    fetch('corpus/doc-' + i + '.json')
      .then(function(r) { return r.json(); })
      .then(function(arr) {
        if (Array.isArray(arr)) {
          for (var j = 0; j < arr.length; j++) {
            if (typeof arr[j] === 'string' && arr[j].length > 10) {
              text_all.push(arr[j]);
            }
          }
        }
      })
      .catch(function() {})
  );
}
Promise.all(promises).then(function() {
  $(document).ready(init);
});
