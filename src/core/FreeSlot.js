import React,{useEffect,useState} from 'react'
import Layout from './Layout'
import axios from 'axios'
import {isAuthenticated} from '../auth'
import {BASE_URL} from "../config.js"
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

		let mybookings=[]

		for(var i=0;i<bookings.length;i++)
		{
			mybookings.push(
			<button className="btn btn-dark" id={i} value={bookings[i].slotNumber}  onClick={e=>(FREESLOT(e.target.value))} style={{"margin":"20px 20px 20px 20px","width":"200px"}}>FREE {bookings[i].slotNumber}</button>)
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
			<div className="row">
				{renderBookings()}
			</div>
			</Layout>
		)

}

export default FreeSlot