import React from 'react';
import { Bar } from 'react-chartjs-2';

const ChartComponent = ({ students }) => {
  const data = {
    labels: students.map((student) => student.name),
    datasets: [
      {
        label: 'Total Points',
        data: students.map((student) => student.totalPoints),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} />;
};

export default ChartComponent;
