import React from 'react';
import get from 'lodash.get';
import request from '../../../lib/request';
import MoneyInput from '../../inputs/money';
import SelectInput from '../../inputs/select';

class CreateGoals extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleObjectiveChange = this.handleObjectiveChange.bind(this);
    this.handleAddObjective = this.handleAddObjective.bind(this);

    this.state = {
      categories: [],
      objectives: [],
    };
  }

  get options() {
    return this.state.categories.map(c => {
      return { key: c.id, displayValue: c.name };
    });
  }

  async componentDidMount() {
    const { data } = await request.getCategories();

    this.setState({ categories: data.getCategories });
  }

  getCategories() {
    return this.state.categories.map(c => {
      return (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      );
    });
  }

  handleChange(thing) {
    return event => {
      this.setState({ [thing]: get(event, 'target.value', event) });
    };
  }

  handleObjectiveChange(index, key) {
    return event => {
      event.persist();
      this.setState(old => {
        const objectives = old.objectives.map((o, currentIndex) => {
          if (currentIndex !== index) return o;
          return { ...o, [key]: event.target.value };
        });

        return { objectives };
      });
    };
  }

  handleAddObjective() {
    this.setState(old => {
      return {
        objectives: old.objectives.concat({ amount: '', maxPerPaycheck: '' }),
      };
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { name, amount, categoryId, objectives } = this.state;
    const payload = {
      name,
      amount: Number(amount),
      categoryId,
      objectives,
    };

    return this.props.handleSubmit(payload);
  }

  createObjectives() {
    return this.state.objectives.map((o, index) => {
      return (
        <div key={index} className="row valign">
          <div className="col-4">
            Amount:
            <MoneyInput handleChange={this.handleObjectiveChange(index, 'amount')} placeholder="10.00" />
          </div>
          <div className="col-4">
            Max Per Paycheck:
            <MoneyInput handleChange={this.handleObjectiveChange(index, 'maxPerPaycheck')} placeholder="5.00" />
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <form className="shadow-sm p-3 mb-5 bg-white rounded create-goal" onSubmit={this.handleSubmit}>
        <h3>Create Goal</h3>
        <div className="form-group">
          <label htmlFor="goalName">Goal Name</label>
          <input id="goalName" onChange={this.handleChange('name')} type="text" className="form-control" placeholder="My Goal" />
        </div>
        <div className="form-group">
          <label htmlFor="goalAmount">Current Amount</label>
          <MoneyInput handleChange={this.handleChange('amount')} placeholder="55" />
        </div>
        <SelectInput label="Category" options={this.options} handleChange={this.handleChange('categoryId')} />
        <div className="form-group">
          <h5>Goal Objectives</h5>
          <a className="btn btn-info" role="button" onClick={this.handleAddObjective}>
            <i className="fas fa-plus" />
          </a>
          {this.createObjectives()}
        </div>
        <button type="submit" className="btn btn-success">
          Create
        </button>
      </form>
    );
  }
}

export default CreateGoals;
