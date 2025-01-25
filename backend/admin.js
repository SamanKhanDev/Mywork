const bcrypt = require("bcryptjs");

// Adminni yaratish
const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10); // O'zingizning parolingizni kiriting
  const admin = new Admin({
    email: "admin@example.com",
    password: hashedPassword,
  });
  await admin.save();
  console.log("Admin created");
};

createAdmin();
