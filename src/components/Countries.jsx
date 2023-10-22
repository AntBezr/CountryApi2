import { Button, Spinner } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CountryCard from './CountryCard';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { getFavouritesFromFirbase } from '../features/countries/favoriteSlice';
import { initializeCountries } from '../features/countries/countriesSlice.jsx';

const Countries = () => {
  const dispatch = useDispatch();
  const countriesList = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.countries.isLoading);
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const [region, setRegion] = useState('');

  useEffect(() => {
    dispatch(initializeCountries())
    dispatch(getFavouritesFromFirbase())

  }, [dispatch])



  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }



  window.addEventListener('scroll', toggleVisible);

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
      <Container className="position-relative">
        <Row>
          <Col className="m-5 d-flex justify-content-center" >
            <Form className='d-flex flex-row justify-space-around w-50'>
              <Form.Control
                style={{ width: '18rem' }}
                type="search"
                className="me-2 "
                placeholder="Search for countries"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />

              <Form.Select aria-label="Default select example" onChange={(e) => { setRegion(e.target.value) }}>
                <option value="">All</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Africa">Africa</option>
                <option value="Oceania">Oceania</option>
                <option value="Americas">Americas</option>
                <option value="Antarctic">Antarctic</option>
              </Form.Select>
            </Form>
          </Col>
        </Row>
        <Row xs={2} md={3} lg={4} className=" g-3">
          {countriesList.filter((c) => {
            return c.name.official.toLowerCase().includes(search.toLowerCase()) && c.region.includes(region)
          }).map((country) => {
            return (
              <CountryCard key={country.name.common} country={country} />
            )
          })}
        </Row>
        {visible && (
          <Button variant='dark' className='position-fixed bottom-0 end-0 z-50 cursor-pointer p-2 m-5'
            onClick={scrollToTop}>
            <i className="bi bi-arrow-up-circle h2" ></i>
          </Button>
        )}
      </Container>
    </div >
  );
};

export default Countries;
