const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema(
    {
      
      car_wash_date: { type: "String", required: true, },
      slot: { type: "String", required: true },
      booked_by: { type: "String", required: true },
      
         
    },
    { timestamps: true }
  );
  
  
  const carSchedule = mongoose.model("carSchudele", scheduleSchema);
  
  module.exports = carSchedule;