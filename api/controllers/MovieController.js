import { getNowPlayingMovies } from '../models/Movie.js'

const getNowPlaying = async (req, res, next) => {
    try {
        const result = await getNowPlayingMovies()
        return res.status(200).json(result)
    } catch (error) {
        return next(error)
    }
}

export { getNowPlaying }