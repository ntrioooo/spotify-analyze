"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import axios from "axios";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ollama from "ollama";

const CardForm = () => {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [username, setUsername] = useState<string>("");
  interface Playlist {
    id: string;
    name: string;
  }

  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  interface Message {
    role: string;
    content: any;
  }

  const [messageOllama, setMessageOllama] = useState<Message[]>([]);

  const fetchPlaylists = async (userId: string) => {
    try {
      const response = await axios.get(
        `/api/spotify/playlists?userId=${userId}`
      );
      setPlaylists(response.data.items || []);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  const fetchTracks = async (playlistId: string) => {
    try {
      const response = await axios.get(
        `/api/spotify/playlists/tracks?playlistId=${playlistId}`
      );
      const tracks = response.data.items || [];

      if (tracks.length > 0) {
        handleAnalyze(tracks); // Lanjutkan untuk analisis tracks
      } else {
        console.log("Tidak ada track yang ditemukan dalam playlist.");
      }
    } catch (error) {
      console.error("Error fetching tracks:", error);
      return [];
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username) {
      const userId = username.split("user/")[1]?.split("?")[0];
      if (userId) {
        fetchPlaylists(userId);
      }
    }
  };

  const handlePlaylistSelect = (playlist: string) => {
    setSelectedPlaylist(playlist);
    fetchTracks(playlist);
  };

  const handleAnalyze = async (tracks: any) => {
    const trackNames = tracks.map((track: any) => track.track.name).join("\n");

    const messageToOllama = `Here are the tracks in the playlist:\n${trackNames}`;

    try {
      const response = await fetch("/api/deepseek/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: `${messageToOllama}` }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      const aiMessage = {
        role: "assistant",
        content: data.message,
      };
      setMessageOllama((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error while processing your request.",
      };
      setMessageOllama((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme ?? "light";

  return (
    <Card className="w-[600px]">
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-col gap-y-3">
          <CardTitle>Spotify Analyze</CardTitle>
          <CardDescription>
            Input your username or link spotify.
          </CardDescription>
        </div>
        <button
          type="button"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <FaMoon
              className={`transition-transform duration-300 ${
                currentTheme === "dark"
                  ? "-rotate-180 scale-0"
                  : "rotate-0 scale-100"
              }`}
            />
          ) : (
            <FaSun
              className={`transition-transform duration-300 ${
                currentTheme === "light"
                  ? "-rotate-180 scale-0"
                  : "rotate-0 scale-100"
              }`}
            />
          )}
        </button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="w-full">
            <div className="flex flex-col space-y-3">
              <Label htmlFor="username" className="font-normal">
                Profile Link{" "}
              </Label>
              <div className="w-full flex flex-row justify-between items-center space-x-4">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border rounded-md p-2 w-full"
                  placeholder="https://open.spotify.com/{yourLink}"
                />
                <Button type="submit">Check</Button>
              </div>
            </div>
          </div>
        </form>
        {playlists && playlists.length > 0 && (
          <div className="mt-4 flex flex-col">
            <div className="mb-3">
              <Label htmlFor="username" className="font-normal">
                Select Playlist
              </Label>
            </div>
            <Select onValueChange={handlePlaylistSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {playlists.map((playlist) => (
                  <SelectItem key={playlist.id} value={playlist.id}>
                    {playlist.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedPlaylist && (
              <div className="mt-3">
                <Button
                  type="submit"
                  className="w-full"
                  onClick={() => handleAnalyze(selectedPlaylist)}
                >
                  Analyze
                </Button>
              </div>
            )}
          </div>
        )}
        {messageOllama &&
          messageOllama.map((message, index) => (
            <p key={index}>{message.content}</p>
          ))}
      </CardContent>
    </Card>
  );
};

export default CardForm;
