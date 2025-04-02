"use client";
import React from "react";



export default function Index() {
  return (function MainComponent({ 
  imageUrl, 
  username, 
  hasStory = false, 
  isViewed = false, 
  size = "md",
  onClick 
}) {
  const sizes = {
    sm: "w-14 h-14",
    md: "w-20 h-20",
    lg: "w-24 h-24"
  };

  const ringColors = {
    active: "from-[#FF5F6D] to-[#FFC371]",
    viewed: "from-gray-200 to-gray-300",
    none: "from-transparent to-transparent"
  };

  const getRingColor = () => {
    if (!hasStory) return ringColors.none;
    return isViewed ? ringColors.viewed : ringColors.active;
  };

  return (
    <div className="flex flex-col items-center">
      <button 
        onClick={onClick}
        className="flex items-center justify-center rounded-full p-[2px] transition-transform hover:scale-105"
        style={{
          background: hasStory ? `linear-gradient(45deg, ${getRingColor().split(' ')[1]}, ${getRingColor().split(' ')[3]})` : 'none'
        }}
      >
        <div className={`${sizes[size]} overflow-hidden rounded-full border-2 border-white bg-white`}>
          <img
            src={imageUrl}
            alt={`${username}'s story`}
            className="h-full w-full object-cover"
          />
        </div>
      </button>
      {username && (
        <span className="mt-1 text-xs text-gray-900">{username}</span>
      )}
    </div>
  );
}

function StoryComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-8">
      <div className="flex flex-wrap items-end gap-4">
        <MainComponent 
          imageUrl="/images/avatar1.jpg"
          username="sarah_123"
          hasStory={true}
          isViewed={false}
          size="sm"
          onClick={() => {}}
        />

        <MainComponent 
          imageUrl="/images/avatar2.jpg"
          username="john_doe"
          hasStory={true}
          isViewed={true}
          size="md"
          onClick={() => {}}
        />

        <MainComponent 
          imageUrl="/images/avatar3.jpg"
          username="mike_smith"
          hasStory={false}
          size="lg"
          onClick={() => {}}
        />
      </div>
    </div>
  );
});
}