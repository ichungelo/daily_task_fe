import { useState } from "react";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    if (data.success) {
      sessionStorage.setItem("token", data.token);
      alert(data.message);
      window.location.href = "/dashboard";
    } else {
      alert(`Error: ${data.message}`);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-4 my-5 p-3 border border-dark rounded">
          <form className="row my-3" onSubmit={loginUser}>
            <div className="col-12 text-center">
              <h1>Login</h1>
            </div>
            <div className="form-group col-12 text-left">
              <label>Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type={"text"}
                className="form-control form-control-sm"
                name="username"
                placeholder="Username"
              ></input>
            </div>
            <div className="form-group col-12 text-left">
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={"password"}
                className="form-control form-control-sm"
                name="password"
                placeholder="Password"
              ></input>
            </div>
            <input
              className="btn btn-outline-dark btn-block mx-3"
              type={"submit"}
              value="Login"
            />
          </form>
          <hr />
          <div className="text-center">
            <p className="mx-3">
              Don't have an Account?{" "}
              <a href="/register" className="mb-1">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
