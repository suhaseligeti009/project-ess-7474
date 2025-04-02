"use client";
import React from "react";



export default function Index() {
  return (function MainComponent({ activeTab = "feed" }) {
  const navItems = [
    { id: "feed", icon: "fa-home", label: "Feed", href: "/feed" },
    { id: "find", icon: "fa-search", label: "Find", href: "/find" },
    { id: "new", icon: "fa-plus-square", label: "New", href: "/new" },
    { id: "chats", icon: "fa-comment", label: "Chats", href: "/chats" },
    { id: "lifestyle", icon: "fa-circle-play", label: "Lifestyle", href: "/lifestyle" }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-2 py-2">
      <div className="mx-auto flex max-w-md items-center justify-around">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={`flex flex-col items-center p-2 ${
              activeTab === item.id
                ? "text-[#357AFF]"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <i className={`fas ${item.icon} text-2xl`}></i>
            <span className="mt-1 text-xs">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}

function StoryComponent() {
  return (
    <div className="h-screen bg-gray-100 p-4">
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold">Default State</h3>
        <MainComponent />
      </div>

      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold">Active: Find</h3>
        <MainComponent activeTab="find" />
      </div>

      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold">Active: New</h3>
        <MainComponent activeTab="new" />
      </div>

      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold">Active: Chats</h3>
        <MainComponent activeTab="chats" />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Active: Lifestyle</h3>
        <MainComponent activeTab="lifestyle" />
      </div>
    </div>
  );
});
}