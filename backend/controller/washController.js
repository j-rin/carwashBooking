const asyncHandler = require("express-async-handler");

const carSchedule = require("../model/carSchedule")

// `````````````````````````````````````````````````````````````
// /api/wash/book
const washBook = asyncHandler(async(req,res)=>{
    const {Car_wash_date,slot} = req.body;

    const car_wash_date =Car_wash_date.toString();

    const booked_by = req.user._id;
    
    if(!car_wash_date || !slot){
        res.status(400);
        throw new Error("Please Enter All Fields")
    }


    const bookExist = await carSchedule.findOne({$and:[{ car_wash_date }, { slot }]})

    if(bookExist){
        res.status(400).json({
            alreadyBooked:true
        })
        throw new Error("already booked")
        
    }


    const book = await carSchedule.create({
        car_wash_date,
        slot,
        booked_by,

    })

    if(book){
        res.status(201).json({
            book:true,
            car_wash_date:book.car_wash_date,
            slot:book.slot,

        })
    }
    else{
        res.status(400).json({
            errorOccured:true
        })
        throw new Error("Error While Boooking")
            
        }
    }
 )


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// api/wash/view

const viewBooking = asyncHandler(async(req,res)=>{
    const { Car_wash_date } =req.body;
    const car_wash_date =Car_wash_date.toString();
    // console.log(car_wash_date)

    if(!car_wash_date){
        throw new Error("Enter the Fields");
    }

    const view = await carSchedule.find({car_wash_date})

    if(view){
        res.status(200).json({
            slots:view
        })
    }
    else{
        res.status(404).json({
            Not_found:true,

        })
    }
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// /api/wash/delete

const deleteBooking = asyncHandler(async(req,res)=>{
    const { Car_wash_date, slot } = req.body;

    const car_wash_date = Car_wash_date.toString();

    if(!car_wash_date || !slot){
        throw new Error("Enter the Fields")
    }
    // console.log(car_wash_date + slot)
    const bookExist = await carSchedule.findOne({ $and: [ { car_wash_date:car_wash_date }, { slot:slot } ]})


    // console.log(bookExist.booked_by);
    // console.log(req.user._id)
    if(bookExist && bookExist.booked_by=== (req.user._id.toString()))
    {

            const unbook = await carSchedule.deleteOne({$and:[{car_wash_date},{slot}]})
            // console.log(unbook);
            if(unbook.acknowledged && unbook.deletedCount==1){
                res.status(201).json({
                    deleted:true
                })
            }
            else{
                res.json({
                    deleteError:true,
                })
                throw new Error("Error while deleting")
            }
    }
    else{

        res.status(401).json({
            bookedBySomeone:true,
        })
        throw new Error("Booked By SomeOne")

    }
})

 module.exports = {washBook,viewBooking,deleteBooking};