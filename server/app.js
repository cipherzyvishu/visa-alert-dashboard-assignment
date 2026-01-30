import express from "express"
import cors from "cors"
import alertRoutes from "./routes/alerts.routes.js"
import { logger } from "./middleware/logger.js"
import { errorHanlder } from "./utils/errorHandler.js"



const app = express()

app.use(express.json())
app.use(cors())
app.use(logger)

app.use("/alerts/",alertRoutes)
app.use(errorHanlder)

app.get("/", (req,res) => {
    res.send("Hello from our server")
})

const PORT=3000
app.listen(PORT,() => {
    console.log(`server is listening for requests on ${PORT}`)
})