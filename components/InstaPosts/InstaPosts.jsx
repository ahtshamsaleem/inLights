"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";


import { InstagramAccessContext } from "@/app/layout";


export default function InstaPosts() {

  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const instagramAccessContext = useContext(InstagramAccessContext);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const getMediaObjectHandler = async (token, user_id) => {
    try {
      setIsLoading(true);

      const url = `https://graph.instagram.com/v21.0/${user_id}/media?access_token=${token}`;
      const res = await axios.get(url);
      console.log(res);
      const mediaObjects = res?.data?.data;

      const requests = mediaObjects.map((el) => {
        return axios.get(
          `https://graph.instagram.com/v21.0/${el.id}?fields=id,media_type,media_url,owner,timestamp,caption&access_token=${instagramAccessContext.accessToken}`
        );
      });

      const responses = await Promise.all(requests);

      const posts = responses.map((el) => {
        return el.data;
      });
      setPosts(posts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };



  useEffect(() => {
    if (!code) {
      (async () => {
        const accessToken = localStorage.getItem("access_token");
        const userId = localStorage.getItem("user_id");

        if (!accessToken || !userId) {
          return;
        } else {
          await getMediaObjectHandler(accessToken, userId);
        }
      })();
      return;
    }

    const getAccessToken = (async () => {
      const res = await axios.get(`/api/instagram-exchange-token?code=${code}`);

      if (res.status === 200) {
        instagramAccessContext.setAccessToken(res.data.access_token);
        setUserId(res.data.user_id);
        const result = await getMediaObjectHandler(
          res.data.access_token,
          res.data.user_id
        );

        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("user_id", res.data.user_id);
      }
    })();
  }, []);



  return (
    <div className="w-full container mx-auto    px-40 py-8 flex flex-col  justify-center items-center gap-3 ">


      {isLoading ? (
        <h2>Loading</h2>
      ) : (
        <ul className="p-8 w-full grid grid-cols-3 max-xl:grid-cols-2 gap-8  ">
          {posts.map((el) => {
            console.log(el);
            return (
              <li
                key={el.id}
                className="pb-4   flex flex-col justify-center items-center gap-8 border rounded-xl overflow-hidden shadow"
              >
                <div className="  ">
                  <img
                    src={el.media_url}
                    className="aspect-square object-cover  max-w-full  shadow-md shadow-black/20 cursor-pointer   scale-100 hover:scale-110 transition-all duration-500 "
                  />
                </div>

                <h2>{el.caption}</h2>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
