const crypto = require("crypto");
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

const users = [];

const corsOptions = {
  origin: 'http://185.58.115.54:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("http://185.58.115.54:3000/api/users", async(_, resp) => resp.send(users));

app.get("http://185.58.115.54:3000/api/users/:id", async(req, resp)=> {
    const id = req.params.id;
    const user = users.find(u => u.id === id);
    if (user) resp.send(user);
    else resp.sendStatus(404);
});

app.post("http://185.58.115.54:3000/api/users", async(req, resp)=>{

    if (!req.body) return resp.sendStatus(400);

    const userName = req.body.name;
    const userAge = req.body.age;
    const user = {id: crypto.randomUUID(), name: userName, age: userAge};

    users.push(user);
    resp.send(user);

});

app.delete("http://185.58.115.54:3000/api/users/:id", async(req,resp)=>{

    const id = req.params.id;
    let index = users.findIndex(u => u.id === id);
    if (index > -1) {
        const user = users.splice(index, 1)[0];
        resp.send(user);
    } else {
        resp.status(404).send("User not found");
    }

});

app.put("http://185.58.115.54:3000/api/users", async(req, resp)=>{
    if (!req.body) return resp.sendStatus(400);

    const id = req.body.id;
    const userName = req.body.name;
    const userAge = req.body.age;

    const index = users.findIndex(u => u.id === id);
    if (index > -1) {
        const user = users[index];
        user.name = userName;
        user.age = userAge;
        resp.send(user);
    } else {
        resp.status(404).send("User not found");
    }

});


app.listen(PORT, ()=>{
    console.log(`API Server listening on port ${PORT}...`);
});