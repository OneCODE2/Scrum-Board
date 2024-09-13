
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TaskCard from './Card';


import todo from "../images/todo.svg"
import canceled from "../images/Cancelled.svg"
import progress from "../images/progress.svg"
import backlog from "../images/Backlog.svg"
import Done from '../images/Done.svg'

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

const StatusPriority = () => {
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

  const groupTasksByStatus = () => {
    return tasks.reduce((groups, task) => {
      if (!groups[task.status]) {
        groups[task.status] = [];
      }
      groups[task.status].push(task);
      return groups;
    }, {});
  };

  const sortedGroupedTasks = Object.keys(groupTasksByStatus()).reduce((acc, status) => {
    acc[status] = groupTasksByStatus()[status].sort((a, b) => b.priority - a.priority);
    return acc;
  }, {});

  console.log(sortedGroupedTasks)
const renderedimg=(status)=>{
  if(status==='Todo'){
    return <img src={todo} alt=''    />
  }
  else  if(status==='Backlog'){
    return <img src={backlog} alt=''    />
  }else  if(status==='In progress'){
    return <img src={progress} alt=''    />
  }
  else {
    return <img src={canceled}  alt='' />
  }

}


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Wrapper>
        <Board>
          {Object.entries(sortedGroupedTasks).map(([status, tasksInStatus]) => (
            
            <Column key={status}>
              <h2>
                <div>
                {
                renderedimg(status)
                }
                <span style={{marginLeft:'8px'}}>{status} </span>
                <span className="count" style={{marginLeft:'8px'}}>{tasksInStatus.length}</span>
                </div>
                
                <div style={{display:'flex', marginRight:'5px'}}>
                <img src={Add} alt=''/>
                <img src={menu} alt=''/>
                </div>
              </h2>
              {tasksInStatus.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </Column>
          ))}
          <Column>
            <h2>
            <div>
            <img src={Done}  alt='' />
            <span style={{marginLeft:'8px'}}>Done</span> <span className="count"style={{marginLeft:'8px'}}>0</span>
            </div>
              <div style={{display:'flex', marginRight:'5px'}}>
                <img src={Add} alt=''/>
                <img src={menu} alt=''/>
              </div>  
            </h2>
          </Column>
          <Column>
            <h2>
            <img src={canceled}  alt='' />
              Canceled <span className="count">0</span>
              <div style={{display:'flex', marginRight:'5px'}}>
                <img src={Add} alt=''/>
                <img src={menu} alt=''/>
              </div>  
            </h2>
          </Column>
        </Board>
    </Wrapper>
  );
};

export default StatusPriority;

