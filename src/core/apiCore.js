import {BASE_URL} from "../config.js"


import queryString from 'query-string'

export const getProducts=()=>{
	return fetch(`${BASE_URL}/products`,{
		method:"GET",

	})
	.then(response=>{
		return response.json()
		//console.log(response)
	})
	.catch(err=>{
		console.log(err)
	})
}







export const BookSlot=(userId,token,slotNumber,contact,name)=>{
	//console.log("slotpassed",slotNumber)
	const booking={userId,slotNumber,contact,name}
	console.log(booking)
	return fetch(`${BASE_URL}/slot/create/${userId}`,{//it is correct till here
		method:"POST",
		headers:{
			"Content-Type":"application/json",
			Authorization:`Bearer ${token}`
		},
		body:JSON.stringify(booking)

	})
	.then(response=>{
		return response.json()
		//console.log(response)
	})
	.catch(err=>{
		console.log(err)
	})
}
	

export const bookedSlots=()=>{
	return fetch(`${BASE_URL}/slot/slotfun`,{
		method:"GET",

	})
	.then(response=>{
		return response.json()
		//console.log(response)
	})
	.catch(err=>{
		console.log(err)
	})

}












export const listOrders=(userId,token)=>{
	return fetch(`${BASE_URL}/order/list/${userId}`,{
		method:"GET",
		headers:{
				Accept:"application/json",
				 Authorization:`Bearer ${token}`
			}

	})
	.then(response=>{
		return response.json()
	})
	.catch(err=>{
		console.log(err)
	})
}



