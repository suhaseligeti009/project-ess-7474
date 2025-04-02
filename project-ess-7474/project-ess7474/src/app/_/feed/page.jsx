"use client";
import React from "react";
import BottomNav from "../../components/bottom-nav";

function MainComponent() {
  const [error, setError] = useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [showStories, setShowStories] = useState(false);
  const stories = [
    {
      id: 1,
      username: "emily_travels",
      userAvatar: "/images/avatar1.jpg",
      media: "/images/post1.jpg",
      timestamp: "2h ago",
      hasStory: true,
    },
    {
      id: 2,
      username: "food_lover",
      userAvatar: "/images/avatar2.jpg",
      media: "/images/post2.jpg",
      timestamp: "3h ago",
      hasStory: true,
    },
    {
      id: 3,
      username: "tech_guru",
      userAvatar: "/images/avatar3.jpg",
      media: "/images/post3.jpg",
      timestamp: "5h ago",
      hasStory: true,
    },
    {
      id: 4,
      username: "fitness_pro",
      userAvatar: "/images/avatar4.jpg",
      media: "/images/post4.jpg",
      timestamp: "6h ago",
      hasStory: true,
    },
    {
      id: 5,
      username: "art_daily",
      userAvatar: "/images/avatar5.jpg",
      media: "/images/post5.jpg",
      timestamp: "8h ago",
      hasStory: true,
    },
    {
      id: 6,
      username: "music_vibes",
      userAvatar: "/images/avatar6.jpg",
      media: "/images/post6.jpg",
      timestamp: "12h ago",
      hasStory: true,
    },
  ];

  const posts = [
    {
      username: "emily_travels",
      userAvatar: "/images/avatar1.jpg",
      location: "Paris, France",
      media: "/images/post1.jpg",
      caption: "Evening at the Eiffel Tower ✨",
      likesCount: 1542,
      comments: [{ id: 1, text: "Beautiful shot!" }],
    },
    {
      username: "food_lover",
      userAvatar: "/images/avatar2.jpg",
      location: "Italian Restaurant",
      media: "/images/post2.jpg",
      caption: "Homemade pasta! 🍝",
      likesCount: 982,
      comments: [{ id: 1, text: "Looks delicious!" }],
    },
    {
      username: "tech_guru",
      userAvatar: "/images/avatar3.jpg",
      media: "/images/post3.jpg",
      caption: "New setup complete 💻",
      likesCount: 2103,
      comments: [{ id: 1, text: "Clean setup!" }],
    },
  ];

  useEffect(() => {
    if (showStories) {
      const timer = setTimeout(() => {
        if (currentStoryIndex < stories.length - 1) {
          setCurrentStoryIndex(currentStoryIndex + 1);
        } else {
          setShowStories(false);
          setCurrentStoryIndex(0);
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentStoryIndex, showStories]);

  const StoryView = () => {
    if (!showStories) return null;
    const story = stories[currentStoryIndex];

    return (
      <div className="fixed inset-0 z-50 bg-black">
        <div className="relative h-full w-full">
          <img
            src={story.media}
            alt={`${story.username}'s story`}
            className="h-full w-full object-cover"
          />

          <div className="absolute top-0 w-full p-4">
            <div className="flex w-full gap-1">
              {stories.map((_, index) => (
                <div
                  key={index}
                  className="h-0.5 flex-1 overflow-hidden bg-gray-600"
                >
                  <div
                    className={`h-full bg-white transition-all duration-[5000ms] ease-linear ${
                      index < currentStoryIndex
                        ? "w-full"
                        : index === currentStoryIndex
                        ? "w-0 animate-progress"
                        : "w-0"
                    }`}
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center">
              <img
                src={story.userAvatar}
                alt={story.username}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="ml-2 text-white">{story.username}</span>
              <span className="ml-2 text-sm text-gray-300">
                {story.timestamp}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowStories(false)}
            className="absolute right-4 top-4 text-white"
          >
            <i className="fas fa-times text-2xl"></i>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="sticky top-0 z-10 bg-white px-4 py-3 shadow-sm">
        <h1 className="text-2xl font-bold">Feed</h1>
      </div>

      <div className="flex flex-wrap gap-4 px-4 py-4">
        {stories.map((story, index) => (
          <div
            key={story.id}
            onClick={() => {
              setCurrentStoryIndex(index);
              setShowStories(true);
            }}
            className="cursor-pointer"
          >
            <StoryCircle
              imageUrl={story.userAvatar}
              username={story.username}
              hasStory={story.hasStory}
              isViewed={false}
              size="md"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 px-4">
        {error ? (
          <div className="w-full rounded-lg bg-red-50 p-4 text-red-500">
            {error}
          </div>
        ) : (
          posts.map((post, index) => (
            <PostCard
              key={index}
              {...post}
              onLike={() => {}}
              onComment={() => {}}
              onShare={() => {}}
              onSave={() => {}}
            />
          ))
        )}
      </div>

      <StoryView />
      <BottomNav activeTab="feed" />

      <style jsx global>{`
        @keyframes progress {
          from { width: 0; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress 5s linear forwards;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;