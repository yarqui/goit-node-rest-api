import { Contact } from "../schemas/contactsSchemas.js";

const listContacts = async () => {
  const contactsData = await Contact.findAll();

  const contactsArr = contactsData.map((contact) => contact.toJSON());
  return contactsArr;
};
const getContactById = async (contactId) => {
  const contact = await Contact.findOne({
    where: { id: contactId },
  });

  return contact;
};

const addContact = async (data) => {
  const newContact = await Contact.create({
    ...data,
  });

  return newContact;
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

const updateContact = async (contactId, updatedContactData) => {
  await Contact.update(
    { ...updatedContactData },
    {
      where: { id: contactId },
    }
  );

  const updatedContact = await getContactById(contactId);

  return updatedContact;
};

export default {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContact,
};
