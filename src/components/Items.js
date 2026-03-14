import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Custombar from "./CustomBar"
import CustomNav from "./CustomNav"
import { Button, Form, Modal, Spinner, Table } from "react-bootstrap"
import { useEffect, useState } from "react"
import { BiSolidError } from "react-icons/bi"
import { getItems } from "../API"
import { BsTrash, BsTrashFill } from "react-icons/bs"

const Items = () => {

    const [show, setShow] = useState(false)
    const [modalText, setmodalText] = useState("")
    const [itemname, setItemname] = useState("")
    const [description, setDescription] = useState("")

    const [loading, setLoading] = useState("")
    const [table_loading, setTableLoading] = useState("")
    const [delete_loading, setdeleteloading] = useState("")

    let i = 0

    const [items, setItems] = useState([])

    useEffect(() => {
        getAllItems()
    },[])

    const getAllItems = () => {
        setTableLoading("border")
        getItems().get("/").
        then(res => {
            setTableLoading("")
            setItems(res.data)
        })
        .catch(error => console.log('An error has occurred ' + error))
    }

    const handleClose = () => {
        setShow(false)
    }

    const handleDelete = (id) => {
        setdeleteloading("border")
        getItems().delete(`/${id}/`).then(
            () => {
                setdeleteloading("")
                getAllItems()
                setmodalText("Service Deleted")
                setShow(true)
            }
        )
    }

    const handleClick = () => {
        if(itemname === ""){
            setmodalText("please enter service")
            setShow(true)
        }else if(description === ""){
            setmodalText("please enter service description")
            setShow(true)
        }else{
            setLoading("border")
            let item = {itemname, description}
            getItems().post("/", item).then(
                () => {
                    getAllItems()
                    setLoading("")
                    setmodalText("Service created")
                    setShow(true)
                    setItemname("")
                    setDescription("")
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
                        Services
                    </h4>
                    <hr/>
                </div> 
        <div style={{paddingTop: 20}}>
            <Form>
                <Row className="mb-3">  
                    <Form.Group as={Col}>
                        <Form.Label as="h6">Service Name</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(e) => setItemname(e.target.value)}
                            value={itemname}
                            style={{
                                backgroundColor: 'ButtonFace',
                                height: 50,
                                borderRadius: 10,
                            }}
                        />
                    </Form.Group>
                </Row>
                     <Row className="mb-3">  
                    <Form.Group as={Col}>
                        <Form.Label as="h6">Service Description</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
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
                            Add Service
                            <span className="visually-hidden">Loading...</span>

                        </Button>
            </Form>
        </div>
        </Col>
        <Col md={6}>
            <div style={{paddingTop: 100}}>
                <h4>
                    View Services
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
                            <th>Item NAme</th>
                            <th>Description</th>
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
                            items.map(m => (
                                <tr>
                                    <td>{++i}</td>
                                    <td>{m.itemname}</td>
                                    <td>{m.description}</td>
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
export default Items