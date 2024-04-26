import CBDImg from '../../assets/images/services/CBD.jpg';

function CBD() {
    return (
      <div className='servicePage'>
      <div className='flexRow prgBreak'>
        <img className='servicePageImg' src={CBDImg} alt='CBD Massage Display Image'></img>

        <section className='serviceSummary whiteBackground'>
          <h1 className='serviceTitle lineBreak'>CBD Custom Massage</h1>
          <p className='mainFont lineBreak'>Focused work designed to alleviate muscle tension, joint pain/inflammation and certain skin conditions by specific application of CBD infused oil and therapeutic body work. While there is still much to be learned about the efficacy and safety of CBD it is encouraged to speak with your medical professional for use of 60 min - 90 min - CBD for pain management. (Moderate to Deep pressure)</p>
          <p className='mainFont lineBreak'></p>

          <h2 className='serviceSubTitle lineBreak'>What is a CBD Massage?</h2>
          <p className='mainFont lineBreak'>Before we talk about the benefits of CBD massage oil, let's first explain what a CBD massage is. CBD stands for Cannabidiol which is the cannabinoid in cannabis. It doesn't have the THC that cannabis has which means you won't experience the 'high' effect.</p>
          <p className='mainFont lineBreak'>It does provide a relaxing effect and is perfect as part of a massage. A CBD oil massage has all the benefits of a regular massage as well as the added benefits of CBD. These are a few of the benefits you could experience from using CBD massage oil.</p>
          {/* <p className='mainFont lineBreak'></p> */}
        </section>
      </div>

      <section className='whiteBackground smallPadding prgBreak'>
        <h2 className='serviceSubTitle lineBreak'>Benefits of a CBD Massage</h2>
        <ul>
          <h3 className='bodyTextTitle list bold mainFont'>Reduce Tension</h3>
            <p className='mainFont'>One of the main reasons to get massage therapy is to relieve tension from your body. Both in body and mind, the cannabinoids in CBD massage oil helps to do this. This is because CBD helps to ease and relax your muscles as the cannabinoids enter our endocannabinoid system via the skin. Since it doesn't contain THC, the active ingredient of marijuana, you won't get high from it.</p>
            <p className='mainFont lineBreak'>That means you can go about the rest of your day without feeling high and still enjoy the relaxing afterglow of the massage.</p>
          <h3 className='bodyTextTitle list mainFont'>Helps Relieve Chronic Pain</h3>
            <p className='mainFont'>CBD massages are perfect for those who suffer from chronic pain. This is because CBD is proven to be an excellent way to deal with pain management. The cannabinoids in CBD massage oil helps to reduce inflammation and soothes muscles. This makes it very effective at providing relief from painful joints and muscles.</p>
            <p className='mainFont lineBreak'>People who suffer from chronic pain, arthritis, back pain, and so much more can reap the many benefits of a CBD oil massage. You might start to feel the effects within minutes, and it can last for hours afterward.</p>
          <h3 className='bodyTextTitle list mainFont'>Alleviates Anxiety and Stress</h3>
            <p className='mainFont'>If you suffer from anxiety or feel stressed often, you could also enjoy the benefits of a CBD oil massage. CBD oil is hailed for its ability to reduce the symptoms of anxiety, and a massage could be the most effective use of it. This is because CBD oil induces a soothing and calming effect but doesn't get you high. A massage without CBD oil will help you to de-stress and paired with CBD oil it's a match made in heaven!</p>
            <p className='mainFont lineBreak'>The effects of a CBD oil massage can last for up to two hours and is the perfect way to calm down and ease your mental state.</p>
          <h3 className='bodyTextTitle list mainFont'>Improves Skin Conditions</h3>
            <p className='mainFont'>You might not know it, but CBD is, in fact, a fantastic moisturizer. CBD massage oil contains hemp which conditions the skin making it supple and soft.</p>
            <p className='mainFont'>Not only does this help you feel better and more relaxed after the massage, but it can also help with skin conditions. People who suffer from skin conditions such as eczema, acne, psoriasis or even just dry skin, can benefit from it.</p>
            <p className='mainFont lineBreak'>This is also because of the anti-inflammatory properties of CBD that will soothe the skin and reduce the pain of some skin conditions as well. There are minimal side effects and if you've tried other remedies that haven't worked, it's something you should consider.</p>
          <h3 className='bodyTextTitle list mainFont'>Boosts Your Mood</h3>
            <p className='mainFont lineBreak'>If you've ever had a massage before, you'll know that during and after, you feel great because of it. It relaxes the body and mind and helps you to forget about your worries and live in the moment. Combined with CBD oil, this elevates the experience and makes it much more enjoyable. You'll leave the massage with smoother skin, relaxed muscles, and feel less anxious or stressed in general. All of these factors combined provide a massive boost to your mood.</p>
          <h3 className='bodyTextTitle list mainFont'>Stimulates the Senses</h3>
            <p className='mainFont'>Getting a CBD oil massage is a great way to connect to your body and it stimulates the senses in a unique way. Since your skin, muscles, and mind are all being stimulated during the massage, it provides a great feeling. You'll feel more connected with your body and can help you feel refreshed and alert. Living in such a fast-paced world means that we don't often spend enough time connecting with ourselves and living in the moment. A CBD massage is a great way to do this and is something you should consider making a regular occurrence.</p>
        </ul>
      </section>

      <section className='prgBreak whiteBackground smallPadding'>
        <h2 className='serviceSubTitle lineBreak'>Precaution</h2>
        <h3 className='prgSubject'>The procedure should not be performed on people with any of the following conditions as it can be dangerous.</h3>
        <p className='mainFont italic lineBreak'>Fresh fracture or wound(s), Thrombosis, Diseases of the heart and vascular system, Predisposition to increased blood pressure, Varicose veins, Pregnancy, Hernias, Inflammatory processes, and/or Tuberculosis.</p>
        <h3 className='prgBreak'>If you match any of the prior listed conditions please consult your doctor before booking your massage.</h3>
        <a className='bookNowBtn' href='/book-now'>Book Your Massage Here</a>
        <ul>
          <li className='mainFont bulletPoint'>Add On a Custom CBD Massage Service - Additional $20.00</li>
        </ul>
      </section>

    </div>
  );
}

export default CBD;