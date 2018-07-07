import React from 'react';
import groupBy from 'lodash.groupby';
import PieChart from '../graphs/pie';
import request from '../../lib/request';
import Table from '../table';
import finance from '../../lib/finance';
import Page from './page';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: [],
      loans: [],
      income: [],
      headers: ['Priority', 'Goal', 'Current Amount', 'Max Per Paycheck', 'Budget', 'Total'],
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
      return [g.priority, g.name, g.amount, g.objective.maxPerPaycheck, budgetAmount, runningTotal];
    });
  }

  async componentDidMount() {
    const { data: goalData } = await request.getGoals();
    this.setState({ goals: goalData.getGoals });
    const { data: incomeData } = await request.getIncome();
    this.setState({ income: incomeData.getIncome });
    const { data: loanData } = await request.getLoans();

    this.setState({ loans: loanData.getLoans });
  }

  render() {
    return <Page>{/* <Table headers={this.state.headers} data={this.tableData} /> */}</Page>;
  }
}

export default Home;
