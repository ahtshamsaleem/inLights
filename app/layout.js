"use client"


import { createContext, useEffect, useState } from "react";
import "./globals.css";
import axios from "axios";



export const InstagramAccessContext = createContext();
//export const AuthContext = createContext();



export default function RootLayout({ children }) {



  const [accessToken, setAccessToken] = useState('IGAAGHNZC5Xz3BBZAE8wc0N2NmFoNWMxQjlWT0E4RmhzVF9OcllPa3pTNGFudS1xdDNVdUxyaENJazJybmZAaaXFjMkQ1LVUxMzFpZAS1qamRPcVI0TGw0ZAmF3d3VBYU1SSEJPSGNwT0JBWEdIa1dZAenNRU05LcGVxV1dsTjlTZAUx1SQZDZD');
  const [profile, setProfile] = useState(null);

console.log(accessToken)
console.log(profile)



useEffect(() => {
        


  if(accessToken) {
      const getData = (async () => {
          const res = await axios.get(`https://graph.instagram.com/me?fields=id,username,account_type&access_token=${'IGAAGHNZC5Xz3BBZAE8wc0N2NmFoNWMxQjlWT0E4RmhzVF9OcllPa3pTNGFudS1xdDNVdUxyaENJazJybmZAaaXFjMkQ1LVUxMzFpZAS1qamRPcVI0TGw0ZAmF3d3VBYU1SSEJPSGNwT0JBWEdIa1dZAenNRU05LcGVxV1dsTjlTZAUx1SQZDZD'}`);
          setProfile(res.data);

  })()
  }



}, [accessToken]);



  return (
    <html lang="en">
      

      <body 
        
        >
          <InstagramAccessContext.Provider value={{accessToken, setAccessToken, profile, setProfile}}>
          <div>
          {children}
          </div>

          </InstagramAccessContext.Provider>

        </body>


    </html>
  );
}
