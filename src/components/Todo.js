import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { store } from '../Firebase'
import DeleteIcon from '@material-ui/icons/Delete';

function Todo({ user }) {

    const [todo, setTodo] = useState('')
    const [mytodos, settodos] = useState([])

    function Add_todo() {
        if(todo!==''){
            store.collection('todo').doc(user.uid).set({
            todo: [...mytodos, todo]
        })

        setTodo('')
        }
    }

    function delete__todo(del_todo){
        console.log(del_todo)
        const docref = store.collection('todo').doc(user.uid)
        docref.get().then(docsnap=>{
           const result =  docsnap.data().todo.filter(todo=> todo!==del_todo)
            docref.update({
                todo:result
            })
        })
    }


    useEffect(() => {
        if (user) {
            var storeRef = store.collection('todo').doc(user.uid)
            storeRef.onSnapshot(storesnap => {
                if (storesnap.exists) {
                    settodos(storesnap.data().todo)
                }

            })
        }
    }, [user])

    function ChangeEvent(e) {
        setTodo(e.target.value)
    }
    let { id } = useParams()
    return (
        <div className="todo">
            <div className="Todo__contents"><div className="alert alert-success alert-dismissible fade show" role="alert">
                Welcome <strong>{id}</strong>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
                <div className="input__todo input-group input-group-lg" style={{ "width": 50 + "vw" }}>
                    <input type="text" value={todo} onChange={(e) => { ChangeEvent(e) }} className="form-control todo__input" placeholder="Write your Todo and click on Add" aria-label="Write your Todo and click on Add" aria-describedby="button-addon2" />
                    <button className="Add_btn btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => { Add_todo() }}>Add</button>
                </div>
                <br/>
                {
                    mytodos.length !== 0 ?
                        <div className="your__todos">


                            <ol className="list-group list-group-numbered">
                                {
                                    mytodos.map((todo) => {
                                        if (todo) {
                                            return (
                                                <div className="your__todo" key={todo}>
                                                    <li className="list-group-item list-group-item-info">{todo}</li>
                                                    <DeleteIcon className="todo_delete" onClick={()=>{delete__todo(todo)}}/>
                                                </div>
                                            )

                                        }
                                        else{
                                            return(null)
                                        }

                                    })
                                }
                            </ol>


                        </div>

                        :
                        <div className="No__todos">
                            <h1>No <span style={{"color":"#db4c3f"}}>Todos</span> yet</h1>
                        </div>
                }

            </div>

        </div>
    )

}

export default Todo
