// src/components/AdminPanel.tsx
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase"; 
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth"; 
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from 'axios';



interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  youtubeVideo: string;
}

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]); 
  const usersCollection = collection(db, "users"); 
  const navigate = useNavigate();

  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState({
    id: "",
    title: "",
    content: "",
    author: "",
    youtubeVideo: ""
  });

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3004/api/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAddPost = async () => {
    try {
      const postWithId = { ...newPost, id: Date.now().toString() }; // Yangi postga id berish
      await axios.post('http://localhost:3004/api/posts', postWithId); // Backendga post yuborish
      fetchPosts(); // Postlarni yangilash
      alert("Post added successfully!");
      setNewPost({ title: "", content: "", author: "", youtubeVideo: "", id: "" }); // Formani tozalash
    } catch (error) {
      alert("Error adding post: " + error);
    }
  };
  
  // Postni o'chirish
  const handleDeletePost = async (postId: string) => {
    try {
      await axios.delete(`http://localhost:3004/api/posts/${postId}`);
      fetchPosts(); // Postlarni yangilash
      alert("Post deleted successfully!");
    } catch (error: any) {
      alert("Error deleting post: " + error.message);
    }
  };

  
  const handleLoadPostToEdit = (post: Post) => {
    setNewPost(post); // Tanlangan postni inputlarga yuklash
  };
  

  // Postni tahrirlash
  const handleEditPost = async (postId: string) => {
    const updatedPost = { ...newPost, id: postId }; // Yangi postni tayyorlash
  
    try {
      // PUT so'rovini yuborish
      const response = await axios.put(`http://localhost:3004/api/posts/${postId}`, updatedPost);
      
      if (response.status === 200) {
        // Ma'lumot muvaffaqiyatli yangilansa
        await fetchPosts(); // Postlarni yangilash
        alert("Post updated successfully!");
      } else {
        // Kutilmagan javob qaytsa
        alert("Unexpected response: " + response.status);
      }
    } catch (error: any) {
      // Xatoliklarni boshqarish
      const errorMessage = error.response?.data?.message || error.message || "Unknown error occurred";
      alert("Error updating post: " + errorMessage);
    }
  };
  


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/"); // Agar foydalanuvchi autentifikatsiyadan o'tmagan bo'lsa, Home sahifasiga o'tish
      } else {
        fetchUsers(); // Foydalanuvchi autentifikatsiyadan o'tgan bo'lsa, foydalanuvchilarni yuklash
      }
    });

    return () => unsubscribe(); // Tizimdan chiqishda obunani bekor qilish
  }, [navigate]);

  const fetchUsers = async () => {
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(userList);
  };

 

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); // Chiqishdan so'ng Home sahifasiga o'tish
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen ">
<div className="flex justify-between">
<h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded mb-4"
      >
        Logout
      </button>
</div>
<div className="Post">
<div className="p-4 bg-gray-100">

      {/* Yangi post qo'shish formasi */}
      <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add New Work</h2>
  
  <input
    type="text"
    placeholder="Title"
    value={newPost.title}
    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  />
  
  <textarea
    placeholder="Content"
    value={newPost.content}
    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  ></textarea>
  
  <input
    type="text"
    placeholder="It is use in the following programs:"
    value={newPost.author}
    onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  />
  
  <input
    type="url"
    placeholder="YouTube Video URL"
    value={newPost.youtubeVideo}
    onChange={(e) => setNewPost({ ...newPost, youtubeVideo: e.target.value })}
    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  />
  
  <button
    onClick={newPost.id ? () => handleEditPost(newPost.id) : handleAddPost}
    className={`w-full py-3 text-white font-semibold rounded-lg shadow-md ${
      newPost.id ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400`}
  >
    {newPost.id ? "Update Post" : "Add Post"}
  </button>
</div>


<h2 className="text-xl font-bold mb-4">Works</h2>
<table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
  <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
    <tr>
      <th className="py-3 px-4 text-left">Title</th>
      <th className="py-3 px-4 text-left">Content</th>
      <th className="py-3 px-4 text-left">It is use in the following programs:</th>
      <th className="py-3 px-4 text-left">YouTube Video</th>
      <th className="py-3 px-4 text-left">Actions</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-200">
    {posts
      .slice()
      .reverse()
      .map((post) => (
        <tr key={post.id} className="hover:bg-gray-50 transition duration-150">
          <td className="py-3 px-4 text-gray-800">{post.title}</td>
          <td className="py-3 px-4 text-gray-800">{post.content}</td>
          <td className="py-3 px-4 text-gray-800">{post.author}</td>
          <td className="py-3 px-4 text-blue-500">
            {post.youtubeVideo && (
              <a
                href={post.youtubeVideo}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Watch
              </a>
            )}
          </td>
          <td className="py-3 px-4 flex space-x-2">
            <button
              onClick={() => handleLoadPostToEdit(post)}
              className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-150"
            >
              Load to Edit
            </button>
            <button
              onClick={() => {
                console.log("Deleting post with ID:", post.id);
                handleDeletePost(post.id);
              }}
              className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-150"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
  </tbody>
</table>

    </div>
</div>
    </div>
  );
};

export default AdminPanel;