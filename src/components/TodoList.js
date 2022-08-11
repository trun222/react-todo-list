import React, { useState } from "react";
import "./TodoList.css";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuidv4 from "uuid/v4";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo } from "../redux/todosSlice";

function TodoList() {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");
  const todos = useSelector((state) => state.todos.todos);
  const [todoCount, setTodoCount] = useState("");
  const [color, setColor] = useState("#d3d3d3");

  // // Handle when a Todo is 'added'
  function handleAddTodo(e) {
    if (e.target.value) {
      if (e.key === "Enter") {
        dispatch(addTodo({ text: e.target.value, id: uuidv4() }));
        setTodo("");
      }
    }
  }

  // // Handle when a Todo is 'removed'
  function handleRemoveTodo(index) {
    dispatch(removeTodo(todos.filter((todo, i) => index !== i)));
  }

  return (
    <div>
      <div className="color-picker">
        <input
          type="color"
          onChange={(e) => {
            setColor(e.target.value);
          }}
          value={color}
        ></input>
      </div>
      <div className="todo-list-component">
        <div className="add-todo-container">
          <TextField
            label={todoCount}
            margin="normal"
            variant="filled"
            className="add-todo"
            value={todo}
            onKeyPress={handleAddTodo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />
        </div>
        <div className="todo-list-container">
          <ul className="list">
            <TransitionGroup className="list-transition-group">
              {todos.map((item, index) => {
                return (
                  <CSSTransition
                    key={item.id}
                    in={true}
                    timeout={500}
                    classNames="move"
                  >
                    <li
                      key={index.id}
                      style={{ background: index % 2 === 1 ? color : "#ffff" }}
                    >
                      <Grid container spacing={8}>
                        <Grid className="background" item xs={10}>
                          <span>
                            {index + 1}. {item.text}
                          </span>
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton
                            color={"secondary"}
                            aria-label="Delete"
                            onClick={() => {
                              handleRemoveTodo(index);
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </li>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
