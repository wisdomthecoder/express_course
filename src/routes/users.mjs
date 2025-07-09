import { Router } from "express";

const router = Router();

router.get('/hi', (req, res) => {
    res.send("hello from router");
});

export default router;