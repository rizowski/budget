import React from 'react';
import request from '../../../lib/request';

class CreateCategory extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddPriority = this.handleAddPriority.bind(this);
    this.state = {
      priorities: [],
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, priorities } = this.state;
    const payload = {
      name,
      priorities,
    };

    return request.createCategory(payload);
  }

  handleChange(key) {
    return event => {
      this.setState({ [key]: event.target.value });
    };
  }

  handlePriorityChange(index) {
    return event => {
      this.setState(old => {
        const priorities = old.priorities.map((p, nindex) => {
          if (index !== nindex) return p;
          return Number(event.target.value);
        });

        return {
          priorities,
        };
      });
    };
  }

  handleAddPriority() {
    this.setState(oldState => {
      return {
        priorities: oldState.priorities.concat(1),
      };
    });
    // this.setState({ priorities: this.state.priorities.concat(1) });
  }

  createPriorities() {
    return this.state.priorities.map((p, i) => {
      const priorityText = `Priority ${i + 1}:`;
      return (
        <div key={i} className="row">
          <div className="col">
            {priorityText}
            <input id={`cat-priority-${i}`} onChange={this.handleChange('priority')} type="text" className="form-control" placeholder="1" />
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <form className="shadow-sm p-3 mb-5 bg-grey rounded create-category" onSubmit={this.handleSubmit}>
        <h3>Create Category</h3>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name</label>
          <input id="categoryName" onChange={this.handleChange('name')} type="text" className="form-control" placeholder="Emergency" />
        </div>
        <div className="form-group">
          <h5>Category Priorities</h5>
          <a className="btn btn-info" role="button" onClick={this.handleAddPriority}>
            <i className="fas fa-plus" />
          </a>
          {this.createPriorities()}
        </div>
        <button type="submit" className="btn btn-success">
          Create
        </button>
      </form>
    );
  }
}

export default CreateCategory;
