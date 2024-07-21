import HttpError from "../helpers/HttpError.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (_, res, next) => {
  try {
    const contacts = await contactsService.listContacts();

    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsService.getContactById(id);
    if (!contact) {
      throw HttpError(404);
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsService.removeContactById(id);
    if (!contact) {
      throw HttpError(404);
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const contact = await contactsService.addContact(req.body);
    if (!contact) {
      throw HttpError(404);
    }

    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    if (JSON.stringify(req.body) === "{}") {
      throw HttpError(400, "Body must have at least one field");
    }
      
    const { id } = req.params;
    const updatedContact = await contactsService.updateContact(id, req.body);

    if (!updatedContact) {
      throw HttpError(404);
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};
