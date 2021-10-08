require('dotenv').config();
const port = process.env.PORT || 5000;
const express=require('express');
const mongoose=require('mongoose');
const app = express();

mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) return console.log("Connection to MongoDB failed.\n", err);
      return console.log("Connected to MongoDB");
    }
  );

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/auth',require('./routes/auth'));


app.listen(port,()=>{
    console.log(`listening on ${port}`)
})