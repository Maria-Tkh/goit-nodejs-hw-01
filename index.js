const contactsOperations = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();


// const listContacts = require("./listContacts");
// const getContactById = require("./getContactById");
// const addContact = require("./addContact");
// const removeContact = require("./removeContact");

const invokeAction = async ({ action, id, name, email, phone}) => {
    switch (action) {
        case "list":
            const contacts = await contactsOperations.listContacts();
            console.table(contacts);
            break;
        case "get":
            const contact = await contactsOperations.getContactById(id);
            if (!contact) {
                throw new Error(`Contact with id = ${id} not found`);
            }
            console.log(contact);
            break;
        case "add":
            const newContact = await contactsOperations.addContact(name, email, phone);
            console.table(newContact);
            break;
        case "remove":
            const removeContact = await contactsOperations.removeContact(id);
                if (!removeContact) {
                throw new Error(`Contact with id = ${id} not found`);
            }
            console.table(removeContact);
            break;
        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);

// invokeAction({ action: "list" });

// id = 2;
// invokeAction({ action: "get", id });

// const newData = {
//     "name": "Hellen Raymond",
//     "email": "nulla.ante@vestibul.co.uk",
//     "phone": "(992) 914-3797"
//   }

// invokeAction({ action: "add",  name: newData.name, email: newData.email, phone: newData.phone });

// const updateData = {
//     "id": 11,
//     "name": "Hellen Raymond",
//     "email": "nulla.ante@vestibul.co.uk",
//     "phone": "(992) 914-3799"
//   }

// invokeAction({ action: "updateById", id, data: updateData });

// id = 'ab97db46-52fa-436e-ae50-23626614e2b4';

// invokeAction({ action: "remove", id, name: newData.name, email: newData.email, phone: newData.phone});