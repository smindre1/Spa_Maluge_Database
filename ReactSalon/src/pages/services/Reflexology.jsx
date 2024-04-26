import ReflexologyImg from '../../assets/images/services/reflexOne.jpg';

function Reflexology() {
    return (
    <div className='servicePage'>
        
        <div className='flexRow prgBreak'>
        <img className='servicePageImg' src={ReflexologyImg}></img>

        <section className='serviceSummary whiteBackground'>
          <h1 className='serviceTitle lineBreak'>Reflexology Massage</h1>
          <p className='mainFont lineBreak'>Reflexology is more than just a foot massage. The theory behind foot massage, supported by centuries of experience, suggests that each internal human organ corresponds to a specific reflex zone on the foot. The outcome of a foot massage is the induction of physiological changes within the human body. This massage gradually alleviates tension, restores balance, and reinstates the normal functioning of internal systems. We inherited healing foot massage from the magical art of excellent doctors in China.</p>
          <p className='mainFont lineBreak'>Stimulates blood circulation and lymph flow, promotes the removal of toxins, and heals whole body. Foot reflexology will relieve stress, tension and fatigue.</p>
          {/* <h2 className='serviceSubTitle lineBreak'>What does a Swedish massage give?</h2>
          <ul>
            <li className='list bulletPoint mainFont'>The technique copes well with adhesions, various seals and scars in the joints.</li>
            <li className='list bulletPoint mainFont'>Diseased joints become flexible and mobile.</li>
            <li className='list bulletPoint mainFont'>Puffiness disappears.</li>
            <li className='list bulletPoint mainFont'>The muscles become toned and elastic.</li>
            <li className='list bulletPoint mainFont'>Relieves fatigue and muscle spasms.</li>
            <li className='list bulletPoint mainFont'>Blood circulation and lymphatic drainage of the limb are normalized.</li>
            <li className='list bulletPoint mainFont'>There is a rapid recovery from injuries.</li>
          </ul> */}
        </section>
      </div>

      <section className='whiteBackground smallPadding prgBreak'>
        <h2 className='serviceSubTitle lineBreak'>Benefits</h2>
        <p className='mainFont lineBreak'>In addition to the relaxation that you feel, reflex massage penetrates much deeper and we are not talking about subcutaneous tissues or muscles, we are talking about organs and all human systems. There are a huge number of biologically active points on the feet that are directly connected to all organs and systems. Thus, by providing the correct impact on certain areas of the foot, you can normalize the functioning of organs, improve overall well-being, increase immunity and body resistance.</p>
        
        <p className='mainFont lineBreak'>A wide range of health problems can be addressed through reflexology. From periodic headaches to diseases of the gastrointestinal tract and circulatory system. If tenderness or tenderness occurs when certain areas of the foot are stimulated, it usually indicates weakness or imbalance in the body in the corresponding organ. As early as the second session of applying proper pressure and manipulating the nerves in the foot, reflexology can help restore the flow of blood, nutrients and nerve impulses to the diseased organ, improving overall well-being and life balance.</p>

      </section>

      <section className='prgBreak whiteBackground smallPadding'>
        <h2 className='serviceSubTitle lineBreak'>Precaution</h2>
        <h3 className='prgSubject'>Important things to remember when performing reflexology</h3>
        <p className='mainFont italic lineBreak'>Reflexology is contraindicated during pregnancy. Drink water after the procedure to remove toxins and lactic acid accumulated during the massage.</p>
        <h3 className='prgBreak'>If you have serious leg problems, unhealed wounds on the body, blood vessel diseases associated with clots or varicose veins, consult your doctor before a reflexology session.</h3>
        <a className='bookNowBtn' href='/book-now'>Book Your Massage Here</a>
        <ul>
          <li className='mainFont bulletPoint'>15 Minutes - $40</li>
          <li className='mainFont bulletPoint'>30 Minutes - $80</li>
          <li className='mainFont bulletPoint'>60 Minutes - $140</li>
        </ul>
      </section>
    </div>
  );
}

export default Reflexology;