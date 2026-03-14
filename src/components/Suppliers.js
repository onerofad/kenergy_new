import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Custombar from "./CustomBar"
import CustomNav from "./CustomNav"
import { Modal, Spinner, Table } from "react-bootstrap"
import { useEffect, useState } from "react"
import { getSuppliers } from "../API"
import { BsTrashFill } from "react-icons/bs"

const Suppliers = () => {

    const [suppliername, setsuppliername] = useState('')
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState('')

    const [modalText, setmodalText] = useState('')
    const [suppliers, setSuppliers] = useState([])

    const [table_loading, setTableLoading] = useState('')
    const [delete_loading, setdeleteloading] = useState('')


    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false)
    }

    let i = 0

    useEffect(() => {
        getAllSuppliers()
    },[])

    const getAllSuppliers = () => {
        setTableLoading('border')
        getSuppliers().get('/').then(res => {
            setTableLoading('')
            setSuppliers(res.data)
        })
    }

    const handleClick = () => {
        if(suppliername === ''){
            setmodalText('Enter supplier name')
            setShow(true)
        }else if(address === ''){
            setmodalText('Enter supplier address')
            setShow(true)
        }else{
            let items = {suppliername, address}
            setLoading('border')
            getSuppliers().post('/', items).then(() => {
                getAllSuppliers()
                setLoading('')
                setmodalText('Supplier Saved')
                setShow(true)
                setsuppliername('')
                setAddress('')
            })
        }
    }

    const handleDelete = (id) => {
        setdeleteloading('border')
        getSuppliers().delete(`/${id}/`).
        then(() => {
            setdeleteloading('')
            getAllSuppliers()
            setmodalText('Supplier Deleted')
            setShow(true)
        })
    }

    return(

        <>
        <Custombar link={'/'} link_name={'Log out'}/>
        <Row style={{width: '98%'}}>
            <Col md={2}> 
                <CustomNav />
            </Col>
            <Col md={4}>
                <div style={{paddingTop: 100}}>
                    <h4>
                        Supplier
                    </h4>
                    <hr/>
                </div> 
        <div style={{paddingTop: 20}}>
            <Form>
                <Row className="mb-3">  
                    <Form.Group as={Col}>
                        <Form.Label as="h6">Supplier Name</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(e) => setsuppliername(e.target.value)}
                            value={suppliername}
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
                        <Form.Label as="h6">Address</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
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
                                size="sm"
                                animation={loading}
                                as='span'
                            />
                    Add Supplier
                </Button>
            </Form>
        </div>
        </Col>
        <Col md={6} className="">
            <div style={{paddingTop: 100}}>
                <h4>
                    Supplier Information
                </h4>
                <hr/>
            </div> 
            <div>
                {
                    delete_loading ? 
                    <Spinner
                        size="lg"
                        as='span'
                        animation={delete_loading}
                    /> :
                    ''
                }
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Supplier Name</th>
                            <th>Address</th>
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
                            suppliers.map(m => (
                                <tr>
                                    <td>{++i}</td>
                                    <td>{m.suppliername}</td>
                                    <td>{m.address}</td>
                                    <td>
                                        <Button
                                            onClick={() => handleDelete(m.id)}
                                            size="sm"
                                            className="btn btn-danger"
                                        >
                                            <BsTrashFill 
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
        <Modal
            show={show}
            onHide={handleClose}
            size="sm"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    System Error
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {modalText}
            </Modal.Body>
        </Modal>
        </>

    )
}
export default Suppliers