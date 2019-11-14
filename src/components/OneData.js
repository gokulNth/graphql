import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

function ticket({ data: { error, loading, ticket }, onSelect }) {
  if (loading) return <h1>Loading.....</h1>;
  if (error) return <div>Error Occured {error.message}</div>;
  return (
    <ul>
      {ticket.id && <li>{ticket.title}</li>}
      by{' '}
      <span onClick={onSelect} id='contact' title={ticket.customer.id}>
        <strong>{ticket.customer.name}</strong>
      </span>
    </ul>
  );
}

function contact({ data: { error, loading, contact }, onSelect }) {
  if (loading) return <h1>Loading.....</h1>;
  if (error) return <div>Error Occured {error.message}</div>;
  return (
    <ul>
      {contact.id && <li>{contact.name}</li>}
      by{' '}
      <ul>
        {contact.ticket.map(i => (
          <li onClick={onSelect} id='ticket' title={i.id} key={i.id}>
            {i.title}
          </li>
        ))}
      </ul>
    </ul>
  );
}

const SingleTicket = graphql(gql`
  query Ticket($id: ID!) {
    ticket(id: $id) {
      id
      title
      customer {
        id
        name
      }
    }
  }
`)(ticket);

const SingleContact = graphql(gql`
  query Contact($id: ID!) {
    contact(id: $id) {
      id
      name
      ticket {
        id
        title
      }
    }
  }
`)(contact);

export { SingleContact, SingleTicket };
