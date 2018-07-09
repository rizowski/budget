import React from 'react';
import groupBy from 'lodash.groupby';
import request from '../../lib/request';
import Table from '../table';
import Page from './page';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: [],
      loans: [],
      income: [],
      headers: [
        { path: 'priority', header: 'Priority' },
        { path: 'name', header: 'Goal' },
        { path: 'amount', header: 'Current Amount' },
        { path: 'objective', header: 'Max Per Paycheck' },
        { path: 'budgetAmount', header: 'Budget' },
        { path: 'runningTotal', header: 'Total' },
      ],
    };
  }

  get categoryPercentages() {
    const things = groupBy(this.state.goals, 'category');
    const result = Object.entries(things).map(([category, goals]) => {
      return { name: category, value: goals.reduce((num, goal) => (num += goal.amount), 0) };
    });
    return result;
  }

  get loanPercentages() {
    return this.state.loans.map(l => {
      return {
        name: l.name,
        value: l.currentAmount,
      };
    });
  }

  get tableData() {
    const { income, goals } = this.state;
    if (income.length === 0 || goals.length === 0) {
      return [];
    }
    const [lastIncome] = income;
    const { amount: incomeAmount } = lastIncome;
    let runningTotal = incomeAmount;
    return goals.map(g => {
      const canBudget = income !== 0 && g.objective.amount !== 0 && runningTotal > 0;
      let budgetAmount = 0;
      if (canBudget) {
        const amount = runningTotal - g.objective.maxPerPaycheck;
        if (amount < 0) {
          budgetAmount = runningTotal;
        } else {
          budgetAmount = g.objective.maxPerPaycheck;
        }
      }
      runningTotal -= budgetAmount;
      return { priority: g.priority, name: g.name, amount: g.amount, objective: g.objective.maxPerPaycheck, budgetAmount, runningTotal };
    });
  }

  async componentDidMount() {
    const { data: goalData } = await request.getGoals();
    this.setState({ goals: goalData.getGoals });
    const { data: incomeData } = await request.getIncome();
    this.setState({ income: incomeData.getIncome });
    const { data: loanData } = await request.getLoans();

    this.setState({ loans: loanData.getLoans || [] });
  }

  render() {
    return (
      <Page>
        <Table config={this.state.headers} objects={this.tableData} />
      </Page>
    );
  }
}

export default Home;
