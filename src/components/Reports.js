import { Col, Nav, Row, Spinner, Table } from "react-bootstrap"
import Custombar from "./CustomBar"
import CustomNav from "./CustomNav"
import { useEffect, useState } from "react"
import { getSales, getSalesToday } from "../API"

const Reports = () => {

    const [sales, setSales] = useState([])
    const [salesToday, setSalesToday] = useState([])

    const [table_loading, setTableLoading] = useState("")

    let sales_today_total = 0
    let sales_today_qty = 0

    useEffect(() => {
        getAllSales()
        getAllSalesToday()
    },[])

    let id = 0

    const getAllSales = () => {
        getSales().get("/").then(response => setSales(response.data))
        .catch(error => console.log("An error has occurred" + error))
    }

     const getAllSalesToday = () => {
        setTableLoading("border")
        getSalesToday().get("/").then(response => {
            setTableLoading("")
            setSalesToday(response.data)
        })
        
        .catch(error => console.log("An error has occurred" + error))
    }

    return(
        <>
        <Custombar link="/" link_name="Log out" />
        <Row style={{width: '98%'}}>
            <Col md={2}> 
                <CustomNav />
            </Col>
            <Col md={10}>
                <Row style={{paddingTop: 100}}>
                    <h4>
                        Reports
                    </h4>
                    <hr/>
                </Row>
                <Nav fill variant="tabs" defaultActiveKey="/reports">
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
                                <th>Item</th>
                                <th>Qty (Kg)</th>
                                <th>Price Per Kg</th>
                                <th>Total</th>
                                <th>Date</th>
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
                                salesToday.map(m => (
                                    <tr>
                                        <td>{++id}</td>
                                        <td>{m.item}</td>
                                        <td>{m.qty}</td>
                                        <td>
                                            &#8358; {Intl.NumberFormat().format(m.price,2)}
                                        </td>
                                        <td>
                                            &#8358; {Intl.NumberFormat().format(m.total,2)}
                                        </td>
                                        <td>{m.date}</td>
                                    </tr>
                                ))
                            }
                            <tr>
                                {
                                    salesToday.map(m => {
                                        sales_today_total += m.total  
                                    }                                   )
                                }
                                {
                                    salesToday.map(m => {
                                        sales_today_qty += m.qty
                                    }                                   )
                                }
                                <td></td>
                                <td></td>
                                <td><h4>Total: {sales_today_qty} Kg</h4></td>
                                <td></td>
                                <td><h4>Total: &#8358; {Intl.NumberFormat().format(sales_today_total, 2)}</h4></td>
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
export default Reports