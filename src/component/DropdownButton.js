import React, { useState } from 'react';
import './Dropdown.css'; 
import down from "../images/down.svg";
import Display from "../images/Display.svg";
import StatusPriority from './Todo'; // Import your components
import StatusTitle from './StatusTitle';
import UserBypriority from './User';
import UserBytitle from './UserBytitle';
import PriorP from './Priority';
import PriorT from './PriopT';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [grouping, setGrouping] = useState('status'); // Default grouping to "status"
  const [ordering, setOrdering] = useState('priority'); // Default ordering to "priority"

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Function to determine which component to render based on grouping and ordering
  const renderComponent = () => {
    if (grouping === 'status' && ordering === 'priority') {
      return <StatusPriority />;
    } else if (grouping === 'status' && ordering === 'title') {
      return <StatusTitle />;
    } else if (grouping === 'user' && ordering === 'priority') {
      return <UserBypriority />;
    } else if (grouping === 'user' && ordering === 'title') {
      return <UserBytitle />;
    }
    else if(grouping==='priority' && ordering==='priority'){
      return <PriorP />

    } else if(grouping==='priority' && ordering==='title'){
      return <PriorT />

    }
    return null;
  };

  return (
    <div className='dropdown-wrapper'>
      <div className="dropdown">
        <button className="dropbtn" onClick={toggleDropdown}>
          <span className="icon"><img src={Display} alt='img menu' /></span>
          <h1 className='displayword'>Display</h1> 
          <img src={down} alt='img menu' />
        </button>
        
        <div className={`dropdown-content ${isOpen ? 'show' : ''}`}>
          <div className='dropdownhandle'>
            <div className='inside'>
              <div className='inside-class'>
                <h1>Grouping</h1>
                <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option> {/* If you want to add more grouping options */}
                </select>
              </div>
            </div>

            <div className='inside'>
              <div className='inside-class'>
                <h1>Ordering</h1>
                <select value={ordering} onChange={(e) => setOrdering(e.target.value)}>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div> 

      {/* Render the appropriate component based on the selected options */}
      <div className="component-display" style={{marginTop:"42px"}}>
        {renderComponent()}
      </div>
    </div>
  );
};

export default Dropdown;
