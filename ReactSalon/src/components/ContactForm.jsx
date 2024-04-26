import { useState, useRef } from "react";
// import Popup from '../components/Popup';

const ContactForm = () => {
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const subjectId = useRef(null);
  const nameId = useRef(null);
  const emailId = useRef(null);
  const numberId = useRef(null);
  const messageId = useRef(null);
  const divId = useRef(null);

  const sendEmail = async () => {
    const bodyMessage = `Full Name: ${name}<br>Email: ${email}<br>Phone Number: ${number}<br>Message:<br>${message}`;
    
    Email.send({
      Host : "smtp.elasticemail.com",
      Username : "malugemc@gmail.com",
      Password : 'BC26D149AEBFB730D449AE28B67C7EDBB638',
      To : 'malugemc@gmail.com',
      From : "malugemc@gmail.com",
      Subject : `Website Msg: ${subject}`,
      Body : bodyMessage
  }).then(
    message => {
      if(message != "OK") {
        alert("Something Went Wrong");
      }
    }
  );
  }

  const checkForm = () => {
    //Creates an array of each form field
    const items = [{value: subject, id: subjectId}, {value: name, id: nameId}, {value: email, id: emailId}, {value: number, id: numberId}, {value: message, id: messageId}];
    //Checks that each field has content, otherwise changes to error state
    items.forEach((item) => {
      if(item.value == "") {
        item.id.current.firstChild.classList.add("error");
        item.id.current.lastChild.classList.remove("hide");
      }
    })
  }

  //Removes a form field's error state when the user adds content
  const handleChange = (event) => {
    //*Future Note: These are dependent on <input> and <p> respectively being the first and last child element's in their field <div>
    event.target.classList.contains("error") ? event.target.classList.remove("error"): null;
    const hidden = event.target.parentElement.lastChild.classList.contains("hide")
    !hidden ? event.target.parentElement.lastChild.classList.add("hide") : null;
  }

  const handlePhone = (value) => {
    if (!value) return;
    // Resets any non-numbers that the user inputs
    const letterRegex = /[\D]/g;
    if (value.match(letterRegex)) {setNumber('')};
    
    // Takes the inputted numbers and formats them into a phone number template
    const regex = /[\d]/g;
    var phoneNumber = value.match(regex);
    if (value.match(regex)) {
    phoneNumber = phoneNumber.join('');
    }
    const numLength = phoneNumber?.length;
    if (numLength < 4) {
      setNumber(phoneNumber)};
    if (3 < numLength && numLength < 7) {
      setNumber(`(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`);
    };
    if (numLength > 6) {
      setNumber(`(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)} - ${phoneNumber.slice(6, 10)}`);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkForm();
    //An empty field will prevent the form from submitting
    if(subject == "" || name == "" || email == "" || number == "" || message == "") {
      setSuccess(false);
    } else {
      sendEmail();
      // Reset form after successful submission
      setName("");
      setEmail("");
      setSubject("");
      setNumber("");
      setMessage("");
      //State change initiates popup
      setSuccess(true);
    }
  };

  return (
    <form className="contactForm" autoComplete="off" onSubmit={handleSubmit}>
      <h2 className="minorTitle">Send A Message:</h2>
      <div ref={divId} className="formDiv">
        <div ref={nameId} className="flexColumn formSection">
          <input className="formFields" type="text" placeholder="Full Name" autoComplete="off" value={name} onChange={(e) => {setName(e.target.value); handleChange(e)}} />
          <p className="errorTxt hide">Full Name cannot be blank</p>
        </div>
        <div ref={emailId} className="flexColumn formSection">
          <input className="formFields" type="text" placeholder="Email" autoComplete="off" value={email} onChange={(e) => {setEmail(e.target.value); handleChange(e)}} />
          <p className="errorTxt hide">Email cannot be blank</p>
        </div>
      </div>
      <div className="formDiv">
        <div ref={subjectId} className="flexColumn formSection">
          <input className="formFields" type="text" placeholder="Subject" autoComplete="off" value={subject} onChange={(e) => {setSubject(e.target.value); handleChange(e)}} />
          <p className="errorTxt hide">Subject cannot be blank</p>
        </div>
        <div ref={numberId} className="flexColumn formSection">
          <input className="formFields" type="tel" placeholder="Phone Number" autoComplete="off" value={number} onChange={(e) => {setNumber(e.target.value); handlePhone(e.target.value); handleChange(e)}} />
          <p className="errorTxt hide">Phone Number cannot be blank</p>
        </div>
      </div>
      <div className="flexColumn">
        <div ref={messageId} className="flexColumn">
          <textarea className="formFields" type="text" placeholder="Message" cols="30" rows="10" autoComplete="off" value={message} onChange={(e) => {setMessage(e.target.value); handleChange(e)}} />
          <p className="errorTxt hide">Message cannot be blank</p>
        </div>
        <button className="formBtn" type="submit">Submit</button>
      </div>
      
      {/* <Popup trigger={success} setTrigger={setSuccess}>
      </Popup> */}
    </form>
  );
};

export default ContactForm;