// app/api/exchange-token.js

import axios from 'axios';
import FormData from 'form-data';

export async function GET(request) {

    const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')




  if (!code) {
    return new Response('Authorization code is missing', { status: 400 });
  }

  const clientId = process.env.INSTAGRAM_CLIENT_ID;  // Instagram Client ID
  const clientSecret = process.env.INSTAGRAM_CLIENT_SECRET;  // Instagram Client Secret
  const redirectUri = process.env.INSTAGRAM_REDIRECT_URI;  // Redirect URI



  const form = new FormData();
  
  // Adding text data
  form.append('client_id', clientId);
  form.append('client_secret', clientSecret);
  form.append('grant_type', 'authorization_code');
  form.append('redirect_uri', redirectUri);
  form.append('code', code);


  try {
    // Make a request to Instagram's API to exchange the authorization code for an access token
    const response = await axios.post('https://api.instagram.com/oauth/access_token', form);

    console.log(response)
    // Extract access token from the response
    const { access_token, user_id } = response.data;

    // Return the access token and user ID
    return new Response(JSON.stringify({ access_token, user_id }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error exchanging authorization code for access token:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
