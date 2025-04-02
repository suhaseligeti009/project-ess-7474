"use client";
import React from "react";
import BottomNav from "../../components/bottom-nav";

function MainComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: user } = useUser();

  const samplePosts = [
    {
      id: 1,
      username: "travel_enthusiast",
      userAvatar: "/images/avatar1.jpg",
      media: "/images/explore1.jpg",
      likesCount: 2543,
      caption: "Beautiful sunset in Bali 🌅",
    },
    {
      id: 2,
      username: "foodie_adventures",
      userAvatar: "/images/avatar2.jpg",
      media: "/images/explore2.jpg",
      likesCount: 1832,
      caption: "Perfect brunch spot 🍳",
    },
    {
      id: 3,
      username: "art_daily",
      userAvatar: "/images/avatar3.jpg",
      media: "/images/explore3.jpg",
      likesCount: 4271,
      caption: "Latest artwork 🎨",
    },
    {
      id: 4,
      username: "fitness_journey",
      userAvatar: "/images/avatar4.jpg",
      media: "/images/explore4.jpg",
      likesCount: 3156,
      caption: "Morning workout complete 💪",
    },
    {
      id: 5,
      username: "nature_pics",
      userAvatar: "/images/avatar5.jpg",
      media: "/images/explore5.jpg",
      likesCount: 5892,
      caption: "Mountain views 🏔️",
    },
    {
      id: 6,
      username: "urban_shots",
      userAvatar: "/images/avatar6.jpg",
      media: "/images/explore6.jpg",
      likesCount: 2187,
      caption: "City lights 🌃",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="mx-auto max-w-md">
          <h1 className="mb-3 text-xl font-semibold">Find</h1>
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="w-full rounded-lg border border-gray-200 bg-gray-100 py-2 pl-10 pr-4 text-gray-700 focus:border-[#357AFF] focus:outline-none focus:ring-1 focus:ring-[#357AFF]"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-sm bg-white p-6 shadow-sm">
        <div className="flex items-start space-x-6">
          <StoryCircle
            imageUrl={user?.image || "/images/default-avatar.jpg"}
            username={user?.username}
            size="lg"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-sm text-gray-600">@{user?.username}</p>
            <p className="mt-2 text-gray-700">{user?.bio || "No bio yet"}</p>
            {user?.favoriteSong && (
              <div className="mt-3 flex items-center text-sm text-gray-600">
                <i className="fas fa-music mr-2"></i>
                <span>{user.favoriteSong}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-sm p-4">
        <div className="grid grid-cols-3 gap-1">
          {samplePosts.map((post) => (
            <div key={post.id} className="aspect-square">
              <div className="group relative h-full w-full cursor-pointer overflow-hidden">
                <img
                  src={post.media}
                  alt={post.caption}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 opacity-0 transition-all group-hover:bg-opacity-50 group-hover:opacity-100">
                  <div className="flex items-center space-x-4 text-white">
                    <div className="flex items-center">
                      <i className="fas fa-heart mr-2"></i>
                      <span>{post.likesCount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav activeTab="search" />
    </div>
  );
}

export default MainComponent;