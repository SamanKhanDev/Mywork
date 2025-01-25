import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import data from './data.json';
import background from "../assets/images/backgroundsite.svg";

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  youtubeVideo: string;
}

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [views, setViews] = useState<number>(0); // Ko'rishlar sonini saqlash
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // JSON-dagi postni topish
    const foundPost = data.find((post) => post.id === id);
    if (foundPost) {
      setPost(foundPost);

      // YouTube ko'rishlar sonini olish
      const videoId = getYouTubeVideoId(foundPost.youtubeVideo);

      fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=AIzaSyC7LTNdrDjhvz4gMwUEbqb3NECS_PvS37w`)
        .then((response) => response.json())
        .then((data) => {
          if (data.items && data.items.length > 0) {
            setViews(Number(data.items[0].statistics.viewCount)); // Ko'rishlar sonini olish
          }
        })
        .catch((error) => console.error('Error fetching views:', error))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  // YouTube video ID olish
  const getYouTubeVideoId = (youtubeUrl: string): string => {
    const videoId = youtubeUrl.split('v=')[1]?.split('&')[0];
    return videoId || '';
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found!</div>;
  }

  const getYouTubeEmbedLink = (youtubeUrl: string): string => {
    const videoId = getYouTubeVideoId(youtubeUrl);
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6"
        style={{
          maxWidth: "800px",
          width: "90%",
          minHeight: "500px",
          zIndex: 10,
        }}
      >
        {post.youtubeVideo && (
          <div className="mb-4">
            <iframe
              src={getYouTubeEmbedLink(post.youtubeVideo)}
              title={post.title}
              className="w-full h-[400px] rounded-lg"
              allowFullScreen
            />
          </div>
        )}

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{post.title}</h2>
        <p className="text-gray-800 mb-4">{post.content}</p>
        <p className="text-gray-600 mb-4">
          <strong>It is used in the following programs:</strong> {post.author}
        </p>
        <p className="text-gray-500 mb-4">👀 Viewed: {views}</p> {/* Ko'rishlar soni */}
        <button
          onClick={() => navigate(-1)}
          style={{ background: '#111827' }}
          className="mt-4 px-4 py-2 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PostPage;
