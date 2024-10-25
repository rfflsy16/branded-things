import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

export default function LoginPage({ base_url }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();

  async function login(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${base_url}/apis/logins`, {
        email,
        password,
      });
      console.log("iniiii dataa login >>>>>>>>>>", data);

      localStorage.setItem("access_token", data.data.access_token);
      Navigate("/");
    } catch (error) {
      console.log(error);

      Toastify({
        text: error.response.data.error,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#FF0000",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  }
  return (
    <>
      <section className="container" id="login-section">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="mb-3 mt-5">Login Options</h1>
            <span>
              Log in and autocomplete your order with your personal data, or
              sign up to enjoy all the benefits of an IDEA account.
            </span>
          </div>
          <div className="col-12 col-lg-8 offset-lg-2 my-5">
            <div className="row">
              <div className="col-12 col-md-6 border-end p-5 text-left">
                <img
                  src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/561/1056141_PE848273_S4.webp"
                  width="350px"
                  alt="sofa"
                  className="rounded-lg"
                />
              </div>
              <div className="col-12 col-md-6 p-5 text-left">
                <div className="form-signin m-auto">
                  <form id="login-form">
                    <h1 className="h3 mb-3 display-1 text-2xl font-bold">
                      Log in to your account
                    </h1>
                    <span>
                      Log in on your profile to autocomplete your purchase order
                      with your personal data.
                    </span>
                    <div className="mb-3 mt-3">
                      <div className="flex justify-between">
                        <label
                          htmlFor="login-email"
                          className="block text-sm font-medium"
                        >
                          Email
                        </label>
                        <label className="text-error text-end font-bold">
                          *
                        </label>
                      </div>
                      <input
                        type="email"
                        className="input input-bordered w-full"
                        id="login-email"
                        placeholder="Enter email address ..."
                        autoComplete="off"
                        required=""
                      />
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between">
                        <label
                          htmlFor="login-password"
                          className="block text-sm font-medium"
                        >
                          Password
                        </label>
                        <label className="text-error text-end font-bold">
                          *
                        </label>
                      </div>
                      <input
                        type="password"
                        className="input input-bordered w-full"
                        id="login-password"
                        placeholder="Enter your password ..."
                        autoComplete="off"
                        required=""
                      />
                    </div>
                    <div className="form-check mb-3">
                      <label className="label cursor-pointer">
                        <input
                          type="checkbox"
                          className="checkbox"
                          id="login-remember"
                        />
                        <span className="label-text ml-2">Remember me</span>
                      </label>
                    </div>
                    <button
                      className="btn btn-primary rounded-pill w-full p-2"
                      type="submit"
                    >
                      Log In
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
