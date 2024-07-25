import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { nanoid } from "nanoid";

const contactsPath = resolve("db", "contacts.json");

const updateContactsFile = async (contactsArr) => {
  await writeFile(contactsPath, JSON.stringify(contactsArr, null, 2));
};

const listContacts = async () => {
  const contactsData = await readFile(contactsPath);

  return JSON.parse(contactsData);
};

const getContactById = async (contactId) => {
  const contactsArr = await listContacts();
  const contact = contactsArr.find(({ id }) => contactId === id);

  return contact ?? null;
};

const removeContactById = async (contactId) => {
  const contactsArr = await listContacts();
  const contactIdx = contactsArr.findIndex(({ id }) => contactId === id);
  if (contactIdx === -1) {
    return null;
  }

  const [removedContact] = contactsArr.splice(contactIdx, 1);
  await updateContactsFile(contactsArr);

  return removedContact;
};

const addContact = async (data) => {
  const newContact = {
    id: nanoid(),
    ...data,
  };

  const contactsArr = await listContacts();
  contactsArr.push(newContact);
  await updateContactsFile(contactsArr);

  return newContact;
};

const updateContact = async (contactId, updatedContactData) => {
  const contactsArr = await listContacts();
  const contactIdx = contactsArr.findIndex(({ id }) => contactId === id);
  if (contactIdx === -1) {
    return null;
  }

  const updatedContact = {
    ...contactsArr[contactIdx],
    ...updatedContactData,
  };

  contactsArr[contactIdx] = updatedContact;
  await updateContactsFile(contactsArr);

  return updatedContact;
};

export default {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContact,
};
