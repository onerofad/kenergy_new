import Custombar from "./CustomBar"
import CustomNav from "./CustomNav"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"
import Table from "react-bootstrap/Table"
import Spinner from "react-bootstrap/Spinner"
import { useEffect, useState } from "react"
import { getExpensesToday } from "../API"


const ExpenseReport = () => {

    const [expenses_today, setExpenses] = useState([])

    const [table_loading, setTableLoading] = useState("")

    let id=0
    let expense_total = 0

    useEffect(() => {
        getAllExpensesToday()
    },[])

    const getAllExpensesToday = () => {
        setTableLoading("border")
        getExpensesToday().get("/").then(response => {
            setTableLoading("")
            setExpenses(response.data)
        })
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
                                Expense Report
                            </h4>
                            <hr/>
                        </Row>
                        <Nav fill variant="tabs" defaultActiveKey="/expense_report">
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
                                <Nav.Link active href="expense_report">
                                    <h5>Daily Expense Report</h5> 
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="periodic_expense_report">
                                    <h5>Periodic Expense Report</h5>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
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
                                        {
                                            expenses_today.map(e => (
                                                <tr>
                                                    <td>{++id}</td>
                                                    <td>{e.expensename}</td>
                                                    <td>
                                                        &#8358; {Intl.NumberFormat().format(e.expenseamount,2)}
                                                    </td>
                                                    <td>{e.date}</td>
                                                    <td>{e.expensestaff}</td>
                                                </tr>
                                            ))
                                        }
                                        <tr>
                                        {
                                            expenses_today.map(e => {
                                            expense_total += e.expenseamount  
                                            })
                                         }
                                        
                                            <td></td>
                                            <td></td>
                                            <td><h4>Total: &#8358; {Intl.NumberFormat().format(expense_total, 2)}</h4></td>
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
export default ExpenseReport