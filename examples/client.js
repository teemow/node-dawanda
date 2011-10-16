var api_key = process.env.DAWANDA_API_KEY || "YOUR_API_KEY"
  , dawanda = require("../lib/dawanda").createClient(api_key, "de")
dawanda.get_top_categories(function(err, result) {
  if (err) throw err
  console.log(result)
})
dawanda.search_users("kodanin", function(err, result) {
  if (err) throw err
  console.log(result)
})
dawanda.get_products_for_shop("2583034", function(err, result) {
  if (err) throw err
  console.log(result)
})
dawanda.get_products_for_shop("2583034", {page:2}, function(err, result) {
  if (err) throw err
  console.log(result)
})
