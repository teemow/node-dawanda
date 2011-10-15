/**
 * DaWanda API client
 */
var http = require("http")
  , querystring = require("querystring")

var API_VERSION = 1
  , CALLBACK_PARAM_NAME = "callback"
  , AVAILABLE_LANGUAGES = ["de", "fr", "en"]
  , FORMAT = "json"

exports.createClient = function(key, language){
  if (!key) throw("Initialization failed due to missing api key! Please pass a key as first param.")
  if (!language) throw("Initialization failed due to unspecified language! Please pass the language as second param.")

  if (AVAILABLE_LANGUAGES.indexOf(language) == -1)
    throw("DaWanda only supports the following languages: " + AVAILABLE_LANGUAGES.join(", "))

  var self = new DaWanda()
  self.key = key
  self.host = language + ".dawanda.com"

  self.createMethods()
  return self
}

var endpoints = {
  search_users: "/users/search",
  search_shops: "/shops/search",
  search_products: "/products/search",
  search_product_for_color: "/colors/#{id}/products/search",
  get_user: "/users/#{id}",
  get_user_pinboards: "/users/#{id}/pinboards",
  get_shop: "/shops/#{id}",
  get_products_for_shop: "/shops/#{id}/products",
  get_products_for_pinboard: "/pinboards/#{id}/products",
  get_pinboard: "/pinboards/#{id}",
  get_categories_for_shop: "/shops/#{id}/shop_categories",
  get_shop_category: "/shop_categories/#{id}",
  get_products_for_shop_category: "/shop_categories/#{id}/products",
  get_top_categories: "/categories/top",
  get_category: "/categories/#{id}",
  get_children_of_category: "/categories/#{id}/children",
  get_products_for_category: "/categories/#{id}/products",
  get_product: "/products/#{id}",
  get_colors: "/colors",
  get_products_for_color: "/colors/#{id}/products"
}

function DaWanda(){}
DaWanda.prototype.createMethods = function createMethods() {
  var self = this
  Object.keys(endpoints).forEach(function(method) {
    self[method] = function(val, options, cb) {
      var params = [method]

      if (arguments.length === 1) {
        cb = val
        val = undefined
        options = undefined
      } else if (arguments.length === 2) {
        cb = options
        options = undefined
        if (typeof val !== "string") {
          options = val
          val = undefined
        }
      }
      // add search parameter for search methods
      if (method.indexOf("search_") === 0) options = this.add_search(val, options)
      else if (val) params.push(val)

      if (typeof cb !== "function") throw(method + ": no callback defined")

      this.request(this.url.apply(this, params), options, cb)
    }
  })
}

DaWanda.prototype.url = function url(callee, id) {
  return ("/api/v#{version}" + endpoints[callee] + ".#{format}")
    .replace("#{version}", API_VERSION)
    .replace("#{format}", FORMAT)
    .replace("#{id}", id)
}

DaWanda.prototype.request = function request(url, options, cb) {
  var self = this
  options = options || {};
  options.params = options.params || {};
  options.params.api_key = self.key;

  url += "?" + querystring.stringify(options.params)
        console.log(url)

  http.get({
    host: self.host,
    path: url
  }, function(res) {
    var body = ""
    res.on("data", function(chunk) {
      body += chunk
    })
    res.on("end", function() {
      try {
        cb(undefined, JSON.parse(body))
      } catch(e) {
        cb(e)
      }
    })
  }).on("error", function(e) {
    cb(e)
  })
}

DaWanda.prototype.add_search = function add_search(keyword, options) {
  options = options || {};
  options.params = options.params || {};
  options.params.keyword = keyword;

  return options;
}

