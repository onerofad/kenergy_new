import Custombar from '../components/CustomBar'
import CustomNav from '../components/CustomNav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'

import { useEffect, useState } from 'react'
import { getExpense, getUsers } from '../API'

const Expense = () => {

    const [users, setUsers] = useState([])
    const [expenses, setExpense] = useState([])

    const [expensename, setExpensename] = useState("")
    const [expenseamount, setExpenseamount] = useState(0)
    const [expensestaff, setExpensestaff] = useState("")

    const [btn_loading, setBtnLoading] = useState("")
    const [table_loading, setTable_loading] = useState("")

    const [modalText, setmodalText] = useState("")

    const handleClose = () => setShow(false)

    const [show, setShow] = useState(false)

    useEffect(() => {
        getAllUsers()
        getAllExpense()
    },[])

    const getAllUsers = () => {
        getUsers().get("/").then(response => setUsers(response.data))
        .catch(error => console.log('An error has occurred ' + error))
    }

    const getAllExpense = () => {
        setTable_loading("border")
        getExpense().get("/")
        .then(response =>  {
            setTable_loading("")
            setExpense(response.data)
        }
        )
        .catch(error => console.log("An error has occurred " + error))
    }

    const expenseClick = () => {

        if(expensename === ""){
            setmodalText("Enter expense details")
            setShow(true)
        }else if(expenseamount <= 0){
            setmodalText("Enter expense amount")
            setShow(true)           
        }else if(expensestaff === ""){
            setmodalText("Enter expense staff")
            setShow(true)
        }else{
            setBtnLoading("border")

            let items = {expensename, expenseamount, expensestaff}
            getExpense().post("/", items).
            then(() => {
                getAllExpense()
                setBtnLoading("")
                setExpensename("")
                setExpenseamount("")
                setExpensestaff("")
            })
        }
    }

    return(
        <>
            <Custombar link="/" link_name="Log out" />
            <Row style={{width: '96%'}}>
                <Col md={2}>
                    <CustomNav />
                </Col>
                <Col md={4}>
                    <div style={{paddingTop: 100}}>
                        <h4>Expense</h4>
                        <hr/>
                    </div>
                    <div style={{paddingTop: 20}}>
                    <Form>
                        <Row className='mb-3'>
                            <Form.Group as="Col" md={6}>
                                <Form.Label as="h6">Expense Details</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    style={{
                                        height: 50,
                                        backgroundColor: 'ButtonFace',
                                        borderRadius: 10
                                    }}
                                    value={expensename}
                                    onChange={(e) => setExpensename(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        <Row className='mb-3'>
                            <Form.Group as="Col" md={6}>
                                <Form.Label as="h6">Expense Amount</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder=""
                                    style={{
                                        height: 50,
                                        backgroundColor: 'ButtonFace',
                                        borderRadius: 10
                                    }}
                                    value={expenseamount}
                                    onChange={(e) => setExpenseamount(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                         <Row className='mb-3'>
                            <Form.Group as="Col" md={6}>
                                <Form.Label as="h6">Expense Staff</Form.Label>
                                <Form.Select
                                    type="text"
                                    placeholder=""
                                    style={{
                                        height: 50,
                                        backgroundColor: 'ButtonFace',
                                        borderRadius: 10
                                    }}
                                    value={expensestaff}
                                    onChange={(e) => setExpensestaff(e.target.value)}
                                >
                                    <option>Select a staff</option>
                                    {
                                        users.map(m => (
                                            <option>{m.username}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Button 
                            size='lg' 
                            onClick={expenseClick}
                        >
                            <Spinner
                                size="sm"
                                animation={btn_loading}
                                as="span"
                            />
                            Enter Expense
                        </Button>
                    </Form>
                    </div>
                </Col>
                <Col md={6}>
                    <div style={{paddingTop: 100}}>
                        <h4>Past Expense</h4>
                        <hr/>
                    </div>
                    <div style={{paddingTop: 20}}>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Expense Details</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Staff</th>
                                </tr>
                            </thead>
                            {
                                table_loading ? 
                                <Spinner
                                    size='lg'
                                    as="span"
                                    animation={table_loading}
                                /> :
                            
                            <tbody>
                                {
                                    expenses.map(e => (
                                       <tr>
                                         <td></td>
                                         <td>{e.expensename}</td>
                                         <td>{e.expenseamount}</td>
                                         <td>{e.date}</td>
                                         <td>{e.expensestaff}</td>
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
                size="sm"
                onHide={handleClose}
                show={show}
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
        </>
    )
}
export default Expense