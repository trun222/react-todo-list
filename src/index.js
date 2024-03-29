import React from "react";
import ReactDOM from "react-dom";
import TodoList from "./components/TodoList";
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <TodoList />
  </Provider>,
  document.getElementById("root")
);
