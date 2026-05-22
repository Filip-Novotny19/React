
import { Layout } from 'antd';
import amberimg from "../../assets/amber-logo.svg";
import darceimg from "../../assets/portal-darce-logo.svg";

const { Header } = Layout;

function Head() {
    return (
        <Header id="header">
            <img src={amberimg} alt="Amber Logo"/>
            <img src={darceimg} alt="Darce Logo"/>
            <img src={darceimg} alt="Darce Logo" id="fake"/>
        </Header>
    );
}

export default Head;