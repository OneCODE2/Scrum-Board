import React from 'react';
import './TaskCard.css'; // Create separate CSS file for styles
import menu from "../images/menu.svg"
import feature from "../images/feature.png"
const TaskCard = ({ task }) => {
  return (
 
        <div className="task-card" style={{marginRight:"1px"}}>
    <div className='carddisplay'>
               {/* <img className='cardimg' src='https://tse3.mm.bing.net/th?id=OIP.uL0pOCC5xggBHxqCjiSIqgHaHa&pid=Api&P=0&h=180' alt=''    />  */}
        <p className='cardtitle'>{task.id} </p>
        {/* <img className='cardimg' src='https://tse3.mm.bing.net/th?id=OIP.uL0pOCC5xggBHxqCjiSIqgHaHa&pid=Api&P=0&h=180' alt=''    /> */}
    </div>
    <p className='cardpar'>
  {task.title.length > 20 ? task.title.substring(0, 40) + "..." : task.title}
</p>

     <div className='cardimages'>
<img src={menu} alt='' />
<img className='featureimg' src={feature} alt='' />
     </div>
    </div>
    
  );
};

export default TaskCard;


// import React from 'react';
// import './TaskCard.css';
// import menu from "../images/menu.svg";
// import feature from "../images/feature.png";

// const TaskCard = ({ task }) => {
//   return (
//     <div className="task-card">
//       <div className='card-header'>
//         <p className='card-title'>{task.id}</p>
//       </div>
      
//       <p className='card-paragraph'>
//         {task.title.length > 40 ? task.title.substring(0, 40) + "..." : task.title}
//       </p>

//       <div className='card-footer'>
//         <img className='menu-icon' src={menu} alt='Menu' />
//         <img className='feature-icon' src={feature} alt='Feature' />
//       </div>
//     </div>
//   );
// };

// export default TaskCard;
