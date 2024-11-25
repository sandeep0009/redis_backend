import userRouter from "../api/user/user_route";
import { Router } from "express";

const router=Router();

router.use('/api',userRouter);

export default router;