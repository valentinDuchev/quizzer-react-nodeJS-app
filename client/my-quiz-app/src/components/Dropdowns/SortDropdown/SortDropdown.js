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
        <Dropdown.Item as={Link} to="sport">Sport</Dropdown.Item>
        <Dropdown.Item as={Link} to="geography">Geography</Dropdown.Item>
        <Dropdown.Item as={Link} to="science">Science</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortDropdown;