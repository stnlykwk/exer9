import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ReactJson from 'react-json-view';
import { useTable } from 'react-table';

import React, { Component } from 'react';
import { Button, Nav, Navbar, NavDropdown, Form, FormControl,  } from 'react-bootstrap';

function Heading() {
  return (
      <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Contact-Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
              </Nav>
              <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
              </Form>
          </Navbar.Collapse>
      </Navbar>
  )
}

function Table(props) {
    const data = React.useMemo(() => props.contacts, []);
    const columns = React.useMemo(() => [{
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Phone Number',
      accessor: 'phoneNumber',
    },
    {
      Header: 'Notes',
      accessor: 'notes',
    }],
    []
    );

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({ columns, data });

    return (
      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: 'solid 3px red',
                    background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        border: 'solid 1px gray',
                        background: 'papayawhip',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
}

class ContactPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: null
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/contacts')
      .then((res) => {
        this.setState({contacts: res.data})
      })
      .catch((err) => {
        console.log('There was an error: ' + err);
      });
  }
    
  render() {
    console.log(this.state.contacts);
    if (this.state.contacts != null) {
      return (
        <>
          <Heading />
          <ReactJson src={this.state.contacts} />
          <Table props={this.state}/>
        </>
      )
    }
    return "no data";
  }
}

export default ContactPage;
