import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { nanoid } from "nanoid";

const contactsPath = resolve("db", "contacts.json");

const updateContactsFile = async (contactsArr) => {
  try {
    await writeFile(contactsPath, JSON.stringify(contactsArr, null, 2));
  } catch (error) {
    console.error("Error updating contact", error);
    throw error;
  }
};

const listContacts = async () => {
  try {
    const contactsData = await readFile(contactsPath);

    return JSON.parse(contactsData);
  } catch (error) {
    console.error("Error listing contacts", error);
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsArr = await listContacts();
    const contact = contactsArr.find(({ id }) => contactId === id);

    return contact ?? null;
  } catch (error) {
    console.error("Error getting contact with this id:", error);
    throw error;
  }
};

const removeContactById = async (contactId) => {
  try {
    const contactsArr = await listContacts();
    const contactIdx = contactsArr.findIndex(({ id }) => contactId === id);

    if (contactIdx === -1) {
      return null;
    }

    const [removedContact] = contactsArr.splice(contactIdx, 1);

    await updateContactsFile(contactsArr);

    return removedContact;
  } catch (error) {
    console.error("Error removing a contact", error);
    throw error;
  }
};

const addContact = async (data) => {
  try {
    const newContact = {
      id: nanoid(),
      ...data,
    };

    const contactsArr = await listContacts();
    contactsArr.push(newContact);

    await updateContactsFile(contactsArr);

    return newContact;
  } catch (error) {
    console.error("Error adding a contact", error);
    throw error;
  }
};

export default { listContacts, getContactById, removeContactById, addContact };
