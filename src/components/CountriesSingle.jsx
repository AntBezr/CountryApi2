import { Button, Carousel, Col, Container, Figure, Image, Row, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import React from 'react';
import axios from 'axios';

const CountriesSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [weather, setWeather] = useState('')
  const [errors, setError] = useState(false)
  const [loading, setLoading] = useState(true)


  const country = location.state.country
  useEffect(() => {
    if (!country.capital) {
      setLoading(false)
      setError(true)
    }

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`).catch((err) => {
      console.log(err)
      setError(true)
    })
      .then((res) => {
        setWeather(res.data)
        setLoading(false)
      })
  }, [country.capital, country.latlng])

  console.log(country);

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
      <Container className='mt-5'>
        <Row className='d-flex justify-content-around'>
          <Col style={{ maxWidth: "30%" }}>
            <Image thumbnail={+true} src={country.flags.png} alt={country.flag} />
            <h2 className="display-4">{country.name.common}</h2>
            <h3>{country.capital}</h3>
            <h4>{country.continents.join(', ')}</h4>

          </Col>
          <Col>
            <Carousel fade>
              <Carousel.Item>
                <Image thumbnail src={`https://source.unsplash.com/1600x900/?${country.name.common}&0`} />

                <Carousel.Caption>

                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Image thumbnail src={`https://source.unsplash.com/1600x900/?${country.name.common}&1`} />
                <Carousel.Caption>

                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Image thumbnail src={`https://source.unsplash.com/1600x900/?${country.name.common}&2`} />
                <Carousel.Caption>

                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>

        </Row>
        <Row>
          <Col>
            {errors && (
              <p>Sorry we don't have weather information for this country</p>
            )}
            {!errors && weather && (
              <div>

                <Figure thumbnail={+true} className='figure mt-5'>
                  <h4 className='text-center'>
                    Weather in {country.capital}
                  </h4>
                  <Row>
                    <Col>
                      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`${weather.weather[0].description}`} className="img-thumbnail" />

                    </Col>
                    <Col className='d-flex align-items-center'>

                      <h4 style={{ fontSize: "30px" }}>{weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}</h4>
                      <h2 style={{ fontSize: "45px" }}>{parseInt(weather.main.temp)}°C</h2>
                    </Col>

                  </Row>
                </Figure>
              </div>
            )}
          </Col>
          <Col >
            <div style={{ position: 'relative', width: "500px", height: "300px", overflow: "hidden" }}>
              <img src={country.maps.googleMaps} alt="" />

            </div>
          </Col>
        </Row>
        <Row>
          <Col >

            <Button variant='secondary' onClick={() => navigate("/countries")}>Go back</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CountriesSingle;