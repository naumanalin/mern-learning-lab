const express = require('express')
const app = express();
const port = 8000;
const userModel = require('./models/users.js')
const postModel = require('./models/post.js')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.render('index')
})

//  login route
app.get('/login', (req, res)=>{
    res.render('login');
})

// login post route
app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    
    try {
        const user = await userModel.findOne({ email });
        
        if (!user) return res.status(400).send("Something went wrong");
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) return res.status(500).send("Error during password comparison");

            if (result) {
                var token = jwt.sign({ email: email, userid: user._id }, "securetKey");
                res.cookie("token", token);
                return res.status(200).redirect('/profile');
            } else {
                return res.status(400).send('Incorrect credentials');
            }
        });
    } catch (err) {
        res.status(500).send("Error during login");
    }
});


// logout route
app.get('/logout', (req, res)=>{
    res.cookie("token", "");
    res.redirect('/')
})

// register post route
app.post('/register', async (req, res) => {
    let { username, name, email, age, password } = req.body;
    
    try {
        const user = await userModel.findOne({ email }); // Use await for asynchronous query

        if (user) return res.status(400).send("User Already Exists");

        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.status(500).send("Error generating salt");

            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.status(500).send("Error hashing password");

                // Create the user
                let newuser = await userModel.create({
                    username,
                    name,
                    email,
                    age,
                    password: hash
                });

                // Generate the JWT token with newuser._id instead of user._id
                var token = jwt.sign({ email: email, userid: newuser._id }, "securetKey");
                res.cookie("token", token);
                res.send('User created successfully');
            });
        });
    } catch (err) {
        res.status(500).send("Error during registration");
    }
});

// protect profile route
app.get('/profile', isLoggedin,async (req, res)=>{
    let user = await userModel.findOne({email: req.user.email}).populate("posts");
    console.log(user.posts);
    res.render('profile', {user})
});

// Create post route
app.post('/post', isLoggedin, async (req, res)=>{
    let user = await userModel.findOne({email: req.user.email})
    let {content} = req.body;

    const post = await postModel.create({
        user: user._id,
        content: content
    })

    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile')
})

// protected route middleware
function isLoggedin(req, res, next){
    if(req.cookies.token === "") res.redirect("/login")
    else {
        let data = jwt.verify(req.cookies.token, "securetKey");
        req.user = data;
        next();
    }
}

app.listen(port, () => console.log(`Server is running at port: ${port}`));
