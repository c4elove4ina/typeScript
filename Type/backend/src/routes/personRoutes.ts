import { Router } from "express";
import {
  sign,
  check,
  create,
  pet,
  colors,
} from "../controllers/personController";

const router: Router = Router();

router.post("/sign", sign);
router.post("/check", check);
router.post("/create", create);
router.post("/pet", pet);
router.post("/colors", colors);

export default router;
