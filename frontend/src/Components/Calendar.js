import React,{useState,useEffect} from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'
import axios from 'axios'
import { GrAddCircle } from 'react-icons/gr';
import {RxCrossCircled} from 'react-icons/rx';
import { toast } from 'react-toastify'
import socket from './socket'





function MyCalendar() {

  
  
  
  

  const mockTimeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
  ];
  const [tk,setTk] = useState(sessionStorage.getItem("tk"));
  const [selectedDate, setSelectedDate] = useState(new Date);
  const [timeSlots, setTimeSlots] = useState(mockTimeSlots);
  const [selectedSlots, setSelectedSlot] = useState([]);

  
  
  useEffect(()=>{
      
    console.log(tk)
    fetchData();

  },[selectedDate])


  useEffect(() => {
    socket.on('responseEvent', (data) => {
      console.log(selectedDate);
      fetchData();
    });

    return () => {
      socket.off('responseEvent');
    };
  }, [selectedDate]);




  const fetchData = async()=>{


    // const date1 =new Date(selectedDate)
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;


    const config = {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${tk}`
      },
    };
    try{
    const  result  = await axios.post("http://localhost:8000/api/wash/view",
    { Car_wash_date:formattedDate },
        config
    );
      
      if(result.status == '200'){
          console.log(result.data.slots)

          const slotArray = result.data.slots.map(slot => slot.slot);
          console.log(slotArray)
          setSelectedSlot(slotArray)
        
      }
      else{
        console.log('Error in viewing')
      }
    }catch(error){
      console.log(error.response.data)
    }


  }
  
  





 
  
 
  const handleDateChange = (date,event) => {

     event.preventDefault();

    setSelectedDate(date);
    // fetchTimeSlots(date); 
    // setSelectedSlot([])// Fetch time slots for the selected date
  };

  // const fetchTimeSlots = async (date) => {
  //   
  
  //   setTimeSlots(mockTimeSlots);
  // };
  const handleSlotClick = async (slot) => {
    if (selectedSlots.includes(slot)) {
      // If the slot is already selected, remove it from the selectedSlots array
      
      // const date1 =new Date(selectedDate)
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${tk}`
        },
      };
      try{
          const  result  = await axios.post("http://localhost:8000/api/wash/delete",
      { Car_wash_date:formattedDate, slot },
          config
      );
        
        if(result.status == '201'){
        toast.warning("slot unbooked")
        console.log(result.data)
        setSelectedSlot(selectedSlots.filter((selectedSlot) => selectedSlot !== slot));
        const data = {
          book:true,
        };
        socket.emit('customEvent', data);
          
        }
        else{
          console.log('Error in deleting')
        }
      }catch(error){
        console.log(error.response.data)
        toast.error("Booked By Someone")
      }




    } else {

       
      // If the slot is not selected, add it to the selectedSlots array
      
      setSelectedSlot([...selectedSlots, slot]);
      // const date1 =new Date(selectedDate)
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
  
      console.log(formattedDate+" "+slot)
      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${tk}`
        },
      };
      try{
          const  result  = await axios.post("http://localhost:8000/api/wash/book",
      { Car_wash_date:formattedDate, slot },
          config
      );
        
        if(result.status == '201'){
          console.log(result.data)
          toast.success("slot booked")
          const data = {
            book:selectedDate,
          };
          socket.emit('customEvent', data);

          
        }
        else{
          console.log('Error in booking')
        }
      }catch(error){
        console.log(error.response.data)
        toast.error("already booked")
      }

    }
    console.log(selectedSlots)
  };

  return (
    <div className='calendar'>
    <div >
    {timeSlots.length > 0 && (
        <div className='slot'>
          <h2>Available Time Slots for {selectedDate.toDateString()}</h2>
          <ul>
            {timeSlots.map((slot, index) => (
              <li 
              className={selectedSlots.includes(slot) ? 'selected' : 'notselected'}
              key={index}
               onClick={() => handleSlotClick(slot)}>
                {slot} {selectedSlots.includes(slot) ? <RxCrossCircled className='right'/> : <GrAddCircle className='right'/>} </li>
            ))}
          </ul>
        </div>
      
      )}
      
    </div>
      <Calendar className={'real'} onChange={handleDateChange} value={selectedDate} />
    </div>
    
  )
}



export default MyCalendar
