import Custombar from "./CustomBar"
import CustomNav from "./CustomNav"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"
import Table from "react-bootstrap/Table"
import Form from "react-bootstrap/Form"
import Button from 'react-bootstrap/Button'
import { getExpense } from "../API"
import { useEffect, useState } from "react"
import Spinner from 'react-bootstrap/Spinner'

const PeriodicExpenseReport = () => {

    const [expenses, setExpenses] = useState([])
     const [datefrom, setdateFrom] = useState(null)
     const [dateto, setdateTo] = useState(null)
    const [search_result, setSearchResult] = useState([])
    const [qty, setQty] = useState(0)
    const [total, setTotal] = useState(0)
    
        let id=0
        let expense_total = 0

        const [table_loading, setTableLoading] = useState("")
    
        useEffect(() => {
            getAllExpenses()
        },[])
    
        const getAllExpenses = () => {
            setTableLoading("border")
            getExpense().get("/").then(response => {
                setTableLoading("")
                setExpenses(response.data)
            })
        }

    const handleSearch = () => {
        setTableLoading("border")
        const search_expenses = expenses.filter(s => s.date >= datefrom && s.date <= dateto)
        setSearchResult(search_expenses.map(m => {
                            return(
                            <tr>
                                <td>{++id}</td>
                                <td>{m.expensename}</td>
                                <td>
                                    &#8358; {Intl.NumberFormat().format(m.expenseamount,2)}
                                </td>
                               <td>{m.date}</td>
                               <td>{m.expensestaff}</td>

                            </tr>
                    )
                }))
                search_expenses.map(t => {
                    expense_total += t.expenseamount
                    setTotal(expense_total)
                })
                setTableLoading("")
    }
    return(
        <>
            <Custombar link="/" link_name="Log out" />
                            <Row style={{width: '96%'}}>
                                <Col md={2}>
                                    <CustomNav />
                                </Col>
                                <Col md={10}>
                                    <Row style={{paddingTop: 100}}>
                                        <h4>
                                            Periodic Expense Report
                                        </h4>
                                        <hr/>
                                    </Row>
                                    <Nav fill variant="tabs" defaultActiveKey="/periodic_expense_report">
                                        <Nav.Item>
                                            <Nav.Link href="/reports">
                                                <h5>Daily Sales Report</h5>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link href="/periodic_sales_report">
                                                <h5>Periodic Sales Report</h5> 
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link href="expense_report">
                                                <h5>Daily Expense Report</h5> 
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link active href="periodic_expense_report">
                                                <h5>Periodic Expense Report</h5>
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    <Form>
                                        <Row className="mt-4 mb-3 justify-content-center">     
                                            <Form.Group as={Col} md={4}>
                                                <Form.Label>From Date:</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    onChange={(e) => setdateFrom(e.target.value)}
                                                    value={datefrom}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md={4}>
                                                <Form.Label>To Date:</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    onChange={(e) => setdateTo(e.target.value)}
                                                    value={dateto}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md={4}>
                                                <br/>
                                            <Button onClick={handleSearch} size="lg">
                                                <Spinner
                                                    as="span"
                                                    animation={table_loading}
                                                    size="sm"
                                                />
                                                    Search
                                                </Button>
                                            </Form.Group>
                                        </Row>
                                    </Form>
                                    <Row className="mt-4 mb-4">
                                        <Col>
                                            <Table striped>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Expense Name</th>
                                                        <th>Expense Amount</th>
                                                        <th>Date</th>
                                                        <th>Staff</th>
                                                    </tr>
                                                </thead>
                                                {
                                                    table_loading ?
                                                    <Spinner
                                                        as="span"
                                                        animation={table_loading}
                                                        size="lg"
                                                    /> :
                                                    <tbody>
                                                    {search_result}
                                                <tr>                             
                                                    <td></td>
                                                    <td></td>
                                                    <td><h4>Total: &#8358; {Intl.NumberFormat().format(total, 2)}</h4></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        }
                                    </Table>
                                </Col>
                            </Row>
                         </Col>
                    </Row>
        </>
    )
}
export default PeriodicExpenseReport