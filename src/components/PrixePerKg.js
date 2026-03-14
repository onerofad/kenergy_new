import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Custombar from "./CustomBar"
import CustomNav from "./CustomNav"
import { Button, Form, Modal, Spinner, Table } from "react-bootstrap"
import { useEffect, useState } from "react"
import { getItems, getPrices } from "../API"
import { BsTrashFill } from "react-icons/bs"

const PricePerKg = () => {

    const [show, setShow] = useState(false)
    const [modalText, setmodalText] = useState("")
    const [itemname, setItemname] = useState("")
    const [price, setPrice] = useState("")

    const [loading, setLoading] = useState("")
    const [table_loading, setTableLoading] = useState("")
    const [delete_loading, setdeleteloading] = useState("")

    let i = 0

    const [prices, setPrices] = useState([])

    useEffect(() => {
        getAllPrices()
    },[])

    const getAllPrices = () => {
        setTableLoading("border")
        getPrices().get("/").
        then(res => {
            setTableLoading("")
            setPrices(res.data)
        })
        .catch(error => console.log('An error has occurred ' + error))
    }

    const handleClose = () => {
        setShow(false)
    }

    const handleDelete = (id) => {
        setdeleteloading("border")
        getPrices().delete(`/${id}/`).then(
            () => {
                setdeleteloading("")
                getAllPrices()
                setmodalText("Price Deleted")
                setShow(true)
            }
        )
    }

    const handleClick = () => {
        if(itemname === ""){
            setmodalText("please select item")
            setShow(true)
        }else if(price === ""){
            setmodalText("please enter price")
            setShow(true)
        }else{
            setLoading("border")
            let item = {itemname, price}
            getPrices().post("/", item).then(
                () => {
                    getAllPrices()
                    setLoading("")
                    setmodalText("Price created")
                    setShow(true)
                    setItemname("")
                    setPrice("")
                }
            )
        }
    }

    return(
        <>
        <Custombar  link={'/'} link_name={'Log out'} />
        <Row style={{width: '98%'}}>
            <Col md={2}> 
                <CustomNav />
            </Col>
            <Col md={4}>
                <div style={{paddingTop: 100}}>
                    <h4>
                        Enter Price Per KG
                    </h4>
                    <hr/>
                </div> 
        <div style={{paddingTop: 20}}>
            <Form>
                <Row className="mb-3">  
                    <Form.Group as={Col}>
                        <Form.Label as="h6">Item Name</Form.Label>
                        <Form.Select
                            type="text"
                            onChange={(e) => setItemname(e.target.value)}
                            value={itemname}
                            style={{
                                backgroundColor: 'ButtonFace',
                                height: 50,
                                borderRadius: 10,
                            }}
                        >
                            <option value="">Select Item</option>
                            <option value="gas refill">Gas Refill</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Row className="mb-3">  
                    <Form.Group as={Col}>
                        <Form.Label as="h6">Price</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                             style={{
                                backgroundColor: 'ButtonFace',
                                height: 50,
                                borderRadius: 10,
                            }}
                        />
                    </Form.Group>
                </Row>
                    <Button 
                        onClick={handleClick}
                        size="lg"
                        >
                            <Spinner 
                                as="span"
                                animation={loading}
                                size="sm"
                                role="status"
                                arial-hidden="true"
                            />
                            Add Price
                            <span className="visually-hidden">Loading...</span>

                        </Button>
            </Form>
        </div>
        </Col>
        <Col md={6}>
            <div style={{paddingTop: 100}}>
                <h4>
                    View Prices
                </h4>
                <hr/>
            </div> 
            <div>
                 {
                    delete_loading ? 
                        <Spinner 
                            as="span"
                            size="lg"
                            animation={delete_loading}
                                                
                        /> : ''
                 }
                 
                    <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                    table_loading ? 
                      <Spinner
                        size="lg"
                        className="justify-content-center"
                        animation={table_loading}
                        as="span"
                    />
                    :
                    <tbody>
                        {
                            prices.map(m => (
                                <tr>
                                    <td>{++i}</td>
                                    <td>{m.itemname}</td>
                                    <td>{m.price}</td>
                                    <td>
                                        <Button
                                             size="sm" 
                                             className="btb btn-danger"
                                             onClick={() => handleDelete(m.id)}
                                        >
                                           
                                                <BsTrashFill 
                                                    size={15} 
                                                    color="white" 
                                                />
                                        
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    }
                </Table>        
            </div>
        </Col>
        </Row>
        <Modal size="sm" show={show}  onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>System Message</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                 {/*<BiSolidError color="red" size={24} />*/}
                 {modalText}
            </Modal.Body>
        </Modal>
        </>

    )
}
export default PricePerKg