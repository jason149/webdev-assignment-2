async function fetchPopulationData() {
    try {
        const response = await fetch("https://datausa.io/api/data?drilldowns=Nation&measures=Population");
        const data = await response.json();
        const tableBody = document.querySelector("#population-table tbody");
        const loadingText = document.getElementById("loading");
        
        loadingText.style.display = "none";
        data.data.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));

        data.data.forEach(entry => {
            const row = document.createElement("tr");
            row.innerHTML = `<td><strong>${entry.Year}</strong></td><td>${entry.Population.toLocaleString()}</td>`;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching population data:", error);
        document.getElementById("loading").innerText = "Failed to load data.";
        document.getElementById("loading").style.color = "red";
    }
}

fetchPopulationData();
