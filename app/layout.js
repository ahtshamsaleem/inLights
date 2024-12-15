"use client"


import { createContext, useEffect, useState } from "react";
import "./globals.css";
import axios from "axios";
import IgBtn from "@/components/shared/IgBtn";
import { usePathname } from 'next/navigation'
import Link from "next/link";


export const InstagramAccessContext = createContext();
//export const AuthContext = createContext();



export default function RootLayout({ children }) {



  const [accessToken, setAccessToken] = useState(null);
  const [profile, setProfile] = useState(null);

  const pathname = usePathname()

  console.log(pathname)


useEffect(() => {
  const storedAccessToken = localStorage.getItem('access_token')
  if(!storedAccessToken) {
    return;
  }
  setAccessToken(storedAccessToken)
}, [])







useEffect(() => {
  

  if(accessToken) {
      const getData = (async () => {
          const res = await axios.get(`https://graph.instagram.com/me?fields=id,username,account_type&access_token=${accessToken}`);
          setProfile(res.data);

  })()
  }



}, [accessToken]);



const redirectToInstagramAuth = () => {
  const authUrl = `https://www.instagram.com/oauth/authorize?client_id=430149536829296&redirect_uri=https://inlights.iqweb.dev/ig-posts&response_type=code&scope=business_basic%2Cbusiness_manage_messages%2Cbusiness_manage_comments%2Cbusiness_content_publish`;
  window.location.href = authUrl;
};


  return (
    <html lang="en">
      

      <body className="w-full    font-Inter bg-gradient-to-bl from-[#ffe4e6]  to-[#ccfbf1] "
        
        >
          <InstagramAccessContext.Provider value={{accessToken, setAccessToken, profile, setProfile}}>
          <div className="py-32 ">
            <header className="w-full fixed flex justify-between items-center gap-5  h-32 px-16 py-8 bg-teal-400 left-0 top-0 z-[9999]">
            {
              profile ? <div className="w-full flex flex-col justify-center items-center gap-2"> <h2 className="font-poppins text-xl text-white ">Welcome, {profile.username}</h2> <p className="text-sm text-gray-100  ">Account Type: {profile.account_type}</p> </div> : <div className="w-full flex justify-center items-center"><IgBtn text={"Login with Instagram"} onClick={redirectToInstagramAuth} /></div>
            }

              <div>
                {
                  (pathname === '/ig-posts' || pathname === '/')  && <Link href={'/ig-posts/create-new-post'}><button className="px-4 text-white text-nowrap rounded-md shadow-md hover:bg-orange-400 transition-all  py-2 bg-orange-300">Add New Post</button></Link>
                }

                {
                  (pathname === '/ig-posts/create-new-post' || pathname === '/') &&<Link href={'/ig-posts'}><button className="px-4 text-white text-nowrap rounded-md shadow-md hover:bg-orange-400 transition-all  py-2 bg-orange-300">My Posts</button></Link>
                }
                
              </div>
          

            </header>
          {children}
          </div>

          </InstagramAccessContext.Provider>

        </body>


    </html>
  );
}
