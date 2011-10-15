# node-dawanda

A simple API client for dawanda

## Install
<pre>
npm install dawanda
</pre>

## Example 
<pre>
var dawanda = require("dawanda").createClient("YOUR_API_KEY", "de")
dawanda.get_top_categories(function(err, result) {
if (err) throw err
  console.log(result)
})
</pre>
