import express, { response } from 'express';
import { query, validationResult, body, matchedData, checkSchema } from 'express-validator';
import { createUserValiSchema, getUserValiSchema } from './utils/validationSchemas.mjs';
import userRouter from "./routes/users.mjs"
import cookieParser from 'cookie-parser';
import productRouter from "./routes/products.mjs"
import session from 'express-session';
import mockUsers from './utils/constants.mjs';
import passport from 'passport';
import "./strategies/local-strategy.mjs"



const app = express();
app.use(express.json());
app.use(cookieParser())

app.use(session({
    secret: "wisdomist",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60_000 * 60
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(userRouter);
app.use(productRouter);

const PORT = process.env.PORT || 3000;



app.get("/", (req, res) => {

    console.log(req.session);
    console.log(req.session.id);

    req.session.visited = true;
    res.cookie("hello", "world", { maxAge: 60000 * 60 * 2 })
    res.status(201).send("Hello World!");

})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



app.post('/api/auth',passport.authenticate("local"),  (req, res) => {
  /*   const { body: { username, password } } = req;
    const findUser = mockUsers.find((user) => user.username == username);
    if (!findUser) return res.status(401).send("Bad credentials");


    if (!findUser || findUser.password !== password) return res.status(401).send("Bad credentials");

    req.session.user = findUser;
    */
    return res.status(200).send("User"); 



});

app.get("/api/auth/status", (req, res) => {
    req.sessionStore.get(req.sessionID, (err, data) => {
        console.log(data);
    })
    return req.session.user? res.status(200).send(req.session.user): res.status(401).send("Not Authenticated");
})


app.post("/api/cart", (req, res) => {
    if (!req.session.user) return res.sendStatus(401);

    const { body: item } = req;
    const { cart } = req.session;
    if (cart) {
        cart.push(item);
    } else {
        res.status(201).send(item);
    }
});

app.get("/api/cart", (req, res) => {
    if (!req.session.user) return res.sendStatus(401);
    return res.send(req.session.cart ?? []);
})

