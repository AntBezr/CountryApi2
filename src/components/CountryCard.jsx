import { Card, Col, ListGroup, Row } from "react-bootstrap"

import { LinkContainer } from "react-router-bootstrap"

const CountryCard = ({ country }) => {

  return (

    <Col className="mt-5">
      <LinkContainer
        to={`/countries/${country.name.common}`}
        state={{ country: country }}
        className="cursor-pointer"
      >
        <Card className="h-100 " >
          <Card.Body className="d-flex flex-column">
            <img src={country.flags.png} alt="" className="border border-dark" />

            <Card.Title>{country.name.common}</Card.Title>
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
                <i className="bi bi-people me-2"></i>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </LinkContainer>
    </Col>

  )
}

export default CountryCard