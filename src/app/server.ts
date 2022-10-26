import express from "express";
import BodyParser from 'body-parser'
import cors from 'cors';

import router from './config/router.config';

const app = express();
const PORT:Number = 4000;

app.use(BodyParser.urlencoded({extended:false}))

app.use(BodyParser.json());
app.use(cors())

router(app)

app.listen(PORT, () => {
    console.log(`Server Running in http://localhost:${PORT}`)
})