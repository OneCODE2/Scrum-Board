import React, { useEffect, useState } from 'react';
import TaskCard from './component/Card';
import DropdownButton from './component/DropdownButton';
import User from './component/User';
import Card from './component/Card';
import Usertodo from './component/Todo';
import UserdetailsCardtodo from './component/Todo';
import TaskBoard from './component/Todo';
import Priority from './component/Priority';
import Prior from './component/Priority';
import UserdetailsCard from './component/UserdetailsCard';
import UserBypriority from './component/User';
import UserBytitle from './component/UserBytitle';
import StatusTitle from './component/StatusTitle';
import PriorP from './component/Priority';
import PriorT from './component/PriopT';

const App = () => {
  const [data, setData] = useState([]);
  const [userticket, setUserTickets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
        const dt = await res.json();
        
        // Log the fetched data
        console.log("Fetched Data:", dt);
        
        setData(dt.tickets);
        const filteredTickets = dt.tickets.filter(ticket => ticket.userId === 'usr-2');
        setUserTickets(filteredTickets);

        
        // Log state after setting it (useEffect might run multiple times, log in a separate useEffect)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Log the state whenever it changes
  useEffect(() => {
    console.log(userticket)
  }, [userticket]);

  return (
    <div>
      <DropdownButton />
    
    </div>
  );
};

export default App;


