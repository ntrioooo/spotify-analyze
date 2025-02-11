// app/api/spotify/playlists/tracks/route.ts

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_API_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_API_CLIENT_SECRET;

// Spotify API token endpoint
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";

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

const getTracksFromPlaylist = async (req: NextRequest) => {
  const playlistId = req.nextUrl.searchParams.get("playlistId");

  if (!playlistId) {
    return NextResponse.json(
      { message: "PlaylistId is required" },
      { status: 400 }
    );
  }

  try {
    const accessToken = await getSpotifyAccessToken();
    const response = await axios.get(
      `${SPOTIFY_API_BASE_URL}/playlists/${playlistId}/tracks?offset=0&limit=3&locale=*`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
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

export async function GET(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path === "/api/spotify/playlists/tracks") {
    return getTracksFromPlaylist(req);
  } else {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
}
