import React, { useState, useEffect, useRef, useCallback} from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  ReactFlowProvider,
  Background,
  OnLoadParams,
  removeElements,
} from "react-flow-renderer";

import CustomNode from "./customNode";
import IfCustomNode from "./IfCustomNode";
import Sidebar from "./Sidebar";
import "./Sidebar.css";

const initBgColor = "grey";
const connectionLineStyle = { stroke: "#000" };
const snapGrid = [20, 20];
const nodeTypes = {
  selectorNode: CustomNode,
  If: IfCustomNode,
};

const generateUUID = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};
const Flow = () => {
  const [elements, setElements] = useState([]);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  useEffect(() => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView();
    }
  }, [reactFlowInstance]);

  const onLoad = useCallback(
    (rfi) => {
      if (!reactFlowInstance) {
        setReactFlowInstance(rfi);
        console.log('flow loaded:', rfi);
      }
    },
    [reactFlowInstance]
  );

  // const onLoad = (reactFlowInstance: OnLoadParams) => reactFlowInstance.fitView();

  const onElementsRemove = useCallback(
    (elementsToRemove) =>
      setElements((els) => removeElements(elementsToRemove, els)),
    []
  );

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
    const type = event.dataTransfer.getData("application/reactflow");

    // check if the dropped element is valid
    if (typeof type === "undefined" || !type) {
      return;
    }

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const id_if = generateUUID();
    if (type === "If") {
      const ifElements = [
        {
          id: id_if,
          type,
          position,
          data: id_if,
        },
        {
          id: `if_${id_if}`,
          type: "default",
          data: { label: "If" },
          style: {
            border: "1px solid #1fcecb",
            borderRadius: "3px",
            height: "3vh",
            width: "9.5rem",
            background: "white",
            padding: "1px",
          },
          position: { x: position.x - 120, y: position.y + 120 },
          sourcePosition: "bottom",
        },
        {
          id: `else_${id_if}`,
          type: "default",
          data: { label: "Else" },
          style: {
            border: "1px solid #1fcecb",
            borderRadius: "3px",
            height: "3vh",
            width: "9.5rem",
            background: "white",
            padding: "1px",
          },
          position: { x: position.x + 120, y: position.y + 120 },
          sourcePosition: "bottom",
        },
        {
          id: `edge-if-${id_if}`,
          source: id_if,
          target: `if_${id_if}`,
          type: "step",
        },
        {
          id: `edge-if-${id_if + 1}`,
          source: id_if,
          target: `else_${id_if}`,
          type: "step",
        },
      ];
      setElements((es) => es.concat(ifElements));
    } 
    else {
      const id = generateUUID();
      const newNode = {
          id: id,
          type,
          position,
          data: id,
      };
      setElements((nds) => nds.concat(newNode));
    }
    console.log(elements)
  };

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
            onElementsRemove={onElementsRemove}
            style={{ Background: "grey" }}
            nodeTypes={nodeTypes}
            connectionLineStyle={connectionLineStyle}
            snapToGrid={true}
            snapGrid={snapGrid}
            deleteKeyCode={"Backspace"}
            defaultZoom={1.5}
          >
            <MiniMap
              nodeStrokeColor={(n) => {
                if (n.type === "input") return "#0041d0";
                if (n.type === "selectorNode") return initBgColor;
                if (n.type === "output") return "#ff0072";
              }}
              nodeColor={(n) => {
                if (n.type === "selectorNode") return initBgColor;
                return "#fff";
              }}
            />
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default Flow;
