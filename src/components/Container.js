import React from "react";
import shortid from "shortid";

function TodoItem({
  idx,
  name,
  description,
  removeTodo,
  updateName,
  updateDescription,
}) {
  return (
    <div className="item">
      <input
        className="item-name"
        placeholder="Task name"
        onChange={(e) => updateName(e.target.value, idx)}
        value={name}
      />
      <button className="item-button" onClick={() => removeTodo(idx)}>
        –
      </button>

      <textarea
        type="textarea"
        className="item-description"
        placeholder="Add description"
        onChange={(e) => updateDescription(e.target.value, idx)}
        value={description}
      />
    </div>
  );
}

function Header({ addTodo }) {
  return (
    <div className="Header">
      <h1>Goals and Dreams</h1>
      <button className="header-button" onClick={addTodo}>
        +
      </button>
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
        <main className="content">
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
        </main>
      </div>
    );
  }
}
