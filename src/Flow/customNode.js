import React, { memo, useState } from 'react';

import { Handle } from 'react-flow-renderer';

export default memo(({ data, isConnectable }) => {
    
    const [left, setLeft] = useState('')

    
    const handleDoubleClick = () => {
        console.log(left)
    }
    
  return (
    <>
      <Handle
        type="target"
        position="top"
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div onDoubleClick={handleDoubleClick} style={{border: '1px solid #00d000'}}>
        Arithmetic Operations 
        <input
        type="number"
        value={left}
        onChange={(e) => {
            setLeft(e.target.value)
           }}
        />
      </div>
      
      <Handle
        type="source"
        position="right"
        id="a"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position="left"
        id="b"
        isConnectable={isConnectable}
      />
    </>
  );
});
