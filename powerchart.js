<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Power vs Time Chart</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <h2>Power vs Time Chart</h2>
    <canvas id="powerTimeChart" width="800" height="400"></canvas>

    <script>
        // Google Sheets API settings
        const SHEET_ID = '1Nv-Y5wb-ko_shHumbrZJyT-sjoGwc8ccDsgDeqCbKtc';
        const RANGE = 'Sheet1!A:B';  // Adjust range as needed
        const API_KEY = 'YOUR_GOOGLE_SHEETS_API_KEY';

        // Fetch data from Google Sheets
        async function fetchSheetData() {
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            return data.values;
        }

        // Process data and set up the chart
        async function createChart() {
            const sheetData = await fetchSheetData();
            
            // Split data into time and power arrays
            const labels = [];
            const powerData = [];
            
            sheetData.forEach((row, index) => {
                if (index !== 0) {  // Skip header row
                    labels.push(row[0]); // Assuming time is in the first column
                    powerData.push(parseFloat(row[1])); // Assuming power is in the second column
                }
            });

            // Create the chart
            const ctx = document.getElementById('powerTimeChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Power (W)',
                        data: powerData,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Time'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Power (W)'
                            },
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        createChart();
    </script>
</body>
</html>
