import Head from './components/Layout/Header/Head.jsx';
import Login_page from './components/pages/Login_page/Login_page.jsx';
import Foot from './components/Layout/Footer/Foot.jsx';
import './components/pages/Login_page/Main.css';
import {Layout} from "antd";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const {Content}=Layout;
function App() {
    return (
        <Router>
        <div className="App">
        <Layout className="main-layout">
            <Head />
            <Content id="content">
                <Routes>
                    <Route path="/" element={<Login_page />}/>
                    <Route path="*" element={<div>Stránka nenalezena</div>} />
                </Routes>
            </Content>
            <Foot />
        </Layout>
        </div>
        </Router>
    );
}

export default App;