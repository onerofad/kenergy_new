import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Custombar from "./CustomBar"
import CustomNav from "./CustomNav"
import { Button, Form, Modal, Spinner } from "react-bootstrap"
import { useEffect, useState, useRef } from "react"
import { getInventory, getItems, getPrices, getSales } from "../API"
import {useReactToPrint} from 'react-to-print'

const Sales = () => {

    const componentRef = useRef(null);

    const reactToPrintContent = () => {
        return componentRef.current
    }

    const handlePrint = useReactToPrint({
        documentTitle: "SuperFileName",
        //fonts: CUSTOM_FONTS
    });

    const currentDate = new Date()

    const year = currentDate.getFullYear()

    const month = currentDate.getMonth() + 1

    const day = currentDate.getDate()

    const [amount, setAmount] = useState(0)

    const [mop, setMop] = useState("")

    const [inventories, setInventories] = useState([])
    const [items, setItems] = useState([])

    const [item, setItem] = useState("")
    const [qty, setQty] = useState(0)
    //const [price, setPrice] = useState(0)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState("")

    const [modalText, setmodalText] = useState("")
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)

    //const [modalText1, setmodalText1] = useState("")
    const [show1, setShow1] = useState(false)
   /* const handleClose1 = () => {
        //printContent()
        setShow1(false)
        setItem("")
        //setPrice("")
        setAmount(0)
        setQty(0)
        setTotal(0)
    }*/

    const [prices, setPrices] = useState([])

    const getAllPrices = () => {
        getPrices().get("/").then(response => setPrices(response.data))
    }

    const [sales, setSales] = useState([])

    let total_kg = 0

    let total_kg_sales = 0

    useEffect(() => {
        getAllInventories()
        getAllItems()
        getAllSales()
        getAllPrices()
    },[])

    const getAllInventories = () => {
        getInventory().get("/").then(response => setInventories(response.data))
    }

    const getAllItems = () => {
        getItems().get("/").then(response => setItems(response.data))
    }

    const getAllSales = () => {
        getSales().get("/").then(response => setSales(response.data))
        .catch(error => console.log("An error has occurred" + error))
    }

    const makeSale = () => {
        if(item === ""){
            setmodalText("Select a service")
            setShow(true)
        }else if(qty === 0){
            setmodalText("Qty must be greater than 0")
            setShow(true)
        }else if(price === 0){
            setmodalText("Price must be greater than 0")
            setShow(true)
        }else if(total === 0){
            setmodalText("Total must be greater than 0")
            setShow(true)
        }else if(amount === 0){
            setmodalText("Enter amount paid")
            setShow(true)
        }else if(mop === ""){
            setmodalText("Select mode of payment")
            setShow(true)
        }else{
            setLoading("border")
            let payload = {item, qty, price, total, amount, mop}
            getSales().post("/", payload)
            .then(() => {
                setLoading("")
                getAllSales()
                //setmodalText1("Sales Complete")
                setShow1(true) 
            })
        }
    }

   /* function printContent() {
        var contentToPrint = document.querySelector('.print-content');
        var printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Print</title></head><body>');
        printWindow.document.write(contentToPrint.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }*/

    let price

    prices.map(p => {
        price = p.price
    })
    
    return(
        <>
        <Custombar link={'/'} link_name="Log out" />
        <Row style={{width: '98%'}}>
            <Col md={2}> 
                <CustomNav />
            </Col>
            <Col md={10}>
                <div style={{paddingTop: 100}}>
                    <h4>
                        Make Sales
                        <span style={{float: 'right'}}>
                            {
                                inventories.map(m => {
                                    total_kg += m.qty
                                })
                            }
                            {
                                sales.map(s => {
                                    total_kg_sales += s.qty
                                })
                            }
                            Total Left (Kg): {total_kg - total_kg_sales}
                        </span>
                    </h4>
                    <hr/>
                </div> 
                <div style={{paddingTop: 20}}>
                    <Row className="justify-content-center">
                        <Col md={1}>
                            <Spinner
                                size="lg"
                                as="span"
                                animation={loading}
                            />
                        </Col>
                    </Row>
                    <Form>
                        <Row className="mb-3 justify-content-center">  
                            <Form.Group as={Col} md={4}>
                                <Form.Label as="h6">Service Name</Form.Label>
                                <Form.Select
                                    type="text"
                                    onChange={(e) => setItem(e.target.value)}
                                    value={item}
                                    style={{
                                        backgroundColor: 'black', 
                                        borderRadius: 10, 
                                        height: 50,
                                        color: 'white'
                                    }}

                                >
                                    <option>Select Service</option>
                                    {
                                        items.map(m => (
                                            <option>{m.itemname}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md={4}>
                                <Form.Label as="h6">Qty (Kg)</Form.Label>
                                <Form.Control
                                    type="number"
                                    onChange={(e) => setQty(e.target.value)}
                                    value={qty}
                                     style={{
                                        backgroundColor: 'green', 
                                        borderRadius: 10, 
                                        height: 50,
                                        color: 'white'
                                    }}

                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3 justify-content-center">  
                            <Form.Group as={Col} md={4}>
                                <Form.Label as="h6">Price Per Kg (&#8358;)</Form.Label>
                                <Form.Control
                                    type="text"
                                    //onChange={(e) => setPrice(e.target.value)}
                                    value={price}
                                    //onBlur={() => setTotal(qty * price)}
                                    style={{
                                        backgroundColor: 'blue', 
                                        borderRadius: 10, 
                                        height: 50,
                                        color: 'white'
                                    }}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={4}>
                                <Form.Label as="h6">Total Amount (&#8358;)</Form.Label>
                                <Form.Control
                                    type="text"
                                   // onChange={(e) => setTotal(e.target.value)}
                                    onClick={() => setTotal(qty * price)}
                                    value={total}
                                    style={{borderRadius: 10, height: 50}}
                                />
                            </Form.Group>
                        </Row>
                         <Row className="mb-3 justify-content-center">  
                            <Form.Group as={Col} md={4}>
                                <Form.Label as="h6">Amount Paid (&#8358;)</Form.Label>
                                <Form.Control
                                    type="number"
                                    onChange={(e) => setAmount(e.target.value)}
                                    value={amount}
                                    style={{
                                        backgroundColor: 'blue', 
                                        borderRadius: 10, 
                                        height: 50,
                                        color: 'white'
                                    }}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={4}>
                                <Form.Label as="h6">Payment Mode (&#8358;)</Form.Label>
                                <Form.Select
                                    type="text"
                                    onChange={(e) => setMop(e.target.value)}
                                    value={mop}
                                    style={{borderRadius: 10, height: 50}}
                                >
                                    <option value="">Select Payment Mode</option>
                                    <option value="cash">Cash</option>
                                    <option value="transfer">Transfer</option>
                                    <option value="pos">POS</option>
                                    <option value="card">Card</option>


                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="justify-content-center"> 
                            <Col md={3}>
                                <Button
                                    onClick={makeSale}
                                    size="lg"
                                    className="mt-4"
                                    style={{
                                        backgroundColor: 'red', 
                                        borderRadius: 10, 
                                        height: 50,
                                        width: 200,
                                        color: 'white'
                                    }}
                                >
                                    <Spinner
                                        size="sm"
                                        animation={''}
                                        as='span'
                                    />
                                        Make Sales
                                    </Button>
                            </Col>
                        </Row>
                    </Form>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        size="sm"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                System Message
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {modalText}
                        </Modal.Body>
                    </Modal>
                    <Modal
                        show={show1}
                        onHide={() => {
                            handlePrint(reactToPrintContent)
                            setShow1(false)
                            setItem("")
                            setAmount(0)
                            setQty(0)
                            setTotal(0)
                        }
                        }
                        size="sm"
                        backdrop="static"
                    >
                        {/*<div class="print-content">*/}
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Sales Receipt
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div  ref={componentRef}>
                                <h5 style={{fontSize: 12 , fontFamily: 'monospace', textAlign: "center"}}>
                                     KNERGY LIMITED
                                </h5>
                                <p style={{fontWeight: 400, fontFamily: 'monospace', fontSize: 10, textAlign: 'center'}}>
                                    Along Okha 1 Road, <br/> off Sapele Road, <br/> Benin-city,
                                    Edo State, <br/> Nigeria.
                                </p>
                                <p>
                                    <h6 style={{fontWeight: 700, fontFamily: 'monospace', fontSize: 10, textAlign: 'center'}}>+234 81 6514 5596</h6>
                                </p>
                                <hr/>
                            
                                <table style={{
                                    width: '100%',
                                    //borderWidth: 1,
                                    //borderStyle: 'solid',
                                    //borderColor: '#000',
                                    alignSelf: 'center',
                                    fontWeight: 400, 
                                    fontSize: 10, 
                                    fontFamily: 'monospace'

                                }}>
                                    <tbody style={{width: '100%'}}>
                                        <tr>
                                            <td style={{width: '40%'}}>Service:</td>
                                            <td style={{width: '60%'}}>{item}</td>
                                        </tr>
                                        <tr>
                                            <td>Qty:</td>
                                            <td>{qty}KG</td>
                                        </tr>
                                        <tr>
                                            <td>Price:</td> 
                                            <td style={{textAlign: 'left'}}>&#8358; {Intl.NumberFormat().format(price,2)}</td>
                                        </tr>
                                        <tr>
                                            <td>Total:</td>
                                            <td style={{textAlign: 'left'}}>&#8358; {Intl.NumberFormat().format(total,2)}</td>
                                        </tr>
                                        <tr>
                                            <td>Amt Paid:</td>
                                            <td>&#8358; {Intl.NumberFormat().format(amount,2)}</td>
                                        </tr>
                                        <tr>
                                            <td>Payment Mode:</td>
                                            <td>{mop}</td>
                                        </tr>
                                        <tr>
                                            <td>Date:</td>
                                            <td><span>{year}/{month}/{day}</span></td>
                                        </tr>
                                        <tr>
                                            <td>Cashier /Name:</td>
                                            <td>{sessionStorage.getItem("uname")}</td>
                                        </tr>

                                    </tbody>
                                </table>
                            <hr/>
                            <p className="text-center">
                                <h6 style={{fontWeight: 700, fontFamily: 'monospace', fontSize: 10, textAlign: 'center'}} >Thanks For Your <br/>Patronage</h6>
                            </p>
                        </div>
                        </Modal.Body>
                       
                    </Modal>
                    
                </div>
            </Col>
        </Row>
        </>
    )
}
export default Sales