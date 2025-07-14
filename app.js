const express = require('express');
const app = express();
const port = 8080;
app.use(express.json());


const checkAccess = ((req, res, next) => {
    if(req.query.role==='admin')
    next(); // moves to the next middleware or route
    else
        res.status(403).send('Access denied');
});

app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url} timestamp: ${new Date().toISOString()}'`);
    next(); // moves to the next middleware or route
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/dashboard', checkAccess, (req, res)=>{
    res.send('Welcome to the dashboard');
})


app.post('/login', (req, res)=>{
    const { username, password } = req.body;
    console.log(`Username: ${username}, Password: ${password}`);

    if (username === 'admin' && password === '123') {
        res.send('Login successful');
    }
    else {
        res.status(401).send('Login failed');
    }
});

app.post('/register', (req, res)=>{
    const {username, email, password}= req.body;
    console.log(`Name: ${username}, Email: ${email}, Password: ${password}`);

    res.send('Registration successful');
})

app.get('/secret', checkAccess, (req, res) => {
    res.send('you got access');
});

app.get('/error', (req, res, next) => {
    const err = new Error('Simulated crash');
    next(err);
});

app.get((req, res) => {
    res.status(404).send('Page not found');
});

app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).send('Something broke!');
});



app.listen(port, ()=> {
    console.log(`Server is running on http://localhost:${port}`);
})