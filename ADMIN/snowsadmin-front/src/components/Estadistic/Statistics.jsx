import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./css/statistics.css";
import SalesByMonthChart from "./SalesByMoth";

const fetchData = async (endpoint) => {
  const response = await fetch(endpoint);
  return response.json();
};

const Statistics = () => {
  const [salesByDate, setSalesByDate] = useState([]);
  const [salesByDepartment, setSalesByDepartment] = useState([]);
  const [salesBySize, setSalesBySize] = useState([]);
  const [salesByProvider, setSalesByProvider] = useState([]);
  const [salesByBrand, setSalesByBrand] = useState([]);
  const [salesByMonth, setSalesByMonth] = useState([]);

  useEffect(() => {
    fetchData("/api/sales-by-date").then(setSalesByDate);
    fetchData("/api/sales-by-department").then(setSalesByDepartment);
    fetchData("/api/sales-by-size").then(setSalesBySize);
    fetchData("/api/sales-by-provider").then(setSalesByProvider);
    fetchData("/api/sales-by-brand").then(setSalesByBrand);
    fetchData("/api/sales-by-month").then(setSalesByMonth);
  }, []);

  const generateColors = (numColors, alpha) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `hsla(${Math.floor(
        Math.random() * 360
      )}, 100%, 50%, ${alpha})`;
      colors.push(color);
    }
    return colors;
  };

  const isValidDate = (dateStr) => {
    const date = new Date(dateStr);
    return !isNaN(date);
  };

  const formatMonth = (dateStr) => {
    if (isValidDate(dateStr)) {
      const date = new Date(dateStr);
      const month = new Intl.DateTimeFormat("es-ES", { month: "long" }).format(
        date
      );
      const day = date.getDate();
      return `${day} de ${month}`;
    }
    return dateStr; // fallback to original string if invalid date
  };

  const createChartData = (data, labelField, valueField) => {
    const colors = generateColors(data.length, 0.5); // set alpha to 0.5 for transparency
    return {
      labels: data.map((item) => formatMonth(item[labelField])),
      datasets: [
        {
          label: "Total Vendido",
          data: data.map((item) => item[valueField]),
          backgroundColor: colors,
          borderColor: colors.map((color) => color.replace("50%", "40%")),
          borderWidth: 1,
        },
      ],
    };
  };

  const createMonthChartData = (data) => {
    const colors = generateColors(data.length, 0.5); // set alpha to 0.5 for transparency
    return {
      labels: data.map((item) =>
        new Intl.DateTimeFormat("es-ES", { month: "long" }).format(
          new Date(2024, item.month - 1)
        )
      ),
      datasets: [
        {
          label: "Total Vendido",
          data: data.map((item) => item.total_vendido),
          backgroundColor: colors,
          borderColor: colors.map((color) => color.replace("50%", "40%")),
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <div>
      <h2>Estadísticas de Ventas</h2>
      <div className="statistics-container">
        <div className="chart-container">
          <h3>Ventas por Fecha</h3>
          <Pie
            data={createChartData(salesByDate, "fecha", "total_vendido")}
            options={chartOptions}
          />
        </div>
        <div className="chart-container">
          <h3>Ventas por Departamento</h3>
          <Pie
            data={createChartData(salesByDepartment, "nombre", "total_vendido")}
            options={chartOptions}
          />
        </div>
        <div className="chart-container">
          <h3>Ventas por Talla</h3>
          <Pie
            data={createChartData(salesBySize, "nom_talla", "total_vendido")}
            options={chartOptions}
          />
        </div>
        <div className="chart-container">
          <h3>Ventas por Proveedor</h3>
          <Pie
            data={createChartData(
              salesByProvider,
              "name_proveedor",
              "total_vendido"
            )}
            options={chartOptions}
          />
        </div>
        <div className="chart-container centered">
          <h3>Ventas por Marca</h3>
          <Pie
            data={createChartData(salesByBrand, "nom_marca", "total_vendido")}
            options={chartOptions}
          />
        </div>
        <div className="chart-container">
          <SalesByMonthChart />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
