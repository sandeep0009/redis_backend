import { Router } from "express";
import { create, login, update } from "./user_controller";

const router=Router();

router.post('/create',create);
router.post('/login',login);
router.patch('/update',update);

export default router