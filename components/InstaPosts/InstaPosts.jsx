'use client'

import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

import Image from 'next/image';
import { InstagramAccessContext } from '@/app/layout';

export default function InstaPosts() {


    const searchParams = useSearchParams()

    const code = searchParams.get('code')

    const instagramAccessContext = useContext(InstagramAccessContext); 

    //const [userId, setUserId] = useState(null)
    const [mediaObjects, setMediaObjects] = useState([])

    const [posts, setPosts] = useState([])

    
    const getMediaObjectHandler =  async(token, user_id) => {

        const url = `https://graph.instagram.com/v21.0/${user_id}/media?access_token=${token}`
        const res = await axios.get(url);
        console.log(res)
        return res?.data?.data;

      }


    useEffect(() => {
        
        if(!code) {
            return;
        }

        const getAccessToken = (async () => {

            const res = await axios.get(`/api/instagram-exchange-token?code=${code}`);

            if(res.status === 200) {
                instagramAccessContext.setAccessToken(res.data.access_token);
                setUserId(res.data.user_id);
                const result = await getMediaObjectHandler(res.data.access_token, res.data.user_id)
                setMediaObjects(result)
            }

        })()

      }, []);







      const getPostsHandler =  async() => {

        const result = await getMediaObjectHandler('IGAAGHNZC5Xz3BBZAE8wc0N2NmFoNWMxQjlWT0E4RmhzVF9OcllPa3pTNGFudS1xdDNVdUxyaENJazJybmZAaaXFjMkQ1LVUxMzFpZAS1qamRPcVI0TGw0ZAmF3d3VBYU1SSEJPSGNwT0JBWEdIa1dZAenNRU05LcGVxV1dsTjlTZAUx1SQZDZD', '9574343002580524')
                setMediaObjects(result)


        const requests = mediaObjects.map((el) => {
            return axios.get(`https://graph.instagram.com/v21.0/${el.id}?fields=id,media_type,media_url,owner,timestamp&access_token=${instagramAccessContext.accessToken}`)
        })

        const responses = await Promise.all(requests);
        console.log(responses)
        const posts = responses.map((el) => {
            return el.data;
        })
        setPosts(posts)

        
      }



      



      
      return (

        <div>
                <button onClick={getPostsHandler}>Get My Posts</button>


                <ul className='p-8 w-full grid grid-cols-2 gap-8 bg-gray-300'>
                    {
                        posts.map((el) => {


                            return (
                                <li key={el.id} className='p-4 rounded-md '> 

                                    <img src={el.media_url} width={500} height={500}/>


                                    <h2>{el.caption}</h2>

                                </li>
                            )


                        } )
                    }
                </ul>

        </div>
      )

}
















