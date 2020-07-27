import React from "react";
import shortid from "shortid";

function TodoItem({ name, description }) {
  return <div>{name}</div>;
}

function Header({ addTodo }) {
  return (
    <div>
      <h3>Goals and Dreams</h3>
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
    // todo
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
            />
          );
        })}
      </div>
    );
  }
}
