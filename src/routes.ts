import { response, Router } from "express";
import { createUserController } from "./useCases";

const router = Router();

router.post('/users', (req, res) => {
    return createUserController.execute(req, res);
});

export {router}

