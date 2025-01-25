// Kerakli kutubxonalarni chaqiramiz
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

// CORS va JSON formatdagi so'rovlarni qabul qilishni yoqish
app.use(cors());
app.use(express.json());

// JSON fayl yo'li
const postsFilePath = "../data.json";

// GET so'rovi: Ma'lumotlarni o'qish
app.get('/api/posts', (req, res) => {
  fs.readFile(postsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading posts file' });
    }
    res.status(200).json(JSON.parse(data)); // Ma'lumotlarni yuborish
  });
});

// POST so'rovi: Yangi ma'lumot qo'shish
app.post('/api/posts', (req, res) => {
  const newPost = req.body; // Foydalanuvchidan kelgan yangi ma'lumot

  fs.readFile(postsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading posts file' });
    }
    
    const posts = JSON.parse(data); // Avvalgi postlarni olish
    posts.push(newPost); // Yangi postni qo'shish

    fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error writing to posts file' });
      }
      res.status(201).json(newPost); // Yangi postni javob sifatida yuborish
    });
  });
});

// DELETE so'rovi: Postni o'chirish
app.delete('/api/posts/:id', (req, res) => {
  const postId = req.params.id; // URL-dan id olish

  fs.readFile(postsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading posts file' });
    }

    const posts = JSON.parse(data); // Fayldan ma'lumotni o'qish
    const postIndex = posts.findIndex(post => post.id === postId); // ID asosida postni topish

    if (postIndex === -1) {
      return res.status(404).json({ message: 'Post not found' });
    }

    posts.splice(postIndex, 1); // Postni o'chirish

    fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error writing to posts file' });
      }
      res.status(200).json({ message: 'Post deleted successfully' });
    });
  });
});


// Ko'rishlar sonini oshirish uchun PUT so'rovi
app.get('/api/getVideoViews/:videoId', async (req, res) => {
  const videoId = req.params.videoId;
  const apiKey = 'AIzaSyC7LTNdrDjhvz4gMwUEbqb3NECS_PvS37w'; // Serverda xavfsiz saqlang
  const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.items[0].statistics.viewCount);
  } catch (error) {
    console.error('Error fetching YouTube views:', error);
    res.status(500).send('Error fetching data');
  }
});


// PUT so'rovi: Ma'lumotlarni yangilash
app.put('/api/posts/:id', (req, res) => {
  const postId = req.params.id; // URL-dan id olish
  const updatedPost = req.body; // Foydalanuvchi yuborgan yangilangan ma'lumot

  fs.readFile(postsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading posts file' });
    }

    const posts = JSON.parse(data); // Fayldagi postlarni o'qish
    const postIndex = posts.findIndex(post => post.id === postId);

    if (postIndex === -1) {
      return res.status(404).json({ message: 'Post not found' });
    }

    posts[postIndex] = updatedPost; // Postni yangilash

    fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error writing to posts file' });
      }
      res.status(200).json({ message: 'Post updated successfully' });
    });
  });
});

// Serverni ishga tushirish
const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
