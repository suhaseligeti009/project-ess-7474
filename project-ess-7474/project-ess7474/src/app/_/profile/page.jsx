"use client";
import React from "react";
import BottomNav from "../../components/bottom-nav";
import { useUpload } from "../utilities/runtime-helpers";

function MainComponent() {
  const { data: user, loading } = useUser();
  const [upload, { loading: uploading }] = useUpload();
  const [showMusicModal, setShowMusicModal] = useState(false);
  const [songTitle, setSongTitle] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [stories, setStories] = useState([]);
  const [showStories, setShowStories] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      imageUrl: "/images/post1.jpg",
      likes: 234,
      comments: 12,
    },
    {
      id: 2,
      imageUrl: "/images/post2.jpg",
      likes: 456,
      comments: 23,
    },
    {
      id: 3,
      imageUrl: "/images/post3.jpg",
      likes: 789,
      comments: 45,
    },
  ]);
  const handleFileUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const { url, error } = await upload({ file });
      if (error) {
        console.error("Error uploading file:", error);
        return;
      }
      setSongUrl(url);
    }
  };
  const handleSaveSong = async () => {
    try {
      const response = await fetch("/api/profile/music", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: songTitle,
          artist: songArtist,
          url: songUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save song");
      }

      setShowMusicModal(false);
      setSongTitle("");
      setSongArtist("");
      setSongUrl("");
    } catch (error) {
      console.error("Error saving song:", error);
    }
  };

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(
          `/api/stories?userId=${user?.id}&active=true`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch stories");
        }
        const data = await response.json();
        setStories(data);
      } catch (error) {
        console.error("Error fetching stories:", error);
        setError("Could not load stories");
      }
    };

    if (user?.id) {
      fetchStories();
    }
  }, [user?.id]);

  useEffect(() => {
    let timer;
    if (showStories) {
      timer = setTimeout(() => {
        if (currentStoryIndex < stories.length - 1) {
          setCurrentStoryIndex(currentStoryIndex + 1);
        } else {
          setShowStories(false);
        }
      }, stories[currentStoryIndex]?.duration * 1000);
    }
    return () => clearTimeout(timer);
  }, [currentStoryIndex, showStories, stories]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHeaderVisible(scrollPosition < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-xl">Please sign in to view your profile</p>
          <a
            href="/account/signin"
            className="rounded-lg bg-[#357AFF] px-6 py-3 text-white hover:bg-[#2E69DE]"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <div className="flex flex-col items-center">
            <img
              src={user.image || "/images/default-avatar.jpg"}
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover"
            />
            <h1 className="mt-4 text-2xl font-semibold">
              {user.name || user.email}
            </h1>
            <p className="text-gray-600">@{user.username || "username"}</p>

            <p className="mt-4 max-w-md text-center text-gray-700">
              {user.bio || "No bio yet"}
            </p>

            <div className="mt-6 flex w-full max-w-md items-center justify-between rounded-lg bg-white p-4 shadow">
              <div className="flex items-center space-x-3">
                <i className="fas fa-music text-purple-500 text-xl"></i>
                <div>
                  <h3 className="font-medium">Favorite Song</h3>
                  {user.favorite_song_title ? (
                    <div className="text-sm text-gray-500">
                      {user.favorite_song_title} - {user.favorite_song_artist}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">
                      No song selected
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => setShowMusicModal(true)}
                className="rounded-full bg-purple-100 p-2 text-purple-600 hover:bg-purple-200"
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>

            {user.favorite_song_url && (
              <div className="mt-3 w-full max-w-md">
                <audio controls className="w-full" src={user.favorite_song_url}>
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}

            <div className="mt-6 flex w-full justify-center space-x-4">
              <a
                href="/settings/profile"
                className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium hover:bg-gray-50"
              >
                Edit Profile
              </a>
              <a
                href="/settings"
                className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium hover:bg-gray-50"
              >
                <i className="fas fa-cog mr-2"></i>
                Settings
              </a>
            </div>

            <div className="mt-8 flex w-full justify-center space-x-12">
              <div className="text-center">
                <div className="text-xl font-semibold">{posts.length}</div>
                <div className="text-sm text-gray-500">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold">1.2K</div>
                <div className="text-sm text-gray-500">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold">1K</div>
                <div className="text-sm text-gray-500">Following</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <h2 className="mb-4 text-xl font-semibold">Stories</h2>
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-4">
            {error ? (
              <div className="text-red-500">{error}</div>
            ) : stories.length === 0 ? (
              <div className="text-gray-500">No stories yet</div>
            ) : (
              stories.map((story, index) => (
                <StoryCircle
                  key={story.id}
                  imageUrl={story.image_url}
                  username={story.username}
                  hasStory={true}
                  isViewed={story.viewed}
                  size="lg"
                  onClick={() => {
                    setCurrentStoryIndex(index);
                    setShowStories(true);
                  }}
                />
              ))
            )}
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-8">
          <div className="grid grid-cols-3 gap-1 md:gap-4">
            {posts.map((post) => (
              <div key={post.id} className="relative aspect-square">
                <img
                  src={post.imageUrl}
                  alt={`Post ${post.id}`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 opacity-0 transition-all hover:bg-opacity-50 hover:opacity-100">
                  <div className="flex space-x-6 text-white">
                    <div className="flex items-center">
                      <i className="fas fa-heart mr-2"></i>
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-comment mr-2"></i>
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav activeTab="profile" />

      {showMusicModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h3 className="mb-4 text-lg font-medium">Add Your Favorite Song</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Song Title
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Enter song title"
                  value={songTitle}
                  onChange={(e) => setSongTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Artist
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Enter artist name"
                  value={songArtist}
                  onChange={(e) => setSongArtist(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Song URL or Upload
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Enter song URL"
                  value={songUrl}
                  onChange={(e) => setSongUrl(e.target.value)}
                />
                <div className="mt-2">- or -</div>
                <input
                  type="file"
                  accept="audio/*"
                  className="mt-2 block w-full text-sm text-gray-500"
                  onChange={handleFileUpload}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowMusicModal(false)}
                className="rounded-md px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSong}
                className="rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
                disabled={uploading}
              >
                {uploading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showStories && stories.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="relative h-full w-full">
            <div className="absolute top-0 z-10 flex w-full justify-between p-4">
              <div className="flex items-center">
                <img
                  src={
                    stories[currentStoryIndex].userAvatar ||
                    "/images/default-avatar.jpg"
                  }
                  alt="Story creator"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="ml-2 text-white">
                  <div className="text-sm font-semibold">
                    {stories[currentStoryIndex].username}
                  </div>
                  <div className="text-xs opacity-75">
                    {new Date(
                      stories[currentStoryIndex].timestamp
                    ).toRelativeTimeString()}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowStories(false)}
                className="text-white"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <div className="absolute top-0 z-10 flex w-full p-2">
              <div className="flex w-full gap-1">
                {stories.map((story, index) => (
                  <div
                    key={story.id}
                    className="h-1 flex-1 overflow-hidden rounded bg-white bg-opacity-30"
                  >
                    <div
                      className={`h-full w-full bg-white transition-transform duration-[15000ms] ease-linear ${
                        index < currentStoryIndex
                          ? "translate-x-0"
                          : index === currentStoryIndex
                          ? "translate-x-0"
                          : "translate-x-[-100%]"
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            <img
              src={stories[currentStoryIndex].imageUrl}
              alt="Story content"
              className="h-full w-full object-contain"
            />

            <div className="absolute bottom-0 w-full p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="text-white">
                    <i className="far fa-heart text-2xl"></i>
                    <span className="ml-2">
                      {stories[currentStoryIndex].likes}
                    </span>
                  </button>
                  <button className="text-white">
                    <i className="far fa-comment text-2xl"></i>
                    <span className="ml-2">
                      {stories[currentStoryIndex].comments.length}
                    </span>
                  </button>
                </div>
                <button className="text-white">
                  <i className="far fa-paper-plane text-2xl"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainComponent;