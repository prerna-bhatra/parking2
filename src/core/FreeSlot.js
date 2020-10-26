import React,{useEffect,useState} from 'react'
import Layout from './Layout'
import axios from 'axios'
import {isAuthenticated} from '../auth'
import {BASE_URL} from "../config.js"
import Moment from 'react-moment';
import moment from 'moment';
import './core.css'
//{JSON.stringify(bookings)}
const FreeSlot=()=>{
	const {user}=isAuthenticated()
	const [bookings,setBokkings]=useState([])
	const FREESLOT=(slotnum)=>
	{
		console.log(slotnum)
		axios.get(`${BASE_URL}/freebooking/${slotnum}`)
			.then(response => {
				//console.log(response)
				window.alert("Slot Freed")
				window.location.reload(false)

			})

	}
	const renderBookings=()=>
	{
		var currentDatehrs = moment().format("HH");
		var currentDatemin = moment().format("mm");

		let min=[]
		let hrs=[]
		let startTimemin=[]
		let startTimehrs=[]
		let mybookings=[]
		let dur=[]

		for(var i=0;i<bookings.length;i++)
		{
startTimemin[i]=moment(bookings[i].createdAt).format('mm')
startTimehrs=moment(bookings[i].createdAt).format('hh')
hrs[i]=moment.utc(moment(currentDatehrs, "hh").diff(moment(startTimehrs[i], "hh"))).format("hh")
min[i] = moment.utc(moment(currentDatemin, "mm").diff(moment(startTimemin[i], "mm"))).format("mm")
if(i<3)
{
	dur[i]=min[i]
}
else if(hrs[i]>0)
{
	dur[i]=parseInt(hrs[i]*60)+parseInt(min[i])
}
else
{
	dur[i]=min[i]
}

mybookings.push(
<div className="card" id="booking" >
<div className="card-header">
Booked <br/>
on date:{moment(bookings[i].createdAt).format('YYYY-MM-DD')} <br/>
at time:{moment(bookings[i].createdAt).format('HH:mm')}<br/>
Total payment-:{dur[i]} rupees<br/>


</div>
<button className="btn btn-success" id={i} value={bookings[i].slotNumber  }  onClick={e=>(FREESLOT(e.target.value))} style={{"margin":"20px 20px 20px 20px","width":"200px"}}>FREE {bookings[i].slotNumber}
	
</button>
</div>
	
)
	
		}
		return mybookings
	}
	useEffect(()=>
	{
			axios.get(`${BASE_URL}/myBookings/${user._id}`)
			.then(response => {
				//setNewSlot(response.data[0].slots)
				console.log("My Bookings",response.data.data)
				setBokkings(response.data.data)

			})

	},[])
	return (
			<Layout className="container" title="My Bookings"  >
			<center> <h6 style={{"color":"lime"}}>Charges are 1 rupee per minute</h6> </center>
			<div className="row">
			{renderBookings()}
			</div>
			</Layout>
		)

}

export default FreeSlot