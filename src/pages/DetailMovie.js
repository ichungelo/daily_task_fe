import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const DetailMovie = (props) => {

    const movieId = props.match.params.movieId

    const [detailMovie, setDetailMovie] = useState("")
    const [reviews, setReviews] = useState([])
    const history = useHistory()

    const fetchMovieById = async () => {
        const response = await fetch(`http://localhost:5000/api/movies/${movieId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
        })

        const data = await response.json()
        if (data.success) {
            console.log(data)
            setDetailMovie(data.message)
            setReviews(data.message.reviews)

        } else {
            alert(data.message)
            localStorage.removeItem("token")
            history.replace("/login")
        }
    }

        const deleteReviewById = async (movieId, reviewId) => {
            const response = await fetch(`http://localhost:5000/api/movies/${movieId}/review/${reviewId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                },
            })
    
            const data = await response.json()
            console.log(data.success)
            if (data.success) {
                alert(data.message)
    
            } else {
                alert("err")
                localStorage.removeItem("token")
                history.replace("/login")
            }
        }

        useEffect(() => { fetchMovieById() }, [])


        return (
            <div className="container">
                <h1 className="m-3 font-weight-bold">Movies</h1>
                <div className="card col-4-md jusify-content-md-center m-3">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img className="img-fluid rounded-start" alt="poster" src={`https://image.tmdb.org/t/p/w500${detailMovie.production}`}></img>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{detailMovie.title}</h5>
                                <p className="card-text"><small className="text-muted">{detailMovie.release_year}</small></p>
                                <p className="card-text">{detailMovie.overview}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className="m-3 font-weight-bold">Reviews</h1>
                <div className="row">
                    {reviews?.map(review => (
                        <div className="col-6 jusify-content-md-center">
                            <div className="card m-3 row g-0">
                                <div className="col-6-md">
                                    <div className="card-body">
                                        <h4 className="card-title mx-4">{review.username}</h4>
                                        <p className="card-text mx-5">{review.review}</p>
                                    </div>
                                </div>
                                <button className="col-2 m-3 btn btn-primary" onClick={() => deleteReviewById(movieId, review.review_id)}>
                                    delete
                                </button>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        )
    }

    export default DetailMovie;