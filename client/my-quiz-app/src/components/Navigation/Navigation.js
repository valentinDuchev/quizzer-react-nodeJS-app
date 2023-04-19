import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./Navigation.module.css"

import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';


function NavScrollExample() {
  const { auth, setAuth } = useAuth();
  const { dark, setDark } = useTheme()

  const navigate = useNavigate()

  const email = localStorage.getItem('email')

  useEffect(() => {
    console.log(auth)

  }, [auth])

  const logout = (e) => {
    e.preventDefault()
    localStorage.clear()
    setAuth('')
    navigate("/login")
  }

  const onLightClick = () => {
    setDark(false)
    console.log(dark)
  }

  const onDarkClick = () => {
    setDark(true)
    console.log(dark)
  }

  return (
    <Navbar  className={styles.navbar}>  {/*  expand="lg" */}
      <Container fluid>

        {!localStorage.getItem('email')
          ? <Navbar.Brand as={Link} to="/home" className={styles.navLink}>Home</Navbar.Brand>

          : ''
        }
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            // className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
            className={styles.navbarNav}
          >

            {localStorage.getItem('email')
              ? <Nav.Link as={Link} to="/home" className={styles.navLink}>Newsfeed</Nav.Link>

              : ''
            }

            {localStorage.getItem('email')
              ? <Nav.Link as={Link} to="/quizes" className={styles.navLink}>Quizes</Nav.Link>

              : ''
            }

            {localStorage.getItem('email')
              ? <Nav.Link as={Link} to="/ranking" className={styles.navLink}>Ranking</Nav.Link>

              : ''
            }


            {localStorage.getItem('email')
              ? <Nav.Link as={Link} to="/create" className={styles.navLink}>Create</Nav.Link>

              : ''
            }

            {localStorage.getItem('email')
              ? <Nav.Link as={Link} to={`/profile/${email}`} className={styles.navLink}>My Profile</Nav.Link>

              : ''
            }


            {localStorage.getItem('email')
              ? <Nav.Link as={Link} onClick={logout} className={styles.navLink}>Logout</Nav.Link>

              : ''
            }

            {localStorage.getItem('email')
              ? ''

              : <Nav.Link as={Link} to="/login" className={styles.navLink}>Login</Nav.Link>
            }

            {localStorage.getItem('email')
              ? ''

              : <Nav.Link as={Link} to="/register" className={styles.navLink}>Register</Nav.Link>
            }

            <button className={`${styles.ghostRound}`} onClick={onLightClick} style={{}}>Dark</button>
            <button className={`${styles.ghostRound} ${styles.fullWidth} `} onClick={onDarkClick}>Light</button>
            


          </Nav>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}



        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;