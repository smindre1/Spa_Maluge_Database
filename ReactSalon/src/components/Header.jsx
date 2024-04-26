import { useState, useEffect} from "react"
import Logo from "../assets/Maluge_Logo.svg"
import LogoTwo from "../assets/Maluge_Logo_Two.svg"

function Header() {
    const [home, setHome] = useState(false);
    const [services, setServices] = useState(false);
    const [contact, setContact] = useState(false);
    const [book, setBookNow] = useState(false);


    const pageSelection = () => {
        const page = window.location.pathname;
        page == "/" ? setHome(true) : setHome(false);
        page == "/services" ? setServices(true) : setServices(false);
        page == "/contact-us" ? setContact(true) : setContact(false);
        page == "/book-now" ? setBookNow(true) : setBookNow(false);
    };

    useEffect(() => {
        pageSelection();
    }, [home, services, contact, book])
    
    return (
    <header className={home ? "homeHeader" : null}>
        {/* <img className="logo" src={LogoTwo} ></img> */}
        <nav className="menu">
            <a href="/" className={home ? "highlight menuBarText" : "textColor menuBarText"}>Home</a>
            <a href="/services" className={services ? "highlight menuBarText" : "textColor menuBarText"}>Services</a>
            <a href="/book-now" className={book ? "highlight menuBarText" : "textColor menuBarText"}>Book</a>
            <a href="/contact-us" className={contact ? "highlight menuBarText" : "textColor menuBarText"}>Contact Us</a>
        </nav>
    </header>
    );
  }
  
  export default Header;