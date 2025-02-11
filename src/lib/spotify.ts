import axios from "axios";
import { NextApiRequest, NextApiResponse } from 'next';

// Environment variables from .env
const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_API_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_API_CLIENT_SECRET;

// Spotify API token endpoint
const TOKEN_URL = "https://accounts.spotify.com/api/token";

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
    return response.data.access_token; // Token yang digunakan untuk request ke API Spotify
  } catch (error) {
    console.error("Error getting Spotify access token:", error);
    throw new Error("Could not get access token");
  }
};

// API handler untuk mendapatkan playlist penggun

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "UserId is required" });
  }

  try {
    const accessToken = await getSpotifyAccessToken();

    // Request ke API Spotify untuk mendapatkan playlist berdasarkan userId
    const response = await axios.get(
      `https://api.spotify.com/v1/users/${userId}/playlists?offset=0&limit=100&locale=*`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Kirim playlist ke frontend
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching playlists:", error);
    res.status(500).json({ message: "Error fetching playlists" });
  }
}
