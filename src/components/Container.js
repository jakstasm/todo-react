import React from "react";
import shortid from "shortid";

function TodoItem({ name, idx, description, removeTodo }) {
  return (
    <div idx={idx}>
      <h3>
        {name} {idx}
      </h3>
      <button onClick={removeTodo}>-</button>
    </div>
  );
}

function Header({ addTodo }) {
  return (
    <div>
      <h1>Goals and Dreams</h1>
      <button onClick={addTodo}>+</button>
    </div>
  );
}

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
  }

  addTodo() {
    const newTodo = {
      name: "RENAME_ME",
      description: "",
    };
    this.setState({
      list: [...this.state.list, newTodo],
    });
  }

  removeTodo(idx) {
    console.log(idx);
    const newList = this.state.list.filter(
      (item) => this.state.list.indexOf(item) !== idx
    );
    this.setState({
      list: newList,
    });
  }

  updateName(name, idx) {
    // todo
  }

  updateDescription(description, idx) {
    // todo
  }

  render() {
    console.log(this.state.list);
    return (
      <div>
        <Header addTodo={this.addTodo} />
        {this.state.list.map((item, idx) => {
          return (
            <TodoItem
              idx={idx}
              name={item.name}
              description={item.description}
              key={shortid.generate()}
              removeTodo={this.removeTodo}
            />
          );
        })}
      </div>
    );
  }
}
