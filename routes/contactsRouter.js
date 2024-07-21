import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

export default contactsRouter;
