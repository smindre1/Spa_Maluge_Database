import LogoTwo from "../assets/Maluge_Logo_Two.svg";

function Error() {
    return (
    <div>
      <section className='pageTitleBlock'>
        <h1 className='sectionTitle center'>Something Went Wrong</h1>
        {/* <img className="center" src={LogoTwo} ></img> */}
        <a className="center" href="/">Click Here To Head Back</a>

      </section>
      
    </div>
  );
}

export default Error;