import AnticelluliteImg from '../../assets/images/services/Anticellulite.jpg';

function Anticellulite() {
    return (
      <div className='servicePage'>
      <div className='flexRow prgBreak'>
        <img className='servicePageImg' src={AnticelluliteImg} alt='CBD Massage Display Image'></img>

        <section className='serviceSummary whiteBackground'>
          <h1 className='serviceTitle lineBreak'>Anticellulite Massage</h1>
          <p className='mainFont lineBreak'>A very popular type of procedure for women, especially before the summer season or before a long-awaited trip to relax on velvet beaches. This type of massage influences the adipose tissue. Because of this, fat cells are destroyed.</p>
          <p className='mainFont lineBreak'>During the procedure, the tissues are heated. This leads to improved blood flow in areas of orange peel formation. Improving metabolic processes contributes to the rapid removal of excess fluid from the body, toxins and waste.</p>
          <p className='mainFont lineBreak'>To achieve maximum effect, it is recommended to perform 10-12 procedures. Exposure is recommended immediately after physical training.</p>
          <p className='mainFont lineBreak'>The anti-cellulite massage technique allows you to “introduce” the beneficial substances of cosmetics into the deep layers of the skin, which makes the program more effective. And thanks to the improved functioning of the lymphatic drainage system, swelling will go away and the silhouette will become more elegant.</p>
          <p className='mainFont lineBreak'>The natural oils used in the program have a comprehensive effect on the skin, which helps not only reduce excess fat, but also make the body smoother and more toned.</p>
          {/* <p className='mainFont lineBreak'></p> */}
        </section>
      </div>



      <section className='prgBreak whiteBackground smallPadding'>
        <h2 className='serviceSubTitle lineBreak'>Precaution</h2>
        <h3 className='prgSubject'>The procedure should not be performed on people with any of the following conditions as it can be dangerous.</h3>
        <p className='mainFont italic lineBreak'>Fresh fracture or wound(s), Thrombosis, Diseases of the heart and vascular system, Predisposition to increased blood pressure, Varicose veins, Pregnancy, Hernias, Inflammatory processes, and/or Tuberculosis.</p>
        <h3 className='prgBreak'>If you match any of the prior listed conditions please consult your doctor before booking your massage.</h3>

        <h2 className='serviceSubTitle lineBreak'>Contraindications to the use of an Anticellulite Massage:</h2>
        <ul className='prgBreak'>
          <li className='mainFont bulletPoint'>Acute infectious diseases.</li>
          <li className='mainFont bulletPoint'>Pregnancy.</li>
          <li className='mainFont bulletPoint'>Exacerbation of mental illness.</li>
          <li className='mainFont bulletPoint'>Thrombosis and varicose veins of the limbs.</li>
          <li className='mainFont bulletPoint'>Temporary damage to the skin.</li>
          <li className='mainFont bulletPoint'>Fever with elevated body temperature.</li>
          <li className='mainFont bulletPoint'></li>
          <li className='mainFont bulletPoint'></li>
          <li className='mainFont bulletPoint'></li>
          <li className='mainFont bulletPoint'></li>
        </ul>

        <a className='bookNowBtn' href='/book-now'>Book Your Massage Here</a>
        <ul>
            <li className='mainFont bulletPoint'>30 Minutes - $70.00</li>
            <li className='mainFont bulletPoint'>60 Minutes - $110.00</li>
        </ul>
      </section>

    </div>
  );
}

export default Anticellulite;