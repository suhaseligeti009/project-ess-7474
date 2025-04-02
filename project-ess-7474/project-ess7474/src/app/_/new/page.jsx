"use client";
import React from "react";
import BottomNav from "../../components/bottom-nav";
import { useUpload } from "../utilities/runtime-helpers";

function MainComponent() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [upload, { loading: uploadLoading }] = useUpload();
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!file) {
        throw new Error("Please select an image or video to post");
      }

      const { url, error: uploadError } = await upload({ file });
      if (uploadError) {
        throw new Error(uploadError);
      }

      // Here you would typically save the post data to your backend
      // For now, we'll just simulate success and redirect
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="fixed top-0 z-10 w-full border-b bg-white p-4">
        <div className="mx-auto max-w-lg flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="text-gray-600"
          >
            <i className="fas fa-times text-2xl"></i>
          </button>
          <h1 className="text-xl font-semibold">New</h1>
          <button
            onClick={handleSubmit}
            disabled={loading || uploadLoading || !file}
            className="text-[#357AFF] disabled:opacity-50"
          >
            Share
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-lg pt-16">
        <div className="p-4">
          <div className="mb-6 rounded-lg border-2 border-dashed border-gray-300 bg-white p-4">
            {preview ? (
              <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                <img
                  src={preview}
                  alt="Upload preview"
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={() => {
                    setPreview(null);
                    setFile(null);
                  }}
                  className="absolute right-2 top-2 rounded-full bg-black bg-opacity-50 p-2 text-white"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ) : (
              <label className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-gray-300 bg-gray-50">
                <i className="fas fa-camera mb-2 text-3xl text-gray-400"></i>
                <span className="text-sm text-gray-500">
                  Click to upload media
                </span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-lg bg-white p-4">
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption..."
                className="min-h-[100px] w-full resize-none text-lg outline-none"
              />
            </div>

            <div className="flex items-center rounded-lg bg-white p-4">
              <i className="fas fa-map-marker-alt mr-4 text-xl text-gray-400"></i>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Add location"
                className="w-full text-lg outline-none"
              />
            </div>

            <div className="flex items-center rounded-lg bg-white p-4">
              <i className="fas fa-hashtag mr-4 text-xl text-gray-400"></i>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Add tags (separated by spaces)"
                className="w-full text-lg outline-none"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-500">
              {error}
            </div>
          )}
        </div>
      </div>

      <BottomNav activeTab="create" />
    </div>
  );
}

export default MainComponent;