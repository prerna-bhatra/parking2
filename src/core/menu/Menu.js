import React,{Fragment} from 'react'
import {Link,withRouter,Redirect} from 'react-router-dom'
import {signout,isAuthenticated} from '../../auth'

const Menu=()=>{
	const {user,token}=isAuthenticated()
return (
	<div >
		<ul className="nav nav-tabs bg-danger" style={{padding:"10px 10px 10px 10px" , position: "fixed",top:" 0", width: "100%"}}>
			<li className="nav-item">
				<Link className="nav-link btn-danger" style={{color:'white'}} to="/">
					Home
				</Link>
			</li>

			


			
			
			{isAuthenticated()  && isAuthenticated().user.role===0 && (
					<li className="nav-item">
				<Link className="nav-link btn-danger" style={{color:'white'}} to="/dashboard">
					My Dashboard
				</Link>
				</li>

				)}

				{isAuthenticated()  && isAuthenticated().user.role===1 && (
					<li className="nav-item">
				<Link className="nav-link btn-danger" style={{color:'white'}} to="/admin/dashboard">
					My Dashboard
				</Link>
			</li>

				)}
			
			
			
		
			{!isAuthenticated() && (
				<Fragment>
				<li className="nav-item">
					<Link className="nav-link btn-danger" style={{color:'white'}} to="/singin">SignIn</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link btn-danger" style={{color:'white'}} to="/signup">SignUp</Link>
				</li>
				</Fragment>
				)}



				{isAuthenticated() && (
				<Fragment>
				<li className="nav-item">
					<Link className="nav-link btn-danger" style={{color:'white'}} to={`/freeSlot/${user._id}`}>My Bookings</Link>
				</li>
				<li className="nav-item">
							<Link className="nav-link btn-danger" style={{cursor:'pointer',color:'white'}} onClick={()=>signout(()=>{
					return <Redirect to='/'  />
						})}>
						Signout</Link>
				</li>
				</Fragment>

				)}
			
		</ul>
	</div>

	)
	
}


export default Menu