import DetoxImg from '../../assets/images/services/detox.jpg';

function Detox() {
    return (
    <div className='servicePage'>
      <div className='flexRow prgBreak'>
        <img className='servicePageImg' src={DetoxImg} alt='Detox Massage Display Image'></img>

        <section className='serviceSummary whiteBackground'>
          <h1 className='serviceTitle lineBreak'>Detox Custom Swedish Massage</h1>
          <p className='mainFont lineBreak'>Swedish massage is an effective Classic European therapy that works real miracles, healing the body from many ailments.</p>
          <p className='mainFont lineBreak'>Massage helps treat diseases and diagnose them. Swedish massage is a special massage system aimed at deep penetration into tissues, affecting muscles, joints and neurovascular bundles.</p>
          <h2 className='serviceSubTitle lineBreak'>What does a Swedish massage give?</h2>
          <ul>
            <li className='list bulletPoint mainFont'>The technique copes well with adhesions, various seals and scars in the joints.</li>
            <li className='list bulletPoint mainFont'>Diseased joints become flexible and mobile.</li>
            <li className='list bulletPoint mainFont'>Puffiness disappears.</li>
            <li className='list bulletPoint mainFont'>The muscles become toned and elastic.</li>
            <li className='list bulletPoint mainFont'>Relieves fatigue and muscle spasms.</li>
            <li className='list bulletPoint mainFont'>Blood circulation and lymphatic drainage of the limb are normalized.</li>
            <li className='list bulletPoint mainFont'>There is a rapid recovery from injuries.</li>
          </ul>
        </section>
      </div>

      <section className='whiteBackground smallPadding prgBreak'>
        <h2 className='serviceSubTitle lineBreak'>History Of Origin</h2>
        {/* <img src=''></img> */}
        <p className='lineBreak mainFont'>Swedish massage, or the Swedish Massage System, is a unique technique for the treatment and prevention of many diseases of the musculoskeletal system, problems with joints and muscles. There is no need to select medication or choose from a variety of techniques.</p>
        <p className='mainFont lineBreak'>Classic Swedish Massage works real miracles, healing the body from many ailments.</p>
        
        <p className='mainFont lineBreak'>The time when the technique appeared was the beginning of the 19th century. Massage therapist and doctor from Stockholm Per Ling studied various techniques, paying attention to many of them, but in practice it turned out that something was missing from each. It is worth noting that the doctor himself suffered from rheumatism.</p>
        <p className='mainFont lineBreak'>The disease gave him the impetus to develop his own exercises and massage therapy techniques, combining various techniques.</p>
        <p className='mainFont lineBreak'>And after some time healing came. Ling realized that for successful healing it is necessary to influence the entire body, focusing on rubbing the diseased joints and stretching the muscles and neurovascular bundles. This is how the Swedish Massage System appeared. Later, Swedish massage began to be divided into subtypes: classic, holistic and others. Session duration is 40-60 minutes.</p>

      </section>

      <section className='prgBreak whiteBackground smallPadding'>
        <h2 className='serviceSubTitle lineBreak'>Precaution</h2>
        <h3 className='prgSubject'>The procedure should not be performed on people with any of the following conditions as it can be dangerous.</h3>
        <p className='mainFont italic lineBreak'>Fresh fracture or wound(s), Thrombosis, Diseases of the heart and vascular system, Predisposition to increased blood pressure, Varicose veins, Pregnancy, Hernias, Inflammatory processes, and/or Tuberculosis.</p>
        <h3 className='prgBreak'>If you match any of the prior listed conditions please consult your doctor before booking your massage.</h3>
        <a className='bookNowBtn' href='/book-now'>Book Your Massage Here</a>
        <ul>
          <li className='mainFont bulletPoint'>30 Minutes - $70</li>
          <li className='mainFont bulletPoint'>60 Minutes - $110</li>
          <li className='mainFont bulletPoint'>90 Minutes - $160</li>
        </ul>
      </section>

    </div>
  );
}

export default Detox;