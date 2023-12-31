/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.freecodecamp.org',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'flagcdn.com',
            pathname: '**',
          },
          {
            protocol: 'http',
            hostname: 'localhost',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: "sichunepal.com",
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: "api.sichunepal.com",
            pathname: '**',
          },
          {
            protocol: 'http',
            hostname: "sichunepal.com",
            pathname: '**',
          },
          {
            protocol: 'http',
            hostname: "api.sichunepal.com",
            pathname: '**',
          }
        ],
      },
    serverRuntimeConfig:{
        
    },
    //experimental:{
    //    forceSwcTransforms:false,
    //},
    crossOrigin:'use-credentials'
    
}
module.exports = {
    darkMode: 'class',
    middleware:['middleware/default'],
    compress: false,
    env: {
        NODE_ENV: 'production',
    },
}

module.exports = nextConfig
