let cpuChart, memoryChart;
const timePeriod = 120000; // 2 minutes in milliseconds
const interval = 3000; // Update interval in milliseconds

function roundToNearest(num, nearest) {
    return Math.round(num / nearest) * nearest;
}

function updateCharts() {
fetch('//api.lunauwu.net/system_details')
.then(response => response.json())
.then(data => {
    document.getElementById('cpu-usage').textContent = data.cpu_percent.toFixed(2);


    // Display used memory in gigabytes and total memory
    const usedMemoryGB = data.memory.used_gb.toFixed(2);
    const totalMemoryGB = data.memory.total_gb.toFixed(2);

    document.getElementById('memory-usage').textContent = usedMemoryGB;
    document.getElementById('total-memory').textContent = totalMemoryGB;

            // Calculate dynamic maximum value for CPU and Memory charts
            const cpuMaxValue = Math.ceil(data.cpu_percent);
            const memoryMaxValue = Math.ceil(data.memory.percent);

            // Round maximum values to the nearest 10
            const cpuStepSize = 10;
            const memoryStepSize = 10;
            const cpuMaxRounded = roundToNearest(cpuMaxValue, cpuStepSize);
            const memoryMaxRounded = roundToNearest(memoryMaxValue, memoryStepSize);

            // Initialize or update CPU chart
            if (cpuChart) {
                cpuChart.data.datasets[0].data.push(data.cpu_percent);
                cpuChart.data.labels.push(new Date().toLocaleTimeString());
                cpuChart.options.scales.y.suggestedMax = cpuMaxRounded;
                cpuChart.options.scales.y.stepSize = cpuStepSize;
                cpuChart.update();
            } else {
                cpuChart = new Chart(document.getElementById('cpu-chart').getContext('2d'), {
                    type: 'line',
                    data: {
                        labels: [new Date().toLocaleTimeString()],
                        datasets: [{
                            label: 'Percentage',
                            data: [data.cpu_percent],
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                            fill: false
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                suggestedMax: cpuMaxRounded,
                                stepSize: cpuStepSize
                            }
                        }
                    }
                });
            }
    // Initialize or update Memory chart
    if (memoryChart) {
        memoryChart.data.datasets[0].data.push(usedMemoryGB);
        memoryChart.data.labels.push(new Date().toLocaleTimeString());
        memoryChart.update();
    } else {
        memoryChart = new Chart(document.getElementById('memory-chart').getContext('2d'), {
            type: 'line',
            data: {
                labels: [new Date().toLocaleTimeString()],
                datasets: [{
                    label: 'Memory Usage (GB)',
                    data: [usedMemoryGB],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

// Update drives
const drivesList = document.getElementById('drives');
drivesList.innerHTML = '';
for (const [drive, info] of Object.entries(data.drives)) {
    const driveItem = document.createElement('li');
    driveItem.innerHTML = `
        <div>${drive} - Used: ${info.used} GB, Free: ${info.free} GB</div>
        <div class="progress">
            <div class="progress-bar" style="width: ${info.percent}%;">${info.percent}%</div>
        </div>
    `;
    drivesList.appendChild(driveItem);
}
            // Remove old data points
            if (cpuChart.data.datasets[0].data.length > timePeriod / interval) {
                cpuChart.data.datasets[0].data.shift();
                cpuChart.data.labels.shift();
            }

            if (memoryChart.data.datasets[0].data.length > timePeriod / interval) {
                memoryChart.data.datasets[0].data.shift();
                memoryChart.data.labels.shift();
            }
        });
}

updateCharts();
setInterval(updateCharts, interval);