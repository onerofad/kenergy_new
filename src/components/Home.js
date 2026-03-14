import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import { useEffect, useState } from "react"
import Custombar from "./CustomBar"
import { Container, Spinner } from "react-bootstrap"
import { Link, useNavigate } from "react-router"
import { BiMessageError } from "react-icons/bi"
import API, { getUsers } from "../API"

const Home = ({mobile}) => {

    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUsers()
    },[])

    const getAllUsers = () => {
        getUsers().get('/')
        .then(res => setUsers(res.data))
        .catch(error => console.log('An error has occurred' + error))
    }

    const router = useNavigate()

     const [modalText, setmodalText] = useState("")

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)

    const [loading, setLoading] = useState('')

    const login = () => {
        const user = users.filter(u => u.username === username)[0]
        if(username === ""){
            setmodalText("Please enter a username")
            setShow(true)
        }else if(password === ""){
            setmodalText("Please enter a password")
            setShow(true)
        }else if(!user){
            setmodalText("Username is invalid")
            setShow(true)
        }else if(user.password != password){
            setmodalText("Password is Invalid")
            setShow(true)
        }else{  
            const user = users.filter(u => u.username === username)[0]
            let accesslevel = user.accesslevel
            setLoading('border')  
            setTimeout(() => {
                setLoading('')
                sessionStorage.setItem("uname", username)
                sessionStorage.setItem("accesslevel", accesslevel)
                router('/Inventory')
            }, 3000)
           
        }
    }

    if(mobile){
        return(
            <h4 style={{alignItems: 'center', justifyContent: 'center'}}>No mobile view</h4>
        )
    }else{
    return(
        <>
        <Custombar link={'register'} link_name={'Register'} />
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
            <Row className="justify-content-center"> 
                <Form.Group as={Col} md={5}>
                    <Button 
                        onClick={login}

                    > 
                        <Spinner 
                            as="span"
                            animation={loading}
                            size="sm"
                            role="status"
                            arial-hidden="true"
                        />
                        Log in
                    </Button>
                    &nbsp;
                    Don't Have Account? 
                    &nbsp;
                    <Link to='register'>
                        Register
                    </Link>
                </Form.Group>
            </Row>
        </Form> 
         <Modal size="sm" onHide={handleClose} show={show}>
            <Modal.Header closeButton>
                <Modal.Title>Error Message</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{alignContent: 'center'}}>
                <BiMessageError size={40} color="red" />
                &nbsp;
                {modalText}

            </Modal.Body>
        </Modal>
        </div>
    </Container>
    </>        
    )
}
}

export default Home