import express from "express";
import ctrl from "../controllers/contactsControllers.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";

const contactsRouter = express.Router();

contactsRouter
  .get("/", ctrl.getAllContacts)
  .post("/", validateBody(createContactSchema), ctrl.createContact);

contactsRouter
  .get("/:id", ctrl.getOneContact)
  .put("/:id", validateBody(updateContactSchema), ctrl.updateContact)
  .delete("/:id", ctrl.deleteContact);

export default contactsRouter;
