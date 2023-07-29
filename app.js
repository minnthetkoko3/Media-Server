require('dotenv').config();
const bodyParser = require('body-parser');
let express = require('express');
let hogan = require('hogan-express');
let path = require('path');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.engine('html', hogan)
app.set('view engine', 'html')

app.use('/assets', express.static(path.join(__dirname, 'assets')))


app.get('/', (req,res) => {
    res.render('index');
}); 

app.get('/about', (req,res) => {
    res.render('about');
}); 


// app.get("/api/post/:id", (req, res) => {
//     let id = req.params.id
//     res.send(`this is my ${id}`)
// });

// app.get("/api/user", (req,res) => {
//     let name = req.query.name;
//     let age = req.query.age;
//     res.send(`name ${name} age ${age}`);
// })

// app.post('/api/login', (req, res) => {
//     let name = req.body.name
//     let age = req.body.age

//     res.send(`name ${name} age ${age}`);
// })



// app.get('/', (req, res) => {
//     res.sendFile(__dirname + "/index.html")
// });

// app.get('/index.html', (req, res) => {
//     res.sendFile(__dirname + "/index.html")
// });

// app.get('/about.html', (req, res) => {
//     res.sendFile(__dirname + "/about.html")
// });


app.listen(process.env.PORT, () => {
    console.log(`server running at ${process.env.PORT}`)
})

