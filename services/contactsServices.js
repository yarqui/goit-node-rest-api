import Contact from "../db/models/Contact.js";

const listContacts = () => Contact.findAll();

const getContactById = (contactId) =>
  Contact.findOne({
    where: { id: contactId },
  });

const addContact = (body) => Contact.create(body);

const updateContact = async (contactId, body) => {
  const contact = await getContactById(contactId);
  if (!contact) {
    return null;
  }

  return contact.update(body, { returning: true });
};

const removeContactById = async (contactId) => {
  const removedContact = await getContactById(contactId);

  await Contact.destroy({
    where: {
      id: contactId,
    },
  });

  return removedContact;
};

export default {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContact,
};
