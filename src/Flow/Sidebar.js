import React from 'react';
import './Sidebar.css'
const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode selectorNode" onDragStart={(event) => onDragStart(event, 'selectorNode')} draggable>
        Arithmetic Op
      </div>

      <div className="dndnode if" onDragStart={(event) => onDragStart(event, 'If')} draggable>
        If
      </div>

     
     
    </aside>
  );
};

export default Sidebar;