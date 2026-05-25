import { useState } from 'react';
import '../../Web.css';
import { Layout, Input, Divider, Form, Modal } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import Head from '../Layout/Head.jsx';
import Foot from '../Layout/Foot.jsx';


import { validateAndShow } from '../../Modal.js';

const { Content } = Layout;

function Main() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleOk = () => setIsModalOpen(false);
    const showModal = () => setIsModalOpen(true);

    const onFinish = (values) => {
        setFormData(values);
        validateAndShow(values, showModal);
    };

    return (
        <Layout className="main-layout">
            <Head />

            <Content id="content">
                <Form layout="vertical" id="form" onFinish={onFinish}>

                    <Form.Item
                        label="Email"
                        name="email"
                        className="input"
                        rules={[
                            { required: true, message: 'Nezadaný Email' },
                            { type: 'email', message: 'Špatný formát emailu' }
                        ]}
                    >
                        <Input className="ins" placeholder="zadejte Váš Email" />
                    </Form.Item>

                    <Form.Item
                        className="input"
                        label="Heslo"
                        name="password"
                        rules={[{ required: true, message: 'Nezadané Heslo' }]}
                    >
                        <Input.Password className="ins" placeholder="zadejte Vaše heslo" />
                    </Form.Item>

                    <a href="#"><LockOutlined />Zapomenuté Heslo</a>

                    <div id="choice">
                        <button type="submit" id="login">Přihlásit se</button>
                        <Divider>nebo</Divider>
                        <button type="button" id="signin">Vytvořit nový účet Moje Amber</button>
                        <p className="mid-text">Jste náš stávající dárce a nemůžete se přihlásit?</p>
                        <p className="mid-text"><a className="mid-text" href="#">Klikněte zde</a> a nastavte si heslo.</p>
                    </div>
                </Form>
            </Content>

            <Foot />

            <Modal title="Vaše Informace" open={isModalOpen} onOk={handleOk} onCancel={handleOk}>
                <div className="modal-par">
                    <h2 className="modal-h">Email: </h2>
                    <p className="modal-p">{formData.email}</p>
                </div>
                <div className="modal-par">
                    <h2 className="modal-h">Heslo: </h2>
                    <p className="modal-p">{formData.password}</p>
                </div>
            </Modal>
        </Layout>
    );
}

export default Main;