import CouplesImg from '../../assets/images/services/couple.jpg';

function Couples() {
    return (
      <div className='servicePage'>
      <div className='flexRow prgBreak'>
        <img className='servicePageImg' src={CouplesImg} alt='Couples Massage Display Image'></img>

        <section className='serviceSummary whiteBackground'>
          <h1 className='serviceTitle lineBreak'>Couples Massage</h1>
          <p className='mainFont lineBreak'>Enhance your relationship with a touch of romance by indulging in relaxing treatments at the cozy Spa Maluge. Immerse yourself in the France atmosphere as our specialists lavish you with care and attention. Experience the harmony of body and soul, sharing a state of complete peace together.</p>
        </section>
      </div>

      <section className='whiteBackground smallPadding prgBreak'>
        <h2 className='serviceSubTitle lineBreak'>Mini Couple's Spa Day</h2>
        <p className='mainFont'>Our Mini Couple's Spa Day gives you and a loved one a good taste of each of our specialties including:</p>
        <ul>
          <li className='list bulletPoint mainFont'>Two glasses of champagne</li>
          <li className='list bulletPoint mainFont'>Strawberries + Nutella Dip</li>
          <li className='list bulletPoint mainFont'>40 Minute Full Body Hotstone Massage</li>
          <li className='list bulletPoint mainFont'>20 Minute Mini Facial</li>
          <li className='list bulletPoint mainFont'>Aromatherapy</li>
        </ul>
        <p className='mainFont bold'>A $199 Value!</p>
        <p className='mainFont lineBreak bold'>Duration: 60 Mins Deluxe massage for couples</p>
        <a className='bookNowBtn' href='/book-now'>Book Your Massage Here</a>
      </section>

      <section className='whiteBackground smallPadding prgBreak'>
        <h2 className='serviceSubTitle lineBreak'>Our best offer is the Deluxe Couples Package!</h2>
        <p className='mainFont'>Go the extra mile for your loved one and treat them to a complete massage and facial!</p>
        <p className='mainFont lineBreak'>A room with candles is available upon request!</p>
        <p className='mainFont'>This package includes:</p>
        <ul>
          <li className='list bulletPoint mainFont'>Two glasses of champagne</li>
          <li className='list bulletPoint mainFont'>Strawberries + Nutella Sauce</li>
          <li className='list bulletPoint mainFont'>60 Minute Full Body Hotstone Massage</li>
          <li className='list bulletPoint mainFont'>30-minute custom massage of your choice.</li>
          <li className='list bulletPoint mainFont'>Aromatherapy</li>
        </ul>
        <p className='mainFont bold'>90 minutes/ $299</p>
        <p className='mainFont lineBreak bold'>120 minutes/ $360</p>
        <a className='bookNowBtn' href='/book-now'>Book Your Massage Here</a>
      </section>

      {/*
      <section className='prgBreak whiteBackground smallPadding'>
        <h2 className='serviceSubTitle lineBreak'>Precaution</h2>
        <h3 className='prgSubject'>The procedure should not be performed on people with any of the following conditions as it can be dangerous.</h3>
        <p className='mainFont italic lineBreak'></p>
        <h3 className='prgBreak'>If you match any of the prior listed conditions please consult your doctor before booking your massage.</h3>
        <a className='bookNowBtn' href='/book-now'>Book Your Massage Here</a>
        <ul>
          <li className='mainFont bulletPoint'>30 Minutes - $</li>
          <li className='mainFont bulletPoint'>60 Minutes - $</li>
          <li className='mainFont bulletPoint'>90 Minutes - $</li>
        </ul>
      </section> */}

    </div>
  );
}

export default Couples;