import express from "express"
import axios from "axios"
import bodyParser from "body-parser"
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();
const myAPIToken = process.env.Your_API_TOKEN;

const app = express()
const port=3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.post("/CryptPrice",async (req,res)=>{
    const crypto = req.body.cryptoName;
    try {
        const response = await axios.get(`https://api.blockchain.com/v3/exchange/tickers/${crypto}`,{
            headers:{
                Authorization : `Bearer ${myAPIToken}` ,
            }
        });
        res.render("index.ejs",{content:response.data});
    } catch (error) {
        console.log("Failed to request: ",error.message);
        res.status(500).send("Failed to fetch data, Please try again.");
    }
})

app.listen(port,()=>{
    console.log(`server is running as port ${port}`);
});