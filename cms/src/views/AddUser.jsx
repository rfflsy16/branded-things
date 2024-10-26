import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";

export default function AddUser({ base_url }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(
    e,
    username,
    email,
    password,
    phoneNumber,
    address
  ) {
    e.preventDefault();
    try {
      const body = { username, email, password, phoneNumber, address };

      const { data } = await axios.post(`${base_url}/apis/add-user`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      console.log(data);

      Toastify({
        text: `Success add new user`,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#008000",
        },
      }).showToast();

      navigate("/");
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
      <div className="flex flex-col items-center text-white">
        <h1 className="font-bold text-2xl pt-10">Add New User (Staff)</h1>
        <form
          className="flex flex-col w-2/5 pt-10 gap-1"
          onSubmit={(e) =>
            handleSubmit(e, username, email, password, phoneNumber, address)
          }
        >
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className="h-8 mb-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="h-8 mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="h-8 mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            className="h-8 mb-3"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <label htmlFor="address">Address</label>
          <textarea
            name="address"
            className="h-20 mb-3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button type="submit" className="btn btn-primary">
            Add User
          </button>
        </form>
      </div>
    </>
  );
}
