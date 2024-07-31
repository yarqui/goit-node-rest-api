import Contact from "../models/Contact.js";

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

const addContact = async (body) => {
  const newContact = await Contact.create({
    ...body,
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

const updateContact = async (contactId, body) => {
  const [_, [updatedContact]] = await Contact.update(
    { ...body },
    {
      where: { id: contactId },
      returning: true,
    }
  );

  return updatedContact;
};

export default {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContact,
};
