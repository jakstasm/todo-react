import React, { useState } from "react";
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
        type="text"
        value={name}
        placeholder="Insert task name"
        onChange={(e) => updateName(e.target.value, idx)}
      />
      <button onClick={() => removeTodo(idx)}>-</button>
      <br />
      <input
        placeholder="Insert description"
        type="text"
        onChange={(e) => {
          updateDescription(e.target.value, idx);
        }}
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

export default function Container() {
  const [list, setList] = useState([]);

  function addTodo() {
    const newTodo = {
      id: shortid.generate(),
      name: "",
      description: "",
    };
    setList([...list, newTodo]);
  }

  function removeTodo(idx) {
    setList(list.filter((_, thisIdx) => thisIdx !== idx));
  }

  /**
   * The bug here has to do with "value vs reference" issues and how React determines whether it should re-render.
   * Note sure if you remember that I said the pattern I set up in the Class component within this method wasn't ideal.
   * This bug is the reason I was worried of the pattern I set up there, only if you decided to go a different route.
   * Class components and Functional components work a bit differently in this regard.
   *
   * Just know that this is a way to fix it,
   * and that you can research "javascript value vs reference"
   * to start understanding a bit better the change I made.
   *
   *
   * Following this pattern will work as well to fix the updateDescription() function.
   */
  function updateName(name, idx) {
    const newList = [...list];
    const newItem = list[idx];

    newItem.name = name;
    newList[idx] = newItem;

    setList(newList);
  }

  function updateDescription(description, idx) {
    list[idx].description = description;
    setList(list);

    console.log(list);
  }

  return (
    <div>
      <Header addTodo={addTodo} />
      {list.map((item, idx) => {
        return (
          <TodoItem
            idx={idx}
            key={item.id}
            name={item.name}
            description={item.description}
            removeTodo={removeTodo}
            updateName={updateName}
            updateDescription={updateDescription}
          />
        );
      })}
    </div>
  );
}

/* export default class Container extends React.Component {
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

*/
