import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from './Item.module.css';

function Item({ task, removeTask, editTask, toggleTaskCompletion }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEdit = () => {
    editTask(task.id, editedText);
    setIsEditing(false);
  };

  return (
    <li className={styles.taskItem}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTaskCompletion(task.id)}
        className={styles.checkbox}
      />
      {isEditing ? (
        <>
          <input 
          className={styles.inputEdit}
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleEdit}>
            <FontAwesomeIcon className={styles.checkIcon} icon={faCheck} /> 
          </button>
        </>
      ) : (
        <>
          <span className={task.completed ? styles.completedText : styles.text}>{task.text}</span>
          <div className={styles.btnContainer}>
            <button className={styles.btn} onClick={() => setIsEditing(true)}>
            <FontAwesomeIcon icon={faPenToSquare} /> 
          </button>
          <button className={styles.btn} onClick={() => removeTask(task.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          </div>
          
        </>
      )}
    </li>
  );
}

export default Item;