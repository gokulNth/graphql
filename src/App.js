import React, { Component } from 'react';
import { AllTickets, AllContacts } from './components/AllData';
import { SingleTicket, SingleContact } from './components/OneData';
import { AddTicket, AddContact } from './components/AddData';

class App extends Component {
  constructor() {
    super();
    this.state = {
      ticket: '',
      contact: ''
    };
  }
  render() {
    const getValue = ({ target: { id, title } }) => {
      this.setState({ [id]: title });
    };
    return (
      <div>
        AllTickets:
        <AllTickets onSelect={getValue} />
        AllContacts:
        <AllContacts onSelect={getValue} />
        {this.state.ticket !== '' && (
          <SingleTicket id={this.state.ticket} onSelect={getValue} />
        )}
        {this.state.contact !== '' && (
          <SingleContact id={this.state.contact} onSelect={getValue} />
        )}
        AddTicket:
        <AddTicket />
        AddContact
        <AddContact />
      </div>
    );
  }
}

export default App;
