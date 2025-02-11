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

  const fetchPlaylists = async (userId: string) => {
    try {
      const response = await axios.get(
        `/api/spotify/playlists?userId=${userId}`
      );
      console.log("response", response);
      setPlaylists(response.data.items || []);
    } catch (error) {
      console.error("Error fetching playlists:", error);
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
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme ?? "light";

  console.log(selectedPlaylist);

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
                <Button type="submit" className="w-full">
                  Analyze
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CardForm;
