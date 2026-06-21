const trainStations = [
    { name: "Delhi", distance: 0 },
    { name: "Ghaziabad", distance: 20 },
    { name: "Meerut", distance: 70 },
    { name: "Muzaffarnagar", distance: 130 },
    { name: "Roorkee", distance: 180 },
    { name: "Haridwar", distance: 210 },
    { name: "Dehradun", distance: 260 }
];

const SourceSelect = document.getElementById("source");
const DestinationSelect = document.getElementById("destination");

// Populate dropdowns
trainStations.forEach(station => {
    SourceSelect.innerHTML += `
        <option value="${station.name}">
            ${station.name}
        </option>
    `;

    DestinationSelect.innerHTML += `
        <option value="${station.name}">
            ${station.name}
        </option>
    `;
});

function findRoute() {

    let Source = SourceSelect.value;
    let Destination = DestinationSelect.value;

    if (Source === "" || Destination === "") {
        alert("Please select both stations");
        return;
    }

    if (Source === Destination) {
        alert("Source & Destination can't be same");
        return;
    }

    let sourceIndex = trainStations.findIndex(
        station => station.name === Source
    );

    let destinationIndex = trainStations.findIndex(
        station => station.name === Destination
    );

    if (sourceIndex === -1 || destinationIndex === -1) {
        alert("Station not found");
        return;
    }

    let route = [];

    if (sourceIndex < destinationIndex) {

        for (let i = sourceIndex; i <= destinationIndex; i++) {
            route.push(trainStations[i].name);
        }

    } else {

        for (let i = sourceIndex; i >= destinationIndex; i--) {
            route.push(trainStations[i].name);
        }
    }

    let totalStations = route.length - 1;

    // Calculate distance
    let distance = Math.abs(
        trainStations[destinationIndex].distance -
        trainStations[sourceIndex].distance
    );

    // Calculate travel time (assuming 60 km/h)
    let travelTime = (distance / 60).toFixed(1);

    let fare;

    if (totalStations <= 2) {
        fare = 100;
    } else if (totalStations <= 4) {
        fare = 200;
    } else {
        fare = 350;
    }

    displayResult(route, totalStations, fare, travelTime, distance);
}

function displayResult(route, stations, fare, time, distance) {

    let html = `
    <div class="result-box">

        <h2>📋 Journey Information</h2>

        <div class="info-grid">

            <div class="info">
                <span class="label">Estimated Fare</span>
                <span class="value">₹${fare}</span>
            </div>

            <div class="info">
                <span class="label">Distance</span>
                <span class="value">${distance} km</span>
            </div>

            <div class="info">
                <span class="label">Travel Time</span>
                <span class="value">${time} Hrs</span>
            </div>

            <div class="info">
                <span class="label">Total Stops</span>
                <span class="value">${stations}</span>
            </div>

        </div>

        <div class="route">
            <h3>🛤️ Route Details</h3>
            <div class="route-track">
    `;

    route.forEach((station, index) => {

        let isEndpoint = index === 0 || index === route.length - 1;

        html += `
        <div class="station ${isEndpoint ? "endpoint" : ""}">
            <span class="dot"></span> ${station}
        </div>
        `;

        if (index !== route.length - 1) {
            html += `
            <div class="arrow">⬇️</div>
            `;
        }
    });

    html += `
            </div>
        </div>
    </div>
    `;

    document.getElementById("output").innerHTML = html;

    document.getElementById("output").scrollIntoView({ behavior: "smooth", block: "nearest" });
}
