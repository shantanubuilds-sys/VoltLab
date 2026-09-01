const voltageSlider = document.getElementById("voltage");
const resistanceSlider = document.getElementById("resistance");

const voltageValue = document.getElementById("voltageValue");
const resistanceValue = document.getElementById("resistanceValue");
const currentValue = document.getElementById("currentValue");


function calculateCurrent() {

    const voltage = Number(voltageSlider.value);
    const resistance = Number(resistanceSlider.value);

    const current = voltage / resistance;

    voltageValue.textContent = voltage;
    resistanceValue.textContent = resistance;

    currentValue.textContent = current.toFixed(2);

}


voltageSlider.addEventListener("input", calculateCurrent);

resistanceSlider.addEventListener("input", calculateCurrent);


calculateCurrent();
