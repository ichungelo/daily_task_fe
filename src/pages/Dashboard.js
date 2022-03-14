import jwtDecode from "jwt-decode";
import { useHistory } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const Dashboard = () => {
  const history = useHistory();
  let first_name = "";
  let last_name = "";

  const token = sessionStorage.getItem("token");
  if (!token) {
    localStorage.removeItem("token");
    history.replace("/login");
  } else {
    const user = jwtDecode(token)
    first_name = user.first_name
    last_name = user.last_name

    return (
      <div>
        <h1 className="m-3 text-left">Hello {first_name} {last_name} !</h1>
        <div className="container">
          <div className="card-columns">
            <MovieCard />
          </div>
        </div>
      </div>
    );
  };
};

export default Dashboard;
