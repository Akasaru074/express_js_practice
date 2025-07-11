const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.static(__dirname + "/public/"));

app.get('*p', (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});


app.listen(PORT, ()=>{
    console.log(`Web server listening on port ${PORT}...`);
});