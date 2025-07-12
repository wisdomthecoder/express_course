import express from 'express';
import { query, validationResult, body, matchedData, checkSchema } from 'express-validator';
import {createUserValiSchema, getUserValiSchema} from './utils/validationSchemas.mjs';
import userRouter from "./routes/users.mjs"
import cookieParser from 'cookie-parser';
import productRouter from "./routes/products.mjs"
import session from 'express-session';



const app = express();
app.use(express.json());
app.use(cookieParser())

app.use(session({
    secret: "wisdomist",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge:60_000*60
    }
}))
app.use(userRouter);
app.use(productRouter);

const PORT = process.env.PORT || 3000;



app.get("/", (req, res) => {   

    console.log(req.session);
    console.log(req.session.id);

    req.session.visited = true;
    res.cookie("hello", "world",{maxAge:60000*60*2})
    res.status(201).send("Hello World!");

})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

