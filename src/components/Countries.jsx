import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CountryCard from './CountryCard';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Spinner } from 'react-bootstrap';
import { getFavouritesFromFirbase } from '../features/countries/favoriteSlice';
import { initializeCountries } from '../features/countries/countriesSlice';

const Countries = () => {
  const dispatch = useDispatch();
  const countriesList = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.countries.isLoading);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(initializeCountries())
    dispatch(getFavouritesFromFirbase())
  }, [dispatch])

  // We will be replacing this with data from our API.
  const country = {
    name: {
      common: 'Example Country'
    }
  }


  if (loading) {
    return (
      <Container fluid >
        <Row className=' d-flex align-contentcenter'>
          < Col className=' d-flex justify-content-center align-content-center flex-wrap' style={{ minHeight: "95vh" }}>
            <Spinner animation='border'
              role='status'
              className='center'
              variant='info'
              style={{ width: '5rem', height: '5rem' }}
            >
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
          </Col >
        </Row >
      </Container >
    )
  }
  return (
    <div>
      <Container >
        <Row>
          <Col className="m-5 d-flex justify-content-center">
            <Form>
              <Form.Control
                style={{ width: '18rem' }}
                type="search"
                className="me-2 "
                placeholder="Search for countries"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Col>
        </Row>
        <Row xs={2} md={3} lg={4} className=" g-3">
          {countriesList.filter((c) => {
            return c.name.official.toLowerCase().includes(search.toLowerCase())
          }).map((country) => {
            return (
              <CountryCard key={country.name.common} country={country} />
            )
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Countries;
