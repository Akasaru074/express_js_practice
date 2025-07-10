const express = require('express');
const fs = require("fs");
const app = express();
const PORT = 5000;

fs.writeFile("server.log", "", err => {
    if (err) console.error(err);
});

app.use((req, resp, next)=>{

    const now = new Date;
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const data = `${hour}:${minutes}:${seconds} ${req.method} ${req.url} ${req.get('user-agent')}`;
    // console.log(data);
    fs.appendFile("server.log", data + "\n", err => {
        if (err) return console.error(err);
        // console.log("File written succesfully");
    });
    next();
    
});

app.use(express.static(__dirname + "/public"));

// app.get('/', (_, resp)=>{
//     resp.sendFile(__dirname + "/index.html");
// });

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}...`);
})

