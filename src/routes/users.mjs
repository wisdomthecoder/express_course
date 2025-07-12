import { Router } from "express";
// import { checkSchema } from 'express-validator';
const router = Router();
import { query, validationResult, body, matchedData, checkSchema } from 'express-validator';
import {createUserValiSchema, getUserValiSchema} from '../utils/validationSchemas.mjs';
import mockUsers from '../utils/constants.mjs'

router.get('/hi', (req, res) => {
    res.send("hello from router");
});

const loginMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
}
const resolveIndexByUserId = (req, res, next) => {
    const { body, params: { id } } = req;
    const parseId = parseInt(id);
    if (isNaN(parseId)) return res.sendStatus(400);

    const findUserIndex = mockUsers.findIndex((user) => user.id == parseId);
    if (findUserIndex == -1) return res.sendStatus(404);
    req.findUserIndex = findUserIndex;
    next();
}

// router.use(loginMiddleware);


router.get("/api/users",
    checkSchema(
        getUserValiSchema
    ), (req, res) => {
        const result = validationResult(req);
        console.log(result);

        console.log(req.query);
        const { filter, value } = req.query;
        if (filter && value) return res.send(mockUsers.filter((user) => user[filter].includes(value)))
        return res.send(mockUsers);
    });

router.post("/api/users",checkSchema(createUserValiSchema)
  ,
    (req, res) => {
        const result = validationResult(req)


        console.log(result);
        if (!result.isEmpty()) res.status(400).send({ error: result.array() })

        const data = matchedData(req);
        console.log(data)
        // const { data } = req;
        const newUser = {
            id: mockUsers[mockUsers.length - 1].id + 1, ...data
        }
        mockUsers.push(newUser);
        return res.status(201).send(newUser);
    })

router.get("/api/users/:id", (req, res) => {
    console.log(req.params);
    const parsedId = parseInt(req.params.id);

    if (isNaN(parsedId)) {
        return res.status(400).send("Bad Request, invalid id");
    } else {
        const findUser = mockUsers.find((user) => user.id == parsedId);
        if (!findUser) res.sendStatus(404);
        return res.send(findUser)

    }

});

router.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { body, findUserIndex } = req;
    mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
    return res.sendStatus(200);

});

router.patch('/api/users/:id', resolveIndexByUserId, (req, res) => {
    const { body, findUserIndex } = req;

    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
    return res.sendStatus(200);


});
router.delete('/api/users/:id', resolveIndexByUserId, (req, res) => {
    const { body, findUserIndex } = req;

    mockUsers.splice((findUserIndex))
    return res.sendStatus(200);


});
export default router;