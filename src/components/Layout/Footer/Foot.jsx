
import { Layout, Button } from 'antd';
import { PhoneOutlined } from "@ant-design/icons";
import Footer_data from "../../../assets/Footer_data.json";
import '../../../styles/reset.css';
import './Foot.css';

const { Footer } = Layout;

function Foot() {
    const linkColumns = [];


    Footer_data.links.forEach((section, index) => {
        linkColumns.push(
            <div className="col" key={`link-${index}`}>
                <h1>{section.title}</h1>
                {section.items.map(item => <p key={item}>{item}</p>)}
            </div>
        );
    });
    linkColumns.push(
        <div className="col" key="centers-col">
            <h1>{Footer_data.centers.title}</h1>
            <div className="colum">
                <div className="col2">
                    {Footer_data.centers.column1.map((city) => (
                        <p key={city}>{city}</p>
                    ))}
                </div>
                <div className="col2">
                    {Footer_data.centers.column2.map((city) => (
                        <p key={city}>{city}</p>
                    ))}
                </div>
            </div>
        </div>
    );
    return (
        <Footer id="footer">
            {linkColumns}

            <div className="col3">
                <h1>Bezplatná linka</h1>
                <div id="phonenum">
                    <PhoneOutlined id="phone"/>
                    <p id="num"> 800 606 806</p>
                    <p id="day">po-pá 7.30-16.00</p>
                </div>
                <div id="small">
                    <p>Pro objednání či přeobjednání termínu, prosím volejte naší zelenou linku.
                        Rezervovat termín si můžete i online na našem
                        <a className="clickhere" href="reservep.php"> rezervačním portálu</a>
                    </p>
                </div>

                <Button id="obj">Objednat se</Button>
            </div>
        </Footer>
    );
}

export default Foot;