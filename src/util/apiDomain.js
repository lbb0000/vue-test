let domain = ''
if (process.env.NODE_ENV === 'development') {
  domain = 'http://webs.yr.dev.q1.com/api'
} else {
  domain = 'http://webs.yr.dev.q1.com/api'
}

export default domain
