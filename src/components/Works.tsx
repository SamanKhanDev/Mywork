import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import data from './data.json'; // Faylga to'liq yo'lni ko'rsating
import postbanner from "../assets/images/bannerpost.jpg";

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  youtubeVideo: string;
}

const Works: React.FC = () => {
  const [posts] = useState<Post[]>(data); // Mahalliy fayldan ma'lumotlarni olish

  return (
    <div className="container mx-auto px-4 pb-16 min-h-screen">
      <h1 className="text-3xl font-bold text-center my-8">My Portfolio</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts
            .slice() // Asl massivni o'zgartirmaslik uchun nusxasini olish
            .reverse() // Teskari tartibda chiqarish
            .map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
              >
                <Link to={`/post/${post.id}`}>
                <div className="p-4">
                  <img
                    src={postbanner}
                    alt={post.title}
                    className="w-full h-68 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.content}</p>
                  <p className="text-sm text-gray-500">
                    <strong>It is use in the following programs:</strong> {post.author}
                  </p>
                  {post.youtubeVideo && (
                    <p className="mt-4">
                      <strong>YouTube Video:</strong>{' '}
                      <a
                        href={post.youtubeVideo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Watch Here
                      </a>
                    </p>
                  )}
                  {/* Link orqali post sahifasiga o'tish */}
                  <Link
                    to={`/post/${post.id}`}
                    className="text-blue-500 hover:underline mt-4 inline-block"
                  >
                    Read More
                  </Link>
                </div>
                </Link>
              </div>
            ))
        ) : (
          <p className="text-center text-gray-600">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Works;
