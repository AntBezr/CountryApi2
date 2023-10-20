import { Card, Col, ListGroup } from "react-bootstrap"
import { addFavourite, removeFavourite } from "../features/countries/favoriteSlice"
import { useDispatch, useSelector } from "react-redux"

import { LinkContainer } from "react-router-bootstrap"

const CountryCard = ({ country }) => {
  const favouritesList = useSelector((state) => state.favourites.favourites)
  const dispatch = useDispatch()

  const favClickHandler = (e, isFav) => {
    e.stopPropagation()
    isFav ? dispatch(removeFavourite(country.name.common)) : dispatch(addFavourite(country.name.common))
  }

  return (

    <Col className="mt-5">
      <LinkContainer
        to={`/countries/${country.name.common}`}
        state={{ country: country }}
        className="cursor-pointer"
      >
        <Card className="h-100" role="button" >
          <Card.Body className="d-flex flex-column">
            <img src={country.flags.png} alt="" className="border border-dark" />

            <Card.Title className="d-flex flex-row justify-content-between">{country.name.common}
              {favouritesList.includes(country.name.common) ? (
                < i className="bi bi-star-fill h3 m-1 text-warning" onClick={(e) => favClickHandler(e, true)}></i>

              ) : <i className="bi bi-star h3 m-1 text-warning" onClick={(e) => favClickHandler(e, false)}></i>}

            </Card.Title>


            <Card.Subtitle className="mb-5 text-muted">
              {country.name.official}
            </Card.Subtitle>
            <ListGroup
              variant="flush"
              className="flex-grow-1 justify-content-end"
            >
              <ListGroup.Item>
                <i className="bi bi-translate me-2"></i>

                {country.languages ? Object.keys(country.languages).map((lang) => {
                  return (
                    country.languages[lang])
                }).join(', ') : ''}
              </ListGroup.Item>
              <ListGroup.Item>
                <i className="bi bi-cash-coin me-2"></i>
                {country.currencies ? Object.keys(country.currencies).map((cur) => {
                  return (
                    country.currencies[cur] ? Object.keys(country.currencies[cur]).map((item) => country.currencies[cur][item]).join(', ') : "")
                }) : ""}


              </ListGroup.Item>
              <ListGroup.Item>
                <i className="bi bi-people me-2"> {country.population.toLocaleString()}</i>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </LinkContainer>
    </Col >

  )
}

export default CountryCard