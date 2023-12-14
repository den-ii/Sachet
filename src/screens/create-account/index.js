import "./styles.css";

function CreateAccount(){

  return (
    <div className="create_account">
      <div className='ninimg'><img src='/images/nin.svg'/></div>
      <label className='label'>Please input your NIN</label>
      <input className='input'/>
      <div className='below-label'><span className='nin'>Your NIN has 11 digits</span><span>0/11</span></div>
    </div>
  );
};

export default CreateAccount;
