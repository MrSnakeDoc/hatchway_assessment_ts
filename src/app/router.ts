import { Router } from "express";
import { controller } from "./controllers/controller";
import { checks } from "./middlewares/checks";

const router = Router();

router.get("/ping", controller.ping).get("/posts", checks, controller.posts);

export default router;
