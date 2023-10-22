import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CountryCard from "./CountryCard";
import ModalDelete from "./Modal";
import { getFavouritesFromFirbase } from "../features/countries/favoriteSlice";
import { initializeCountries } from "../features/countries/countriesSlice.jsx";
import { setModalShow } from "../features/countries/modalSlice";

const Favourites = () => {
  const dispatch = useDispatch()
  let countriesList = useSelector((state) => state.countries.countries)
  const countriesLoading = useSelector((state) => state.countries.loading)
  const favouritesLoading = useSelector((state) => state.favourites.loading)
  const [search, setSearch] = useState("")
  const favouritesList = useSelector((state) => state.favourites.favourites)


  if (favouritesList !== null) {
    countriesList = countriesList.filter(c => favouritesList.includes(c.name.common))
  }
  else {
    countriesList = []
  }
  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromFirbase())
  }, [dispatch])
  if (countriesLoading || favouritesLoading) {
    return (
      <div>
        <Container>
          <Col className="text-center m-5">
            <Spinner
              animation="border"
              role="status"
              className="center"
              variant="info"
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Container>
      </div>
    )
  }
  return (
    <div>
      <Container >
        <Row>
          <Col className="mt-5 d-flex justify-content-center">
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
        <Row xs={2} md={3} lg={4} className=" g-3 justify-content-center m-4">


          <Button variant="danger" onClick={() => (favouritesList.length >= 1 ? dispatch(setModalShow(true)) : "")}>
            Clear favourites
          </Button>

          <ModalDelete />
        </Row>
        <Row xs={2} md={3} lg={4} className=" g-3">
          {countriesList
            .filter((c) => {
              return c.name.official.toLowerCase().includes(search.toLowerCase());
            })
            .map((country) => (
              <CountryCard key={country.name.common} country={country} />
            ))}
        </Row>
      </Container>
    </div>
  )
}
export default Favourites;