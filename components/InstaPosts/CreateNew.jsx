'use client';

import { InstagramAccessContext } from '@/app/layout';
import axios from 'axios';
import { useState, useRef, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation'


export default function CreateNew() {

    const instagramAccessContext = useContext(InstagramAccessContext); 
  const router = useRouter()

  const inputFileRef = useRef(null);
  const captionRef = useRef(null);

  const [mediaId, setMediaId] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');



  if(!instagramAccessContext.accessToken) {
    return null;
  }


  return (
    <>
      <section className='w-full container mx-auto px-16 flex flex-col justify-start py-16  '>

              <h1 className='text-2xl font-poppins mb-12 w-full text-center '>Upload Your Post</h1>

        <form
        className='w-full max-w-2xl mx-auto justify-center flex-col items-cener flex gap-4 bg-black/10 backdrop-blur-md rounded-xl p-20 '
          onSubmit={async (event) => {
            event.preventDefault();

            console.log(captionRef?.current.value)
            
            const file = inputFileRef?.current?.files?.[0];
            const caption = captionRef?.current?.value;

            try {
              setIsLoading(true)


            const response = await axios.post( `/api/create-new-post?filename=${file.name}&user_id=${instagramAccessContext.profile.id}&access_token=${instagramAccessContext.accessToken}$caption=${caption}`, file);


            if (response.status === 201) {

              setMediaId(response.data.mediaId);
              setIsLoading(false)

              router.push('/ig-posts');

            }
            } catch (error) {
              console.log(error)
              setIsLoading(false)
            }
            
          }}
        >
          <input name="file" ref={inputFileRef} type="file" required />

          <div className='flex justify-center items-center gap-3 '>
          <label className='text-md font-poppins '>Caption:</label>
          <input required className='w-full bg-gray-100 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 focus:bg-white hover:border-slate-300 shadow-sm focus:shadow' name="caption" ref={captionRef} type="text" />
          </div>
          <button className='px-4 py-2 bg-green-500 text-white rounded-md shadow-md  ' type="submit">{isLoading ? 'Posting....!!' : 'POST'}</button>
        </form> 

            {
              isLoading && <p className='text-sm text-blue-500 '>Uploading your data, please have patience</p>
            }
            {
              error && <p className='text-sm text-red-500 '>{error}</p>
            }


      </section>




    </>
  );
}