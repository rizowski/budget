import React from 'react';
import request from '../../../lib/request';

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
      this.setState({ [thing]: event.target.value });
    };
  }

  handleObjectiveChange(index, key) {
    return event => {
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

  handleSubmit(event) {
    event.preventDefault();
    const { name, amount, categoryId, objectives } = this.state;
    const payload = {
      name,
      amount: Number(amount),
      categoryId,
      objectives,
    };

    return request.createGoal(payload);
  }

  createObjectives() {
    return this.state.objectives.map((o, index) => {
      return (
        <div key={index} className="row valign">
          <div className="col-4">
            Amount:
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input type="text" onChange={this.handleObjectiveChange(index, 'amount')} className="form-control" placeholder="10" />
              <div className="input-group-append">
                <span className="input-group-text">.00</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            Max Per Paycheck:
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input type="text" onChange={this.handleObjectiveChange(index, 'maxPerPaycheck')} className="form-control" placeholder="10" />
              <div className="input-group-append">
                <span className="input-group-text">.00</span>
              </div>
            </div>
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
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input type="text" onChange={this.handleChange('amount')} className="form-control" placeholder="55" />
            <div className="input-group-append">
              <span className="input-group-text">.00</span>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                Category
              </label>
            </div>
            <select className="custom-select" id="inputGroupSelect01" onChange={this.handleChange('categoryId')}>
              <option disabled defaultValue>
                Select One
              </option>
              {this.getCategories()}
            </select>
          </div>
        </div>
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
