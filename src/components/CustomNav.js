import Nav  from "react-bootstrap/Nav"
import { BiMoney, BiSolidLogOut, BiSolidUserVoice } from "react-icons/bi"
import { BsBasket, BsBook, BsCashCoin, BsFileExcel, BsFillSignIntersectionYFill, BsMicrosoftTeams } from "react-icons/bs"
const CustomNav = () => {

    return(
        <Nav style={{height: 540, backgroundColor: '#000', paddingTop: 60, paddingLeft: 15, paddingRight: 15}} variant="underline" className="justify-content-center flex-column">
        {
            sessionStorage.getItem("accesslevel") == "1" ?
            <Nav.Item as='h6'>
                <Nav.Link className="text-white" href="/price" >
                    <BiMoney size={24} color="#fff" />
                        &nbsp;&nbsp;
                        PRICE PER KG
                </Nav.Link>
            </Nav.Item> : ''
        }
            <Nav.Item as='h6'>
                <Nav.Link className="text-white" href="items">
                    <BiSolidUserVoice size={24} color="#fff" />
                    &nbsp;&nbsp;
                    SERVICES
                </Nav.Link>
            </Nav.Item>
            <Nav.Item as='h6'>
                <Nav.Link className="text-white" href="suppliers">
                    <BsFillSignIntersectionYFill color="#fff" size={24} />
                    &nbsp;&nbsp;
                    SUPPLIERS
                </Nav.Link>
            </Nav.Item>
            <Nav.Item as='h6'>
                <Nav.Link className="text-white" href="inventory">
                    <BsBook size={24} color="#fff" />
                    &nbsp;&nbsp;
                    INVENTORY
                </Nav.Link>
            </Nav.Item>
            <Nav.Item as='h6'>
                <Nav.Link className="text-white" href="sales">
                    <BsBasket size={24} color="#fff" />
                    &nbsp;&nbsp;
                    SALES
                </Nav.Link>
            </Nav.Item>
            <Nav.Item as='h6'>
                <Nav.Link className="text-white" href="expense">
                    <BsCashCoin color="#fff" size={24}/>
                    &nbsp;&nbsp;
                    EXPENSE
                </Nav.Link>
            </Nav.Item>
            <Nav.Item as='h6'>
                <Nav.Link className="text-white" href="reports" >
                    <BsFileExcel size={24}  color="#fff"  />            
                    &nbsp;&nbsp;
                    REPORTS
                </Nav.Link>
            </Nav.Item>
        </Nav>
    )

}
export default CustomNav