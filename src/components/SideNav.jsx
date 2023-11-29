import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const SideNav = () => {
  return (
    <Navbar id="side-nav" className="bg-body-tertiary">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav id="nav-item" className="me-auto flex flex-col items-center">
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/dashboard/income">Income</Nav.Link>
          <Nav.Link href="/dashboard/expense">Expense</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default SideNav
