import React, { useEffect, useState } from 'react';
import TaskCard from './Card';
import "./Userdetail.css";
import menu from "../images/menu.svg";
import plus from "../images/add.svg";

const UserdetailsCard2 = ({ item }) => {
  const [data, setData] = useState([]);
  const [userTickets, setUserTickets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
        const dt = await res.json();

        // Log the fetched data
        console.log("Fetched Data:", dt);

        setData(dt.tickets);

        // Filter tickets for the current user
        const filteredTickets = dt.tickets.filter(ticket => ticket.userId === item.id);
        setUserTickets(filteredTickets);
        console.log(userTickets);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [item.id]);

  // Group tickets by status and sort each group by title
  const groupedTickets = userTickets.reduce((acc, ticket) => {
    if (!acc[ticket.status]) {
      acc[ticket.status] = [];
    }
    acc[ticket.status].push(ticket);
    return acc;
  }, {});

  const sortedGroupedTickets = Object.keys(groupedTickets).reduce((acc, status) => {
    acc[status] = groupedTickets[status].sort((a, b) => a.title.localeCompare(b.title));
    return acc;
  }, {});

  return (
    <div style={{ backgroundColor: "#f4f5f9", padding: "20px" }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className='userdet' style={{ display: "flex", justifyContent: "space-evenly", marginLeft: "12px", marginTop: "10px", marginBottom: "-4px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginRight: "30px" }}>
            <img style={{ marginRight: "15px", marginBottom: "-7px", marginLeft: "-10px" }} className='cardimg' src ={`https://api.dicebear.com/5.x/initials/svg?seed=${item.name}`} alt='' />
            <p style={{ marginLeft: "-10px", fontWeight: '600' }}>{item.name} </p>
            <p style={{ marginLeft: "12px", color: "#938f8f", fontSize: "300" }}>{userTickets.length}</p>
          </div>
          <div style={{ marginTop: "20px", marginRight: "4%" }}>
            <img style={{ marginLeft: "15px" }} src={plus} alt='' />
            <img src={menu} alt='' />
          </div>
        </div>

        {/* Render columns for each status */}
        {Object.keys(sortedGroupedTickets).map(status => (
          <div key={status} style={{ margin: "10px 0", display: 'flex', flexDirection: 'column' }}>
          
            {sortedGroupedTickets[status].map((task, index) => (
              <TaskCard key={index} task={task} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserdetailsCard2;
