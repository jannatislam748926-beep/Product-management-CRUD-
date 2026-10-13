import dotenv from 'dotenv';
dotenv.config()
import express from 'express';

import route from './Routes/Product.route.js';
import Dbconnection from './Config/db.config.js';

const app = express();
const PORT = process.env.PORT ||8081
  
//connections
Dbconnection();
//middleware
app.use(express.json());


// SERVER RESPONSE
app.get('/', (req, res) => {
  res.send('Hey! Buddy, This Product CRUD SERVER.')
})

app.use('/', route);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});