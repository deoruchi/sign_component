import { useEffect, useState } from "react";
import "./Boxwhite.css";
import Input_group from "./Input_group";

export default function Boxwhite() {
  const [formData, setFormData] = useState({
    firstname: "",
    Lastname: "",
    Email: "",
    password: "",
  });

  const [valid, setValid] = useState(false);
  const [error, setError] = useState({});

  function errorFunction() {
    let error = {};
    let valid = true;

    if (!formData.firstname) {
      error.firstname = "First Name cannot be empty ";
      valid = false;
    }
    if (!formData.Lastname) {
      error.Lastname = "Last Name cannot be empty ";
      valid = false;
    }
    if (!formData.password) {
      error.password = "Password cannot be empty ";
      valid = false;
    }

    if (!formData.Email) {
      error.Email = "Looks like this is not an email";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.Email)) {
      error.Email = "Looks like this is not an email";
      valid = false;
    }

    setError(error);
    setValid(valid);
  }
  //updating the data
  function handleInput(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  //Submiting the data
  //posting it to the server
  const handleSubmit = (e) => {
    e.preventDefault();
    errorFunction();

    if (valid) {
      fetch("http://localhost:8000/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (!res.ok) throw new Error("failed to submit the form");
          return res.json();
        })
        .then((d) => {
          console.log("form submitted");
          setFormData({});
          console.log(d);
        })
        .then(() => {})
        .catch((error) => {
          console.error("form submission", error);
        });
    }
  };

  //do something after rendering
  useEffect(() => {
    setFormData({});
  }, []);

  return (
    <div className="white_box">
      <form onSubmit={handleSubmit} autoComplete="off">
        <Input_group
          place={error.firstname ? " " : "First Name"}
          type="text"
          name="firstname"
          value={formData.firstname || ""}
          className="input_field"
          onChange={handleInput}
          error={error.firstname}
          autoComplete="off"
        />
        <Input_group
          place={error.Lastname ? "" : "Last Name"}
          type="text"
          name="Lastname"
          value={formData.Lastname || ""}
          className="input_field"
          onChange={handleInput}
          error={error.Lastname}
          autoComplete="off"
        />
        <Input_group
          place={error.Email ? "email@example.com" : "Email Address"}
          type="email"
          name="Email"
          className="input_field"
          value={formData.Email || ""}
          onChange={handleInput}
          error={error.Email}
          autoComplete="off"
        />
        <Input_group
          place={error.password ? "" : "Password"}
          type="password"
          name="password"
          value={formData.password || ""}
          className="input_field"
          onChange={handleInput}
          error={error.password}
          autoComplete="off"
        />
        <button type="submit" className="submit_name">
          CLAIM YOUR FREEE TRAIL
        </button>
      </form>

      <div className="footer">
        <p>
          By clicking the button you agreeing to our <a>Terms and Services</a>
        </p>
      </div>
    </div>
  );
}
