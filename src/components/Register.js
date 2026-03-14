import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import { useEffect, useState } from "react"
import Custombar from "./CustomBar"
import { Container, Spinner } from "react-bootstrap"
import { Link } from "react-router"
import { getUsers } from "../API"

const Register = ({mobile}) => {

    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [cpassword, setcpassword] = useState("")

    const [users, setUsers] = useState([])

    const [accesslevel, set_accesslevel] = useState("0")

    useEffect(() => {
        getAllUsers()
    },[])

    const getAllUsers = () => {
        getUsers().get("/").then(res => setUsers(res.data))
        .catch(error => console.log("An error has occurred", error))
    }

    const [modalText, setmodalText] = useState("")

    const [show, setShow] = useState(false)

    const [loading, setLoading] = useState("")

    const handleClose = () => setShow(false)

    const register = () => {
        
        const user = users.filter(u => u.username === username)[0]
        
        if(username === "" || password === "" || cpassword === ""){
            setmodalText("Please enter all Fields")
            setShow(true)
        }else if(accesslevel === "0"){
            setmodalText("Select access level")
            setShow(true)
        }else if(password !== cpassword){
            setmodalText("Passwords do not match")
            setShow(true)
        }else if(user){
            setmodalText("username Already Exist")
            setShow(true) 
        }else{
            setLoading("border")
            //let accesslevel = 1
            let items = {username, password, accesslevel}
            getUsers().post("/", items).then(() => {
                setLoading("")
                setmodalText("Register Successfull")
                setShow(true)
                setusername("")
                setpassword("")
                setcpassword("")
            })
            
        }
    }


    return(
        <>
        <Custombar link={'/'} link_name={'Login'} />
        <Container>
        <Row style={{width: '98%'}}>
            <Col>
                <div style={{paddingTop: 100}}>  
                    <h4>
                        Welcome, KNERGY LIMITED
                    </h4>
                    <hr/>
                </div>
            </Col>
        </Row>
        <div style={{paddingTop: 30}}>
         <Form>
            <Row className="mb-3 justify-content-center">
                <Form.Group as={Col} md='5'>
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                        style={{
                            backgroundColor: 'ButtonFace',
                            height: 50,
                            borderRadius: 10
                        }}
                   />
                </Form.Group>
            </Row>
            <Row className="mb-3 justify-content-center">
                <Form.Group as={Col} md='5'>
                    <Form.Label>Access Level</Form.Label>
                    <Form.Select
                       type="text"
                       value={accesslevel}
                       onChange={(e) => set_accesslevel(e.target.value)}
                       style={{
                            backgroundColor: 'ButtonFace',
                            height: 50,
                            borderRadius: 10
                        }}
                   >
                    <option value="0">access level</option>
                    <option value="1">admin</option>
                    <option value="2">users</option>
                   </Form.Select>
                </Form.Group>
            </Row>
            <Row className="mb-3 justify-content-center">
                <Form.Group as={Col} md='5'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        style={{
                            backgroundColor: 'ButtonFace',
                            height: 50,
                            borderRadius: 10
                        }}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3 justify-content-center">
                <Form.Group as={Col} md='5'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        value={cpassword}
                        onChange={(e) => setcpassword(e.target.value)}
                        style={{
                            backgroundColor: 'ButtonFace',
                            height: 50,
                            borderRadius: 10
                        }}
                    />
                </Form.Group>
            </Row>
            <Row className="justify-content-center"> 
                <Form.Group as={Col} md={5}>
                    <Button onClick={register}>
                        <Spinner
                            size="sm"
                            as="span"
                            animation={loading}
                        />
                        Register
                    </Button>
                    &nbsp;
                    Already Have Account?
                    &nbsp; 
                    <Link to='/'>
                        Login
                    </Link>
                </Form.Group>
            </Row>
        </Form> 
        </div>
        <Modal size="sm" onHide={handleClose} show={show}>
            <Modal.Header closeButton>
                <Modal.Title>Message</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{alignContent: 'center'}}>
                {modalText}

            </Modal.Body>
        </Modal>
    </Container>
    </>        
    )
}

export default Register