import dotenv from "dotenv"
dotenv.config()

export const TRIPS_API_BASE_URL: string = process.env.REACT_APP_API_BASE_URL || ""