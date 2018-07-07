import React from 'react';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#001f3f', '#3D9970', '#FF4136', '#39CCCC'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (percent * 100 < 5) {
    return;
  }

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class PieGraph extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PieChart width={300} height={350}>
        <Legend />
        <Pie data={this.props.data} label={renderCustomizedLabel} labelLine={false} animationDuration={750}>
          {this.props.data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index]} />)}
        </Pie>
      </PieChart>
    );
  }
}

export default PieGraph;
