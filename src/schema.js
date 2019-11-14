module.exports = `
  type Ticket {
    id: ID
    title: String
    customer: Contact
  }
  type Contact {
    id: ID
    name: String
    ticket: [Ticket]
  }
  type Mutation {
    AddTicket(id: ID!, title:String!, customer: ID!): Ticket!
    AddContact(id: ID!, name:String!): Contact!
  }
  type Query {
    tickets: [Ticket]
    contacts: [Contact]
    ticket(id: ID!):Ticket
    contact(id: ID!):Contact
  }
`;
//nested type
