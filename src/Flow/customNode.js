import React, { memo, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Handle } from "react-flow-renderer";

export default memo(({ data, isConnectable }) => {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [operation, setOperation] = useState("+");
  const operations = ["+", "-", "*", "**", "/", "//", "%"];
  const [config, setConfig] = useState([]);
  
  
  const onHide = () => {
    setVisible(false);
  };
  const confirmShowConfig = () => {
    setVisible(true);
  };

  const handleDoubleClick = () => {
    const c = {
      name: "operation",
      type: "task",
      operation: operation,
      input: {
        rightside: right,
        leftside: left,
      },
      output: "",
    };

    setConfig((e) => e.concat(c));
  };

  

  const footer = (
    <div>
      <Button label="Yes" icon="pi pi-check" onClick={handleDoubleClick} />
      <Button label="No" icon="pi pi-times" onClick={onHide} />
    </div>
  );

  return (
    <>
      <Handle
        type="target"
        position="top"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div
        onDoubleClick={confirmShowConfig}
        style={{ border: "1px solid #00d000" }}
      >
        Arithmetic Operations hhhhh
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

      <Dialog
        visible={visible}
        footer={footer}
        onHide={onHide}
        style={{ width: "450px" }}
        modal
        className="p-fluid"
        header="Operation Settings"
      >
        <div className="field"></div>
        <label>Input name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Operation :</label>
        <input
          type="number"
          value={left}
          onChange={(e) => {
            setLeft(e.target.value);
          }}
        />

        <select
          value={operation}
          name="operation"
          onChange={(e) => setOperation(e.target.value)}
        >
          {operations &&
            operations.map((e, k) => {
              return <option key={k}>{e}</option>;
            })}
        </select>

        <input
          type="number"
          value={right}
          onChange={(e) => {
            setRight(e.target.value);
          }}
        />
      </Dialog>
    </>
  );
});
