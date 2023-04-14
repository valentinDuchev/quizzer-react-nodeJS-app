import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

import styles from './SortDropdown.module.css';

function SortDropdown() {
  return (
    <Dropdown className={styles.dropdown}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Filter By Topic
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/general" onClick={() => (console.log('yes'))}>General</Dropdown.Item>
        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/sport">Sport</Dropdown.Item>
        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/books">Books</Dropdown.Item>
        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/art">Art</Dropdown.Item>
        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/movies">Movies/TV</Dropdown.Item>
        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/music">Music</Dropdown.Item>
        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/history">History</Dropdown.Item>
        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/geography">Geography</Dropdown.Item>
        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/science">Science</Dropdown.Item>
        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/politics">Politics</Dropdown.Item>
        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/human">Human Body</Dropdown.Item>
        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/medicine">Medicine</Dropdown.Item>
        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/animals">Animals/Nature</Dropdown.Item>
        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/technology">Technology</Dropdown.Item>
        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/stocks">Stocks/Crypto</Dropdown.Item>
        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/food">Food/Drink</Dropdown.Item>
        <Dropdown.Item as={Link} to="http://localhost:3000/quizes/other">Other</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortDropdown;