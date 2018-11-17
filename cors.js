const allowedDomains = ['http://localhost:8080'];

exports.allowCrossDomain = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedDomains.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  // intercept OPTIONS method
  return (req.method === 'OPTIONS') ? res.status(200).send() : next();
};
