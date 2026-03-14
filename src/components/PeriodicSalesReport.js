import { Button, Col, Row, Spinner } from "react-bootstrap"
import Custombar from "./CustomBar"
import CustomNav from "./CustomNav"
import Nav from "react-bootstrap/Nav"
import Table from "react-bootstrap/Table"
import Form from "react-bootstrap/Form"
import { useEffect, useState } from "react"
import { getSales } from "../API"

const PeriodicSalesReport = () => {

    const [sales, setSales] = useState([])
    const [datefrom, setdateFrom] = useState(null)
    const [dateto, setdateTo] = useState(null)
    const [search_result, setSearchResult] = useState([])
    const [qty, setQty] = useState(0)
    const [total, setTotal] = useState(0)

    const [table_loading, setTableLoading] = useState("")

    let id = 0
    let sales_total = 0
    let sales_qty = 0

    useEffect(() => {
        getAllSales()
    },[])

    const getAllSales = () => {
        getSales().get("/").then(response => {
            setSales(response.data)
        })
    }

    const handleSearch = () => {
        setTableLoading("border")
        const search_sales = sales.filter(s => s.date >= datefrom && s.date <= dateto)
        setSearchResult(search_sales.map(m => {
                            return(
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
                    )
                }))
                search_sales.map(t => {
                    sales_total += t.total
                    setTotal(sales_total)

                    sales_qty += t.qty
                    setQty(sales_qty)
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
                         Periodic Sales Reports
                    </h4>
                    <hr/>
                </Row>
                            <Nav fill variant="tabs" defaultActiveKey="/periodic_sales_report">
                                <Nav.Item>
                                    <Nav.Link href="/reports">
                                       <h5>Daily Sales Report</h5>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link active href="/periodic_sales_report">
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
                                                value={dateto}
                                                onChange={(e) => setdateTo(e.target.value)}
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
                                            <th>Item</th>
                                            <th>Qty (Kg)</th>
                                            <th>Price Per Kg</th>
                                            <th>Total</th>
                                            <th>Date</th>
                                            </tr>
                                    </thead>
                                    
                                    <tbody>
                                        {
                                            search_result
                                        }
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td><h4>Total Qty: {qty} kg</h4></td>
                                            <td></td>
                                            <td><h4>Total Amt: &#8358; {Intl.NumberFormat().format(total, 2)}</h4></td>
                                            <td></td>

                                        </tr>
                                    </tbody>
                                    
                                </Table>
                            </Col>
                            </Row>
                        </Col>

        </Row>
        </>
    )
}
export default PeriodicSalesReport