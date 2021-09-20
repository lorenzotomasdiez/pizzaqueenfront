import React from 'react'
import { Bar } from 'react-chartjs-2'
import "./BarChart.css"
const BarChart = () => {
    const data = {
        labels: ['Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo', 'Lunes'],
        datasets: [
          {
            label: 'Pizzas de la Semana',
            data: [8, 2, 10, 5, 2, 9],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
      
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
    };
    const average = 8
    return (
        <div className="barchart-root">
            <h3>Promedio Semanal = {average}</h3>
            <div className="barchart-child">
                <Bar data={data} options={options} height={300} width={1335}/>
            </div>
        </div>
    )
}

export default BarChart
