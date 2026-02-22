import { Router } from "express";
import { eventController } from "../controllers/eventController";
import { validateBody, validateParams } from "../middleware/validate";
import { createEventSchema, updateEventSchema, eventIdParamSchema } from "../validation/eventValidation";

const router = Router();

router.post("/", validateBody(createEventSchema), eventController.create);
router.get("/", eventController.getAll);
router.get("/:id", validateParams(eventIdParamSchema), eventController.getById);
router.put("/:id", validateParams(eventIdParamSchema), validateBody(updateEventSchema), eventController.update);
router.delete("/:id", validateParams(eventIdParamSchema), eventController.remove);

export default router;