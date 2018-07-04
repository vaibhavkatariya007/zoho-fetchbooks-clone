import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      contact_list:[]
    };
  }


  componentDidMount(){
    let url = 'https://books.zoho.com/api/v3/contacts?organization_id=669978070';
    let headers = new Headers();
    headers.append('Authorization', 'Zoho-authtoken db36e02a50b57e081efe533a8a0f834b');

    fetch(url, {method:'GET',headers: headers})
      .then(response => response.json())
      .then((json) => {
        this.setState({
          contact_list:json.contacts
        });
      });
    
  }

  render() {
    let {contact_list} = this.state;
    return (
      <div className="app" style={{'width':'90%', 'margin':'0 auto'}}>
        <h3 style={{'color':'#2c76a2'}}>Contact List</h3>
        <BootstrapTable data={contact_list} striped hover>
          <TableHeaderColumn isKey dataField='contact_name' dataSort={ true }>Name</TableHeaderColumn>
          <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
          <TableHeaderColumn dataField='phone'>Phone</TableHeaderColumn>
          <TableHeaderColumn dataField='status'>Status</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default App;
