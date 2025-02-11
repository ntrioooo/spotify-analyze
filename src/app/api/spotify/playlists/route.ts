// src/app/api/spotify/playlists/route.ts

import axios from "axios";

// Environment variables from .env
const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_API_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_API_CLIENT_SECRET;

// Spotify API token endpoint
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";

// Fungsi untuk mendapatkan access token Spotify menggunakan Client Credentials Flow
const getSpotifyAccessToken = async () => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${Buffer.from(
      `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
    ).toString("base64")}`,
  };

  const data = new URLSearchParams();
  data.append("grant_type", "client_credentials");

  try {
    const response = await axios.post(TOKEN_URL, data, { headers });
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting Spotify access token:", error);
    throw new Error("Could not get access token");
  }
};

// API handler untuk mendapatkan playlist pengguna
export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return new Response(JSON.stringify({ message: "UserId is required" }), {
      status: 400,
    });
  }

  try {
    const accessToken = await getSpotifyAccessToken();

    // Request ke API Spotify untuk mendapatkan playlist berdasarkan userId
    const response = await axios.get(
      `${SPOTIFY_API_BASE_URL}/users/${userId}/playlists?offset=0&limit=100&locale=*`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching playlists" }),
      { status: 500 }
    );
  }
}
