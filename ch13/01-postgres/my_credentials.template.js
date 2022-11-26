module.exports = {
  cookieSecret: 'secret key',
  mail: {
    host: 'smtp.example.com',
    user: 'login for mail',
    password: 'password for mail',
  },
  mongo: {
    connectionString: 'mongodb://localhost:27017/meadowlark?retryWrites=true&w=majority'
  },
  redis: {
    url: 'redis://:********@eu2-eminent-fawn-31151.upstash.io:31151'
  },
  postgres: {
    url: 'postgres://******'
  }
}