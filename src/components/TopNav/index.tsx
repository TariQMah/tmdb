import { Col, Container, Nav, Row } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

const Index = () => {
  const minLogo = "/logo.svg";
  return (
    <div className={`top-header `}>
      <Container>
        <Row>
          <Col sm={3} xs={3}>
            <div className="logo">
              <Link to="/">
                <img src={minLogo} alt="Logo" />
              </Link>
            </div>
          </Col>
          <Col sm={9} xs={9} className="align-items-center d-flex">
            <Nav className="justify-content-end">
              <Nav.Item>
                <NavLink end to="/">
                  Home
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="/stats">Stats</NavLink>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Index;
