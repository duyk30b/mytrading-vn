const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>{
    res.send('Hello World, This is mytrading-vn homepage')
})

app.post('/tradingview', (req, res) =>{
    console.log(req.body);
    res.send({'testJson':'succes'})
})

app.listen(port, ()=>{
    console.log('Domain listening at http://localhost:' + port)
})