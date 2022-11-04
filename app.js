const express = require("express");
const app = express();


// app.use((req, res) => {
//     res.send("TEST, HELLO WORLD!!!!");
// })

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.get('/home', (req, res) => {
    res.send("This is a Home Page!");
});

app.listen(3000, () => {
    console.log("serving on port 3000!");
});
