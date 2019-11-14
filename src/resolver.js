const axios = require('axios');
const uniqid = require('uniqid');

const TICKET_URL = 'http://localhost:3001/tickets';
const CONTACT_URL = 'http://localhost:3001/contacts';

const getData = async url => {
  return await axios.get(url).then(resp => resp.data);
};

const addData = async (url, args, type) => {
  let check = await axios
    .get(`${CONTACT_URL}?name=${args.customer}`)
    .then(resp => resp.data);
  let args1 =
    type === 'ticket'
      ? Object.assign({}, args, {
          customer: check.length !== 0 ? check[0].id : uniqid()
        })
      : Object.assign({}, args, { id: uniqid() });
  return check.length !== 0
    ? await axios.post(url, args1).then(resp => resp.data)
    : type === 'ticket'
    ? (await axios.post(url, args1).then(resp => resp.data),
      await axios
        .post(CONTACT_URL, { id: args1.customer, name: args.customer })
        .then(resp => resp.data))
    : await axios.post(url, args1).then(resp => resp.data);
};
const resolver = {
  Query: {
    tickets: () => getData(TICKET_URL),
    contacts: () => getData(CONTACT_URL),
    ticket: (_, args) => getData(`${TICKET_URL}/${args.id}`),
    contact: (_, args) => getData(`${CONTACT_URL}/${args.id}`)
  },
  Mutation: {
    AddTicket: (_, args) => {
      return addData(TICKET_URL, args, 'ticket');
    },
    AddContact: (_, args) => {
      return addData(CONTACT_URL, args, 'contact');
    }
  },
  Ticket: { customer: root => getData(`${CONTACT_URL}/${root.customer}`) },
  Contact: { ticket: root => getData(`${TICKET_URL}?customer=${root.id}`) }
};

// export default resolver;

module.exports = resolver;
