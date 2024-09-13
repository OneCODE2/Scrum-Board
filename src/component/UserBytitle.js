import React, { useEffect, useState } from 'react'
import UserdetailsCard from './UserdetailsCard';
import UserdetailsCard2 from './UserDetailsCard2';

const UserBytitle = () => {
    const [user,setuser]=useState([])
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
            const dt = await res.json();
            
            // Log the fetched data
            console.log("Fetched Data:", dt);
            
            setuser(dt.users)
            
            // Log state after setting it (useEffect might run multiple times, log in a separate useEffect)
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);
  return (
    <div style={{display:"flex",justifyContent:"space-evenly"}}>
      {
        user&& user.map((item,index)=>(
<UserdetailsCard2 item={item} key={index}  />
        ))
      }
    </div>
  )
}

export default UserBytitle
