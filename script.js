// =========================
// GET HTML ELEMENTS
// =========================

const voltageSlider = document.getElementById("voltage");
const resistanceSlider = document.getElementById("resistance");

const voltageValue = document.getElementById("voltageValue");
const resistanceValue = document.getElementById("resistanceValue");
const currentValue = document.getElementById("currentValue");


// =========================
// LIVE CIRCUIT ELEMENTS
// =========================

const circuitVoltage =
    document.getElementById("circuitVoltage");

const circuitResistance =
    document.getElementById("circuitResistance");

const circuitCurrent =
    document.getElementById("circuitCurrent");

const bulb =
    document.getElementById("bulb");

const circuitStatus =
    document.getElementById("circuitStatus");

const electrons =
    document.querySelectorAll(".electron");


// =========================
// CALCULATE CURRENT
// =========================

function calculateCurrent() {

    // GET SLIDER VALUES

    const voltage =
        Number(voltageSlider.value);

    const resistance =
        Number(resistanceSlider.value);


    // OHM'S LAW

    const current =
        voltage / resistance;


    // =========================
    // UPDATE MAIN DISPLAY
    // =========================

    voltageValue.textContent =
        voltage;

    resistanceValue.textContent =
        resistance;

    currentValue.textContent =
        current.toFixed(2);


    // =========================
    // UPDATE CIRCUIT DISPLAY
    // =========================

    circuitVoltage.textContent =
        voltage;

    circuitResistance.textContent =
        resistance;

    circuitCurrent.textContent =
        current.toFixed(2);


    // =========================
    // BULB BRIGHTNESS
    // =========================

    let brightness =
        1 + current / 2;


    // PREVENT EXTREME BRIGHTNESS

    if (brightness > 3) {

        brightness = 3;

    }


    bulb.style.filter =
        `brightness(${brightness})`;


    // =========================
    // ELECTRON SPEED
    // =========================

    let speed =
        3 - current / 5;


    // PREVENT ANIMATION
    // FROM BECOMING TOO FAST

    if (speed < 0.4) {

        speed = 0.4;

    }


    // UPDATE EVERY ELECTRON

    electrons.forEach(function (electron) {

        electron.style.animationDuration =
            `${speed}s`;

    });


    // =========================
    // CIRCUIT STATUS
    // =========================

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


// =========================
// LISTEN FOR USER INPUT
// =========================

voltageSlider.addEventListener(
    "input",
    calculateCurrent
);


resistanceSlider.addEventListener(
    "input",
    calculateCurrent
);


// =========================
// RUN ON PAGE LOAD
// =========================

calculateCurrent();
