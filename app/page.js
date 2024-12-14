'use client'

import React, { useContext, useEffect, useState } from 'react';
import { InstagramAccessContext } from './layout';

export default function HomePage() {

  const instagramAccessContext = useContext(InstagramAccessContext); 

  const clientId = process.env.INSTAGRAM_CLIENT_ID;
  const redirectUri = process.env.INSTAGRAM_REDIRECT_URI;

// Function to redirect the user to Instagram OAuth
const redirectToInstagramAuth = () => {
  const authUrl = `https://www.instagram.com/oauth/authorize?client_id=430149536829296&redirect_uri=https://inlights.iqweb.dev/ig-posts&response_type=code&scope=business_basic%2Cbusiness_manage_messages%2Cbusiness_manage_comments%2Cbusiness_content_publish`;
  window.location.href = authUrl;
};

  // Fetch the access token and profile info
  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const code = urlParams.get('code');

  //   if (code) {
  //     // Exchange the code for an access token
  //     fetch(`/api/instagram-exchange-token?code=${code}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setAccessToken(data.access_token);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching access token:', error);
  //       });
  //   }
  // }, []);





  return (
    <div>
      <h1>Instagram Login</h1>
      {!instagramAccessContext.accessToken ? (
        <button onClick={redirectToInstagramAuth}>Login with Instagram</button>
      ) : profile ? (
        <div>
          <h2>Welcome, {instagramAccessContext.profile.username}</h2>
          <p>Account Type: {instagramAccessContext.profile.account_type}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}
















