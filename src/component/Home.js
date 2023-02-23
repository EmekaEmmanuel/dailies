/* eslint-disable*/
import React, { useEffect, useState } from 'react';
import './Home.css';
import refreshImg from '../img/Refresh_icon.svg.png';
import arrowIconImg from '../img/favpng_arrow-icon-design.png';
import allTask from "../module.js/allTasks"
import trashBinImg from '../img/trashbin.png';

function Home() {
    const [description, setDescription] = useState('');
    const [mytasks, setMyTasks] = useState([]);
    const [editInput, setEditInput] = useState('')


    useEffect(() => {
        allTask((e) => {
            setMyTasks(e)
        })
    }, [])

    const byResetIndex = (storedArr) => {
        const resetingArr = [];
        storedArr.forEach((task) => {
            const fixedTaskId = { ...task, index: resetingArr.length + 1 };
            resetingArr.push(fixedTaskId);
            localStorage.setItem('tasks', JSON.stringify(resetingArr));

        });
        console.log(resetingArr);
        setMyTasks(resetingArr)
    };

    const handleDescriptionUpdate = (e, ind, arr) => {
        console.log(e, ind, arr);
    }

    // updateDescriptions(clickCheckEditBtn) {
    //     const editBtnAttribut = clickCheckEditBtn.getAttribute('descId');
    //     const getEditInputTag = document.querySelector(`.input_${editBtnAttribut}`);
    //     const getTripleDotsTag = document.querySelector(`.dots_${editBtnAttribut}`);
    //     const getBinImgTag = document.querySelector(`.bin_${editBtnAttribut}`);
    //     getEditInputTag.classList.remove('hide');
    //     getEditInputTag.value = clickCheckEditBtn.innerHTML;
    //     clickCheckEditBtn.classList.add('hide');
    //     getTripleDotsTag.classList.remove('hide');
    //     getBinImgTag.classList.add('hide');
    //     getEditInputTag.addEventListener('keypress', (e) => {
    //       if (e.key === 'Enter') {
    //         this.storedTasks[editBtnAttribut].description = getEditInputTag.value;
    //         localStorage.setItem('taskstored', JSON.stringify(this.storedTasks));
    //         const storingparam = this.storedTasks;
    //         byResetIndex(storingparam);
    //         this.displayToDoRecord();
    //         getEditInputTag.classList.add('hide');
    //         clickCheckEditBtn.classList.remove('hide');
    //         getBinImgTag.classList.remove('hide');
    //         getTripleDotsTag.classList.add('hide');
    //       }
    //     });
    //   }

    //   clearEmptyLocalStorage() {
    //     const empty = document.querySelector('.empty_todo_tasks');
    //     if (this.storedTasks.length === 0) {
    //       localStorage.removeItem('taskstored');
    //       empty.style.display = 'block';
    //     }
    //   } 

    const handleUpdateTaskStatus = (e, index, arr) => {
        console.log(e.target.checked, index, arr)
        if (e.target.checked === true) {
            arr[index].completed = true;
            localStorage.setItem('taskstored', JSON.stringify(arr));
            // setCheckStatus(true)
        }
        if (e.target.checked === false) {
            arr[index].completed = false;
            localStorage.setItem('taskstored', JSON.stringify(arr));
            // setCheckStatus(false)
        }
    }

    const clearAll = () => {
        const filteredTasks = mytasks.filter(
            (task) => task.completed != true,
        );
        localStorage.setItem('tasks', JSON.stringify(filteredTasks));
        byResetIndex(filteredTasks);
    }

    const createNewToDo = (description, mytasks) => {
        const newToDo = {
            description,
            completed: false,
            index: mytasks.length + 1
        }
        console.log(newToDo)
        return newToDo
    }

    const handleChange = (e) => {
        setDescription(e.target.value);
    };

    const addNewTodo = async (e) => {
        e.preventDefault();
        console.log(mytasks)
        const todo = createNewToDo(description.trim(), mytasks)
        mytasks.push(todo);
        console.log(mytasks)
        localStorage.setItem('tasks', JSON.stringify(mytasks));
        byResetIndex(mytasks)
        setDescription('')
    };

    const handleRemove = (obj) => {
        const { index } = obj;
        const filteredTasks = mytasks.filter((task) => task.index.toString() != index);
        localStorage.setItem('tasks', JSON.stringify(filteredTasks));
        byResetIndex(filteredTasks);
    }

    return (
        <div>
            <section className="app_container">
                <header className="header_section innerspace">
                    <li className="font1">Today&apos;s To Do</li>
                    <li className="appendrefresh">
                        <img className="refresh_img" src={refreshImg} alt="refresh_icon" />
                    </li>
                </header>

                <main>
                    <form className="todo_form" onSubmit={addNewTodo}>
                        <fieldset className="border_none">
                            <input
                                className="description_input todo_form_input font2 border_none"
                                type=""
                                placeholder="Add to your list..."
                                onChange={handleChange}
                                value={description}
                                required
                            />
                        </fieldset>
                        <fieldset className="border_none">
                            <button type="submit" className="border_none">
                                <img src={arrowIconImg} alt="" />
                            </button>
                        </fieldset>
                    </form>

                    <div className="empty_todo_tasks" />

                    <div className="itemBox">
                        {mytasks.map((storingparam, index, mytasks) => {
                            return (
                                <figure key={index} >

                                    <article className='todo_item'>
                                        <fieldset className='border_none'>
                                            <input  onClick={(e) => handleUpdateTaskStatus(e, index, mytasks)} 
                                            className='border_none checkbox_tag checkbox_' type="checkbox" required />
                                            <input onClick={(e) => handleDescriptionUpdate(e, index, mytasks)} onChange={(e)=>setEditInput(e.target.value)} className='input border_none hide font3' type="text" value={storingparam.description} required />
                                            <p className='describ line_through_ font3'>{storingparam.description}</p>
                                        </fieldset>

                                        <figure>
                                            <span className='dots_'>&#8230;</span>
                                            <img onClick={() => handleRemove(storingparam)} className='bin remove_btn' src={trashBinImg} alt="" />
                                        </figure>
                                    </article>

                                </figure>
                            )

                        })}
                    </div>
                </main>

                <footer className="todo_footer">
                    <p onClick={clearAll} className="font4">Clear all completed</p>
                </footer>
            </section>
        </div>
    );
}

export default Home;
