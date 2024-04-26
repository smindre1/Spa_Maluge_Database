import DeepImg from '../../assets/images/services/deep.jpg';
//Deep Tissue Massage Page
function Deep() {
    return (
      <div className='servicePage'>
      <div className='flexRow prgBreak'>
        <img className='servicePageImg' src={DeepImg} alt='Deep Tissue Massage Display Image'></img>

        <section className='serviceSummary whiteBackground'>
          <h1 className='serviceTitle lineBreak'>Deep Tissue Massage</h1>
          <p className='mainFont lineBreak'>Experience the transformative power of deep tissue massage, a method that sets itself apart from classical massage through unique techniques. This specialized approach involves utilizing hooks and stretches of tissue, employing the tips or phalanges of the fingers, fist, forearm, and elbow. The gentle yet effective nature of this massage aims to restore connective tissues, offering a holistic solution to normalize the functions of your musculoskeletal system as a cohesive unit. Say goodbye to muscle pain and the effects of stress, tension, and fatigue caused by intense work, incorrect posture, or active sports, and embrace a renewed sense of well-being.</p>
          <p className='mainFont lineBreak'>Helps break down scar tissue that forms after injury and reduce tension in muscles and tissues. It also promotes faster healing by increasing blood flow and reducing inflammation.</p>
          {/* <h2 className='serviceSubTitle lineBreak'>What does a Deep Tissue Massage give?</h2>
          <ul>
            <li className='list bulletPoint mainFont'></li>
            <li className='list bulletPoint mainFont'></li>
            <li className='list bulletPoint mainFont'></li>
            <li className='list bulletPoint mainFont'></li>
            <li className='list bulletPoint mainFont'></li>
          </ul> */}
        </section>
      </div>

      {/* <section className='whiteBackground smallPadding prgBreak'>
        <h2 className='serviceSubTitle lineBreak'>History Of Origin</h2>
        <p className='mainFont lineBreak'></p>
        <p className='mainFont lineBreak'></p>
        
        <p className='mainFont lineBreak'></p>
        <p className='mainFont lineBreak'></p>
        <p className='mainFont lineBreak'></p>

      </section> */}

      <section className='prgBreak whiteBackground smallPadding'>
      <h2 className='serviceSubTitle lineBreak'>Precaution</h2>
        <h3 className='prgSubject'>The procedure should not be performed on people with any of the following conditions as it can be dangerous.</h3>
        <p className='mainFont italic lineBreak'>Fresh fracture or wound(s), Thrombosis, Diseases of the heart and vascular system, Predisposition to increased blood pressure, Varicose veins, Pregnancy, Hernias, Inflammatory processes, and/or Tuberculosis.</p>
        <h3 className='prgBreak'>If you match any of the prior listed conditions please consult your doctor before booking your massage.</h3>
        <a className='bookNowBtn' href='/book-now'>Book Your Massage Here</a>
        <ul>
          <li className='mainFont bulletPoint'>30 Minutes - $80.00</li>
          <li className='mainFont bulletPoint'>60 Minutes - $190.00</li>
          <li className='mainFont bulletPoint'>90 Minutes - $210.00</li>
        </ul>
      </section>

    </div>
  );
}

export default Deep;