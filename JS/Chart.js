const token = localStorage.getItem("authToken");
if (!token) {
  window.location.href = "home.html"
}

function showGraph() {
  const ctx = document.getElementById("myChart");

  fetch("http://localhost:8080/ticket/data", {
    headers: {
      "Authorization": token
    }
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          return Promise.reject(data);
        });
      }
      return response.json();
    })
    .then((result) => {
      let delayed;
      const config = {
        type: "bar",
        data: {
          datasets: Object.entries(result).map(([key, value]) => {
            return {
              borderWidth: 2,
              label: key.toUpperCase(),
              data: value,
              parsing: {
                xAxisKey: "date",
                yAxisKey: "count",
              },
              borderWidht: 1,
            };
          }),
        },
        options: {
          animation: {
            onComplete: () => {
              delayed = true;
            },
            delay: (context) => {
              let delay = 0;
              if (
                context.type === "data" &&
                context.mode === "default" &&
                !delayed
              ) {
                delay = context.dataIndex * 300 + context.datasetIndex * 100;
              }
              return delay;
            },
          },
          responsive: true,
          aspectRatio: 0,
          plugins: {
            legend: {
              position: "top",
            },
          },
          scales: {
            y: {
              ticks: {
                stepSize: 1, // Forces whole-number steps
                precision: 0, // Ensures no decimal places
              },
              title: {
                display: true,
                text: "Tickets",
                font: {
                  size: 20,
                  weight: "bold",
                },
              },
            },
            x: {
              title: {
                display: true,
                text: "Months",
                font: {
                  size: 20,
                  weight: "bold",
                },
              },
            },
          },
        },
      };
      new Chart(ctx, config);
    })
    .catch((error) => {
      window.location.href = "home.html"
    });
}
showGraph();
