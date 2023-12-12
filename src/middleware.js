
import {  COOKIE_NAME, DOMAIN } from './app/lib/utils/utils';

const { NextResponse } = require('next/server');

// RegExp for public files
const PUBLIC_FILE = /\.(.*)$/; // Files

async function middleware(req) {
    const cookies = req.cookies
    const token = getCookie(cookies.get(COOKIE_NAME))
    let currentPath = ""
  // clone the URL
  const url = req.nextUrl.clone();
  // Skip public files
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes('_next')) return;
  const path = getFirstPathName(url.pathname)
    const host = req.headers.get('host');
    if(host.includes("192.168."))return
    let subdomain = getValidSubdomain(host);
    if(subdomain===undefined||subdomain===null||subdomain==="") subdomain="www";
    
    if(path==="www" || path==='admin'){
       return NextResponse.redirect(new URL('/',`http://${path}.${DOMAIN}/${path}`)); 
    //  return NextResponse.redirect(new URL('/',`https://d1xll3zf-3000.asse.devtunnels.ms/${path}`)); 
    }
  if (subdomain) {
    // Subdomain available, rewriting
    console.log(`>>> Rewriting: ${url.pathname} to /${subdomain}${url.pathname}`);
    url.pathname = `/${subdomain}${url.pathname}`;
  }
//set the current path as 
currentPath= url.pathname

  return NextResponse.rewrite(url);
}



const getCookie=(cookies)=>{
    if(cookies===undefined)return undefined
   return cookies.value
}


export const getFirstPathName = (path)=>path.split('/')[1] 
export const getValidSubdomain = (host) => {
    let subdomain = null;
  
    if (!host && typeof window !== 'undefined') {
      // On the client side, get the host from window
      host = window.location.host;
    }
  
    if (host && host.includes('.')) {
      const candidate = host.split('.')[0];
      if (candidate && !candidate.includes(DOMAIN)) {
        // Valid candidate
        subdomain = candidate;
      }
    }
  
    return subdomain;
  };
export default middleware;
