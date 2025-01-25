const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3001; // Frontend uchun portdan boshqa portni ishlatamiz (masalan, 3001).

app.use(cors());
app.use(express.json());

const postsFilePath = "data.json"; // JSON fayl yo'li

// GET: Postlarni olish
app.get("/api/posts", (req, res) => {
  fs.readFile(postsFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading posts file" });
    }
    res.json(JSON.parse(data));
  });
});

// POST: Yangi post qo'shish
app.post("/api/posts", (req, res) => {
  const newPost = req.body;

  fs.readFile(postsFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading posts file" });
    }

    const posts = JSON.parse(data);
    posts.push(newPost); // Yangi postni qo'shish

    fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error writing to posts file" });
      }
      res.status(201).json(newPost); // Yangi postni qaytarish
    });
  });
});

app.delete('/api/posts/:id', async (req, res) => {
  const postId = req.params.id;  // URL-dan id olish
  const postIndex = posts.findIndex(post => post.id === postId);

  if (postIndex !== -1) {
    posts.splice(postIndex, 1);  // O'chirish
    res.status(200).send({ message: 'Post deleted successfully' });
  } else {
    res.status(404).send({ error: 'Post not found' });
  }
});

app.delete('/api/posts/:id', (req, res) => {
  const postId = req.params.id;  // URL-dan id olish
  if (!postId) {
    return res.status(400).send({ error: 'Post ID is required' });  // Agar postId mavjud bo'lmasa
  }

  const postIndex = posts.findIndex(post => post.id === postId);
  if (postIndex === -1) {
    return res.status(404).send({ error: 'Post not found' });
  }

  posts.splice(postIndex, 1);  // Postni o'chirish
  res.status(200).send({ message: 'Post deleted successfully' });
});




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
