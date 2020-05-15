const express =require('express');
 const app = new express();
 const port = 3000;
 app.get('/', (request, response) =>{
    response.send('Hello from Espress');
 });
 app.listen(port,()=>{
    console.log(`Express is listening on port ${port}`);
 });