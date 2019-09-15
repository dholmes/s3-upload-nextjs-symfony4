module.exports = {
    serverRuntimeConfig: { // Will only be available on the server side
    },
    publicRuntimeConfig: { // Will be available on both server and client
      apiPath: process.env.API_PATH || "http://localhost:9000"
    }
  }