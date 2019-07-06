var config = {
  development: {
    //url to be used in link generation
    url: "http://my.site.com",
    //sql connection settings
    database: {
      host: "localhost",
      user: "root",
      password: "",
      database: "VenueMenu"
    },
    //server details
    server: {
      host: "127.0.0.1",
      port: "8000"
    }
  },
  production: {
    //url to be used in link generation
    url: "http://my.site.com",
    //sql connection settings
    database: {
      host: "localhost",
      user: "root",
      password: "",
      database: "VenueMenu"
    },
    //server details
    server: {
      host: "127.0.0.1",
      port: "8000"
    }
  }
};
module.exports = config;
