const express = require("express");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

// Ana sayfa
server.get("/", (req, res) => {
  res.json({
    message: process.env.MESSAGE || "Server çalışıyor",
  });
});

// Geçici kullanıcı dizisi
const users = [
  { id: 1, kullaniciadi: "frodo", sifre: "1234" },
  { id: 2, kullaniciadi: "sam", sifre: "5678" },
];

// GET /api/kullanicilar
server.get("/api/kullanicilar", (req, res) => {
  res.status(200).json(users);
});

// POST /api/kayitol
server.post("/api/kayitol", (req, res) => {
  const { kullaniciadi, sifre } = req.body;

  if (!kullaniciadi || !sifre) {
    return res.status(400).json({
      message: "kullaniciadi ve sifre gerekli",
    });
  }

  const newUser = {
    id: users.length + 1,
    kullaniciadi,
    sifre,
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

// POST /api/giris
server.post("/api/giris", (req, res) => {
  const { kullaniciadi, sifre } = req.body;

  const user = users.find(
    (u) =>
      u.kullaniciadi === kullaniciadi &&
      u.sifre === sifre
  );

  if (!user) {
    return res.status(401).json({
      message: "Kullanıcı adı veya şifre hatalı.",
    });
  }

  res.status(200).json({
    message: `Hoş geldin ${user.kullaniciadi}`,
  });
});

module.exports = server;