import React from 'react';
import request from '../../../lib/request';

class CreateGoals extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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

  handleObjectives(idx, key) {
    return event => {
      const { objectives } = this.state;
      const objective = objectives[idx] || {};
      objective[key] = event.target.value;
      objectives[idx] = objective;

      return this.setState({ objectives });
    };
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
              <option disabled selected>
                Select One
              </option>
              {this.getCategories()}
            </select>
          </div>
        </div>
        <div className="form-group">
          <h5>Goal Objectives</h5>
          <div className="row border valign">
            <div className="col-1">
              <button type="submit" className="btn btn-info ">
                <i className="fas fa-plus" />
              </button>
            </div>
            <div className="col-4">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input type="text" onChange={this.handleObjectives(0, 'amount')} className="form-control" placeholder="10" />
                <div className="input-group-append">
                  <span className="input-group-text">.00</span>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input type="text" onChange={this.handleObjectives(0, 'maxPerPaycheck')} className="form-control" placeholder="10" />
                <div className="input-group-append">
                  <span className="input-group-text">.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          Create
        </button>
      </form>
    );
  }
}

export default CreateGoals;
