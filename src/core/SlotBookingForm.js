import React ,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'

const SlotBookingForm=(props)=>{
	const [slotnum,setSlotNum]=useState()
	const [vehicle,setVehicle]=useState(["car","bike"])
	useEffect(()=>{
		//console.log(props.match.params.slotNumber)
		const slotNumber=props.match.params.slotNumber;
		setSlotNum(slotNumber)
		

	},[])

	return(
		<div className="container">
		<div className="row"> 
		
			<div className="col-md-6">
			<h6>Slot {slotnum}</h6>
				<form>
				<div className="form-group">
				<label>Date</label>
					<input type="date" className="form-control" />
				</div>
				<div className="form-group">
					<input type="time" className="form-control" />
				</div>
				<div className="form-group">
					<select>
					<option value="1"></option>
					</select>

				</div>
				</form>
			</div>
		</div>
		</div>
		)

}
export default SlotBookingForm