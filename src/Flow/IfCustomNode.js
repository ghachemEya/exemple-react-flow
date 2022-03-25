import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { memo, useEffect, useState } from "react";
import { Handle, useStoreState } from "react-flow-renderer";

import "./style.css";
// import { useDispatch, useSelector } from "react-redux";
// import { bindActionCreators } from "redux";
// import { globalVariablesAction, tasksActions } from "../../../../../../store/actions";

export default memo(({ data, isConnectable }) => {
  //Getting the id of the node
  const id = data;
  //Variables
  const [condition, setCondition] = useState("");
  const [name, setName] = useState("");
  const [condition1, setCondition1] = useState("");
  const [name1, setName1] = useState("");
  //Pop-up varaible a show and hide it
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  //Getting the tasks and global variables functions from the store
  // const dispatch = useDispatch();
  // const {addTask} = bindActionCreators(tasksActions,dispatch);
  // const {addGlobalVariable} = bindActionCreators(globalVariablesAction,dispatch);
  // const variables = useSelector((state) => state.variables);
  // const tasks = useSelector((state) => state.tasks);

  // //Getting the task by id
  // const t = tasks.filter((elt) => elt.id === id);
  //Getting the edges from redux store reactflow
  const edges = useStoreState((state) => state.edges);

  //Tha variables responsibles for the useEffect
  const myvar = true;

  useEffect(() => {
    //Handling the input condition extract the varaibles name
  }, [myvar]);

  //Function to show and hide the pop-up
  const onHide = () => {
    setName(name1);
    setCondition(condition1)
    setVisible(false);
  };

  const showIfDialog = () => {
    setName1(name);
    setCondition1(condition);
    setVisible(true);
  };

  const handleAddConfig = () => {
    if (condition === "") {
      setError("All fields are required.");
    } else {
      setError("");
      console.log({'name' : name, 'condition': condition});
      setVisible(false);
    }
  };

  //The footer of the dialog
  const footer = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text p-button-danger"
        onClick={onHide}
      />

      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text p-button-success"
        onClick={handleAddConfig}
      />
    </React.Fragment>
  );
  const isValidConnection = (connection) => {
    return false 
  };

  return (
    <>
      {/* The custom itself */}
      <div onDoubleClick={showIfDialog}>
        <div
          style={{
            border: "1px solid #1fcecb",
            borderRadius: "3px",
            height: "auto",
            width: "10rem",
            fontSize: "10px",
            background: "white",
            textAlign: "center",
            paddingTop: "3px",
            paddingBottom: "3px",
          }}
        >
          <Handle
            type="target"
            position="top"
            isValidConnection={isValidConnection}
            onConnect={(params) =>
              console.log("params for the edges - target", params)
            }
            isConnectable={isConnectable}
          />
          <span style={{ fontSize: "9px", margin: "2px" }}>If</span>
          <hr style={{ margin: "2px", width: "98%" }} />
          <span style={{ fontSize: '10px'}}>
            {condition != "" && "If statement condition : ( "+ condition + " )"}
          </span>

          <Handle
            type="source"
            position="right"
            id="a"
            isValidConnection={isValidConnection}

            //isValidConnection={(connection) => isValid(connection, edges)}
            isConnectable={isConnectable}
          />
          <Handle
            type="source"
            position="left"
            id="b"
            isValidConnection={isValidConnection}

            //isValidConnection={(connection) => isValid(connection, edges)}
            isConnectable={isConnectable}
          />
        </div>
      </div>


      <Dialog
       visible={visible}
       footer={footer}
       onHide={onHide}
       style={{ width: "450px" }}
       modal
       className="p-fluid"
       header="If Settings"
      >

        <div className="field">
            <label>Name: </label>
            <InputText
            value={name}
            placeholder= "Enter the name of the condition"
            onChange={(e) => setName(e.target.value)}
            />

            <label>Condition: </label>
            <InputText
            value={condition}
            placeholder= "Enter the condition of the condition"
            onChange={(e) => setCondition(e.target.value)}
            />
        </div>

        <p style={{color: 'red'}}>{error}</p>
      </Dialog>
     
    </>
  );
});
