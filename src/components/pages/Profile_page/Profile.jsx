import {Layout} from 'antd';
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import './Profile.css'


const {Content} = Layout

function Profile() {
    const location = useLocation();
    const navigate=useNavigate();
    useEffect(() => {

        if (!location.state?.info) {
            navigate('/', { replace: true });
        }
    }, [location.state?.info, navigate]);

    if (!location.state) return null;

    const {info} = location.state;
    const { personal_information, address_information } = info
    return (
        <Content id="cont">
            <div id="container">
            <h1>{personal_information?.salutation} zde jsou vaše informace</h1>
            <p><strong>Jméno:</strong> {personal_information?.first_name} {personal_information?.last_name}</p>
            <p><strong>Email:</strong> {personal_information?.email}</p>
            <p><strong>Telefon:</strong> {personal_information?.phone || 'Nezadáno'}</p>
            <p><strong>Datum narození:</strong> {personal_information?.birthdate}</p>
                <p><strong>Adresa:</strong> {address_information?.street || 'Ulice nezadaná'}, {address_information?.city || 'Město nezadané'}</p>

            </div>

        </Content>
    );
}

export default Profile;