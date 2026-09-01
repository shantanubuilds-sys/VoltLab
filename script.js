/* =========================
   DAY 1 + DAY 2
   OHM'S LAW VISUALIZER
========================= */


// INPUT SLIDERS

const voltageSlider =
    document.getElementById("voltage");

const resistanceSlider =
    document.getElementById("resistance");


// MAIN DISPLAY VALUES

const voltageValue =
    document.getElementById("voltageValue");

const resistanceValue =
    document.getElementById("resistanceValue");

const currentValue =
    document.getElementById("currentValue");


// LIVE CIRCUIT VALUES

const circuitVoltage =
    document.getElementById("circuitVoltage");

const circuitResistance =
    document.getElementById("circuitResistance");

const circuitCurrent =
    document.getElementById("circuitCurrent");


// CIRCUIT VISUALS

const bulb =
    document.getElementById("bulb");

const circuitStatus =
    document.getElementById("circuitStatus");

const electrons =
    document.querySelectorAll(".electron");


// CALCULATE OHM'S LAW

function calculateCurrent() {


    // GET VALUES

    const voltage =
        Number(voltageSlider.value);

    const resistance =
        Number(resistanceSlider.value);


    // OHM'S LAW

    const current =
        voltage / resistance;


    // UPDATE MAIN DISPLAY

    voltageValue.textContent =
        voltage;

    resistanceValue.textContent =
        resistance;

    currentValue.textContent =
        current.toFixed(2);


    // UPDATE LIVE CIRCUIT

    circuitVoltage.textContent =
        voltage;

    circuitResistance.textContent =
        resistance;

    circuitCurrent.textContent =
        current.toFixed(2);


    // BULB BRIGHTNESS

    let brightness =
        1 + current / 2;


    if (brightness > 3) {

        brightness = 3;

    }


    bulb.style.filter =
        `brightness(${brightness})`;


    // CURRENT FLOW SPEED

    let speed =
        3 - current / 5;


    if (speed < 0.4) {

        speed = 0.4;

    }


    electrons.forEach(function (electron) {

        electron.style.animationDuration =
            `${speed}s`;

    });


    // CIRCUIT STATUS

    if (current < 0.5) {

        circuitStatus.textContent =
            "Very low current 💤";

    }

    else if (current < 2) {

        circuitStatus.textContent =
            "Low current ⚡";

    }

    else if (current < 5) {

        circuitStatus.textContent =
            "Circuit running normally ⚡";

    }

    else {

        circuitStatus.textContent =
            "High current ⚠️";

    }

}


// EVENT LISTENERS

voltageSlider.addEventListener(
    "input",
    calculateCurrent
);


resistanceSlider.addEventListener(
    "input",
    calculateCurrent
);


// RUN ON PAGE LOAD

calculateCurrent();



/* =========================
   DAY 3
   SERIES CIRCUIT EXPLORER
========================= */


// INPUT ELEMENTS

const seriesVoltage =
    document.getElementById("seriesVoltage");

const r1 =
    document.getElementById("r1");

const r2 =
    document.getElementById("r2");

const r3 =
    document.getElementById("r3");


// VALUE DISPLAYS

const seriesVoltageValue =
    document.getElementById("seriesVoltageValue");

const r1Value =
    document.getElementById("r1Value");

const r2Value =
    document.getElementById("r2Value");

const r3Value =
    document.getElementById("r3Value");


// RESULT DISPLAYS

const totalResistance =
    document.getElementById("totalResistance");

const seriesCurrent =
    document.getElementById("seriesCurrent");

const voltageDrop1 =
    document.getElementById("voltageDrop1");

const voltageDrop2 =
    document.getElementById("voltageDrop2");

const voltageDrop3 =
    document.getElementById("voltageDrop3");


// CALCULATE SERIES CIRCUIT

function calculateSeriesCircuit() {


    // GET USER VALUES

    const voltage =
        Number(seriesVoltage.value);

    const resistor1 =
        Number(r1.value);

    const resistor2 =
        Number(r2.value);

    const resistor3 =
        Number(r3.value);


    // TOTAL RESISTANCE

    const total =
        resistor1 +
        resistor2 +
        resistor3;


    // SAME CURRENT FLOWS
    // THROUGH SERIES CIRCUIT

    const current =
        voltage / total;


    // VOLTAGE DROP
    // V = I × R

    const drop1 =
        current * resistor1;

    const drop2 =
        current * resistor2;

    const drop3 =
        current * resistor3;


    // UPDATE CONTROL VALUES

    seriesVoltageValue.textContent =
        voltage;

    r1Value.textContent =
        resistor1;

    r2Value.textContent =
        resistor2;

    r3Value.textContent =
        resistor3;


    // UPDATE RESULTS

    totalResistance.textContent =
        total;

    seriesCurrent.textContent =
        current.toFixed(2);


    // UPDATE VOLTAGE DROPS

    voltageDrop1.textContent =
        drop1.toFixed(2);

    voltageDrop2.textContent =
        drop2.toFixed(2);

    voltageDrop3.textContent =
        drop3.toFixed(2);

}


// EVENT LISTENERS

seriesVoltage.addEventListener(
    "input",
    calculateSeriesCircuit
);


r1.addEventListener(
    "input",
    calculateSeriesCircuit
);


r2.addEventListener(
    "input",
    calculateSeriesCircuit
);


r3.addEventListener(
    "input",
    calculateSeriesCircuit
);


// RUN ON PAGE LOAD

calculateSeriesCircuit();
