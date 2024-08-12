import Contact from "../db/models/Contact.js";

const listContacts = (query = {}, { page = 1, limit = 10 }) => {
  const normalizedLimit = Number(limit);
  const offset = (Number(page) - 1) * normalizedLimit;
  return Contact.findAll({ where: query, offset, limit: normalizedLimit });
};

export const getContact = (query) =>
  Contact.findOne({
    where: query,
  });

const addContact = (body) => Contact.create(body);

const updateContact = async (query, body) => {
  const contact = await getContact(query);
  if (!contact) {
    return null;
  }

  return contact.update(body, { returning: true });
};

const removeContact = async (query) => {
  const removedContact = await getContact(query);

  if (!removedContact) {
    return null;
  }
  
  await Contact.destroy({
    where: query,
  });

  return removedContact;
};

export default {
  listContacts,
  getContact,
  removeContact,
  addContact,
  updateContact,
};
