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

  const countryImage = () => {
    return (
      <Image thumbnail src={`https://source.unsplash.com/1600x900/?${country.name.common}`} />
    )
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
      <Container>
        <Row className='d-flex justify-content-around'>
          <Col>
            <Image thumbnail={+true} src={country.flags.png} alt={country.flag} />
            <h2 className="display-4">{country.name.common}</h2>
            <h3>{country.capital}</h3>
            {errors && (
              <p>Sorry we don't have weather information for this country</p>
            )}
            {!errors && weather && (
              <div>
                <p>
                  Right now it is <strong>{parseInt(weather.main.temp)}</strong> degrees in {country.capital} and {weather.weather[0].description}
                </p>
                <Figure thumbnail={+true} className='figure'>
                  <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`${weather.weather[0].description}`} className="img-thumbnail" />
                </Figure>
              </div>
            )}
          </Col>
          <Col>
            <Carousel fade>
              <Carousel.Item>
                {countryImage()}

                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Image thumbnail src={`https://source.unsplash.com/1600x900/?${country.name.common}`} />
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Image thumbnail src={`https://source.unsplash.com/1600x900/?${country.name.common}`} />
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
            {/*             <Image thumbnail src={`https://source.unsplash.com/1600x900/?${country.name.common}`} /> */}
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