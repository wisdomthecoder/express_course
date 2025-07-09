import express, { response } from 'express';
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const mockUsers = [
    {
        id: 1,
        username: "wisdom",
        displayName: "Wisdom"
    },
    {
        id: 2,
        username: "kwopnan ",
        displayName: "Kwopnan"
    },
    {
        id: 3,
        username: "manret",
        displayName: "Manret"
    },
    {
        id: 4,
        username: "nanmet",
        displayName: "Nanment"
    },

    {
        id: 5,
        username: "dang",
        displayName: "Dang"
    },


];

app.get("/", (req, res) => {
    res.status(201).send("Hello World!");

})

app.get("/api/users", (req, res) => {
    console.log(req.query);
    const { filter, value } = req.query;
    if (filter && value) return res.send(mockUsers.filter((user) => user[filter].includes(value)))
    return res.send(mockUsers);
});

app.post("/api/users", (req, res) => {
    console.log(req.body)
    const { body } = req;
    const newUser = {
        id: mockUsers[mockUsers.length - 1].id + 1, ...body
    }
    mockUsers.push(newUser);
    return res.status(201).send(newUser);
})

app.get("/api/users/:id", (req, res) => {
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

app.put("/api/users/:id", (req, res) => {
    const { body, params: { id } } = req;
    const parseId = parseInt(id);
    if (isNaN(parseId)) return res.sendStatus(400);
    
    const findUserIndex = mockUsers.findIndex((user) => user.id == parseId);
    if (findUserIndex == -1) return res.sendStatus(404);

    mockUsers[findUserIndex] = { id: parseId, ...body };
    return res.sendStatus(200);

})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

