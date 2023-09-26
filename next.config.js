/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:["www.freecodecamp.org","localhost",'www.api.sichunepal.com','api.sichunepal.com']
    },
    serverRuntimeConfig:{
        
    },
    experimental:{
        forceSwcTransforms:false,
        serverActions:true
    },
    crossOrigin:'use-credentials'
    
}
module.exports = {
    middleware:['middleware/default']
}

module.exports = nextConfig
