
// small interactive behaviors
document.addEventListener('DOMContentLoaded', function(){
  // progressive enhancement for search on mobile
  var form = document.querySelector('form[role="search"]');
  if(!form) return;
  form.addEventListener('submit', function(e){
    var q = form.querySelector('input[name="q"]').value.trim();
    if(!q){
      e.preventDefault();
      alert('Please enter a search term.');
    }
  });
});
