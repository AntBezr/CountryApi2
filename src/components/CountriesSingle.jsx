import { Button, Carousel, Col, Container, Figure, Image, Row, Spinner } from 'react-bootstrap';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { addFavourite, removeFavourite } from '../features/countries/favoriteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { LinkContainer } from 'react-router-bootstrap';
import React from 'react';
import axios from 'axios';

const CountriesSingle = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [weather, setWeather] = useState('')
  const [errors, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const favouritesList = useSelector((state) => state.favourites.favourites)

  useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY })

  let countriesList = useSelector((state) => state.countries.countries)

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


  const areaZoom = (area) => {
    if (area >= 7000000) {
      return 3
    } else if (area >= 2000000) {
      return 4.5
    } else if (area >= 1000000) {
      return 5
    } else if (area >= 500000) {
      return 5.5
    } else if (area >= 300000) {
      return 6
    } else if (area >= 100000) {
      return 7
    } else if (area >= 10000) {
      return 8
    } else return 10
  }

  const favClickHandler = (e, isFav) => {
    e.stopPropagation()
    isFav ? dispatch(removeFavourite(country.name.common)) : dispatch(addFavourite(country.name.common))
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
      <Container className='mt-5'>
        <Row className='d-flex justify-content-around mb-5 flex-column flex-md-row'>
          <Col style={{ maxWidth: "30%" }}>
            <Image thumbnail={+true} src={country.flags.png} alt={country.flag} />
            <Col className='d-flex flex-direction-row align-items-center'>
              <h2 className="display-4">{country.name.common}</h2>
              {favouritesList.includes(country.name.common) ? (

                <i className="bi bi-bookmark-star-fill h3 m-1 text-warning " onClick={(e) => favClickHandler(e, true)}></i>
              ) : <i className="bi bi-bookmark-plus h3 m-1" onClick={(e) => favClickHandler(e, false)}></i>}
            </Col>
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
        <Row className='d-flex align-items-center justify-content-center'>
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
                    <Col className='d-flex align-items-center '>
                      <Container>
                        <Row>

                          <h4 style={{ fontSize: "30px", minWidth: "150px" }}>{weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}</h4>
                        </Row>
                        <Row>

                          <h2 style={{ fontSize: "45px" }}>{parseInt(weather.main.temp)}°C</h2>
                        </Row>
                      </Container>
                    </Col>

                  </Row>
                </Figure>
              </div>
            )}
          </Col>
          <Col className='d-flex justify-content-center' >
            {
              <Figure style={{ position: 'relative', width: "800px", height: "500px", overflow: "hidden" }}>
                <GoogleMap
                  mapContainerClassName="map-container"
                  center={{ lat: country.latlng[0], lng: country.latlng[1] }}
                  zoom={areaZoom(country.area)}
                />
              </Figure>
            }
          </Col>
        </Row>
        <Row className='mt-5 mb-5'>
          <Col xl={9} className='d-flex-column align-items-center justify-content-center'>

            <Col>
              {
                country.borders?.length > 0 ? <h3 className='text-center'>Land neighbors</h3> : <h3 className='text-center'>This country has no land borders</h3>}
              {
                countriesList.map((c) => {
                  if (country.borders?.includes(c.cioc) || country.borders?.includes(c.cca3)) {
                    return (
                      < LinkContainer
                        key={c.name.common}
                        to={`/countries/${c.name.common}`
                        }
                        state={{ country: c }
                        }
                        className="cursor-pointer"
                      >
                        <Button variant="dark" className='mx-2  my-2'>{c.name.common}</Button>
                      </LinkContainer>
                    )
                  }
                })
              }
            </Col>
          </Col>
          <Col xl={3} className='d-flex align-items-center'>
            <Button variant='secondary' onClick={() => navigate(-1)}> <i className="bi bi-arrow-return-right"></i>Go back</Button>
          </Col>
        </Row>
      </Container>
    </div >
  );
};

export default CountriesSingle;