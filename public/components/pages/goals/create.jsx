import React from 'react';
import get from 'lodash.get';
import request from '../../../lib/request';
import Input from '../../inputs/input';
import SelectInput from '../../inputs/select';

class CreateGoals extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleObjectiveChange = this.handleObjectiveChange.bind(this);
    this.handleAddObjective = this.handleAddObjective.bind(this);

    this.state = {
      categories: [],
      objectives: [],
    };
  }

  get options() {
    return this.state.categories.map(c => {
      return { id: c.id, value: c.name };
    });
  }

  get typeOptions() {
    return [
      {
        id: 'SAVINGS',
        value: 'Savings',
      },
      {
        id: 'BILL',
        value: 'Bill',
      },
      {
        id: 'LOAN',
        value: 'Loan',
      },
    ];
  }

  async componentDidMount() {
    const { data } = await request.getCategories();

    this.setState({ categories: data.getCategories });
  }

  handleChange(key) {
    return event => {
      const value = get(event, 'target.value', event);
      this.setState({ [key]: value });

      this.props.handleChange({
        key,
        value,
      });
    };
  }

  handleObjectiveChange(index, key) {
    return event => {
      const value = get(event, 'target.value', event);
      const { objectives: oldObjectives } = this.state;
      const objectives = oldObjectives.map((o, currentIndex) => {
        if (currentIndex !== index) return o;
        return { ...o, [key]: Number(value) };
      });

      this.handleChange('objectives')(objectives);
    };
  }

  handleAddObjective() {
    this.setState(old => {
      return {
        objectives: old.objectives.concat({ amount: '', maxPerPaycheck: '' }),
      };
    });
  }

  removeObjective(index) {
    return () => {
      this.setState(old => {
        return {
          objectives: old.objectives.filter((_, i) => i !== index),
        };
      });
    };
  }

  createObjectives() {
    return this.state.objectives.map((o, index) => {
      return (
        <div key={index} className="row valign">
          <div className="col-2">
            <i className="far fa-minus-square fa-2x" onClick={this.removeObjective(index)} />
          </div>
          <div className="col-5">
            <Input id={`${o.id}${index}-amount`} type="number" label="Amount" handleChange={this.handleObjectiveChange(index, 'amount')} placeholder="10.00" />
          </div>
          <div className="col-5">
            <Input
              id={`${o.id}${index}-mpp`}
              type="number"
              label="Max Per Paycheck"
              handleChange={this.handleObjectiveChange(index, 'maxPerPaycheck')}
              placeholder="5.00"
            />
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <Input id="goalName" label="Goal Name" handleChange={this.handleChange('name')} placeholder="Dog" />
        <br />
        <Input id="galAmount" type="money" label="Current Amount" handleChange={this.handleChange('amount')} placeholder="55" />
        <br />
        <SelectInput id="goalCategory" label="Category" options={this.options} handleChange={this.handleChange('categoryId')} />
        <br />
        <SelectInput id="goalType" label="Type" options={this.typeOptions} handleChange={this.handleChange('type')} />
        <br />
        <h5>Goal Objectives</h5>
        <a className="btn btn-info" role="button" onClick={this.handleAddObjective}>
          <i className="fas fa-plus" />
        </a>
        {this.createObjectives()}
      </div>
    );
  }
}

export default CreateGoals;
