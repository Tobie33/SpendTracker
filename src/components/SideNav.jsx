import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

const SideNav = () => {
  return (
    <Navbar id="side-nav" className="bg-body-tertiary">
      <Nav id="nav-item" className="flex flex-col items-center mt-3">
        <Nav.Link href="/dashboard"><FontAwesomeIcon icon={faChartLine} className='me-2'/>Dashboard</Nav.Link>
        <Nav.Link href="/dashboard/income"><FontAwesomeIcon icon={faPiggyBank} className='me-2'/>Income</Nav.Link>
        <Nav.Link href="/dashboard/expense"><FontAwesomeIcon icon={faHandHoldingDollar} className='me-2'/>Expense</Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default SideNav
