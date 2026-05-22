import {useState}from 'react';
import '../../Web.css';
import { Layout, Input, Divider, Form, Modal } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import Head from '../Layout/Head.jsx';
import Foot from '../Layout/Foot.jsx';




const { Content } = Layout;

function Main() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    return (
        <Layout className="main-layout">


            <Head />


            <Content id="content">
                <Form layout="vertical" id="form">

                    <Form.Item
                        label="Email"
                        name="email"
                        className="input"
                        rules={[{required: true, message: 'Nezadaný Email'}]}
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

                    <a href="#"><LockOutlined/>Zapomenuté Heslo</a>

                    <div id="choice">
                        <button type="submit" id="login" onClick={showModal}>Přihlásit se</button>
                        <Divider>nebo</Divider>
                        <button type="button" id="signin">Vytvořit nový účet Moje Amber</button>
                        <p className="mid-text">Jste náš stávající dárce a nemůžete se přihlásit?</p>
                        <p className="mid-text"><a className="mid-text" href="#">Klikněte zde</a> a nastavte si heslo.</p>
                    </div>
                </Form>
            </Content>

            <Foot />
            <Modal title="Modal" closable={{ 'aria-label': 'Custom Close Button' }} open={isModalOpen} onOk={handleOk} onCancel={handleOk}>

            </Modal>

        </Layout>

    );
}

export default Main;