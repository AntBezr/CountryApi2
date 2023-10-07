import { Card, Col, Container, Row } from "react-bootstrap";

const Home = () => {
  return (
    <div className="landingBg">


      <Container >
        <Row>
          <Col>
            <Container className="text-white" style={{ width: '75%', margin: "10%", background: "transparent", backdropFilter: "blur(7px)", borderRadius: "20px", border: "solid 1px white" }} >
              <div className="p-5">
                <h4 style={{ letterSpacing: "2px" }}>Greetings, Traveler! With our Country Explorer App, you can browse a curated list of countries and create your own collection of favorites. Sign up today to unlock the world's wonders at your fingertips.</h4>
              </div>
              <hr style={{ color: "white" }} />
              <Container >
                <Row >
                  <Col className="d-flex flex-column align-items-center mb-5">
                    <h2 >200+</h2>
                    <h4>Cards</h4>
                  </Col>
                  <Col className="d-flex flex-column align-items-center">
                    <h2 >100+</h2>
                    <h4>Users</h4></Col>
                </Row>
                <Row>
                  <Col className="d-flex flex-column align-items-center">
                    <h2 >7</h2>
                    <h4>Continents</h4>
                  </Col>
                  <Col className="h-25 d-flex flex-column align-items-center mb-5 ">
                    <h2 >193</h2>
                    <h4>Countries</h4>
                  </Col>
                </Row>
              </Container>

            </Container>

          </Col>
          <Col>
            <Container style={{ margin: "10%", color: "white", fontSize: "50px", textAlign: "center" }}>
              <p><span>Countries app </span>is a simple React application made in
                Business College Helsinki lessons. App uses{' '}</p>


              <a style={{ color: "Gainsboro" }} href="https://restcountries.com/">https://restcountries.com/ </a> and{' '}
              <a style={{ color: "Gainsboro" }} href="https://openweathermap.org/">https://openweathermap.org/</a>
              <p>Visit websites to know more about these API.</p>
            </Container>
          </Col>
        </Row>
      </Container>

    </div >
  );
};

export default Home;
