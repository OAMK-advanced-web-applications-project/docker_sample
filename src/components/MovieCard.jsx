function MovieCard({ movie }) {

    return (
        <div className="movie-card">
            <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
        </div>
    )
}

export default MovieCard