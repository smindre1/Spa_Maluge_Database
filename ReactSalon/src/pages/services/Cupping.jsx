import CuppingImg from '../../assets/images/services/cup.jpg';

function Cupping() {
    return (
    <div className='servicePage'>
        
        <div className='flexRow prgBreak'>
        <img className='servicePageImg' src={CuppingImg}></img>

        <section className='serviceSummary whiteBackground'>
          <h1 className='serviceTitle lineBreak'>Cupping Massage Therapy</h1>
          <p className='mainFont lineBreak'>Cupping therapy is an ancient healing technique used to alleviate pain, in addition to providing anti-cellulite massage and figure correction. Cupping massage is a popular procedure designed for both medicinal and cosmetic purposes.</p>
          <p className='mainFont lineBreak'>Cupping massage targeting various parts of the body, such as the abdomen, back, thighs, arms, legs, and buttocks, beneficially affects the skin by restoring its elasticity, firmness, and healthy color.</p>
          <p className='mainFont lineBreak'>Additionally, the massage enhances the functioning of the excretory system, aiding in the removal of toxins and waste.</p>
        </section>
      </div>

      <section className='whiteBackground smallPadding prgBreak'>
        <h2 className='serviceSubTitle lineBreak'>Cup Massage Therapy Helps Remedy</h2>
        <ul>
          <li className='mainFont bulletPoint'>Osteochondrosis of the cervical, lumbar and thoracic spine and its prevention;</li>
          <li className='mainFont bulletPoint'>Radiculitis and its prevention;</li>
          <li className='mainFont bulletPoint'>Scoliosis;</li>
          <li className='mainFont bulletPoint'>Weak immunity, frequent colds and ARVI;</li>
          <li className='mainFont bulletPoint'>Muscle pain;</li>
          <li className='mainFont bulletPoint'>Tracheitis, bronchitis (outside the period of exacerbation).</li>
          <li className='mainFont bulletPoint'>Cupping massage for weight loss is especially popular today.</li>
          <li className='mainFont bulletPoint'>Cupping massage is indispensable in the preventive treatment of colds and inflammatory diseases, and is very effective for muscle pain (for example, after physical overload).</li>
          <li className='mainFont bulletPoint'>Rehabilitation specialists use vacuum massage to accelerate the healing of postoperative and post-traumatic scars and stretch marks, as well as to resolve swelling. When affecting active points, vacuum massage is an excellent remedy for the treatment of headaches, nervous disorders, gynecological diseases, and insomnia.</li>
        </ul>
      </section>

      <section className='prgBreak whiteBackground smallPadding'>
        <h2 className='serviceSubTitle lineBreak'>Precaution</h2>
        <h3 className='prgSubject'>The procedure should not be performed on people with any of the following conditions as it can be dangerous.</h3>
        <p className='mainFont italic lineBreak'>Fresh fracture or wound(s), Thrombosis, Diseases of the heart and vascular system, Predisposition to increased blood pressure, Varicose veins, Pregnancy, Hernias, Inflammatory processes, and/or Tuberculosis.</p>
        <h3 className='prgBreak'>If you match any of the prior listed conditions please consult your doctor before booking your massage.</h3>

        <h2 className='serviceSubTitle lineBreak'>Contraindications to the use of vacuum massage:</h2>
        <ul className='prgBreak'>
          <li className='mainFont bulletPoint'>Large pigment spots and birthmarks in the area of intended treatment.</li>
          <li className='mainFont bulletPoint'>Acute inflammatory skin diseases.</li>
          <li className='mainFont bulletPoint'>Blood diseases.</li>
          <li className='mainFont bulletPoint'>Malignant tumors.</li>
          <li className='mainFont bulletPoint'>Hypertension, other severe cardiovascular diseases.</li>
          <li className='mainFont bulletPoint'>Presence of a pacemaker.</li>
          <li className='mainFont bulletPoint'>Tuberculosis, active rheumatism, lung abscess.</li>
          <li className='mainFont bulletPoint'>Thrombophlebitis, vascular thrombosis, increased fragility and permeability of blood vessels.</li>
          <li className='mainFont bulletPoint'>Varicose veins in affected areas.</li>
          <li className='mainFont bulletPoint'>Infectious diseases.</li>
        </ul>

        <a className='bookNowBtn' href='/book-now'>Book Your Massage Here</a>
        <ul>
          <li className='mainFont bulletPoint'>30 Minutes - $90</li>
          <li className='mainFont bulletPoint'>60 Minutes - $160</li>
          <li className='mainFont bulletPoint'>90 Minutes - $220</li>
          <li className='mainFont bulletPoint'>Add On a Cupping Massage Therapy - Additional $20.00</li>
        </ul>
      </section>
    </div>
  );
}

export default Cupping;