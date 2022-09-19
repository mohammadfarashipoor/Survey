import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";

let countselct = [0, 0, 0, 0];
const PieChartDemo = (props) => {
  const [recdata, setRecData] = useState(props.recdata);
  const [numchart, setNumChart] = useState(0);
  useEffect(() => {
    setRecData(props.recdata);
    counterdata(recdata, numchart);
  }, [props.recdata]);

  const counterdata = (data, question) => {
    if (data !== []) {
      for (let i = 1; i < data.length; i++) {
        if (data[i][question].item !== undefined) {
          if (data[i][question].item === "نمی دانم🗿") {
            countselct[3] = countselct[3] + 1;
          }
          if (data[i][question].item === "ضعیف") {
            countselct[2] = countselct[2] + 1;
          }
          if (data[i][question].item === "متوسط") {
            countselct[1] = countselct[1] + 1;
          }
          if (data[i][question].item === "خوب") {
            countselct[0] = countselct[0] + 1;
          }
        }
      }
    }
  };
  const [chartData, setChartData] = useState({
    labels: ["A", "B", "C", "D"],
    datasets: [
      {
        data: countselct,
        backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726", "#DE3163"],
        hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D", "#DE3163"]
      }
    ]
  });

  const [lightOptions] = useState({
    plugins: {
      legend: {
        labels: {
          color: "#495057"
        }
      }
    }
  });
  useEffect(() => {
    setChartData({
      labels: ["خوب", "متوسط", "ضعیف", "نمی دانم"],
      datasets: [
        {
          data: countselct,
          backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726", "#DE3163"],
          hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D", "#DE3163"]
        }
      ]
    });
  }, [countselct]);
  return (
    <div className="card justify-content-center">
      <p className="text-xl">{props.data[numchart].tittle}</p>
      <div className="card flex align-items-center justify-content-center">
        <Button
          className="p-button-rounded h-3rem text-lg p-button-outlined border-pink-300"
          aria-label="Submit"
          onClick={() => {
            countselct = [0, 0, 0, 0];
            setNumChart(
              numchart < Object.keys(props.recdata[0]).length - 2
                ? numchart + 1
                : numchart
            );
            counterdata(recdata, numchart);
          }}
        >
          {"<"}
        </Button>

        <Chart
          type="pie"
          data={chartData}
          options={lightOptions}
          style={{ position: "relative", width: "40%" }}
        />
        <Button
          className="p-button-rounded h-3rem text-lg p-button-outlined"
          aria-label="Submit"
          onClick={() => {
            countselct = [0, 0, 0, 0];
            setNumChart(numchart === 0 ? numchart : numchart - 1);
            counterdata(recdata, numchart);
          }}
        >
          {">"}
        </Button>
      </div>
      {numchart === Object.keys(props.recdata[0]).length - 2 && (
        <p className="text-xl">ممنون که در این نظرسنجی شرکت کردید</p>
      )}
    </div>
  );
};
export default PieChartDemo;
