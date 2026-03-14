import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import  Table from "react-bootstrap/Table"
import Custombar from "./CustomBar"
import CustomNav from "./CustomNav"
import Pagination from "react-bootstrap/Pagination"
import Spinner from "react-bootstrap/Spinner"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import { useEffect, useState } from "react"
import { BiSolidBookOpen } from "react-icons/bi"
import { getInventory, getItems, getSales, getSuppliers, getUsers } from "../API"

const Inventory = ({mobile}) => {

    let id= 1

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [item, setItem] = useState('')
    const [supplier, setSupplier] = useState('')
    const [qty, setQty] = useState(0)
    const [cost, setCost] = useState(0)
    const [selling, setSelling] = useState(0)
    const [date, setDate] = useState('')
    const [staff, setStaff] = useState('')

    const [inventories, setInventories] = useState([])
    const [all_items, setItems] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [users, setUsers] = useState([])

    const [show1, setShow1] = useState(false)
    const handleClose1 = () => setShow1(false)
    const [modalText1, setmodalText1] = useState('')

    const [loading, setLoading] = useState("")
    const [table_loading, settable_Loading] = useState("")

    let total_kg = 0
    let total_cost = 0

    useEffect(() => {
        getAllInventories()
        getAllSuppliers()
        getAllItems()
        getAllUsers()
        getAllSales()
    },[])

    //pagination code
    
    const [active, setActive] = useState(1)

    const [start, setStart] = useState(0)

    const [end, setEnd] = useState(5)

    let total_items = inventories.length

    let no_pagination_items = Math.ceil(total_items/5)

    const [sales, setSales] = useState([])
    
    let items = []

    let table_items = []

    table_items = inventories.slice(start, end)

    const handlePagination = (number) => {
        let endValue = number * 5
        let startValue = endValue - 5

        setEnd(endValue)
        setStart(startValue)

        setActive(number)

        table_items = inventories.slice(start, end)
    }

    for(let number = 1; number <= no_pagination_items; number++){
        items.push(
            <Pagination.Item onClick={() => handlePagination(number)} active={number == active}>
                {number}
            </Pagination.Item>
        )
    }

    const getAllSales = () => {
        getSales().get("/").then(response => setSales(response.data))
        .catch(error => console.log("An error has occurred" + error))
    }

    let total_kg_sales = 0

    let total_amount_sales = 0

    const getAllInventories = () => {
        settable_Loading("border")
        getInventory().get('/').then(res => 
            {
                settable_Loading("")
                setInventories(res.data)
            }
        )
        .catch(error => console.log('An error has occurred ', error))
    }

    const getAllItems = () => {
        getItems().get('/').then(res => {
            setItems(res.data)
        })
    }

     const getAllUsers = () => {
        getUsers().get('/').then(res => {
            setUsers(res.data)
        })
    }

    const getAllSuppliers = () => {
        getSuppliers().get('/').then(res => {
            setSuppliers(res.data)
        })
    }

    const saveItem = () => {
        if(item === ''){
            setmodalText1('Select an Item')
            setShow1(true)
        }else if(supplier === ''){
            setmodalText1('Select a supplier')
            setShow1(true)
        }else if(qty <= 0){
            setmodalText1('Qty must be greater than 0')
            setShow1(true)
        }else if(cost <= 0){
            setmodalText1('Cost must be greater than 0')
            setShow1(true)
        }else if(selling <= 0){
            setmodalText1('Selling Price must be greater than 0')
            setShow1(true)
        }else if(date === ''){
            setmodalText1('Select a date')
            setShow1(true)
        }else if(staff === ''){
            setmodalText1('Select a staff')
            setShow1(true)
        }else{
            setLoading("border")
            const info = {item, supplier, qty, cost, selling, date, staff}
            getInventory().post("/", info).then(() => {
                setLoading("")
                getAllInventories()
                setShow(false)
                setItem("")
                setSupplier("")
                setQty("")
                setCost("")
                setSelling("")
                setDate("")
                setStaff("")
            })
            
        }
    }

    return(
        <>
        <Custombar link={'/'} link_name={'Log out'} />
        <Row style={{width: '98%'}}>
            <Col md={2}>
                 <CustomNav />
            </Col>
            <Col md={10}>
                <div style={{paddingTop: 100}}>  
                    <h4>
                        Welcome, {sessionStorage.getItem("uname")}
                        <span style={{float: 'right'}}>
                            {
                                inventories.map(m => 
                                     {
                                        total_kg += m.qty
                                        total_cost += m.selling * m.qty
                                     }
                                )
                            }

                            {
                                sales.map(s => {
                                    total_kg_sales += s.qty
                                    total_amount_sales += s.total
                                })
                            }
                            Total Amount:
                            &#8358;{Intl.NumberFormat().format(total_cost - total_amount_sales, 2)}
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            Total (Kg) {total_kg - total_kg_sales}
                        </span>
                    </h4>
                    <hr/>
                    <Table striped style={{}}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Item</th>
                                <th>Supplier</th>
                                <th>Quantity (Kg)</th>
                                <th>Cost Per Kg</th>
                                <th>Sell Price Per Kg</th>
                                <th>Total</th>
                                <th>Date</th>
                                <th>Entry Staff</th>
                            </tr>
                        </thead>
                        {
                            table_loading ? 
                            <Spinner 
                                size="lg"
                                as="span"
                                animation={table_loading}
                            /> :
                        
                        <tbody>
                          {
                            table_items.map((d) => (
                                <tr>
                                    <td>{id++}</td>
                                    <td>{d.item}</td>
                                    <td>{d.supplier}</td>
                                    <td>{d.qty}</td>
                                    <td>&#8358; {Intl.NumberFormat().format(d.cost,2)}</td>
                                    <td>&#8358; {Intl.NumberFormat().format(d.selling,2)}</td>

                                    <td>&#8358; {Intl.NumberFormat().format(d.selling * d.qty)}</td>
                                    <td>{d.date}</td>
                                    <td>{d.staff}</td>
                                </tr>
                            ))
                          }
                        </tbody>
                        }
                    </Table>
                </div>
                <div>
                    <Row>
                        <Col xs={6}>
                            <Pagination>
                                {items}
                            </Pagination>
                        </Col>
                        <Col xs={6}>
                            <Button 
                                variant="secondary"
                                style={{float: 'right'}}
                                onClick={handleShow}
                            > 
                                <BiSolidBookOpen size={20}/>
                                &nbsp;&nbsp;
                                ADD INVENTORY
                            </Button>
                        </Col>
                    </Row>
                </div>
               
            </Col>
        </Row>
        <Modal className="" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <BiSolidBookOpen size={20} />
                <Modal.Title>Add Inventory</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} md='6'>
                            <Form.Label>Item Name</Form.Label>
                            <Form.Select
                                required
                                type="text"
                                value={item}
                                onChange={(e) => setItem(e.target.value)}
                            >
                                <option>Select Item</option>
                                {
                                    all_items.map(m => (
                                        <option>{m.itemname}</option>
                                    ))
                                }
                                
                            </Form.Select>
                        
                        </Form.Group>
                          <Form.Group as={Col} md='6'>
                            <Form.Label>Supplier</Form.Label>
                            <Form.Select
                                required
                                type="text"
                                value={supplier}
                                onChange={(e) => setSupplier(e.target.value)}
                            >
                                <option>Select Supplier</option>
                                {
                                    suppliers.map(m => (
                                        <option>{m.suppliername}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                          <Form.Group as={Col} md='6'>
                            <Form.Label>Cost Per Kg (&#8358;)</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                value={cost}
                                onChange={(e) => setCost(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md='6'>
                            <Form.Label>Selling Price Per Kg (&#8358;)</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                value={selling}
                                onChange={(e) => setSelling(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                         <Form.Group as={Col} md='6'>
                            <Form.Label>Quantity (Kg.)</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md='6'>
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Staff Name</Form.Label>
                            <Form.Select
                                required
                                type="text"
                                value={staff}
                                onChange={(e) => setStaff(e.target.value)}
                            >
                                <option>Select Staff</option>
                                {
                                    users.map(m => (
                                        <option>{m.username}</option>
                                    ))
                                }

                            </Form.Select>
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={saveItem}>
                <Spinner 
                    size="sm"
                    animation={loading}
                    as="span"
                />
                    ADD ITEM
                </Button>
            </Modal.Footer>
        </Modal>
        <Modal
            size="sm"
            onHide={handleClose1}
            show={show1}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    System Message
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {modalText1}
            </Modal.Body>
        </Modal>
        </>        
    )
}

export default Inventory