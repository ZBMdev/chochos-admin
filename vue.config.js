/* module.exports = {
    devServer: {
      port: 8083
    }
  } 

  module.exports = {
    // options...
  devServer: {
    proxy: 'https://chochos-list.herokuapp.com/api',
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
} 

module.exports = {
  // options...
configureWebpack: {  
  devServer: {
      port: 8080,
      proxy: 'http://localhost:8083/api',
      headers: { 'Access-Control-Allow-Origin': '*' }
  }
}  
} */


module.exports = {
  // options...
  configureWebpack: { 
    devServer: {
      port: 8080,
      proxy: 'https://chochos-list.herokuapp.com/api',
      headers: { 'Access-Control-Allow-Origin': '*' }
    }
  }  
}
