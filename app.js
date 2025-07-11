const crypto = require("crypto");
const express = require('express');
const app = express();
const PORT = 5000;

const users = [];

app.use(express.json());
app.use(express.static("public"));

app.get("/api/users", async(_, resp) => resp.send(users));

app.get("/api/users/:id", async(req, resp)=> {

    resp.setHeader("Access-Control-Allow-Origin", "*");

    const id = req.params.id;
    const user = users.find(u => u.id === id);
    if (user) resp.send(user);
    else resp.sendStatus(404);
});

app.post("/api/users", async(req, resp)=>{

    resp.setHeader("Access-Control-Allow-Origin", "*");


    if (!req.body) return resp.sendStatus(400);

    const userName = req.body.name;
    const userAge = req.body.age;
    const user = {id: crypto.randomUUID(), name: userName, age: userAge};

    users.push(user);
    resp.send(user);

});

app.delete("/api/users/:id", async(req,resp)=>{

    resp.setHeader("Access-Control-Allow-Origin", "*");

    const id = req.params.id;
    let index = users.findIndex(u => u.id === id);
    if (index > -1) {
        const user = users.splice(index, 1)[0];
        resp.send(user);
    } else {
        resp.status(404).send("User not found");
    }

});

app.put("/api/users", async(req, resp)=>{

    resp.setHeader("Access-Control-Allow-Origin", "*");

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
    console.log(`Server listening on port ${PORT}...`);
});