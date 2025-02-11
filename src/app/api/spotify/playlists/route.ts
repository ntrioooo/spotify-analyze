// // src/app/api/spotify/playlists/route.ts

// import axios from "axios";
// import { NextApiRequest } from "next";
// import { NextRequest, NextResponse } from "next/server";

// // Environment variables from .env
// const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_API_CLIENT_ID;
// const SPOTIFY_CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_API_CLIENT_SECRET;

// // Spotify API token endpoint
// const TOKEN_URL = "https://accounts.spotify.com/api/token";
// const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";

// // Fungsi untuk mendapatkan access token Spotify menggunakan Client Credentials Flow
// const getSpotifyAccessToken = async () => {
//   const headers = {
//     "Content-Type": "application/x-www-form-urlencoded",
//     Authorization: `Basic ${Buffer.from(
//       `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
//     ).toString("base64")}`,
//   };

//   const data = new URLSearchParams();
//   data.append("grant_type", "client_credentials");

//   try {
//     const response = await axios.post(TOKEN_URL, data, { headers });
//     return response.data.access_token;
//   } catch (error) {
//     console.error("Error getting Spotify access token:", error);
//     throw new Error("Could not get access token");
//   }
// };

// // API handler untuk mendapatkan playlist pengguna
// async function getPlaylist(req: NextRequest) {
//   if (!req.url) {
//     return NextResponse.json({ message: "URL is required" }, { status: 400 });
//   }
//   const url = new URL(req.url);
//   const userId = url.searchParams.get("userId");

//   if (!userId) {
//     return NextResponse.json(
//       { message: "UserId is required" },
//       { status: 400 }
//     );
//   }

//   try {
//     const accessToken = await getSpotifyAccessToken();

//     // Request ke API Spotify untuk mendapatkan playlist berdasarkan userId
//     const response = await axios.get(
//       `${SPOTIFY_API_BASE_URL}/users/${userId}/playlists?offset=0&limit=100&locale=*`,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );

//     return NextResponse.json(response.data, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching playlists:", error);
//     return NextResponse.json(
//       { message: "Error fetching playlists" },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(req: NextRequest) {
//   if (req.method === "GET") {
//     return getPlaylist(req);
//   } else {
//     return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

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

// Fungsi untuk mendapatkan playlist berdasarkan userId
const getPlaylistsByUser = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "UserId is required" },
      { status: 400 }
    );
  }

  try {
    const accessToken = await getSpotifyAccessToken();
    const response = await axios.get(
      `${SPOTIFY_API_BASE_URL}/users/${userId}/playlists?offset=0&limit=100&locale=*`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return NextResponse.json(
      { message: "Error fetching playlists" },
      { status: 500 }
    );
  }
};

// Fungsi untuk mendapatkan track dari playlist berdasarkan playlistId
const getTracksFromPlaylist = async (req: NextRequest) => {
  const playlistId = req.nextUrl.searchParams.get("playlistId");

  if (!playlistId) {
    console.log("No Playlist provided");
    return NextResponse.json(
      { message: "PlaylistId is required" },
      { status: 400 }
    );
  }

  console.log("Fetching tracks for PlaylistId:", playlistId); // Log untuk melihat playlistId

  try {
    const accessToken = await getSpotifyAccessToken();
    const response = await axios.get(
      `${SPOTIFY_API_BASE_URL}/playlists/${playlistId}/tracks?offset=0&limit=100&locale=*`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching tracks from playlist:", error);
    return NextResponse.json(
      { message: "Error fetching tracks from playlist" },
      { status: 500 }
    );
  }
};

// Menangani permintaan GET berdasarkan kondisi path atau query
export async function GET(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path === "/api/spotify/playlists") {
    return getPlaylistsByUser(req);
  } else if (path === "/api/spotify/playlists/tracks") {
    return getTracksFromPlaylist(req);
  } else {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
}
