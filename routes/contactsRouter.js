import express from "express";
import ctrl from "../controllers/contactsControllers.js";
import contactSchemas from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";

const contactsRouter = express.Router();

const contactAddMiddleware = validateBody(contactSchemas.createContactSchema);
const contactUpdateMiddleware = validateBody(
  contactSchemas.updateContactSchema
);
const contactUpdateStatusMiddleware = validateBody(
  contactSchemas.updateContactStatusSchema
);

contactsRouter.use(authenticate);

contactsRouter
  .get("/", ctrl.getAllContacts)
  .post("/", contactAddMiddleware, ctrl.createContact);

contactsRouter
  .get("/:id", ctrl.getOneContact)
  .put("/:id", contactUpdateMiddleware, ctrl.updateContact)
  .delete("/:id", ctrl.deleteContact);

contactsRouter.patch(
  "/:id/favorite",
  contactUpdateStatusMiddleware,
  ctrl.updateContact
);

export default contactsRouter;
