import {Layout, Form, Input, Modal} from 'antd';
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import './Profile.css';
import '../Login_page/Main.css';
import axios from "axios";



const {Content} = Layout

function Profile() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [form] = Form.useForm();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!location.state?.info) {
            navigate('/', { replace: true });
        }
    }, [location.state?.info, navigate]);

    if (!location.state) return null;

    const { info } = location.state;
    const { personal_information, address_information } = info;

    const initialValues = {
        full_name: `${personal_information?.first_name} ${personal_information?.last_name}`,
        email: personal_information?.email,
        phone: personal_information?.phone || 'Nezadáno',
        birthdate: personal_information?.birthdate,
        address: `${address_information?.street || 'Ulice nezadaná'}, ${address_information?.city || 'Město nezadané'}`
    };


    const handleOk = () => {
        setIsModalOpen(false);
        setIsErrorOpen(false);
    };


    const onSave = async (values) => {
        try {
            const newData = {
                ...info,
                personal_information: {
                    ...info.personal_information,
                    email: values.email,
                    phone: values.phone,
                    birthdate: values.birthdate,
                    first_name: values.full_name.split(' ')[0],
                    last_name: values.full_name.split(' ').slice(1).join(' ')
                },
                address_information: {
                    ...info.address_information,
                    street: values.address.split(',')[0]?.trim(),
                    city: values.address.split(',')[1]?.trim()
                }
            };

            const BASE_URL = 'http://localhost:3000';
            const APP_ID = '85d6598db0bf3f62afd5db8507';
            const token = localStorage.getItem('token');

            const response = await axios.put(`${BASE_URL}/customers/${info.customer_id}`,
                {
                    customer: newData
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'X-External-App-Id': APP_ID,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200 || response.status === 204) {
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error("Save failed:", error);
            setIsErrorOpen(true);
        }
    };

    return (
        <Content id="cont">
            <Form
                id="form"
                layout="vertical"
                form={form}
                onFinish={onSave}
                initialValues={initialValues}
            >
                <Form.Item label="Jméno" name="full_name" className="input">
                    <Input className="ins" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    className="input"
                    rules={[{ type: "email", message: "Špatný formát emailu" }]}
                >
                    <Input className="ins" />
                </Form.Item>


                <Form.Item label="Telefon" name="phone" className="input"
                rules={[{type:"number"}]}
                >
                    <Input className="ins" />
                </Form.Item>

                <Form.Item label="Datum narození" name="birthdate" className="input">
                    <Input className="ins" />
                </Form.Item>

                <Form.Item label="Adresa" name="address" className="input">
                    <Input className="ins" />
                </Form.Item>

                <button type="submit" className="login">Uložit změny</button>
            </Form>

            <Modal
                title="Úspěch"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleOk}
            >
                <p>Profil byl úspěšně aktualizován!</p>
            </Modal>
            <Modal
            title="Úspěch"
            open={isErrorOpen}
            onOk={handleOk}
            onCancel={handleOk}
            >
                <p>Došlo k chybě při aktualizaci profilu.</p>
            </Modal>
        </Content>
    );
} export default Profile;