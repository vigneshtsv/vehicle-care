import React, { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../Redux/Slice/authSlice";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!formData.Email || !formData.Password) {
    //   return dispatch(signInFailure("please fill out the fields"));
    // }
    try {
      dispatch(signInStart());
      const response = await fetch("http://localhost:5000/api/auth/loginuser", {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        return dispatch(signInFailure((data.message)));
      }
      if (response.ok) {
        localStorage.setItem("Token", data.token);
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure((error.message)));
    }
  };

  return (
    <div className="box-content bg-green-500 w-80 h-50 mx-auto my-20 p-10 border-4 border-blue-500 ">
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <h1 className="px-28 py-5 font-bold text-4xl text-red-400">LOGIN</h1>
          <div className="mb-2 block">
            <Label htmlFor="Email" value="Email" />
          </div>
          <TextInput
            type="Email"
            placeholder="test@gmail.com"
            id="Email"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="Password" value="Enter Your Password" />
          </div>
          <TextInput
            type="Password"
            placeholder="Password"
            id="Password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
          <a href="#">Forget Password ?</a>
        </div>
        <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
          {loading ? (
            <>
            <Spinner color='purple' aria-label='Purple spinner example' size='sm' />
            <span className="pl-3">Loading...</span>
            </>) : ('Login')}
        </Button>
      </form>
      <div>
        <p>
          Don't have an account? <a href="/signupnavigate">Register</a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
