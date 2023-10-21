import { Col, Container, Row } from "react-bootstrap";

const Home = () => {
  return (
    <div className="gx-0">

      <Container className=" landingBg gx-0">
        <Row className="d-flex justify-content-around">
          <Col md="4" className="text-white m-5 p-5 " style={{ background: "fixed", backdropFilter: "blur(7px)", borderRadius: "20px", border: "solid 1px white" }}  >

            <h4 style={{ letterSpacing: "2px", textAlign: "center" }}>Greetings, Traveler! With our Country Explorer App, you can browse a curated list of countries and create your own collection of favorites. Sign up today to unlock the world's wonders at your fingertips.</h4>


            <hr style={{ color: "white" }} />

            <Row className="d-flex align-items-center ">
              <Col className="d-flex flex-column align-items-center m-3">
                <h2 >200+</h2>
                <h4>Cards</h4>
              </Col>
              <Col className="d-flex flex-column align-items-center m-3">
                <h2 >100+</h2>
                <h4>Users</h4></Col>
            </Row>
            <Row>
              <Col className="d-flex flex-column align-items-center m-3">
                <h2 >7</h2>
                <h4>Continents</h4>
              </Col>
              <Col className="h-25 d-flex flex-column align-items-center m-3 ">
                <h2 >193</h2>
                <h4>Countries</h4>
              </Col>
            </Row>
          </Col>
          <Col md="5" className="m-5 LandingText" style={{ color: "white", fontSize: "50px", }}>

            <p><span>Countries  app </span>is a simple React application made in
              Business College Helsinki lessons. App uses{' '}</p>
            <a style={{ color: "Gainsboro" }} href="https://restcountries.com/">https://restcountries.com/ </a> <p>and </p>
            <a style={{ color: "Gainsboro" }} href="https://openweathermap.org/">https://openweathermap.org/</a>
            <p>Visit websites to know more about these API.</p>

          </Col>
        </Row >
      </Container >

    </div >
  );
};

export default Home;
