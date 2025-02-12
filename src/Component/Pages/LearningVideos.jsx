import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Play, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function LearningVideos() {
  const [activeVideo, setActiveVideo] = useState(null);

  const { data: videos = [], isLoading, isError } = useQuery({
    queryKey: ['learningVideos'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/learningVideo`);
      return response.data.data;
    },
  });
  const handleVideoClick = (videoId) => {
    setActiveVideo(videoId === activeVideo ? null : videoId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">লার্নিং ভিডিও</h1>
          <p className="mt-2 text-lg text-gray-600">
            রিলাইফমার্ট ব্যবহারের সম্পূর্ণ গাইডলাইন
          </p>
        </div>

        {/* Video List */}
        <div className="space-y-8">
          {videos.map((video, index) => (
            <div 
              key={video._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {index+1}. {video.title}
                </h2>
                
                {/* Video Player Container */}
                <div 
                  className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden"
                >
                  {activeVideo === video._id ? (
                    <div className="relative w-full h-full">
                      <ReactPlayer
                        url={video.videoUrl}
                        width="100%"
                        height="100%"
                        playing
                        controls
                      />
                      <button
                        onClick={() => handleVideoClick(video._id)}
                        className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70 transition-all"
                      >
                        <X className="w-6 h-6 text-white" />
                      </button>
                    </div>
                  ) : (
                    <div 
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                      onClick={() => handleVideoClick(video._id)}
                    >
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Description */}
                <div className="mt-4">
                  <p className="text-gray-600">
                    এই ভিডিওতে আপনি শিখবেন কিভাবে {video.title.toLowerCase()}
                  </p>
                  {activeVideo !== video._id && (
                    <div className="mt-3 flex items-center text-sm text-gray-500">
                      <span className="inline-flex items-center cursor-pointer" onClick={() => handleVideoClick(video._id)}>
                        <Play className="w-4 h-4 mr-1" />
                        ভিডিও দেখুন
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            কোন প্রশ্ন থাকলে আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন
          </p>
          <a 
            href="/support"
            className="mt-2 inline-flex items-center text-red-600 hover:text-red-700"
          >
            সাপোর্ট সেন্টার →
          </a>
        </div>
      </div>
    </div>
  );
}