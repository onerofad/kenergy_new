import  Navbar from "react-bootstrap/Navbar"
import  Nav from "react-bootstrap/Nav"
import img from '../logo.svg'
import { Container } from "react-bootstrap"
import { BiSolidRegistered } from "react-icons/bi"


const Custombar = ({link, link_name}) => {

    return(
        <Navbar style={{paddingRight:  30}} fixed="top" expand="lg" bg="primary" data-bs-theme="dark">
            <Navbar.Brand href="home">
                <img
                    src={img}
                    width='50'
                    height='50'
                />
                    KNERGY
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <BiSolidRegistered size={24} color="white"  />
                    &nbsp;
                   <a href={link}>{link_name}</a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default Custombar