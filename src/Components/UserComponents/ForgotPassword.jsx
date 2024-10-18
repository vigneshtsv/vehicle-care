import { useState } from "react";


export function ForgotPassword() {
  const [email,setEmail] = useState("");
  
  return <>
  <div>
    <div>
      <form action="">
        <h1>Forgot Password</h1>
        <div>
          <label htmlFor="email_field">Enter Email</label>
          <input type="email" id='email_field' className='form-control' value={email} />
        </div>
        <button id='forgot_password_button' type='submit' >Send Email</button>
      </form>
    </div>
  </div>
</>
}
export default ForgotPassword;