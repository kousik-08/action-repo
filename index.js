const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

//Middleware - Plugin
app.use(express.urlencoded({ extended: false}));

app.get("/api/users", (req,res) => {
    return res.json(users);
});

app.get("/api/users/:id", (req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
});

app.post("/api/users", (req,res) => {
    const body = req.body;
    users.push({...body, id: users.length + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({status: "Success", id: users.length});
    });
});

app.patch("/api/users/:id", (req, res) => {
    return res.json({ status: "Panding"});
});

app.delete("/api/users/:id", (req, res) => {
    return res.json({ status: "Panding"});
});

app.get("/users", (req,res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`)}
    </ul>
    `;
    res.send(html);
});

app.listen(PORT, () => console.group(`Server Started at Port ${PORT}`));