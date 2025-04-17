// Load the JSON and build the table
let allData =[];

fetch("/static/frontend_data.json")
    .then(response=> response.json())
    .then(data => {
        allData = data; //store full dataset
        
        //populate filter dropdown
        const categories = [...new Set(data.map(row => row.category))]; //unique categories
        const filterSelect = document.getElementById("category-filter");

        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            filterSelect.appendChild(option);

        });

        //Initial table render
        renderTable(data);
        renderChart(data);

        filterSelect.addEventListener("change", (event) => {
            const selected = event.target.value;
          
            // Apply filter
            const filtered = selected === "All"
              ? allData
              : allData.filter(row => row.category === selected);
          
            // Update both table and chart
            renderTable(filtered);
            renderChart(filtered);
          });
             
        
    })
.catch(error => console.error("Error loading data:", error));



function renderTable(data){
    const tableHead = document.querySelector("#data-table thead");
    const tablebody = document.querySelector("#data-table tbody");
    
    //create a header row
    const headers = Object.keys(data[0]);
    tableHead.innerHTML = "<tr>" + headers.map(h => `<th>${h}</th>`).join("") + "</tr>";

    //create data rows
    tablebody.innerHTML = data.map(row =>{
        return "<tr>" + headers.map(h => `<td>${row[h]}</td>`).join("")+"</tr>";

    }).join("");
}

function renderChart(data){
    const totals = {};

    //Aggregate revenue by category
    data.forEach(row => {
        if(!totals[row.category]){
            totals[row.category] = 0;
        }
        totals[row.category] += row.revenue;
    });
    const ctx = document.getElementById("revenueChart").getContext("2d");

    //Destroy existing chart if needed (chart.js limitation)
    if (window.revenueChart instanceof Chart) {
        window.revenueChart.destroy();
    }

    window.revenueChart = new Chart(ctx, {
        type:"bar",
        data:{
            labels: Object.keys(totals),
            datasets:[{
                label:"Revenue by Category",
                data: Object.values(totals),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }]
        },
        options:{
            responsive:true,
            scales:{
                y:{beginAtZero: true}
            }
        }
    });
}


document.getElementById("generate-report").addEventListener("click", () => {
    fetch("/generate-report", {method: "POST"})
    .then(res => res.text())
    .then(msg =>{
        document.getElementById("report-status").textContent =msg;
    })
    .catch(err =>{
        console.error(err);
        document.getElementById("report-status").textContent ="Failed to generate report.";

    });
});
    