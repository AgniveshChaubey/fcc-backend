let express = require('express');
let app = express();

// console.log("Hello World");

// app.get('/', (req, res)=>{
//     res.send("Hello Express");
// })


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
})

app.use('/public', express.static(__dirname + "/public"))

// app.get('/json', (req, res)=>{
//     res.send({"message": "Hello json"})
// })

app.get('/json', (req, res) => {
    if (process.env.MESSAGE_STYLE == "uppercase") {
        res.json({ "message": "Hello json".toUpperCase() })
    } else {
        res.json({ "message": "Hello json" })
    }
})

app.use((req, res, next)=>{
    var string = `${req.method} ${req.path} ${req.ip}`;
    console.log(string);
    next();
});

app.get('/now', (req, res, next)=>{
    req.time = new Date().toString();
    next();
}, (req, res)=>{
    res.json({"time": req.time});
})

module.exports = app;
