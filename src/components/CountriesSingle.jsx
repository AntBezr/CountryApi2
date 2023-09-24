import { Button, Col, Container, Figure, Image, Row, Spinner } from 'react-bootstrap';
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

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`).catch((err) => {
      console.log(err)
      setError(true)
    })
      .then((res) => {
        setWeather(res.data)
        setLoading(false)
      })
  }, [country.capital])
  console.log(country);

  if (loading) {
    return (
      <Container>
        <Spinner animation='border'
          role='status'
          className='center'
          variant='info'
        >
          <span className='visually-hidden'>Loading...</span>
        </Spinner>


      </Container>
    )
  }
  return (
    <Container>
      <Row className="mt-4">
        <Col  >
          <Image src={country.flags.png} alt={country.flag} />
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
              <Figure thumbnail className='figure'>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`${weather.weather[0].description}`} className="img-thumbnail" />
              </Figure>
            </div>
          )}
        </Col>
        <Col>
          <Image thumbnail src={`https://source.unsplash.com/1600x900/?${country.name.common}`} />
        </Col>

      </Row>
      <Row>
        <Col >
          <Button variant='secondary' onClick={() => navigate("/countries")}>Go back</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CountriesSingle;
