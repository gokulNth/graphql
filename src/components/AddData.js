import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import uniqid from 'uniqid';
import gql from 'graphql-tag';

class AddTicketForm extends Component {
  constructor() {
    super();
    this.state = {
      cutomer: '',
      title: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    this.props.mutate({
      variables: {
        id: uniqid(),
        title: this.state.title,
        customer: this.state.cutomer
      }
    });
  }
  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value });
  }
  render() {
    return (
      <div>
        Subject :{' '}
        <input
          value={this.state.title}
          name='title'
          onChange={this.handleChange}
        />
        <br />
        Customer:{' '}
        <input
          value={this.state.cutomer}
          name='cutomer'
          onChange={this.handleChange}
        />
        <br />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

const AddTicket = graphql(
  gql`
    mutation addTicket($id: ID!, $title: String!, $customer: ID!) {
      AddTicket(id: $id, title: $title, customer: $customer) {
        id
        title
      }
    }
  `
)(AddTicketForm);

class AddContactForm extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    this.props.mutate({
      variables: {
        id: '',
        name: this.state.name
      }
    });
  }
  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value });
  }
  render() {
    return (
      <div>
        Contact Name :{' '}
        <input
          value={this.state.name}
          name='name'
          onChange={this.handleChange}
        />
        <br />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

const AddContact = graphql(
  gql`
    mutation addContact($id: ID!, $name: String!) {
      AddContact(id: $id, name: $name) {
        id
        name
      }
    }
  `
)(AddContactForm);

export { AddTicket, AddContact };
