import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "./css/statistics.css";
const SalesByMonthChart = () => {
  const [salesByMonth, setSalesByMonth] = useState([]);

  useEffect(() => {
    fetch("/api/sales-by-month")
      .then((response) => response.json())
      .then((data) => setSalesByMonth(data))
      .catch((error) => console.error("Error fetching sales by month:", error));
  }, []);

  const generateRandomColor = () => {
    const randomColor = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(
      Math.random() * 256
    )},${Math.floor(Math.random() * 256)})`;
    return randomColor;
  };

  const getMonthData = () => {
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return salesByMonth.map((sale) => {
      return {
        month: months[sale.month - 1],
        total_vendido: sale.total_vendido,
        color: generateRandomColor(),
      };
    });
  };

  const chartData = {
    labels: getMonthData().map((sale) => sale.month),
    datasets: [
      {
        label: "Total Vendido",
        data: getMonthData().map((sale) => sale.total_vendido),
        backgroundColor: getMonthData().map((sale) => sale.color),
        borderColor: getMonthData().map((sale) =>
          sale.color.replace("0.2", "1")
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container centered">
      <h3>Sales by Month</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default SalesByMonthChart;
