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
            protocol: 'https',
            hostname: "www.sichunepal.com",
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
      async headers() {
        return [
          {
            source: '/(.*)',
            headers: [
              {
                key: 'Cache-Control',
                value: 'public, max-age=3600', // Set caching headers for assets
              },
            ],
          },
        ];
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
    compress: true,
    env: {
        NODE_ENV: 'production',
    },
}

module.exports = nextConfig
