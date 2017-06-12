
const config = {
    CookieDomain: 'localhost',
    // http://121.201.29.159
    apiDomain: process.env.NODE_ENV === 'development' ? 'http://webshop.flowerexpresses.com' : 'http://webshop.flowerexpresses.com'
}

export default config;