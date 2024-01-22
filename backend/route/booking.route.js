const expres = require("express")
const {BookingModel} = require("../model/booking.model")
BookingRouter = expres.Router()



BookingRouter.post("/Booking", async (req, res) => {
    const payload =req.body
 try {
    const Booking =new BookingModel(payload)
    await Booking.save()
       res.status(200).send({"msg":"Booking has been added"})
} catch (error) {
     res.status(400).send({"msg":error.message})
}
})


//ALL THE EMPLOYEES
BookingRouter.get("/gett", async (req, res) => {
  try {
    const Bookingget = await BookingModel.find();
    res.send({ msg: "List of booking", Bookingget });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});



BookingRouter.put("/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;
    const updatedEmployee = await BookingModel.findByIdAndUpdate(bookingId,req.body);

    if (!updatedEmployee) {
      return res.status(404).send({ msg: "Employee not found" });
    }

    res.send({ msg: "Employee updated successfully", employee: updatedEmployee });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

// DELETE EMPLOYEE
BookingRouter.delete("/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;
    const deletedEmployee = await BookingModel.findByIdAndDelete(bookingId);

    if (!deletedEmployee) {
      return res.status(404).send({ msg: "Employee not found" });
    }

    res.send({ msg: "Employee deleted successfully", employee: deletedEmployee });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});
module.exports ={BookingRouter}