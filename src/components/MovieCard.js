import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const MovieCard = () => {

    const [allMovies, setAllMovies] = useState([])

    const history = useHistory()

    const fetchAllMovies = async () => {
        const response = await fetch("http://localhost:5000/api/movies", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
        })
        
        const data = await response.json()
        if (data.success) {
            setAllMovies(data.message)
        } else {
            alert(data.message)
            localStorage.removeItem("token")
            history.replace("/")
        }
    }

    useEffect(() => {fetchAllMovies()}, [])

    return (
        <div>
            {allMovies?.map((data) => (
                <div className="card mt-3" onClick={()=> {
                    window.location.href = `/movies/${data.movie_id}`
                }}>
                    <div className="card-body">
                        <h3 className="card-title">
                            {data.title}
                        </h3>
                        <p className="card-text">
                            {data.release_year}
                        </p>
                        <img className="card-img-top" alt="poster" src={`https://image.tmdb.org/t/p/w500${data.production}`} />
                        <p className="card-text text-justify p-2">
                            {data.overview}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MovieCard