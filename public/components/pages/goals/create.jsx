import React from 'react';
import request from '../../../lib/request';
import ObjectivesInput from './objectives-input';

class CreateGoals extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      categories: [],
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

  handleSubmit(event) {
    event.preventDefault();
    const { name, amount, categoryId } = this.state;
    const payload = {
      name,
      amount: Number(amount),
      categoryId,
    };

    return request.createGoal(payload);
  }

  render() {
    return (
      <form className="shadow p-3 mb-5 bg-white rounded center create-goal" onSubmit={this.handleSubmit}>
        <h3>Create Goal</h3>
        <div className="form-group">
          <label htmlFor="goalName">Goal Name</label>
          <input id="goalName" onChange={this.handleChange('name')} type="text" className="form-control" placeholder="My Goal" />
        </div>
        <div className="form-group">
          <label htmlFor="goalAmount">Target Amount</label>
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
          <ObjectivesInput />
        </div>
        <button type="submit" className="btn btn-success float-right">
          Create
        </button>
      </form>
    );
  }
}

export default CreateGoals;
