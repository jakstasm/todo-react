import React from "react";
import shortid from "shortid";

/**
 * TODO:
 * - tutorial game: https://flexboxfroggy.com/
 * - learn "flexbox" for css: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 */

function TodoItem({
  idx,
  name,
  description,
  removeTodo,
  updateName,
  updateDescription,
}) {
  return (
    <div>
      <input
        placeholder="Insert task name"
        onChange={(e) => updateName(e.target.value, idx)}
        value={name}
      />
      <button onClick={() => removeTodo(idx)}>-</button>
      <br />
      <input
        placeholder="Insert description"
        onChange={(e) => updateDescription(e.target.value, idx)}
        value={description}
      />
      <br />
      <br />
    </div>
  );
}

function Header({ addTodo }) {
  return (
    <div>
      <h1>Goals and Dreams</h1>
      <button onClick={addTodo}>+</button>
      <br />
      <br />
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
      id: shortid.generate(),
      name: "",
      description: "",
    };
    this.setState({
      list: [...this.state.list, newTodo],
    });
  }

  removeTodo(idx) {
    this.setState({
      list: this.state.list.filter((_, thisIdx) => thisIdx !== idx),
    });
  }

  updateName(name, idx) {
    const { list } = this.state;
    list[idx].name = name;
    this.setState({ list });
  }

  updateDescription(description, idx) {
    const { list } = this.state;
    list[idx].description = description;
    this.setState({ list });
  }

  render() {
    return (
      <div>
        <Header addTodo={this.addTodo} />
        {this.state.list.map((item, idx) => {
          return (
            <TodoItem
              idx={idx}
              key={item.id}
              name={item.name}
              description={item.description}
              removeTodo={this.removeTodo}
              updateName={this.updateName}
              updateDescription={this.updateDescription}
            />
          );
        })}
      </div>
    );
  }
}
