const express = require('express');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors()); 


server.get("/", (req, res) => {
    res.json({message: process.env.MESSAGE || "Server çalışıyor"})
})
const users = [
    {id: 1, kullaniciadi: "frodo", sifre: "1234"},
    {id: 2, kullaniciadi: "sam", sifre: "5678"}
];

server.get("/api/kullanıcılar", (req, res) => {
    res.status(200).json(users);
})

server.post('/api/kayitol', (req, res) => {
    const {kullaniciadi, sifre} = req.body;

    if(!kullaniciadi || !sifre) {
        return res.status(400).json({message: "kullaniciadi ve sifre gerekli"})
    }

    const newUser = {
        id: users.length + 1,
        kullaniciadi,
        sifre
    };

    users.push(newUser);

    res.status(201).json(newUser)
})

server.post("/api/giris", (req, res) => {
    const {kullaniciadi, sifre} = req.body;

    const user = users.find(
        (u)=> u.kullaniciadi === kullaniciadi && u.sifre === sifre
    );

    if(!user) {
        return res.status(401).json({message: "kullanıcı bulunamadı"});

    }

    res.status(200).json({message: `Hoşgeldin ${kullaniciadi}`})
})

module.exports = server