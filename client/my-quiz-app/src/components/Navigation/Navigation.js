import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import styles from "./Navigation.module.css"

function NavScrollExample() {
  return (
    <Navbar  expand="lg" className={styles.navbar}>
      <Container fluid>
        <Navbar.Brand  as={Link} to="/home" className={styles.navLink}>Quizzer</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/quizes" className={styles.navLink}>Quizes</Nav.Link>
            
            
            <Nav.Link  as={Link} to="/ranking" className={styles.navLink}>Ranking</Nav.Link>

            <Nav.Link  as={Link} to="/create" className={styles.navLink}>Create</Nav.Link>

            <Nav.Link  as={Link} to="/my-profile" className={styles.navLink}>My Profile</Nav.Link>

            
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;