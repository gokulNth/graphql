import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

function getAllTickets({ data: { loading, error, tickets }, onSelect }) {
  if (loading) return <h1>Loading.....</h1>;
  if (error) return <div>Error Occured {error.message}</div>;
  return tickets && tickets.length !== 0 ? (
    <ul>
      {tickets.map(i => (
        <li key={i.id} id='ticket' title={i.id} onClick={onSelect}>
          {i.title}
        </li>
      ))}
    </ul>
  ) : (
    <h1>No Tickets</h1>
  );
}

function getAllContacts({ data, onSelect }) {
  if (data.loading) return <h1>Loading.....</h1>;
  if (data.error) return <div>Error Occured {data.error.message}</div>;
  return data.contacts && data.contacts.length !== 0 ? (
    <ul>
      {data.contacts.map(i => (
        <li key={i.id} id='contact' title={i.id} onClick={onSelect}>
          {i.name}
        </li>
      ))}
    </ul>
  ) : (
    <h1>}No contacts</h1>
  );
}

const AllContacts = graphql(gql`
  query AllContacts {
    contacts {
      id
      name
    }
  }
`)(getAllContacts);
const AllTickets = graphql(gql`
  query AllTickets {
    tickets {
      id
      title
    }
  }
`)(getAllTickets);

export { AllContacts, AllTickets };
