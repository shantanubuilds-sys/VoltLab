/* =========================================
   VOLTLAB DAY 11
   INTERACTIVE ELECTRICITY LEARNING
========================================= */


/* =========================================
   HELPERS
========================================= */

const $ = (id) => document.getElementById(id);

const formatNumber = (number, decimals = 2) => {
    return Number(number).toFixed(decimals);
};


/* =========================================
   OHM'S LAW
========================================= */

const voltageSlider = $("voltageSlider");
const resistanceSlider = $("resistanceSlider");

function updateOhmsLaw() {

    const voltage = Number(voltageSlider.value);
    const resistance = Number(resistanceSlider.value);

    const current = voltage / resistance;

    $("voltageValue").textContent = voltage;
    $("resistanceValue").textContent = resistance;
    $("currentResult").textContent = formatNumber(current);

    const lamp = $("ohmLamp");

    const brightness = Math.min(current / 4, 1);

    lamp.style.opacity = 0.45 + brightness * 0.55;

    lamp.style.transform =
        `scale(${1 + brightness * 0.08})`;

    if (current > 3) {

        $("ohmStatus").textContent =
            "⚡ High current flow";

        $("ohmStatus").style.color =
            "var(--danger)";

    } else {

        $("ohmStatus").textContent =
            "⚡ Circuit operating normally";

        $("ohmStatus").style.color =
            "var(--success)";
    }
}


voltageSlider.addEventListener("input", updateOhmsLaw);

resistanceSlider.addEventListener("input", updateOhmsLaw);

updateOhmsLaw();



/* =========================================
   SERIES CIRCUIT
========================================= */

const seriesInputs = [
    $("seriesVoltage"),
    $("seriesR1"),
    $("seriesR2"),
    $("seriesR3")
];


function updateSeries() {

    const voltage = Number($("seriesVoltage").value);

    const r1 = Number($("seriesR1").value);
    const r2 = Number($("seriesR2").value);
    const r3 = Number($("seriesR3").value);

    const totalResistance =
        r1 + r2 + r3;

    const current =
        voltage / totalResistance;

    const drop1 = current * r1;
    const drop2 = current * r2;
    const drop3 = current * r3;


    $("seriesVoltageValue").textContent = voltage;

    $("seriesR1Value").textContent = r1;

    $("seriesR2Value").textContent = r2;

    $("seriesR3Value").textContent = r3;


    $("seriesTotalResistance").textContent =
        formatNumber(totalResistance, 2);

    $("seriesCurrent").textContent =
        formatNumber(current);


    $("drop1").textContent =
        `${formatNumber(drop1)} V`;

    $("drop2").textContent =
        `${formatNumber(drop2)} V`;

    $("drop3").textContent =
        `${formatNumber(drop3)} V`;
}


seriesInputs.forEach(input => {

    input.addEventListener(
        "input",
        updateSeries
    );

});


updateSeries();



/* =========================================
   PARALLEL CIRCUIT
========================================= */

const parallelInputs = [
    $("parallelVoltage"),
    $("parallelR1"),
    $("parallelR2"),
    $("parallelR3")
];


function updateParallel() {

    const voltage =
        Number($("parallelVoltage").value);

    const r1 =
        Number($("parallelR1").value);

    const r2 =
        Number($("parallelR2").value);

    const r3 =
        Number($("parallelR3").value);


    const equivalent =
        1 /
        (
            (1 / r1) +
            (1 / r2) +
            (1 / r3)
        );


    const branch1 = voltage / r1;

    const branch2 = voltage / r2;

    const branch3 = voltage / r3;

    const totalCurrent =
        branch1 + branch2 + branch3;


    $("parallelVoltageValue").textContent =
        voltage;

    $("parallelR1Value").textContent =
        r1;

    $("parallelR2Value").textContent =
        r2;

    $("parallelR3Value").textContent =
        r3;


    $("parallelEquivalent").textContent =
        formatNumber(equivalent);

    $("parallelTotalCurrent").textContent =
        formatNumber(totalCurrent);


    $("branch1").textContent =
        `${formatNumber(branch1)} A`;

    $("branch2").textContent =
        `${formatNumber(branch2)} A`;

    $("branch3").textContent =
        `${formatNumber(branch3)} A`;
}


parallelInputs.forEach(input => {

    input.addEventListener(
        "input",
        updateParallel
    );

});


updateParallel();



/* =========================================
   POWER & ENERGY
========================================= */

const powerInputs = [
    $("powerVoltage"),
    $("powerCurrent"),
    $("powerTime")
];


function updatePower() {

    const voltage =
        Number($("powerVoltage").value);

    const current =
        Number($("powerCurrent").value);

    const time =
        Number($("powerTime").value);


    const power =
        voltage * current;

    const energyWh =
        power * time;

    const energyKwh =
        energyWh / 1000;


    $("powerVoltageValue").textContent =
        voltage;

    $("powerCurrentValue").textContent =
        current;

    $("powerTimeValue").textContent =
        time;


    $("powerResult").textContent =
        formatNumber(power, 0);

    $("energyResult").textContent =
        `${formatNumber(energyKwh)} kWh`;
}


powerInputs.forEach(input => {

    input.addEventListener(
        "input",
        updatePower
    );

});


updatePower();



/* =========================================
   ELECTRICITY COST
========================================= */

const appliancePreset =
    $("appliancePreset");

const costPower =
    $("costPower");

const costHours =
    $("costHours");

const costDays =
    $("costDays");

const costTariff =
    $("costTariff");

const reducedHours =
    $("reducedHours");


function updateCost() {

    const powerWatts =
        Number(costPower.value);

    const hoursPerDay =
        Number(costHours.value);

    const days =
        Number(costDays.value);

    const tariff =
        Number(costTariff.value);


    const powerKW =
        powerWatts / 1000;

    const dailyKWh =
        powerKW * hoursPerDay;

    const monthlyKWh =
        dailyKWh * days;

    const dailyCost =
        dailyKWh * tariff;

    const monthlyCost =
        monthlyKWh * tariff;


    $("costPowerValue").textContent =
        powerWatts;

    $("costHoursValue").textContent =
        hoursPerDay;

    $("costDaysValue").textContent =
        days;

    $("tariffValue").textContent =
        tariff;


    $("dailyEnergy").textContent =
        `${formatNumber(dailyKWh)} kWh`;

    $("monthlyEnergy").textContent =
        `${formatNumber(monthlyKWh)} kWh`;

    $("dailyCost").textContent =
        `₹${formatNumber(dailyCost)}`;

    $("monthlyCost").textContent =
        formatNumber(monthlyCost);


    $("costMessage").textContent =
        `Your appliance would cost about ₹${formatNumber(monthlyCost)} per month.`;


    updateSavings();
}


function updateSavings() {

    const powerWatts =
        Number(costPower.value);

    const originalHours =
        Number(costHours.value);

    const reduced =
        Number(reducedHours.value);

    const days =
        Number(costDays.value);

    const tariff =
        Number(costTariff.value);


    const originalMonthly =
        (powerWatts / 1000) *
        originalHours *
        days *
        tariff;


    const reducedMonthly =
        (powerWatts / 1000) *
        reduced *
        days *
        tariff;


    const saving =
        Math.max(
            0,
            originalMonthly - reducedMonthly
        );


    $("reducedHoursValue").textContent =
        reduced;

    $("monthlySaving").textContent =
        formatNumber(saving);
}


appliancePreset.addEventListener(
    "change",
    () => {

        const value =
            appliancePreset.value;

        if (value !== "custom") {

            costPower.value =
                value;

            updateCost();
        }

    }
);


[
    costPower,
    costHours,
    costDays,
    costTariff
].forEach(input => {

    input.addEventListener(
        "input",
        updateCost
    );

});


reducedHours.addEventListener(
    "input",
    updateSavings
);


updateCost();



/* =========================================
   DAY 11 CIRCUIT BUILDER
========================================= */


/*
    Each component:

    {
        id: Number,
        type: "bulb" | "resistor" | "switch",
        resistance: Number,
        closed: Boolean
    }
*/


let builderComponents = [];

let builderMode = "series";

let builderPowered = false;

let componentId = 1;



/* =========================================
   BUILDER ELEMENTS
========================================= */

const builderVoltage =
    $("builderVoltage");

const seriesModeBtn =
    $("seriesModeBtn");

const parallelModeBtn =
    $("parallelModeBtn");

const addBulbBtn =
    $("addBulbBtn");

const addResistorBtn =
    $("addResistorBtn");

const addSwitchBtn =
    $("addSwitchBtn");

const powerCircuitBtn =
    $("powerCircuitBtn");

const resetBuilderBtn =
    $("resetBuilderBtn");



/* =========================================
   COMPONENT DEFAULTS
========================================= */

const COMPONENT_DEFAULTS = {

    bulb: {
        resistance: 10,
        icon: "💡",
        name: "Bulb"
    },

    resistor: {
        resistance: 20,
        icon: "▰",
        name: "Resistor"
    },

    switch: {
        resistance: 0,
        icon: "🔘",
        name: "Switch"
    }

};



/* =========================================
   ADD COMPONENT
========================================= */

function addComponent(type) {

    const defaults =
        COMPONENT_DEFAULTS[type];

    builderComponents.push({

        id: componentId++,

        type,

        resistance:
            defaults.resistance,

        closed:
            true

    });


    renderBuilder();

}


addBulbBtn.addEventListener(
    "click",
    () => addComponent("bulb")
);


addResistorBtn.addEventListener(
    "click",
    () => addComponent("resistor")
);


addSwitchBtn.addEventListener(
    "click",
    () => addComponent("switch")
);



/* =========================================
   CIRCUIT MODE
========================================= */

seriesModeBtn.addEventListener(
    "click",
    () => {

        builderMode = "series";

        seriesModeBtn.classList.add("active");

        parallelModeBtn.classList.remove("active");

        renderBuilder();
    }
);


parallelModeBtn.addEventListener(
    "click",
    () => {

        builderMode = "parallel";

        parallelModeBtn.classList.add("active");

        seriesModeBtn.classList.remove("active");

        renderBuilder();
    }
);



/* =========================================
   POWER CIRCUIT
========================================= */

powerCircuitBtn.addEventListener(
    "click",
    () => {

        builderPowered =
            !builderPowered;

        renderBuilder();
    }
);



/* =========================================
   RESET
========================================= */

resetBuilderBtn.addEventListener(
    "click",
    () => {

        builderComponents = [];

        builderPowered = false;

        componentId = 1;

        renderBuilder();
    }
);



/* =========================================
   BUILDER CALCULATIONS
========================================= */

function calculateBuilder() {

    const voltage =
        Number(builderVoltage.value);


    const hasOpenSwitch =
        builderComponents.some(
            component =>
                component.type === "switch" &&
                !component.closed
        );


    const resistors =
        builderComponents.filter(
            component =>
                component.type === "resistor" ||
                component.type === "bulb"
        );


    if (
        !builderPowered ||
        hasOpenSwitch ||
        resistors.length === 0
    ) {

        return {

            resistance:
                calculateResistance(resistors),

            current: 0,

            activeBulbs: 0

        };

    }


    let resistance = 0;

    let current = 0;


    if (builderMode === "series") {

        resistance =
            resistors.reduce(
                (sum, component) =>
                    sum + component.resistance,
                0
            );

        current =
            voltage / resistance;

    } else {

        resistance =
            1 /
            resistors.reduce(
                (sum, component) =>
                    sum + (1 / component.resistance),
                0
            );

        current =
            voltage / resistance;
    }


    const bulbs =
        builderComponents.filter(
            component =>
                component.type === "bulb"
        );


    let activeBulbs = 0;


    bulbs.forEach(
        bulb => {

            if (builderMode === "series") {

                if (current > 0) {
                    activeBulbs++;
                }

            } else {

                const branchCurrent =
                    voltage / bulb.resistance;

                if (branchCurrent > 0) {
                    activeBulbs++;
                }

            }

        }
    );


    return {

        resistance,

        current,

        activeBulbs

    };

}



function calculateResistance(resistors) {

    if (resistors.length === 0) {
        return 0;
    }


    if (builderMode === "series") {

        return resistors.reduce(
            (sum, component) =>
                sum + component.resistance,
            0
        );

    }


    return 1 /
        resistors.reduce(
            (sum, component) =>
                sum + (1 / component.resistance),
            0
        );
}



/* =========================================
   BUILDER RENDER
========================================= */

function renderBuilder() {

    $("builderVoltageValue").textContent =
        builderVoltage.value;


    const circuit =
        $("builderCircuit");

    const empty =
        $("emptyBuilder");


    if (builderComponents.length === 0) {

        circuit.innerHTML = "";

        empty.style.display = "flex";

    } else {

        empty.style.display = "none";

        renderCircuitDiagram();

    }


    renderComponentList();

    updateBuilderResults();

    updateBuilderStatus();

    updateBuilderExplanation();
}



/* =========================================
   CIRCUIT DIAGRAM
========================================= */

function renderCircuitDiagram() {

    const circuit =
        $("builderCircuit");


    if (builderMode === "series") {

        let html = "";

        html += `
            <div class="builder-item">
                <div class="builder-item-icon">🔋</div>
                <div class="builder-item-label">
                    ${builderVoltage.value}V Battery
                </div>
            </div>
        `;


        builderComponents.forEach(
            (component, index) => {

                html += `
                    <div class="builder-connector
                        ${builderPowered ? "active" : ""}">
                    </div>
                `;


                html += createBuilderItem(
                    component
                );

            }
        );


        circuit.innerHTML = html;

    } else {

        const branches =
            builderComponents
                .map(component => {

                    const active =
                        isComponentActive(component);

                    return `
                        <div class="
                            parallel-branch
                            ${active ? "active" : ""}
                        ">

                            <div
                                class="builder-item
                                ${active ? "active" : ""}"
                            >

                                <div
                                    class="builder-item-icon"
                                >
                                    ${getComponentIcon(component)}
                                </div>

                                <div
                                    class="builder-item-label"
                                >
                                    ${getComponentName(component)}
                                </div>

                            </div>

                        </div>
                    `;

                })
                .join("");


        circuit.innerHTML = `

            <div class="parallel-layout">

                <div class="builder-item">

                    <div class="builder-item-icon">
                        🔋
                    </div>

                    <div class="builder-item-label">
                        ${builderVoltage.value}V Battery
                    </div>

                </div>


                <div
                    class="builder-connector
                    ${builderPowered ? "active" : ""}"
                >
                </div>


                <div class="parallel-branches">

                    ${branches}

                </div>

            </div>
        `;
    }

}



/* =========================================
   COMPONENT ITEM
========================================= */

function createBuilderItem(component) {

    const active =
        isComponentActive(component);


    return `

        <div
            class="builder-item
            ${active ? "active" : ""}"
        >

            <div class="builder-item-icon">

                ${getComponentIcon(component)}

            </div>

            <div class="builder-item-label">

                ${getComponentName(component)}

            </div>

        </div>

    `;
}



function getComponentIcon(component) {

    if (component.type === "bulb") {

        return "💡";

    }


    if (component.type === "resistor") {

        return "▰";

    }


    if (component.type === "switch") {

        return component.closed
            ? "🔘"
            : "⛔";
    }


    return "•";
}



function getComponentName(component) {

    const name =
        COMPONENT_DEFAULTS[component.type].name;


    if (component.type === "switch") {

        return component.closed
            ? "Switch ON"
            : "Switch OFF";

    }


    return name;
}



function isComponentActive(component) {

    if (!builderPowered) {
        return false;
    }


    if (
        component.type === "switch" &&
        !component.closed
    ) {
        return false;
    }


    return true;
}



/* =========================================
   COMPONENT LIST
========================================= */

function renderComponentList() {

    const list =
        $("componentList");


    $("componentCount").textContent =
        `${builderComponents.length} Component${
            builderComponents.length === 1 ? "" : "s"
        }`;


    if (builderComponents.length === 0) {

        list.innerHTML = `

            <div class="empty-builder"
                style="position:relative;inset:auto;padding:30px;"
            >

                <div class="empty-icon">
                    🧩
                </div>

                <p>
                    No components added yet.
                </p>

            </div>

        `;

        return;
    }


    list.innerHTML =
        builderComponents
            .map(component => {

                const defaults =
                    COMPONENT_DEFAULTS[component.type];


                const resistanceControl =
                    component.type === "switch"

                        ? `
                            <span class="component-value">
                                ${component.closed
                                    ? "ON"
                                    : "OFF"}
                            </span>
                        `

                        : `
                            <div class="component-value">

                                <input
                                    type="number"
                                    min="1"
                                    max="500"
                                    value="${component.resistance}"
                                    data-resistance-id="${component.id}"
                                >

                                <span>Ω</span>

                            </div>
                        `;


                const switchButton =
                    component.type === "switch"

                        ? `
                            <button
                                class="remove-component"
                                data-switch-id="${component.id}"
                                type="button"
                            >
                                ${component.closed
                                    ? "Turn OFF"
                                    : "Turn ON"}
                            </button>
                        `

                        : `
                            <button
                                class="remove-component"
                                data-remove-id="${component.id}"
                                type="button"
                            >
                                Remove
                            </button>
                        `;


                return `

                    <div class="component-row">

                        <div class="component-row-icon">

                            ${defaults.icon}

                        </div>


                        <div class="component-row-info">

                            <strong>
                                ${defaults.name}
                            </strong>

                            <span>
                                Component #${component.id}
                            </span>

                        </div>


                        ${resistanceControl}


                        ${switchButton}

                    </div>
                `;

            })
            .join("");


    bindComponentListEvents();
}



/* =========================================
   COMPONENT EVENTS
========================================= */

function bindComponentListEvents() {

    document
        .querySelectorAll("[data-remove-id]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.removeId
                        );


                    builderComponents =
                        builderComponents.filter(
                            component =>
                                component.id !== id
                        );


                    renderBuilder();

                }
            );

        });


    document
        .querySelectorAll("[data-switch-id]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.switchId
                        );


                    const component =
                        builderComponents.find(
                            item =>
                                item.id === id
                        );


                    if (component) {

                        component.closed =
                            !component.closed;

                    }


                    renderBuilder();

                }
            );

        });


    document
        .querySelectorAll("[data-resistance-id]")
        .forEach(input => {

            input.addEventListener(
                "input",
                () => {

                    const id =
                        Number(
                            input.dataset.resistanceId
                        );


                    const component =
                        builderComponents.find(
                            item =>
                                item.id === id
                        );


                    if (component) {

                        const value =
                            Number(input.value);


                        component.resistance =
                            Math.max(
                                1,
                                Math.min(
                                    500,
                                    value || 1
                                )
                            );

                    }


                    updateBuilderResults();

                    renderCircuitDiagram();

                    updateBuilderExplanation();

                }
            );

        });

}



/* =========================================
   BUILDER RESULTS
========================================= */

function updateBuilderResults() {

    const results =
        calculateBuilder();


    $("builderResistance").textContent =
        results.resistance === 0
            ? "0"
            : formatNumber(
                results.resistance
            );


    $("builderCurrent").textContent =
        formatNumber(
            results.current
        );


    $("activeBulbs").textContent =
        results.activeBulbs;
}



/* =========================================
   BUILDER STATUS
========================================= */

function updateBuilderStatus() {

    const status =
        $("builderStatus");


    if (builderPowered) {

        status.textContent =
            "● ON";

        status.classList.remove("off");

        status.classList.add("on");

        powerCircuitBtn.textContent =
            "⏹ Turn OFF";

    } else {

        status.textContent =
            "● OFF";

        status.classList.remove("on");

        status.classList.add("off");

        powerCircuitBtn.textContent =
            "⚡ Turn ON";
    }
}



/* =========================================
   BUILDER EXPLANATION
========================================= */

function updateBuilderExplanation() {

    const explanation =
        $("builderExplanation");


    if (builderComponents.length === 0) {

        explanation.textContent =
            "Add components to begin your experiment.";

        return;
    }


    const results =
        calculateBuilder();


    const hasOpenSwitch =
        builderComponents.some(
            component =>
                component.type === "switch" &&
                !component.closed
        );


    if (!builderPowered) {

        explanation.textContent =
            "The circuit is OFF, so no current is flowing. Turn the virtual circuit ON to observe the simulation.";

        return;
    }


    if (hasOpenSwitch) {

        explanation.textContent =
            "The switch is open, so the circuit path is interrupted and current cannot flow through the circuit.";

        return;
    }


    if (
        builderComponents.filter(
            component =>
                component.type === "resistor" ||
                component.type === "bulb"
        ).length === 0
    ) {

        explanation.textContent =
            "Your circuit needs a resistive component such as a bulb or resistor before current can be calculated.";

        return;
    }


    if (builderMode === "series") {

        explanation.textContent =
            `In a series circuit, the same current flows through the components. Your circuit has a total resistance of ${formatNumber(results.resistance)} Ω and a current of ${formatNumber(results.current)} A.`;

    } else {

        explanation.textContent =
            `In a parallel circuit, the current divides between branches while the voltage remains the same across each branch. Your equivalent resistance is ${formatNumber(results.resistance)} Ω.`;

    }

}



/* =========================================
   BUILDER VOLTAGE
========================================= */

builderVoltage.addEventListener(
    "input",
    () => {

        $("builderVoltageValue").textContent =
            builderVoltage.value;

        renderBuilder();

    }
);



/* =========================================
   INITIAL BUILDER
========================================= */

renderBuilder();



/* =========================================
   QUIZ
========================================= */

const quizQuestions = [

    {
        question:
            "A 12V battery is connected to a 6Ω resistor. What is the current?",

        options: [
            "0.5 A",
            "2 A",
            "6 A",
            "72 A"
        ],

        answer: 1
    },


    {
        question:
            "What stays the same through components in a series circuit?",

        options: [
            "Voltage",
            "Resistance",
            "Current",
            "Power"
        ],

        answer: 2
    },


    {
        question:
            "What is the same across branches of a parallel circuit?",

        options: [
            "Current",
            "Voltage",
            "Resistance",
            "Power"
        ],

        answer: 1
    },


    {
        question:
            "A circuit has 10V and 2A. What is its power?",

        options: [
            "5 W",
            "12 W",
            "20 W",
            "100 W"
        ],

        answer: 2
    },


    {
        question:
            "What happens to current in a parallel circuit?",

        options: [
            "It disappears",
            "It divides between branches",
            "It becomes zero",
            "It always doubles"
        ],

        answer: 1
    }

];


let quizIndex = 0;

let quizScore = 0;

let quizAnswered = false;



function loadQuizQuestion() {

    const question =
        quizQuestions[quizIndex];


    $("quizProgress").textContent =
        `Question ${quizIndex + 1} of ${quizQuestions.length}`;


    $("quizScore").textContent =
        `Score: ${quizScore}`;


    $("quizQuestion").textContent =
        question.question;


    const options =
        $("quizOptions");


    options.innerHTML =
        question.options
            .map(
                (option, index) => `

                    <button
                        class="quiz-option"
                        data-answer="${index}"
                        type="button"
                    >
                        ${option}
                    </button>

                `
            )
            .join("");


    $("quizFeedback").textContent = "";

    $("quizNext").disabled = true;

    quizAnswered = false;


    document
        .querySelectorAll(".quiz-option")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    answerQuiz(
                        Number(
                            button.dataset.answer
                        )
                    );

                }
            );

        });

}



function answerQuiz(selected) {

    if (quizAnswered) {
        return;
    }


    quizAnswered = true;


    const question =
        quizQuestions[quizIndex];


    const buttons =
        document.querySelectorAll(
            ".quiz-option"
        );


    buttons.forEach(
        (button, index) => {

            button.disabled = true;


            if (index === question.answer) {

                button.classList.add(
                    "correct"
                );

            }


            if (
                index === selected &&
                selected !== question.answer
            ) {

                button.classList.add(
                    "wrong"
                );

            }

        }
    );


    if (selected === question.answer) {

        quizScore++;

        $("quizFeedback").textContent =
            "✅ Correct!";

        $("quizFeedback").style.color =
            "var(--success)";

    } else {

        $("quizFeedback").textContent =
            `❌ Not quite. The correct answer is: ${
                question.options[question.answer]
            }`;

        $("quizFeedback").style.color =
            "var(--danger)";
    }


    $("quizScore").textContent =
        `Score: ${quizScore}`;


    $("quizNext").disabled = false;
}



$("quizNext").addEventListener(
    "click",
    () => {

        quizIndex++;


        if (
            quizIndex >=
            quizQuestions.length
        ) {

            showQuizResult();

        } else {

            loadQuizQuestion();

        }

    }
);



function showQuizResult() {

    $("quizQuestion").textContent =
        "Challenge Complete 🎉";


    $("quizOptions").innerHTML = "";

    $("quizFeedback").textContent = "";


    $("quizNext").style.display =
        "none";


    $("quizResult").textContent =
        `You scored ${quizScore} / ${quizQuestions.length}.`;


    $("quizRestart").hidden = false;
}



$("quizRestart").addEventListener(
    "click",
    () => {

        quizIndex = 0;

        quizScore = 0;

        $("quizNext").style.display =
            "inline-block";

        $("quizRestart").hidden =
            true;

        $("quizResult").textContent = "";

        loadQuizQuestion();

    }
);


loadQuizQuestion();



/* =========================================
   SCROLL PROGRESS
========================================= */

window.addEventListener(
    "scroll",
    () => {

        const scrollTop =
            window.scrollY;


        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        const progress =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;


        $("scrollProgress").style.width =
            `${progress}%`;


        if (scrollTop > 500) {

            $("backToTop").classList.add(
                "show"
            );

        } else {

            $("backToTop").classList.remove(
                "show"
            );

        }

    }
);



/* =========================================
   BACK TO TOP
========================================= */

$("backToTop").addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);



/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navLinks.forEach(link => {

                        link.classList.remove(
                            "active"
                        );

                    });


                    const activeLink =
                        document.querySelector(
                            `.nav-links a[href="#${entry.target.id}"]`
                        );


                    if (activeLink) {

                        activeLink.classList.add(
                            "active"
                        );

                    }

                }

            });

        },

        {
            rootMargin:
                "-25% 0px -65% 0px"
        }
    );


sections.forEach(section => {

    observer.observe(section);

});


/* =========================================
   END
========================================= */

console.log(
    "⚡ VoltLab Day 11 loaded successfully."
);
