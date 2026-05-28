import {Layout} from 'antd';
import {useLocation} from "react-router-dom";
import './Profile.css'


const {Content} = Layout

function Profile() {
    const location = useLocation();
    const { email, customerId } = location.state;
    return (
        <Content id="cont">
            <div id="container">
                <div id="top">
                <h1>Vaše Informace:</h1>
                </div>
                <br/>
                <div className="txt">
            <h2>Email:</h2><p>{email}</p>
                </div>
                <div className="txt">
            <h2>Customer ID:</h2><p>{customerId}</p>
                </div>
            </div>
        </Content>
    );
}

export default Profile;