import Form from '../components/ContactForm'

function ContactUs() {
    return (
    <div className='contactPage flexColumn'>
      <h1 className='sectionTitle center'>Contact Us</h1>
      <section className='center flexRow'>
        <div className='businessInfo'>
          <h2 className="minorTitle">Business Contacts</h2>
          <p className='businessInfoTxt'>Call Us At: </p>
          <p className='businessInfoTxt'>Email Us At: </p>
          <a className='businessInfoTxt'>Find Us At: 108 Adams St, Hoboken, NJ 07030</a>
        </div>
        <Form></Form>
      </section>
      
    </div>
  );
}

export default ContactUs;