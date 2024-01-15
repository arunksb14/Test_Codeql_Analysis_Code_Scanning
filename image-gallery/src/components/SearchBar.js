import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchBar = (props) => {

  const [searchBasedOnText, setSearchBasedOnText] = useState('');
  const [searchText, setSearchText] = useState('');

  const searchBasedOn = (event) => {
    setSearchBasedOnText(event.target.value);
  }

  const searchTextChange = (event) => {
    setSearchText(event.target.value);
  }

  const clearSearchFilter = () => {
    setSearchText('');
    setSearchBasedOnText('');
  }

  const searchImages = (event) => {
    event.preventDefault();
    if(searchBasedOnText === ""){
      toast.error("Please select the filter type");
      return;
    }
    if(searchText === ""){
      toast.error("Please enter the "+searchBasedOnText+"  value");
      return;
    }
    props.searchImages(searchBasedOnText, searchText);
  }

  return (
    <>
    <Navbar bg="light" expand="lg" sticky="top" >
      <Container fluid>
        <Navbar.Brand href="#">Image Gallery</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
          <Form className="d-flex">
            <select className="form-select" aria-label="Search Criteria" value={searchBasedOnText} onChange={searchBasedOn}>
              <option value="">Search Based On</option>
              <option value="Brand">Brand</option>
              <option value="Category">Category</option>
            </select>&nbsp;&nbsp;
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchText}
              onChange={searchTextChange}
            />
            <Button variant="outline-success" onClick={searchImages}>Search</Button>&nbsp;&nbsp;
            <Button variant="outline-danger" onClick={clearSearchFilter}>Clear</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <ToastContainer/>
    </>
  );
};

export default SearchBar;
