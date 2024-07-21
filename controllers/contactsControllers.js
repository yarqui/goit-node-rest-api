import { messageList } from "../helpers/HttpError.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (_, res, next) => {
  try {
    const contacts = await contactsService.listContacts();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: messageList[404] });
    }

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
      return res.status(404).json({ message: messageList[404] });
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
      return res.status(404).json({ message: messageList[404] });
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
      return res.status(404).json({ message: messageList[404] });
    }

    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
