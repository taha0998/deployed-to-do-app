import TickIcon from "../components/TickIcon";
import ProgressBar from "../components/ProgressBar";
import { useState } from "react";
import Modal from "./Modal";

const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);

  const deleteTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar progress={task.progress} />
      </div>
      <div className="button-container">
        <button onClick={() => setShowModal(true)} className="edit">
          EDIT
        </button>
        <button className="delete" onClick={deleteTask}>
          delete
        </button>
      </div>
      {showModal && (
        <Modal
          mode="edit"
          setShowModal={setShowModal}
          task={task}
          getData={getData}
        />
      )}
    </div>
  );
};

export default ListItem;
