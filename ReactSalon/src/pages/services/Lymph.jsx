import LymphImg from '../../assets/images/services/lymph.jpg';

function Lymph() {
    return (
    <div className='servicePage'>
        
        <div className='flexRow prgBreak'>
        <img className='servicePageImg' src={LymphImg}></img>

        <section className='serviceSummary whiteBackground'>
          <h1 className='serviceTitle lineBreak'>Lymphatic Drainage Massage</h1>
          <p className='mainFont lineBreak'>Our Lymphatic Drainage Massage offers a miraculous complex effect: it activates tissue lymph flow, improves blood circulation, eliminates excess fluid and toxins, and enhances the delivery of oxygen and nutrients.The procedure is prescribed for general improvement of the body, elimination of cellulite, excess fat deposits, and sagging skin.</p>
          <p className='mainFont lineBreak'>A clear result is noticeable after the first session of lymphatic drainage massage. Swelling and excess fluid from the body go away. You can notice a sharp decrease in volume by almost a size. To maintain this effect, two hours after the session you should refrain from eating and any drinks.</p>
          <p className='mainFont lineBreak'>Medical indications for massage include post-traumatic edema, chronic fatigue syndrome, varicose veins, thrombophlebitis, chronic venous insufficiency, and diseases of the musculoskeletal system.</p>
          <p className='mainFont lineBreak'></p>
        </section>
      </div>

      <section className='whiteBackground smallPadding prgBreak'>
        <h2 className='serviceSubTitle lineBreak'>Benefits</h2>
        <p className='mainFont lineBreak'>The procedure has a positive complex effect on the functioning of the body.</p>
        <ul>
          <li className='mainFont bulletPoint'>Normalization of lymph outflow.</li>
          <li className='mainFont bulletPoint'>Elimination of edema.</li>
          <li className='mainFont bulletPoint'>Elimination of intoxication.</li>
          <li className='mainFont bulletPoint'>Strengthening the immune system.</li>
          <li className='mainFont bulletPoint'>removal of accumulations of fatty tissue.</li>
          <li className='mainFont bulletPoint'>Slowing down skin aging processes.</li>
          <li className='mainFont bulletPoint'>Getting rid of scars, stretch marks, post-operative scars.</li>
        </ul>
      </section>

      <section className='prgBreak whiteBackground smallPadding'>
      <h2 className='serviceSubTitle lineBreak'>Contraindications to lymphatic drainage massage are:</h2>
      <ul>
          <li className='mainFont bulletPoint'>Thrombophlebitis (inflammatory disease of the veins, accompanied by the formation of a blood clot), thrombosis;</li>
          <li className='mainFont bulletPoint'>Dermatitis.</li>
          <li className='mainFont bulletPoint'>Acute viral and infectious diseases.</li>
          <li className='mainFont bulletPoint'>Skin damage, burns and abrasions.</li>
          <li className='mainFont bulletPoint'>Neuralgia.</li>
          <li className='mainFont bulletPoint'>Tendency to bleed.</li>
          <li className='mainFont bulletPoint'>The presence of inflammatory processes in the body.</li>
          <li className='mainFont bulletPoint'>Chronic renal failure.</li>
          <li className='mainFont bulletPoint'>Diabetes</li>
          <li className='mainFont bulletPoint'>Menstruation.</li>
          <li className='mainFont bulletPoint'>Lymphadenopathy (enlarged lymph nodes), lymphadenitis (inflammation of the lymph nodes) oncological diseases.</li>
          <li className='mainFont bulletPoint'>Severe diseases of the cardiovascular system and blood, thyroid gland.</li>
          <li className='mainFont bulletPoint'>Herpes in the acute period.</li>
          <li className='mainFont bulletPoint'>Tuberculosis.</li>
          <li className='mainFont bulletPoint'>The procedure is not recommended for women during pregnancy and breastfeeding.</li>
          {/* <li className='mainFont bulletPoint'></li> */}
        </ul>
      {/* <p className='mainFont lineBreak'></p> */}
      </section>

      <section className='prgBreak whiteBackground smallPadding'>
        <h2 className='serviceSubTitle lineBreak'>Precaution</h2>
        <h3 className='prgSubject'>The procedure should not be performed on people with any of the following conditions as it can be dangerous.</h3>
        <p className='mainFont italic lineBreak'>Fresh fracture or wound(s), Thrombosis, Diseases of the heart and vascular system, Predisposition to increased blood pressure, Varicose veins, Pregnancy, Hernias, Inflammatory processes, and/or Tuberculosis.</p>
        <h3 className='prgBreak'>If you match any of the prior listed conditions please consult your doctor before booking your massage.</h3>
        <a className='bookNowBtn' href='/book-now'>Book Your Massage Here</a>
        <ul>
          <li className='mainFont bulletPoint'>30 Minutes - $80.00</li>
          <li className='mainFont bulletPoint'>60 Minutes - $140.00</li>
          <li className='mainFont bulletPoint'>80 Minutes - $210.00</li>
        </ul>
      </section>
    </div>
  );
}

export default Lymph;