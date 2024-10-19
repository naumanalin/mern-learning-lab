const cookieParser = require('cookie-parser');
const express = require('express')
const app = express();
const port = 8000;
const path = require('path')
const userModel = require('./models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.render("index");
})

app.post('/create', async (req, res) => {
    const { username, email, password, age } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            const newUser = await userModel.create({
                name: username,
                email: email,
                password: hash,
                age: age
            })

            let token = jwt.sign({email: email}, "secrtKey");
            res.cookie("Token", token)

            res.send(newUser)
        })
    })

})


app.get('/logout', (req, res)=>{
    res.cookie("Token", "");
    res.redirect('/');
})


app.get('/login', (req, res)=>{
    res.render('login')
})

app.post('/login', async (req, res) => {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.send("Email not found");

    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({email: user.email}, 'secretkeey')
            res.cookie('logintoken', token)
            res.redirect('/');
        } else {
            res.send("Incorrect password");
        }
    });
});
 

app.listen(port, () => console.log(`server is runing at port: ${port}`))



