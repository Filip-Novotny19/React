import {useState} from 'react';
import axios from 'axios';
import '../../../styles/reset.css';
import './Main.css';
import {Layout, Input, Divider, Form, Modal} from 'antd';
import {LockOutlined} from '@ant-design/icons';
import {validateAndShow} from '../../../modal.js';
import {useNavigate} from 'react-router-dom';

const {Content} = Layout;

function Login_page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({email: '', password: ''});
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleOk = () => {
        setIsModalOpen(false);
        setIsError(false)
    };
    const showModal = () => setIsModalOpen(true);

    const onFinish = async (values) => {


        try {
            const BASE_URL = 'http://localhost:3000';
            const APP_ID = '85d6598db0bf3f62afd5db8507';
            const config = {
                headers:
                    {
                        'Content-Type': 'application/json',
                        'Accept-Language': 'cs'
                    }
            }


            const authRes = await axios.post(`${BASE_URL}/tokens`,
                {
                    "setup": {
                        "setup_id": "1",
                        "language_id": "cs",
                        "allowed_gps": "false",
                        "allowed_notifications": false
                    },
                    "device": {
                        "device_id": "my-unique-web-id-001",
                        "device_type": "7",
                        "device_system": "Web",
                        "device_name": "Firefox"
                    },
                    "user": {
                        "login": values.email,
                        "password": values.password,
                    },
                    "properties": ["customer"],
                    'X-External-App-Id': APP_ID
                },

                config
            );

            const token = authRes.data.data.token_id;
            console.log("Token acquired:", token);


            const userLogin = await axios.post(`${BASE_URL}/tokens/${token}/actions/login`, {
                    "login_type": "email",
                    "login_value": values.email,
                    "password": values.password,
                    "X-External-App-Id": APP_ID
                },

                {
                    config,
                    headers: {
                        "Authorization": "Bearer " + token,
                    }

                });

            const customer = userLogin.data.data.customer_id;
            console.log("customer ID:", customer);

            const userRes = await axios.get(`${BASE_URL}/customers/${customer}`, {
                config,
                headers: {
                    "Authorization": "Bearer " + token,
                    'X-External-App-Id': APP_ID,
                }
            });


            console.log("Customer information received");
            console.dir(userRes.data.data);
            navigate('/profile', {state: {email: userRes.data.data.personal_information.email, customerId: customer}});
            setFormData(values);

            validateAndShow(values, showModal);
        } catch(error) {
            const status = error.response ? error.response.status : null;
            let msg = "Nastala neočekávaná chyba, zkuste to později";
            if (status === 401) {
                localStorage.removeItem('token');
                msg = "Chybné přihlašovací údaje, zkuste znovu";
            } else if (status === 404) {
                msg = "Stránka nebo uživatel už neexistuje";
            }
            setErrorMessage(msg);
            setIsError(true);
        }
        ;



    };

    return (
        <Content id="content">

            <Form layout="vertical" id="form" onFinish={onFinish}>
                <Form.Item
                    label="Email"
                    name="email"
                    className="input"
                    rules={[
                        {required: true, message: 'Nezadaný Email'},
                        {type: 'email', message: 'Špatný formát emailu'}
                    ]}
                >
                    <Input className="ins" placeholder="zadejte Váš Email"/>
                </Form.Item>

                <Form.Item
                    className="input"
                    label="Heslo"
                    name="password"
                    rules={[{required: true, message: 'Nezadané Heslo'}]}
                >
                    <Input.Password className="ins" placeholder="zadejte Vaše heslo"/>
                </Form.Item>

                <a href="#"><LockOutlined/> Zapomenuté Heslo</a>

                <div id="choice">

                    <button type="submit" id="login">Přihlásit se</button>
                    <Divider>nebo</Divider>
                    <button type="button" id="signin">Vytvořit nový účet Moje Amber</button>
                    <p className="mid-text">Jste náš stávající dárce a nemůžete se přihlásit?</p>
                    <p className="mid-text"><a className="mid-text" href="#">Klikněte zde</a> a nastavte si heslo.</p>
                </div>
            </Form>

            <Modal id="info" title="Vaše Informace" open={isModalOpen} onOk={handleOk} onCancel={handleOk}>
                <div className="modal-par">
                    <h2 className="modal-h">Email: </h2>
                    <p className="modal-p">{formData.email}</p>
                </div>
                <div className="modal-par">
                    <h2 className="modal-h">Heslo: </h2>
                    <p className="modal-p">{formData.password}</p>
                </div>
            </Modal>
            <Modal id="error" title="CHYBA" open={isError} onOk={handleOk} onCancel={handleOk}>
                <p className="modal-p">{errorMessage}</p>
            </Modal>
        </Content>
    );
}

export default Login_page;