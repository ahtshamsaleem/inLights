"use client"


import { createContext, useEffect, useState } from "react";
import "./globals.css";



export const InstagramAccessContext = createContext();
//export const AuthContext = createContext();



export default function RootLayout({ children }) {



  const [accessToken, setAccessToken] = useState(null);
  const [profile, setProfile] = useState(null);

console.log(accessToken)
console.log(profile)



useEffect(() => {
        


  if(accessToken) {
      const getData = (async () => {
          const res = await axios.get(`https://graph.instagram.com/me?fields=id,username,account_type&access_token=${accessToken}`);
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
