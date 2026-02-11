import express from 'express';

const app = express();
const port = 3000;

app.get('/',(req,res)=>{
    res.send('Hellooooo');
});

app.listen(port,()=>{
    console.log('listening to port');
});

