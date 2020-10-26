import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {Link} from 'react-router-dom'
import {getProducts,BookSlot,bookedSlots} from  './apiCore'
import {isAuthenticated} from '../auth'
import axios from 'axios'
import uuid from 'react-uuid'
import {BASE_URL} from "../config.js"


//{JSON.stringify(slots)}
const Home=()=>{
	const [slots,setSlots]=useState(0)
	const [error,setError]=useState(false)
	const [succes,setSuccess]=useState(false)
	const [booked,setBooked]=useState([[]])
	const {user,token}=isAuthenticated()
	

	const createSlot=(slotNumber)=>
		{
			
			console.log(slotNumber)

			BookSlot(user._id,token,slotNumber,user.contact,user.name)
			.then((data,err)=>
			{
				if(err)
				{
					setError(true)
				}
				else
				{
				setSuccess(true)
				console.log("data",data.data.userId)
				window.alert("Slot booked \n name:"+data.data.name+"\n Phone Num:"+data.data.contact)
				window.location.reload(false)
				}

			})
		}


		

		const [newSlot, setNewSlot] = useState([]);
		const [bookedSlot, setBookedSlot] = useState([])
		const [bookedusers, setBookedusers] = useState([{ [uuid()] : [] }])
		
		useEffect(()=>{
			axios.get('https://agile-headland-91333.herokuapp.com/api/products')
			.then(response => {
				setNewSlot(response.data[0].slots)
				//console.log("Bhai   ",response.data[0].slots)
			})

			axios.get('https://agile-headland-91333.herokuapp.com/api/slot/slotfun')
			.then(response => {
				setBookedSlot(response.data.data)
				console.log("length",response.data.data.length)
				for(var i=0;i<response.data.data.length;i++)
				{
					setBookedusers({[response.data.data[i].slotNumber]:response.data.data[i].userId})
				}
				//console.log("Bhai   ",response.data.data)
			})
			},[])

		


		const renderSlots = () => {
			let slot = [];
			console.log("users",bookedusers)
			for(let i=1; i<=newSlot; i++){
				const check = bookedSlot.some(item => item.slotNumber === i);
				
				let bookedusers=[]
				bookedusers = bookedSlot.filter(item => item.userId === user._id);
				

				if(!check){
					slot.push(<button className="btn btn-success" onClick={e=>(createSlot(e.target.value))} id={i} value={i} style={{"margin":"20px 20px 20px 20px","width":"200px"}}>SLOT {i}</button>)
				}
				else{
					slot.push(<button className="btn btn-danger" disabled  id={i} value={i} style={{"margin":"20px 20px 20px 20px","width":"200px","z-index":"-999"}}>BOOKED {i}</button>)
				}
			}

			return slot;
		}

	return (
		<Layout className="container" title="A parking website"  >
			<center>
				<h5  style={{"color":"lime"}}>Book Now </h5>
				<p style={{"color":"lime"}}>Parking  has never been this easy</p>
			</center>
			<div className="row" >
				{renderSlots()}
			</div>
		</Layout>
		)

}

export default Home













