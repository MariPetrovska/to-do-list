import {useEffect, useState} from "react";
import styles from './Main.module.css';
import List from "../List/List";

function Main() {
    const today = new Date().toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' });
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState("");

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks"));
        if(storedTasks && storedTasks.length > 0) {
            setTasks(storedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (e) => {
        e.preventDefault();
        if(taskInput.trim() === "") return;
        const newTask = {
            id: Date.now(),
            text: taskInput,
            completed: false,
        };

        setTasks([...tasks, newTask])
        setTaskInput("");
    }
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.h1}>Note your tasks</h1>
            <span className={styles.formDate}>{today}</span>
            <form onSubmit={addTask} className={styles.form}>
                <input 
                type="text" 
                value={taskInput} 
                onChange={(e) => {
                    setTaskInput(e.target.value)}} className={styles.todoInput} placeholder="What is the task today ?"></input>
                <button type="submit" className={styles.todoBtn}>Add task</button>
            </form>
            <List tasks={tasks} setTasks={setTasks}/>
        </div>


    )
}

export default Main;
