import SportImg from '../../assets/images/services/sport.jpg';

function Sport() {
    return (
      <div className='servicePage'>
      <div className='flexRow prgBreak'>
        <img className='servicePageImg' src={SportImg} alt='Sports Massage Display Image'></img>

        <section className='serviceSummary whiteBackground'>
          <h1 className='serviceTitle lineBreak'>Sports Massage</h1>
          <p className='mainFont lineBreak'>Sports massage is a technique that is used to prepare the body for physical activity, as well as to speed up the recovery process after training. Sports massage allows you to increase the physical endurance of the body and improve the professional achievements of the athlete. Designed for highly active people.</p>
          <p className='mainFont lineBreak'></p>
          <h2 className='serviceSubTitle lineBreak'>Benefits of a Sports Massage:</h2>
          <ul>
            <li className='list bulletPoint mainFont'>Increasing the body's endurance</li>
            <li className='list bulletPoint mainFont'>Relieving muscle spasms</li>
            <li className='list bulletPoint mainFont'>Accelerating the recovery process after physical activity</li>
            <li className='list bulletPoint mainFont'>Combating the consequences of sprains, bruises, reducing pain</li>
            <li className='list bulletPoint mainFont'>Reducing the risk of injury and damage</li>
            <li className='list bulletPoint mainFont'>Reduction in fatigue levels</li>
            <li className='list bulletPoint mainFont'>Improving the athlete's reaction speed</li>
            <li className='list bulletPoint mainFont'>Increased muscle elasticity</li>
            <li className='list bulletPoint mainFont'>Improving lymph outflow, blood circulation, removing toxins from the body</li>
            <li className='list bulletPoint mainFont'>Improvement of general physical condition</li>
            <li className='list bulletPoint mainFont'>Getting rid of lactic acid stagnation after serious physical exertion</li>
            <li className='list bulletPoint mainFont'>Increasing the level of stress resistance of an athlete</li>
          </ul>
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
        <h2 className='serviceSubTitle lineBreak'>Precaution</h2>
        <h3 className='prgSubject'>The procedure should not be performed on people with any of the following conditions as it can be dangerous.</h3>
        <p className='mainFont italic lineBreak'>Fresh fracture or wound(s), Thrombosis, Diseases of the heart and vascular system, Predisposition to increased blood pressure, Varicose veins, Pregnancy, Hernias, Inflammatory processes, and/or Tuberculosis.</p>
        <h3 className='prgBreak'>If you match any of the prior listed conditions please consult your doctor before booking your massage.</h3>
        <a className='bookNowBtn' href='/book-now'>Book Your Massage Here</a>
        <ul>
          <li className='mainFont bulletPoint'>30 Minutes - $90.00</li>
          <li className='mainFont bulletPoint'>60 Minutes - $160.00</li>
          <li className='mainFont bulletPoint'>90 Minutes - $220.00</li>
        </ul>
      </section>

    </div>
  );
}

export default Sport;