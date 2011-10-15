var dawanda = require("dawanda").createClient("YOUR_API_KEY", "de")
dawanda.get_top_categories(function(err, result) {
  if (err) throw err
  console.log(result)
})
dawanda.search_users("kodanin", function(err, result) {
  if (err) throw err
  console.log(result)
})
