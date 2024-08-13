import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import contactsService from "../services/contactsServices.js";

const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;

  const queryFilter = favorite ? { owner, favorite } : { owner };

  const contacts = await contactsService.listContacts(queryFilter, {
    page,
    limit,
  });
  return res.json(contacts);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const contact = await contactsService.getContact({ id, owner });
  if (!contact) {
    throw HttpError(404);
  }

  res.json(contact);
};

const createContact = async (req, res) => {
  const { id: owner } = req.user;
  const contact = await contactsService.addContact({ ...req.body, owner });
  if (!contact) {
    throw HttpError(404);
  }

  res.status(201).json(contact);
};

const updateContact = async (req, res) => {
  if (JSON.stringify(req.body) === "{}") {
    throw HttpError(400, "Body must have at least one field");
  }

  const { body, params, user } = req;
  const { id } = params;
  const { id: owner } = user;
  const updatedContact = await contactsService.updateContact(
    { id, owner },
    body
  );

  if (!updatedContact) {
    throw HttpError(404);
  }

  res.json(updatedContact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const contact = await contactsService.removeContact({ id, owner });
  if (!contact) {
    throw HttpError(404);
  }

  res.json(contact);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
};
