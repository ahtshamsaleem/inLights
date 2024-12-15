import { put } from "@vercel/blob";
import axios from "axios";
import { NextResponse } from "next/server";


// Handle the POST request to upload an image
export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
  const userId = searchParams.get('user_id');
  const accessToken = searchParams.get('access_token');
  const caption = searchParams.get('caption');

  // ⚠️ The below code is for App Router Route Handlers only
 

  // return NextResponse.json(blob);
  







    try {

      const blob = await put(filename, request.body, {
        access: 'public',
      });

      

      const response = await axios.post(`https://graph.instagram.com/v21.0/${userId}/media`, {"image_url": blob.url, "access_token": accessToken, "caption": caption}, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      const containerId = response.data.id;





  const response2 = await axios.post(`https://graph.instagram.com/v21.0/${userId}/media_publish`, {"creation_id": containerId, "access_token": accessToken, "caption": caption}, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  const mediaId = response2.data.id;





  return new Response(JSON.stringify({ success: true, mediaId: mediaId, message: 'New Post Successfully💚.' }), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    }

  })
  
    } catch (error) {
      console.log(error)

      return new Response(JSON.stringify({ error: "Some error occured! Please try again laer." }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
    
      })
    }


 




}














