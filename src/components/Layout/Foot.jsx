
import { Layout, Button } from 'antd';
import { PhoneOutlined } from "@ant-design/icons";

const { Footer } = Layout;

function Foot() {
    return (
        <Footer id="footer">
            <div className="col">
                <h1>Amber Plasma</h1>
                <p>Proč darovat plazmu</p>
                <p>Staňte se dárcem</p>
                <p>Odměny</p>
                <p>Novinky</p>
                <p>Slovník pojmů</p>
                <p>FAQ</p>
            </div>

            <div className="col">
                <h1>O nás</h1>
                <p>O společnosti</p>
                <p>Kariéra</p>
                <p>Napsali o nás</p>
                <p>Partneři</p>
                <p>Kontakty</p>
                <p>Whistleblowing</p>
                <p>GDPR</p>
            </div>

            <div className="col">
                <h1>Dárcovská centra</h1>
                <div className="colum">
                    <div className="col2">
                        <p>Česká Lípa</p>
                        <p>Děčín</p>
                        <p>Cheb</p>
                        <p>Chomutov</p>
                        <p>Jablonec nad Nisou</p>
                        <p>Karlovy Vary</p>
                    </div>

                    <div className="col2">
                        <p>Litoměřice</p>
                        <p>Mladá Boleslav</p>
                        <p>Plzeň</p>
                        <p>Praha - Nové Butovice</p>
                        <p>Příbram</p>
                        <p>Teplice</p>
                    </div>
                </div>
            </div>

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