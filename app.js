const express = require("express");
const app = express();
app.use('/PicturesLogo', express.static('PicturesLogo'));

app.set('view engine', 'ejs');

// app.use((req, res) => {
//     res.send("TEST, HELLO WORLD!!!!");
// })

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/home', (req, res) => {
    res.send("This is a Home Page!");
});

app.listen(3000, () => {
    console.log("serving on port 3000!");
});
