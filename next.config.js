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
            hostname: 'd1xll3zf-8000.asse.devtunnels.ms',
            pathname: '**',
          },
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
