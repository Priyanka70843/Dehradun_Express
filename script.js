const trainStations = [
    "Delhi",
    "Ghaziabad",
    "Meerut",
    "Muzaffarnagar",
    "Roorkee",
    "Haridwar",
    "Dehradun"
];

const SourceSelect = document.getElementById("source");
const DestinationSelect = document.getElementById("destination");


trainStations.forEach(station => {
    SourceSelect.innerHTML += `
        <option value="${station}">
            ${station}
        </option>
    `;

    DestinationSelect.innerHTML += `
        <option value="${station}">
            ${station}
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

    let sourceIndex = trainStations.indexOf(Source);
    let destinationIndex = trainStations.indexOf(Destination);

    if (sourceIndex === -1 || destinationIndex === -1) {
        alert("Station not found");
        return;
    }

    let route = [];

    if (sourceIndex < destinationIndex) {

        for (let i = sourceIndex; i <= destinationIndex; i++) {
            route.push(trainStations[i]);
        }

    } else {

        for (let i = sourceIndex; i >= destinationIndex; i--) {
            route.push(trainStations[i]);
        }
    }

    let totalStations = route.length - 1;

    let fare;

    if (totalStations <= 2) {
        fare = 100;
    }
    else if (totalStations <= 4) {
        fare = 200;
    }
    else {
        fare = 350;
    }

    let travelTime = totalStations * 50;

    displayResult(route, totalStations, fare, travelTime);
}

function displayResult(route, stations, fare, time) {

    let html = `
    <div class="result-box">

        <h2>Journey Information</h2>

        <div class="info">
            <b>Estimated Fare :</b> ₹${fare}
        </div>

        <div class="info">
            <b>Travel Time :</b> ${time} Minutes
        </div>

        <div class="info">
            <b>Total Stops :</b> ${stations}
        </div>

        <div class="route">
            <h3>Route Details</h3>
    `;

    route.forEach((station, index) => {

        html += `
        <div class="station">
            ${station}
        </div>
        `;

        if (index !== route.length - 1) {

            html += `
            <div class="arrow">
                ⬇️
            </div>
            `;
        }
    });

    html += `
        </div>

    </div>
    `;

    document.getElementById("output").innerHTML = html;
}