import PrenatalImg from '../../assets/images/services/prenatal.jpg';

function Prenatal() {
    return (
    <div className='servicePage'>
      <div className='flexRow prgBreak'>
        <img className='servicePageImg' src={PrenatalImg}></img>
        <section className='serviceSummary whiteBackground'>
          <h1 className='serviceTitle lineBreak'>Prenatal & Postnatal Massage</h1>
          <p className='mainFont lineBreak'>Our prenatal and post-natal massages designed to help alleviate pain and discomfort, reduce stress, and promote relaxation.</p>
          <p className='mainFont lineBreak'>Whether you are pregnant or postpartum, our massages will offer you an opportunity to relax and rejuvenate.</p>

          {/* <h2 className='serviceSubTitle lineBreak'></h2>
          <ul>
            <li className='list bulletPoint mainFont'></li>
            <li className='list bulletPoint mainFont'></li>
            <li className='list bulletPoint mainFont'></li>
            <li className='list bulletPoint mainFont'></li>
            <li className='list bulletPoint mainFont'></li>
            <li className='list bulletPoint mainFont'></li>
            <li className='list bulletPoint mainFont'></li>
          </ul> */}
        </section>
      </div>

      <section className='whiteBackground smallPadding prgBreak'>
        <h2 className='serviceSubTitle lineBreak'>Benefits of a Prenatal Massage</h2>
        {/* <p className='mainFont'>There are many benefits to prenatal massage, including:</p> */}
        <ul>
          <h3 className='bodyTextTitle list bold mainFont'>Pain Relief</h3>
            <p className='mainFont'>Prenatal massage can help to relieve pain and discomfort in the back, neck, shoulders, and hips.</p>
          <h3 className='bodyTextTitle list mainFont'>Stress Relief</h3>
            <p className='mainFont'>Pregnancy can be stressful, and prenatal massage can help to reduce stress and promote relaxation.</p>
          <h3 className='bodyTextTitle list mainFont'>Improved Circulation</h3>
            <p className='mainFont'>Massage can help to improve circulation, which can benefit both you and your baby.</p>
          <h3 className='bodyTextTitle list mainFont'>Better Sleep</h3>
            <p className='mainFont'>Prenatal massage can help to improve the quality of your sleep, which is important for both you and your baby.</p>
          <h3 className='bodyTextTitle list mainFont'>Reduced Swelling</h3>
            <p className='mainFont lineBreak'>Massage can help to reduce swelling in the hands and feet, which is a common symptom of pregnancy.</p>
        </ul>
        <h2>Postnatal Massage</h2>
        <p className='mainFont'>A Postnatal Massage is a wonderful way to get your body back on track after giving birth. An abdominal massage during this time can help with pelvic floor health and digestive and bladder function.Postnatal massage sessions can also focus on reducing stress, improving circulation and reducing muscle tension and joint pain.</p>
      </section>

      {/* <section className='whiteBackground smallPadding prgBreak'>
        <h2 className='serviceSubTitle lineBreak'>Benefits</h2>
        <p className='mainFont lineBreak'></p>
        <p className='mainFont lineBreak'>Therapeutic head massage helps cope with stress, muscle spasms, sleep disorders, drowsiness, and chronic fatigue. It brings relief from cramps and spasms of the facial muscles, pain in the joints and neck.</p>
        <p className='mainFont lineBreak'>Cosmetic head massage improves the condition of the skin and hair, helps get rid of seborrhea, dandruff, alopecia (hair loss)..</p>
        <p className='mainFont lineBreak'>Positive benefits of scalp massage include: elimination of headaches; getting rid of puffiness of the face, 'bags' under the eyes; improvement of hair nutrition, activation of hair growth; improvement of memory, attention; activation of mental activity; relief from muscle spasms.</p>
        <p className='mainFont lineBreak'></p>

      </section> */}

      <section className='prgBreak whiteBackground smallPadding'>
        <h2 className='serviceSubTitle lineBreak'>Precaution</h2>
        {/* <h3 className='prgSubject'>The procedure should not be performed on people with any of the following conditions as it can be dangerous.</h3>
        <p className='mainFont italic lineBreak'>Fresh fracture or wound(s), Thrombosis, Diseases of the heart and vascular system, Predisposition to increased blood pressure, Varicose veins, Pregnancy, Hernias, Inflammatory processes, and/or Tuberculosis.</p>
        <h3 className='prgBreak'>If you match any of the prior listed conditions please consult your doctor before booking your massage.</h3> */}
        <a className='bookNowBtn' href='/book-now'>Book Your Massage Here</a>
        <ul>
          <li className='mainFont bulletPoint'>30 Minutes - $80.00</li>
          <li className='mainFont bulletPoint'>60 Minutes - $160.00</li>
          <li className='mainFont bulletPoint'>90 Minutes - $220.00</li>
        </ul>
      </section>

    </div>
  );
}

export default Prenatal;