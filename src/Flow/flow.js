import React, { useState, useEffect, useRef } from 'react';
import ReactFlow, { addEdge, MiniMap, Controls, ReactFlowProvider } from 'react-flow-renderer';

import CustomNode from './customNode';
import Sidebar from './Sidebar';
import './Sidebar.css'

const initBgColor = 'grey';
const connectionLineStyle = { stroke: '#000' };
const snapGrid = [20, 20];
const nodeTypes = {
  selectorNode: CustomNode,
};

let id = 0;
const getId = () => `${id++}`;

const Flow = () => {
  const [elements, setElements] = useState([])
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };


  useEffect(() => {
    // setElements([
    //   {
    //     id: '0',
    //     type: 'selectorNode',
    //     data: {node: node},
    //     style: { border: '1px solid #777', padding: 10 },
    //     position: { x: 300, y: 50 },
    //   },
    // ]);

  }, []);

   //Update the of the node while moving it in the interface
   const onNodeMouseMove = (event, node) => {
    const pos = {
      x: event.clientX,
      y: event.clientY,
    };
    elements.forEach((elt) => {
      if (elt.id === node.id) {
        elt.position = pos;
       
      }
    });
  };

 

  const onConnect = (params) => setElements((els) => addEdge(params, els));

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');

    // check if the dropped element is valid
    if (typeof type === 'undefined' || !type) {
      return;
    }

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: getId(),
      type,
      position,
      data: {},
    };

    setElements((nds) => nds.concat(newNode));
    console.log(elements)
  }

  return (
    <div className="dndflow">
      <ReactFlowProvider>
      <div ref={reactFlowWrapper} className="reactflow-wrapper">
      <ReactFlow 
      elements={elements}
      onConnect={onConnect}
      onLoad={onLoad}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onNodeMouseMove={onNodeMouseMove}
      style={{ background: initBgColor }}
      nodeTypes={nodeTypes}
      connectionLineStyle={connectionLineStyle}
      snapToGrid={true}
      snapGrid={snapGrid}
      defaultZoom={1.5}
    >
      <MiniMap
        nodeStrokeColor={(n) => {
          if (n.type === 'input') return '#0041d0';
          if (n.type === 'selectorNode') return initBgColor;
          if (n.type === 'output') return '#ff0072';
        }}
        nodeColor={(n) => {
          if (n.type === 'selectorNode') return initBgColor;
          return '#fff';
        }}
      />
      <Controls />
    
    </ReactFlow>
    <Sidebar/>
      </div>
      
      </ReactFlowProvider>
    </div>
  
  );
};

export default Flow;
