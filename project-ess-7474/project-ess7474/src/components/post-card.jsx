"use client";
import React from "react";



export default function Index() {
  return (function MainComponent({ 
  username, 
  userAvatar, 
  location, 
  media, 
  caption, 
  likesCount, 
  comments, 
  isLiked = false, 
  isSaved = false,
  onLike,
  onComment,
  onShare,
  onSave
}) {
  return (
    <div className="w-full max-w-[468px] rounded-lg border border-gray-200 bg-white shadow">
      <div className="flex items-center p-4">
        <img 
          src={userAvatar} 
          alt={`${username}'s profile`}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="ml-3 flex-1">
          <p className="font-semibold text-gray-900">{username}</p>
          {location && (
            <p className="text-sm text-gray-500">{location}</p>
          )}
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <i className="fas fa-ellipsis-h"></i>
        </button>
      </div>

      <div className="relative aspect-square w-full">
        <img 
          src={media} 
          alt="Post content"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between pb-4">
          <div className="flex gap-4">
            <button 
              onClick={onLike}
              className={`text-2xl ${isLiked ? 'text-red-500' : 'text-gray-700 hover:text-gray-900'}`}
            >
              <i className={`${isLiked ? 'fas' : 'far'} fa-heart`}></i>
            </button>
            <button 
              onClick={onComment}
              className="text-2xl text-gray-700 hover:text-gray-900"
            >
              <i className="far fa-comment"></i>
            </button>
            <button 
              onClick={onShare}
              className="text-2xl text-gray-700 hover:text-gray-900"
            >
              <i className="far fa-paper-plane"></i>
            </button>
          </div>
          <button 
            onClick={onSave}
            className={`text-2xl ${isSaved ? 'text-black' : 'text-gray-700 hover:text-gray-900'}`}
          >
            <i className={`${isSaved ? 'fas' : 'far'} fa-bookmark`}></i>
          </button>
        </div>

        {likesCount > 0 && (
          <p className="mb-2 font-semibold text-gray-900">
            {likesCount.toLocaleString()} likes
          </p>
        )}

        {caption && (
          <p className="mb-2 text-gray-900">
            <span className="font-semibold">{username}</span> {caption}
          </p>
        )}

        {comments && comments.length > 0 && (
          <button className="text-sm text-gray-500">
            View all {comments.length} comments
          </button>
        )}
      </div>
    </div>
  );
}

function StoryComponent() {
  const samplePost = {
    username: "johndoe",
    userAvatar: "/images/avatar.jpg",
    location: "New York, NY",
    media: "/images/post.jpg",
    caption: "Beautiful sunset in the city! 🌇",
    likesCount: 1234,
    comments: [
      { id: 1, text: "Amazing shot!" },
      { id: 2, text: "Love this view" }
    ]
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="space-y-8">
        <MainComponent 
          {...samplePost}
          isLiked={false}
          isSaved={false}
          onLike={() => {}}
          onComment={() => {}}
          onShare={() => {}}
          onSave={() => {}}
        />

        <MainComponent 
          {...samplePost}
          isLiked={true}
          isSaved={true}
          onLike={() => {}}
          onComment={() => {}}
          onShare={() => {}}
          onSave={() => {}}
        />
      </div>
    </div>
  );
});
}