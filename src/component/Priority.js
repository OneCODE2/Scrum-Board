import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TaskCard from './Card';

import img4 from "../images/4.svg"
import img3 from "../images/3.svg"
import img2 from "../images/2.svg"
import img1 from "../images/1.svg"
import img0 from "../images/No-priority.svg"
import menu from '../images/menu.svg'
import Add from '../images/add.svg'


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Center vertically in the viewport */
  background-color: #f4f5f9; /* Background color */
  padding: 20px;
`;

const Container = styled.div`
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  width: 100%;
  max-width: 1200px; /* Adjust the max-width as needed */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
`;

const Board = styled.div`
  display: flex;
  padding: 20px;
  gap: 20px;
  flex-wrap: wrap; /* Allows the columns to wrap in case of small screens */
`;

const Column = styled.div`
  border-radius: 8px;
  padding: 10px;
  width: 250px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  h2 {
    font-size: 16px;
    margin: 0 0 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .count {
      background-color: #e0e0e0;
      border-radius: 50%;
      padding: 5px 10px;
      font-size: 12px;
    }
  }
`;

const Task = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .task-id {
      font-weight: bold;
    }

    .avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #e0e0e0;
    }
  }

  .task-title {
    font-size: 14px;
    margin: 0;
  }

  .task-type {
    font-size: 12px;
    color: #888888;
  }
`;

const PriorP = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();

        // Log the fetched data for debugging
        console.log('Fetched Data:', data);

        // Update the state with fetched data
        setTasks(data.tickets);
      } catch (error) {
        setError('Error fetching data.');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const groupTasksByPriority = () => {
    const priorityGroups = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
    };

    tasks.forEach(task => {
      if (priorityGroups[task.priority] !== undefined) {
        priorityGroups[task.priority].push(task);
      }
    });

    return priorityGroups;
  };

  const groupedTasksByPriority = groupTasksByPriority();

  // Sort tasks by title within each priority level
  Object.keys(groupedTasksByPriority).forEach(priority => {
    groupedTasksByPriority[priority].sort((a, b) => a.title.localeCompare(b.title));
  });



  const renderimg=(priority)=>{
    if(priority===0){
      return (<div style={{display:"flex"}}><img src={img0} alt=''  /> <p>No Priority</p>  </div>)
    }
    else  if(priority===1){
      return (<div style={{display:"flex" }}><img src={img1} alt=''  /> <p style={{marginLeft:"4px"}}>Low</p>  </div>)
    }
    else  if(priority===2){
      return (<div style={{display:"flex" }}><img src={img2} alt=''  /> <p style={{marginLeft:"4px"}}>Medium</p>  </div>)
    }
    else  if(priority===3){
      return (<div style={{display:"flex" }}><img src={img3} alt=''  /> <p style={{marginLeft:"4px"}}>High</p>  </div>)
    }
    else  if(priority===4){
      return (<div style={{display:"flex" }}><img src={img4} alt=''  /> <p style={{marginLeft:"4px"}}>Urgent</p>  </div>)
    }
    
  }


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Wrapper>
        <Board>
          {/* Render columns for each priority level from 0 to 4 */}
          {[0, 1, 2, 3, 4].map(priority => (
            <Column key={priority}>
              <h2>
              {
renderimg(priority)

                } <span className="count">{groupedTasksByPriority[priority].length}</span>

                <div style={{display:'flex', marginRight:'5px'}}>
                  <img src={Add} alt=''/>
                  <img src={menu} alt=''/>
                </div>
              </h2>
              {groupedTasksByPriority[priority].map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </Column>
          ))}
        </Board>
    </Wrapper>
  );
};

export default PriorP;
