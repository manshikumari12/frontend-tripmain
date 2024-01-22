const expres = require("express")
const  cors = require("cors")
const {connection} = require("./db")
const {userRouter} = require("./route/user.router")
const {BookingRouter} =require("./route/booking.route")
const app =expres()
app.use(expres.json())
app.use(cors())


app.use("/user",userRouter)
app.use("/book",BookingRouter)

app.listen("1111",async()=>{
    try {
        await connection
        console.log("connected to databse")
    } catch (error) {
        console.log(error)
    }
    console.log("server is running on the port")
})
