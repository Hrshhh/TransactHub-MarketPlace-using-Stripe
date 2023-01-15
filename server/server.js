import express from 'express';
import { readdirSync } from "fs";
// import router from './routes/auth';
require("dotenv").config();
import mongoose from "mongoose";
import cors from 'cors';

const morgan = require('morgan');
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
readdirSync("./routes").map((r) => {
    app.use('/api', require(`./routes/${r}`))
});

mongoose.connect(process.env.DATABASE).then(() => console.log("Db connected")).catch(() => console.log("DB Connection error"));


const port = process.env.PORT || 8001;
app.listen(port, () => console.log("Listening to the port"));