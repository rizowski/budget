import React from 'react';
import get from 'lodash.get';

import Input from '../../inputs/input';

class CreateCategory extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddPriority = this.handleAddPriority.bind(this);
    this.state = {
      priorities: [],
    };
  }

  handleChange(key) {
    return event => {
      this.props.handleChange({
        key,
        value: get(event, 'target.value', event),
      });
    };
  }

  handlePriorityChange(index) {
    return value => {
      const { priorities: oldPriorities } = this.state;
      const newPriorities = oldPriorities.map((p, nindex) => {
        if (index !== nindex) return p;
        return Number(value);
      });

      this.handleChange('priorities')(newPriorities);
    };
  }

  handleAddPriority() {
    this.setState(oldState => {
      return {
        priorities: oldState.priorities.concat(1),
      };
    });
  }

  get priorities() {
    return this.state.priorities.map((p, i) => {
      const priorityText = `Priority ${i + 1}:`;
      return (
        <div key={i} className="row">
          <div className="col">
            <Input id={`cat-priority-${i}`} label={priorityText} type="number" handleChange={this.handlePriorityChange(i)} placeholder="1" />
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <Input id="categoryName" label="Category Name" handleChange={this.handleChange('name')} placeholder="Emergency" />
        <br />

        <div className="form-group">
          <h5>Category Priorities</h5>
          <a className="btn btn-info" role="button" onClick={this.handleAddPriority}>
            <i className="fas fa-plus" />
          </a>
          {this.priorities}
        </div>
      </div>
    );
  }
}

export default CreateCategory;
