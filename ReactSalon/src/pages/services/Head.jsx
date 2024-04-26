import HeadImg from '../../assets/images/services/head.jpg';

function Head() {
    return (
    <div className='servicePage'>
      <div className='flexRow prgBreak'>
        <img className='servicePageImg' src={HeadImg}></img>
        <section className='serviceSummary whiteBackground'>
          <h1 className='serviceTitle lineBreak'>Head, Neck, And Shoulders Massage</h1>
          <p className='mainFont lineBreak'>A focused massage designed to relieve tension in the upper body. the perfect stress reliever for computer users, those who suffer from headaches or carry stress in the neck & back. (moderate pressure) Massage of the cervical-collar area relaxes the neck muscles, improves blood circulation and metabolism in the cervical region, accelerates the outflow of lymph, and improves nutrition of the organs of the neck and head. With the help of massage, local muscle hardening and pain in the cervical region are relieved.</p>
          <p className='mainFont lineBreak'></p>

          <h2 className='serviceSubTitle lineBreak'>Recommended to Alleviate:</h2>
          <ul>
            <li className='list bulletPoint mainFont'>Increased psycho-emotional tension, frequent stress.</li>
            <li className='list bulletPoint mainFont'>Anxiety.</li>
            <li className='list bulletPoint mainFont'>Insomnia, daytime sleepiness.</li>
            <li className='list bulletPoint mainFont'>Headaches.</li>
            <li className='list bulletPoint mainFont'>Stress from overworking.</li>
            <li className='list bulletPoint mainFont'>Neuroses, flu colds (NOT exacerbation of the process).</li>
            <li className='list bulletPoint mainFont'>Non-infectious hair loss.</li>
          </ul>
        </section>
      </div>

      <section className='whiteBackground smallPadding prgBreak'>
        <h2 className='serviceSubTitle lineBreak'>Benefits</h2>
        <p className='mainFont lineBreak'>Massage treatments not only provide relaxation, but also benefit the entire body. This is fully true for head massage. It is divided into medicinal and cosmetic.</p>
        <p className='mainFont lineBreak'>Therapeutic head massage helps cope with stress, muscle spasms, sleep disorders, drowsiness, and chronic fatigue. It brings relief from cramps and spasms of the facial muscles, pain in the joints and neck.</p>
        <p className='mainFont lineBreak'>Cosmetic head massage improves the condition of the skin and hair, helps get rid of seborrhea, dandruff, alopecia (hair loss)..</p>
        <p className='mainFont lineBreak'>Positive benefits of scalp massage include: elimination of headaches; getting rid of puffiness of the face, “bags” under the eyes; improvement of hair nutrition, activation of hair growth; improvement of memory, attention; activation of mental activity; relief from muscle spasms.</p>
        <p className='mainFont lineBreak'></p>

      </section>

      <section className='prgBreak whiteBackground smallPadding'>
        <h2 className='serviceSubTitle lineBreak'>Precaution</h2>
        <h3 className='prgSubject'>The procedure should not be performed on people with any of the following conditions as it can be dangerous.</h3>
        <p className='mainFont italic lineBreak'>Fresh fracture or wound(s), Thrombosis, Diseases of the heart and vascular system, Predisposition to increased blood pressure, Varicose veins, Pregnancy, Hernias, Inflammatory processes, and/or Tuberculosis.</p>
        <h3 className='prgBreak'>If you match any of the prior listed conditions please consult your doctor before booking your massage.</h3>
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

export default Head;