import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  const registerUser = async (event) => {
    event.preventDefault();

    if (password === confirm_password) {
      event.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          first_name,
          last_name,
          password,
          confirm_password,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Account Created")
        window.location.href = "/login"
      } else {
        alert(`Error : ${data.message}`)
      }
    } else {
      alert("password not match");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-8 my-5 p-3 border border-dark rounded">
          <form className="row" onSubmit={registerUser}>
            <div className="col-12 text-center">
              <h1>Register</h1>
            </div>
            <div className="form-group col-12 text-left">
              <label>Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type={"text"}
                required
                className="form-control form-control-sm"
                name="username"
                placeholder="Username"
              />
            </div>
            <div className="form-group col-6 text-left">
              <label>First Name</label>
              <input
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                type={"text"}
                required
                className="form-control form-control-sm"
                name="firstName"
                placeholder="First Name"
              />
            </div>
            <div className="form-group col-6 text-left">
              <label>Last Name</label>
              <input
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                type={"text"}
                className="form-control form-control-sm"
                name="lastName"
                placeholder="Last Name"
              />
            </div>
            <div className="form-group col-12 text-left">
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type={"email"}
                required
                className="form-control form-control-sm"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="form-group col-12 text-left">
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={"password"}
                required
                minLength={8}
                className="form-control form-control-sm"
                name="password"
                placeholder="Password"
              />
            </div>
            <div className="form-group col-12 text-left">
              <label>Confirm Password</label>
              <input
                value={confirm_password}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={"password"}
                required
                minLength={8}
                className="form-control form-control-sm"
                name="confirmPassword"
                placeholder="Password"
              />
            </div>
            <button
              className="btn btn-dark btn-block mx-3"
              type={"submit"}
              onClick={(e) => {
                e.defaultPrevented();
                window.location.href = "/login";
              }}
            >
            Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
