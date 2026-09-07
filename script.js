/* =========================================
   VOLTLAB DAY 12
   CIRCUIT TROUBLESHOOTER
   Diagnose → Understand → Fix
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       HELPERS
    ========================================= */

    const $ = (selector) => document.querySelector(selector);

    const formatNumber = (value, decimals = 2) => {
        if (!Number.isFinite(value)) return "0";
        return Number(value).toFixed(decimals);
    };


    /* =========================================
       OHM'S LAW
    ========================================= */

    const voltageSlider = $("#voltage");
    const resistanceSlider = $("#resistance");

    function calculateOhmsLaw() {

        if (!voltageSlider || !resistanceSlider) return;

        const voltage = Number(voltageSlider.value);
        const resistance = Number(resistanceSlider.value);

        const current = resistance > 0 ? voltage / resistance : 0;

        if ($("#voltageValue")) {
            $("#voltageValue").textContent = `${voltage} V`;
        }

        if ($("#resistanceValue")) {
            $("#resistanceValue").textContent = `${resistance} Ω`;
        }

        if ($("#currentResult")) {
            $("#currentResult").textContent =
                formatNumber(current) + " A";
        }

        if ($("#ohmFormula")) {
            $("#ohmFormula").textContent =
                `I = V / R = ${voltage} / ${resistance}`;
        }

        const lamp = $("#ohmLamp");

        if (lamp) {
            lamp.style.opacity = current > 0 ? "1" : "0.35";
            lamp.style.transform =
                current > 0 ? "scale(1.05)" : "scale(1)";
        }
    }

    if (voltageSlider) {
        voltageSlider.addEventListener("input", calculateOhmsLaw);
    }

    if (resistanceSlider) {
        resistanceSlider.addEventListener("input", calculateOhmsLaw);
    }

    calculateOhmsLaw();


    /* =========================================
       SERIES CIRCUIT
    ========================================= */

    const seriesVoltage = $("#seriesVoltage");
    const seriesR1 = $("#seriesR1");
    const seriesR2 = $("#seriesR2");
    const seriesR3 = $("#seriesR3");

    function calculateSeries() {

        if (!seriesVoltage || !seriesR1 || !seriesR2 || !seriesR3) {
            return;
        }

        const V = Number(seriesVoltage.value);
        const R1 = Number(seriesR1.value);
        const R2 = Number(seriesR2.value);
        const R3 = Number(seriesR3.value);

        const totalR = R1 + R2 + R3;
        const current = totalR > 0 ? V / totalR : 0;

        const drop1 = current * R1;
        const drop2 = current * R2;
        const drop3 = current * R3;

        if ($("#seriesVoltageValue")) {
            $("#seriesVoltageValue").textContent = `${V} V`;
        }

        if ($("#seriesR1Value")) {
            $("#seriesR1Value").textContent = `${R1} Ω`;
        }

        if ($("#seriesR2Value")) {
            $("#seriesR2Value").textContent = `${R2} Ω`;
        }

        if ($("#seriesR3Value")) {
            $("#seriesR3Value").textContent = `${R3} Ω`;
        }

        if ($("#seriesTotal")) {
            $("#seriesTotal").textContent =
                `${formatNumber(totalR)} Ω`;
        }

        if ($("#seriesCurrent")) {
            $("#seriesCurrent").textContent =
                `${formatNumber(current)} A`;
        }

        if ($("#drop1")) {
            $("#drop1").textContent =
                `${formatNumber(drop1)} V`;
        }

        if ($("#drop2")) {
            $("#drop2").textContent =
                `${formatNumber(drop2)} V`;
        }

        if ($("#drop3")) {
            $("#drop3").textContent =
                `${formatNumber(drop3)} V`;
        }
    }

    [seriesVoltage, seriesR1, seriesR2, seriesR3]
        .filter(Boolean)
        .forEach(input => {
            input.addEventListener("input", calculateSeries);
        });

    calculateSeries();


    /* =========================================
       PARALLEL CIRCUIT
    ========================================= */

    const parallelVoltage = $("#parallelVoltage");
    const parallelR1 = $("#parallelR1");
    const parallelR2 = $("#parallelR2");
    const parallelR3 = $("#parallelR3");

    function calculateParallel() {

        if (
            !parallelVoltage ||
            !parallelR1 ||
            !parallelR2 ||
            !parallelR3
        ) {
            return;
        }

        const V = Number(parallelVoltage.value);
        const R1 = Number(parallelR1.value);
        const R2 = Number(parallelR2.value);
        const R3 = Number(parallelR3.value);

        const inverseR =
            (R1 > 0 ? 1 / R1 : 0) +
            (R2 > 0 ? 1 / R2 : 0) +
            (R3 > 0 ? 1 / R3 : 0);

        const equivalentR =
            inverseR > 0 ? 1 / inverseR : 0;

        const I1 = R1 > 0 ? V / R1 : 0;
        const I2 = R2 > 0 ? V / R2 : 0;
        const I3 = R3 > 0 ? V / R3 : 0;

        const totalCurrent = I1 + I2 + I3;

        if ($("#parallelVoltageValue")) {
            $("#parallelVoltageValue").textContent = `${V} V`;
        }

        if ($("#parallelR1Value")) {
            $("#parallelR1Value").textContent = `${R1} Ω`;
        }

        if ($("#parallelR2Value")) {
            $("#parallelR2Value").textContent = `${R2} Ω`;
        }

        if ($("#parallelR3Value")) {
            $("#parallelR3Value").textContent = `${R3} Ω`;
        }

        if ($("#parallelEquivalent")) {
            $("#parallelEquivalent").textContent =
                `${formatNumber(equivalentR)} Ω`;
        }

        if ($("#parallelCurrent")) {
            $("#parallelCurrent").textContent =
                `${formatNumber(totalCurrent)} A`;
        }

        if ($("#parallelI1")) {
            $("#parallelI1").textContent =
                `${formatNumber(I1)} A`;
        }

        if ($("#parallelI2")) {
            $("#parallelI2").textContent =
                `${formatNumber(I2)} A`;
        }

        if ($("#parallelI3")) {
            $("#parallelI3").textContent =
                `${formatNumber(I3)} A`;
        }
    }

    [parallelVoltage, parallelR1, parallelR2, parallelR3]
        .filter(Boolean)
        .forEach(input => {
            input.addEventListener("input", calculateParallel);
        });

    calculateParallel();


    /* =========================================
       POWER & ENERGY
    ========================================= */

    const powerVoltage = $("#powerVoltage");
    const powerCurrent = $("#powerCurrent");
    const powerHours = $("#powerHours");

    function calculatePower() {

        if (!powerVoltage || !powerCurrent || !powerHours) {
            return;
        }

        const V = Number(powerVoltage.value);
        const I = Number(powerCurrent.value);
        const hours = Number(powerHours.value);

        const power = V * I;
        const energyWh = power * hours;
        const energyKWh = energyWh / 1000;

        if ($("#powerVoltageValue")) {
            $("#powerVoltageValue").textContent = `${V} V`;
        }

        if ($("#powerCurrentValue")) {
            $("#powerCurrentValue").textContent = `${I} A`;
        }

        if ($("#powerHoursValue")) {
            $("#powerHoursValue").textContent = `${hours} h`;
        }

        if ($("#powerResult")) {
            $("#powerResult").textContent =
                `${formatNumber(power)} W`;
        }

        if ($("#energyWh")) {
            $("#energyWh").textContent =
                `${formatNumber(energyWh)} Wh`;
        }

        if ($("#energyKWh")) {
            $("#energyKWh").textContent =
                `${formatNumber(energyKWh)} kWh`;
        }
    }

    [powerVoltage, powerCurrent, powerHours]
        .filter(Boolean)
        .forEach(input => {
            input.addEventListener("input", calculatePower);
        });

    calculatePower();


    /* =========================================
       ELECTRICITY COST SIMULATOR
    ========================================= */

    const applianceSelect = $("#appliance");
    const costPower = $("#costPower");
    const costHours = $("#costHours");
    const costDays = $("#costDays");
    const tariff = $("#tariff");

    const appliancePresets = {
        custom: 100,
        led: 10,
        fan: 75,
        laptop: 100,
        tv: 200,
        refrigerator: 500,
        heater: 1000,
        washing: 1500
    };

    function calculateCost() {

        if (
            !costPower ||
            !costHours ||
            !costDays ||
            !tariff
        ) {
            return;
        }

        const power = Number(costPower.value);
        const hours = Number(costHours.value);
        const days = Number(costDays.value);
        const rate = Number(tariff.value);

        const dailyEnergy = (power * hours) / 1000;
        const monthlyEnergy = dailyEnergy * days;

        const dailyCost = dailyEnergy * rate;
        const monthlyCost = monthlyEnergy * rate;

        if ($("#dailyEnergy")) {
            $("#dailyEnergy").textContent =
                `${formatNumber(dailyEnergy)} kWh`;
        }

        if ($("#monthlyEnergy")) {
            $("#monthlyEnergy").textContent =
                `${formatNumber(monthlyEnergy)} kWh`;
        }

        if ($("#dailyCost")) {
            $("#dailyCost").textContent =
                `₹${formatNumber(dailyCost)}`;
        }

        if ($("#monthlyCost")) {
            $("#monthlyCost").textContent =
                `₹${formatNumber(monthlyCost)}`;
        }

        if ($("#monthlyCostBig")) {
            $("#monthlyCostBig").textContent =
                `₹${formatNumber(monthlyCost, 0)}`;
        }

        calculateSavings();
    }

    if (applianceSelect) {

        applianceSelect.addEventListener("change", () => {

            const value = applianceSelect.value;

            if (
                value !== "custom" &&
                appliancePresets[value] !== undefined
            ) {
                costPower.value = appliancePresets[value];
            }

            calculateCost();
        });
    }

    [costPower, costHours, costDays, tariff]
        .filter(Boolean)
        .forEach(input => {
            input.addEventListener("input", calculateCost);
        });


    /* =========================================
       COST WHAT-IF
    ========================================= */

    const reducedHours = $("#reducedHours");

    function calculateSavings() {

        if (
            !costPower ||
            !costDays ||
            !tariff ||
            !reducedHours
        ) {
            return;
        }

        const power = Number(costPower.value);
        const days = Number(costDays.value);
        const rate = Number(tariff.value);
        const hours = Number(costHours.value);
        const reduced = Number(reducedHours.value);

        const original =
            (power * hours / 1000) *
            days *
            rate;

        const reducedCost =
            (power * reduced / 1000) *
            days *
            rate;

        const savings =
            Math.max(0, original - reducedCost);

        if ($("#reducedHoursValue")) {
            $("#reducedHoursValue").textContent =
                `${reduced} h/day`;
        }

        if ($("#monthlySavings")) {
            $("#monthlySavings").textContent =
                `₹${formatNumber(savings, 0)}`;
        }
    }

    if (reducedHours) {
        reducedHours.addEventListener("input", calculateSavings);
    }

    calculateCost();


    /* =========================================
       DAY 11 CIRCUIT BUILDER
    ========================================= */

    let builderComponents = [];
    let builderMode = "series";
    let builderPowered = false;
    let componentId = 1;

    const builderVoltage = $("#builderVoltage");
    const builderVoltageValue = $("#builderVoltageValue");

    const seriesModeBtn = $("#seriesModeBtn");
    const parallelModeBtn = $("#parallelModeBtn");

    const addBulbBtn = $("#addBulbBtn");
    const addResistorBtn = $("#addResistorBtn");
    const addSwitchBtn = $("#addSwitchBtn");

    const powerCircuitBtn = $("#powerCircuitBtn");
    const resetBuilderBtn = $("#resetBuilderBtn");

    const builderCircuit = $("#builderCircuit");
    const componentList = $("#componentList");


    function addComponent(type) {

        const component = {
            id: componentId++,
            type: type,
            resistance:
                type === "bulb"
                    ? 10
                    : type === "resistor"
                        ? 20
                        : 0,
            closed: true
        };

        builderComponents.push(component);

        renderBuilder();
        calculateBuilder();
    }


    function removeComponent(id) {

        builderComponents =
            builderComponents.filter(
                component => component.id !== id
            );

        renderBuilder();
        calculateBuilder();
    }


    function setBuilderMode(mode) {

        builderMode = mode;

        if (seriesModeBtn) {
            seriesModeBtn.classList.toggle(
                "active",
                mode === "series"
            );
        }

        if (parallelModeBtn) {
            parallelModeBtn.classList.toggle(
                "active",
                mode === "parallel"
            );
        }

        calculateBuilder();
        renderCircuitDiagram();
        updateBuilderExplanation();
    }


    function toggleBuilderPower() {

        builderPowered = !builderPowered;

        if (powerCircuitBtn) {

            powerCircuitBtn.textContent =
                builderPowered
                    ? "⏹ Turn OFF"
                    : "▶ Turn ON";
        }

        calculateBuilder();
        renderCircuitDiagram();
        updateBuilderExplanation();
    }


    function resetBuilder() {

        builderComponents = [];
        builderPowered = false;
        componentId = 1;

        if (powerCircuitBtn) {
            powerCircuitBtn.textContent = "▶ Turn ON";
        }

        renderBuilder();
        calculateBuilder();
    }


    function calculateResistance(resistors) {

        if (!resistors.length) return 0;

        if (builderMode === "series") {

            return resistors.reduce(
                (sum, component) =>
                    sum + Number(component.resistance || 0),
                0
            );
        }

        const inverse = resistors.reduce(
            (sum, component) => {

                const R = Number(component.resistance || 0);

                return sum + (
                    R > 0
                        ? 1 / R
                        : 0
                );
            },
            0
        );

        return inverse > 0
            ? 1 / inverse
            : 0;
    }


    function calculateBuilder() {

        const voltage =
            builderVoltage
                ? Number(builderVoltage.value)
                : 12;

        const resistors =
            builderComponents.filter(
                component =>
                    component.type === "bulb" ||
                    component.type === "resistor"
            );

        const switches =
            builderComponents.filter(
                component =>
                    component.type === "switch"
            );

        const openSwitch =
            switches.some(
                component =>
                    component.closed === false
            );

        const totalResistance =
            calculateResistance(resistors);

        let current = 0;

        if (
            builderPowered &&
            !openSwitch &&
            totalResistance > 0
        ) {
            current =
                voltage / totalResistance;
        }

        const activeBulbs =
            current > 0
                ? builderComponents.filter(
                    component =>
                        component.type === "bulb"
                ).length
                : 0;

        if (builderVoltageValue) {
            builderVoltageValue.textContent =
                `${voltage} V`;
        }

        if ($("#builderResistance")) {
            $("#builderResistance").textContent =
                `${formatNumber(totalResistance)} Ω`;
        }

        if ($("#builderCurrent")) {
            $("#builderCurrent").textContent =
                `${formatNumber(current)} A`;
        }

        if ($("#activeBulbs")) {
            $("#activeBulbs").textContent =
                `${activeBulbs}`;
        }

        if ($("#componentCount")) {
            $("#componentCount").textContent =
                `${builderComponents.length} components`;
        }

        if ($("#builderStatus")) {

            const isOn =
                builderPowered &&
                !openSwitch &&
                current > 0;

            $("#builderStatus").textContent =
                isOn
                    ? "Circuit ON"
                    : "Circuit OFF";

            $("#builderStatus").className =
                `circuit-status ${
                    isOn ? "on" : "off"
                }`;
        }

        renderComponentList();
        renderCircuitDiagram();
        updateBuilderExplanation();
    }


    function getComponentIcon(type) {

        if (type === "bulb") return "💡";
        if (type === "resistor") return "▱";
        if (type === "switch") return "⏻";

        return "⚡";
    }


    function getComponentName(type) {

        if (type === "bulb") return "Bulb";
        if (type === "resistor") return "Resistor";
        if (type === "switch") return "Switch";

        return "Component";
    }


    function isComponentActive(component) {

        if (!builderPowered) return false;

        if (
            component.type === "switch" &&
            component.closed === false
        ) {
            return false;
        }

        if (
            component.type === "bulb" ||
            component.type === "resistor"
        ) {
            return true;
        }

        return false;
    }


    function renderBuilder() {

        renderComponentList();
        renderCircuitDiagram();
        calculateBuilder();
    }


    function renderComponentList() {

        if (!componentList) return;

        if (!builderComponents.length) {

            componentList.innerHTML = `
                <div class="empty-builder">
                    <div class="empty-icon">🧩</div>
                    <h3>No components yet</h3>
                    <p>Add a bulb, resistor, or switch to begin.</p>
                </div>
            `;

            return;
        }

        componentList.innerHTML = "";

        builderComponents.forEach(component => {

            const row =
                document.createElement("div");

            row.className = "component-row";

            const icon =
                document.createElement("div");

            icon.className =
                "component-row-icon";

            icon.textContent =
                getComponentIcon(component.type);

            const info =
                document.createElement("div");

            info.className =
                "component-row-info";

            const name =
                document.createElement("strong");

            name.textContent =
                `${getComponentName(component.type)} #${component.id}`;

            const type =
                document.createElement("span");

            type.textContent =
                component.type === "switch"
                    ? "Control switch"
                    : "Resistance";

            info.appendChild(name);
            info.appendChild(type);

            row.appendChild(icon);
            row.appendChild(info);

            if (
                component.type === "bulb" ||
                component.type === "resistor"
            ) {

                const valueBox =
                    document.createElement("div");

                valueBox.className =
                    "component-value";

                const input =
                    document.createElement("input");

                input.type = "number";
                input.min = "1";
                input.step = "1";
                input.value =
                    component.resistance;

                input.addEventListener(
                    "input",
                    () => {

                        component.resistance =
                            Math.max(
                                1,
                                Number(input.value) || 1
                            );

                        calculateBuilder();
                    }
                );

                const unit =
                    document.createElement("span");

                unit.textContent = "Ω";

                valueBox.appendChild(input);
                valueBox.appendChild(unit);

                row.appendChild(valueBox);

            } else {

                const switchBtn =
                    document.createElement("button");

                switchBtn.className =
                    "toggle-btn";

                switchBtn.textContent =
                    component.closed
                        ? "Closed"
                        : "Open";

                switchBtn.addEventListener(
                    "click",
                    () => {

                        component.closed =
                            !component.closed;

                        calculateBuilder();
                    }
                );

                row.appendChild(switchBtn);
            }

            const remove =
                document.createElement("button");

            remove.className =
                "remove-component";

            remove.textContent = "Remove";

            remove.addEventListener(
                "click",
                () => removeComponent(component.id)
            );

            row.appendChild(remove);

            componentList.appendChild(row);
        });
    }


    function renderCircuitDiagram() {

        if (!builderCircuit) return;

        builderCircuit.innerHTML = "";

        if (!builderComponents.length) {

            builderCircuit.innerHTML = `
                <div class="empty-builder">
                    <div class="empty-icon">⚡</div>
                    <h3>Your virtual circuit is empty</h3>
                    <p>Add components from the control panel.</p>
                </div>
            `;

            return;
        }

        if (builderMode === "series") {

            builderComponents.forEach(
                (component, index) => {

                    const item =
                        createBuilderItem(component);

                    builderCircuit.appendChild(item);

                    if (
                        index <
                        builderComponents.length - 1
                    ) {

                        const connector =
                            document.createElement("div");

                        connector.className =
                            "builder-connector";

                        if (builderPowered) {
                            connector.classList.add("active");
                        }

                        builderCircuit.appendChild(
                            connector
                        );
                    }
                }
            );

        } else {

            const layout =
                document.createElement("div");

            layout.className =
                "parallel-layout";

            const branches =
                document.createElement("div");

            branches.className =
                "parallel-branches";

            builderComponents.forEach(
                component => {

                    const branch =
                        document.createElement("div");

                    branch.className =
                        "parallel-branch";

                    if (
                        builderPowered &&
                        isComponentActive(component)
                    ) {
                        branch.classList.add("active");
                    }

                    branch.appendChild(
                        createBuilderItem(component)
                    );

                    branches.appendChild(branch);
                }
            );

            layout.appendChild(branches);
            builderCircuit.appendChild(layout);
        }
    }


    function createBuilderItem(component) {

        const item =
            document.createElement("div");

        item.className =
            "builder-item";

        if (
            builderPowered &&
            isComponentActive(component)
        ) {
            item.classList.add("active");
        }

        const icon =
            document.createElement("div");

        icon.className =
            "builder-item-icon";

        icon.textContent =
            getComponentIcon(component.type);

        const label =
            document.createElement("div");

        label.className =
            "builder-item-label";

        label.textContent =
            component.type === "switch"
                ? (
                    component.closed
                        ? "Closed"
                        : "Open"
                )
                : `${component.resistance} Ω`;

        item.appendChild(icon);
        item.appendChild(label);

        return item;
    }


    function updateBuilderExplanation() {

        const explanation =
            $("#builderExplanation");

        if (!explanation) return;

        if (!builderComponents.length) {

            explanation.textContent =
                "Add components to start building your circuit.";

            return;
        }

        if (!builderPowered) {

            explanation.textContent =
                "The circuit is OFF. Turn it ON to observe current flow.";

            return;
        }

        const hasOpenSwitch =
            builderComponents.some(
                component =>
                    component.type === "switch" &&
                    component.closed === false
            );

        if (hasOpenSwitch) {

            explanation.textContent =
                "The switch is open, so the circuit path is broken and current cannot flow.";

            return;
        }

        const resistors =
            builderComponents.filter(
                component =>
                    component.type === "bulb" ||
                    component.type === "resistor"
            );

        if (!resistors.length) {

            explanation.textContent =
                "The circuit needs at least one resistive component before current can be calculated.";

            return;
        }

        if (builderMode === "series") {

            explanation.textContent =
                "Series circuit: resistances add together and the same current flows through each component.";

        } else {

            explanation.textContent =
                "Parallel circuit: each branch gets the source voltage and the total current is the sum of branch currents.";
        }
    }


    if (builderVoltage) {
        builderVoltage.addEventListener(
            "input",
            calculateBuilder
        );
    }

    if (seriesModeBtn) {
        seriesModeBtn.addEventListener(
            "click",
            () => setBuilderMode("series")
        );
    }

    if (parallelModeBtn) {
        parallelModeBtn.addEventListener(
            "click",
            () => setBuilderMode("parallel")
        );
    }

    if (addBulbBtn) {
        addBulbBtn.addEventListener(
            "click",
            () => addComponent("bulb")
        );
    }

    if (addResistorBtn) {
        addResistorBtn.addEventListener(
            "click",
            () => addComponent("resistor")
        );
    }

    if (addSwitchBtn) {
        addSwitchBtn.addEventListener(
            "click",
            () => addComponent("switch")
        );
    }

    if (powerCircuitBtn) {
        powerCircuitBtn.addEventListener(
            "click",
            toggleBuilderPower
        );
    }

    if (resetBuilderBtn) {
        resetBuilderBtn.addEventListener(
            "click",
            resetBuilder
        );
    }

    calculateBuilder();


    /* =========================================
       DAY 12
       CIRCUIT TROUBLESHOOTER
    ========================================= */

    const faultCases = [

        {
            title: "The circuit won't turn on",
            description:
                "You have components connected, but nothing is working.",

            options: [
                "The circuit power is OFF",
                "The resistor is too small",
                "The voltage is too high",
                "The circuit has too many bulbs"
            ],

            answer: 0,

            explanation:
                "A circuit needs a powered source before current can flow. If the virtual power switch is OFF, the calculated current is zero."
        },

        {
            title: "Current suddenly becomes zero",
            description:
                "The battery is ON, but the circuit still has no current.",

            options: [
                "The switch is open",
                "The bulb is too bright",
                "The voltage is always zero",
                "The wire is too long"
            ],

            answer: 0,

            explanation:
                "An open switch breaks the circuit path. Without a continuous path, current cannot flow."
        },

        {
            title: "Why did current decrease?",
            description:
                "You added another resistor in series and noticed the current became smaller.",

            options: [
                "Total resistance increased",
                "Voltage disappeared",
                "Parallel resistance increased",
                "Bulbs create voltage"
            ],

            answer: 0,

            explanation:
                "In a series circuit, resistances add together. Higher total resistance means lower current for the same voltage because I = V / R."
        },

        {
            title: "One branch has a problem",
            description:
                "In a parallel circuit, one branch is not behaving normally.",

            options: [
                "The branch resistance may be very high",
                "Parallel circuits have no current",
                "Voltage is divided equally between all resistors",
                "Adding branches always stops the circuit"
            ],

            answer: 0,

            explanation:
                "In parallel, each branch has the source voltage. A higher branch resistance produces a smaller branch current."
        }
    ];


    let currentFault = 0;
    let troubleScore = 0;
    let troubleStreak = 0;
    let bestTroubleStreak = 0;
    let troubleAnswered = false;


    function renderFaultCase() {

        const fault =
            faultCases[currentFault];

        if (!fault) return;

        if ($("#faultTitle")) {
            $("#faultTitle").textContent =
                fault.title;
        }

        if ($("#faultDescription")) {
            $("#faultDescription").textContent =
                fault.description;
        }

        if ($("#faultNumber")) {
            $("#faultNumber").textContent =
                `Case ${currentFault + 1} / ${faultCases.length}`;
        }

        if ($("#faultScore")) {
            $("#faultScore").textContent =
                `Score: ${troubleScore}`;
        }

        const options =
            $("#faultOptions");

        if (!options) return;

        options.innerHTML = "";

        troubleAnswered = false;

        fault.options.forEach(
            (option, index) => {

                const button =
                    document.createElement("button");

                button.className =
                    "quiz-option";

                button.textContent =
                    option;

                button.addEventListener(
                    "click",
                    () => answerFault(index)
                );

                options.appendChild(button);
            }
        );

        if ($("#faultFeedback")) {
            $("#faultFeedback").textContent =
                "";
        }

        if ($("#faultNext")) {
            $("#faultNext").style.display =
                "none";
        }
    }


    function answerFault(selectedIndex) {

        if (troubleAnswered) return;

        troubleAnswered = true;

        const fault =
            faultCases[currentFault];

        const buttons =
            $("#faultOptions")
                ?.querySelectorAll("button");

        buttons?.forEach(
            (button, index) => {

                button.disabled = true;

                if (index === fault.answer) {
                    button.classList.add("correct");
                }

                if (
                    index === selectedIndex &&
                    index !== fault.answer
                ) {
                    button.classList.add("wrong");
                }
            }
        );

        if (selectedIndex === fault.answer) {

            troubleScore += 10;
            troubleStreak++;

            bestTroubleStreak =
                Math.max(
                    bestTroubleStreak,
                    troubleStreak
                );

            if ($("#faultFeedback")) {
                $("#faultFeedback").innerHTML =
                    `✅ Correct! ${fault.explanation}`;
            }

        } else {

            troubleStreak = 0;

            if ($("#faultFeedback")) {
                $("#faultFeedback").innerHTML =
                    `❌ Not quite. ${fault.explanation}`;
            }
        }

        if ($("#faultScore")) {
            $("#faultScore").textContent =
                `Score: ${troubleScore}`;
        }

        if ($("#faultStreak")) {
            $("#faultStreak").textContent =
                `🔥 Streak: ${troubleStreak}`;
        }

        if ($("#faultBest")) {
            $("#faultBest").textContent =
                `🏆 Best: ${bestTroubleStreak}`;
        }

        if ($("#faultNext")) {
            $("#faultNext").style.display =
                "inline-flex";
        }
    }


    function nextFaultCase() {

        currentFault++;

        if (currentFault >= faultCases.length) {

            currentFault = 0;

            if ($("#faultFeedback")) {
                $("#faultFeedback").textContent =
                    `🎉 Challenge complete! Final score: ${troubleScore}`;
            }
        }

        renderFaultCase();
    }


    const faultNext = $("#faultNext");

    if (faultNext) {
        faultNext.addEventListener(
            "click",
            nextFaultCase
        );
    }


    /* =========================================
       INSPECT MY CIRCUIT
    ========================================= */

    const inspectButton =
        $("#inspectCircuitBtn");

    if (inspectButton) {

        inspectButton.addEventListener(
            "click",
            inspectMyCircuit
        );
    }


    function inspectMyCircuit() {

        const report =
            $("#inspectionReport");

        if (!report) return;

        if (!builderComponents.length) {

            report.innerHTML = `
                <strong>🔍 Diagnosis</strong>
                <p>Your circuit is empty.</p>
                <p>Add a battery is automatic in this simulation, then add a bulb or resistor and turn the circuit ON.</p>
            `;

            return;
        }

        const voltage =
            builderVoltage
                ? Number(builderVoltage.value)
                : 12;

        const resistors =
            builderComponents.filter(
                component =>
                    component.type === "bulb" ||
                    component.type === "resistor"
            );

        const switches =
            builderComponents.filter(
                component =>
                    component.type === "switch"
            );

        const openSwitch =
            switches.some(
                component =>
                    component.closed === false
            );

        const totalResistance =
            calculateResistance(resistors);

        let diagnosis = "";
        let recommendation = "";

        if (!builderPowered) {

            diagnosis =
                "🔴 Power is OFF.";

            recommendation =
                "Turn the virtual circuit ON before diagnosing current flow.";

        } else if (openSwitch) {

            diagnosis =
                "🟠 Open switch detected.";

            recommendation =
                "Close the switch to restore the circuit path.";

        } else if (!resistors.length) {

            diagnosis =
                "🟠 No resistive components detected.";

            recommendation =
                "Add a bulb or resistor so the simulator can calculate current.";

        } else if (totalResistance <= 0) {

            diagnosis =
                "🔴 Invalid resistance.";

            recommendation =
                "Give the circuit components a resistance greater than zero.";

        } else {

            const current =
                voltage / totalResistance;

            diagnosis =
                "🟢 No basic fault detected.";

            recommendation =
                `The circuit can carry approximately ${formatNumber(current)} A of current at ${voltage} V.`;
        }

        report.innerHTML = `
            <strong>${diagnosis}</strong>
            <p>${recommendation}</p>
        `;
    }


    /* =========================================
       QUIZ
    ========================================= */

    const quizQuestions = [

        {
            question:
                "What happens to current when resistance increases while voltage stays the same?",

            options: [
                "Current decreases",
                "Current increases",
                "Current becomes voltage",
                "Nothing happens"
            ],

            answer: 0
        },

        {
            question:
                "What is the formula for Ohm's Law?",

            options: [
                "V = IR",
                "P = VI",
                "E = Pt",
                "R = P / I"
            ],

            answer: 0
        },

        {
            question:
                "What happens to total resistance when resistors are added in series?",

            options: [
                "They add together",
                "It becomes zero",
                "It always decreases",
                "It becomes equal to voltage"
            ],

            answer: 0
        },

        {
            question:
                "In a parallel circuit, what is the same across each branch?",

            options: [
                "Voltage",
                "Current",
                "Resistance",
                "Power"
            ],

            answer: 0
        },

        {
            question:
                "What unit is used for electrical power?",

            options: [
                "Watt",
                "Volt",
                "Ohm",
                "Ampere"
            ],

            answer: 0
        }
    ];


    let quizIndex = 0;
    let quizScore = 0;
    let quizAnswered = false;


    function renderQuiz() {

        const question =
            quizQuestions[quizIndex];

        if (!question) return;

        if ($("#quizQuestion")) {
            $("#quizQuestion").textContent =
                question.question;
        }

        if ($("#quizProgress")) {
            $("#quizProgress").textContent =
                `Question ${quizIndex + 1} / ${quizQuestions.length}`;
        }

        if ($("#quizScore")) {
            $("#quizScore").textContent =
                `Score: ${quizScore}`;
        }

        const options =
            $("#quizOptions");

        if (!options) return;

        options.innerHTML = "";

        quizAnswered = false;

        question.options.forEach(
            (option, index) => {

                const button =
                    document.createElement("button");

                button.className =
                    "quiz-option";

                button.textContent =
                    option;

                button.addEventListener(
                    "click",
                    () => answerQuiz(index)
                );

                options.appendChild(button);
            }
        );

        if ($("#quizFeedback")) {
            $("#quizFeedback").textContent =
                "";
        }

        if ($("#quizNext")) {
            $("#quizNext").style.display =
                "none";
        }
    }


    function answerQuiz(selectedIndex) {

        if (quizAnswered) return;

        quizAnswered = true;

        const question =
            quizQuestions[quizIndex];

        const buttons =
            $("#quizOptions")
                ?.querySelectorAll("button");

        buttons?.forEach(
            (button, index) => {

                button.disabled = true;

                if (index === question.answer) {
                    button.classList.add("correct");
                }

                if (
                    index === selectedIndex &&
                    index !== question.answer
                ) {
                    button.classList.add("wrong");
                }
            }
        );

        if (selectedIndex === question.answer) {

            quizScore++;

            if ($("#quizFeedback")) {
                $("#quizFeedback").textContent =
                    "✅ Correct!";
            }

        } else {

            if ($("#quizFeedback")) {
                $("#quizFeedback").textContent =
                    "❌ Incorrect. Try to remember the concept.";
            }
        }

        if ($("#quizScore")) {
            $("#quizScore").textContent =
                `Score: ${quizScore}`;
        }

        if ($("#quizNext")) {
            $("#quizNext").style.display =
                "inline-flex";
        }
    }


    function nextQuizQuestion() {

        quizIndex++;

        if (quizIndex >= quizQuestions.length) {

            if ($("#quizQuestion")) {
                $("#quizQuestion").textContent =
                    `🎉 Quiz complete! You scored ${quizScore}/${quizQuestions.length}.`;
            }

            if ($("#quizOptions")) {
                $("#quizOptions").innerHTML = "";
            }

            if ($("#quizFeedback")) {
                $("#quizFeedback").textContent =
                    "Restart the quiz to try again.";
            }

            if ($("#quizNext")) {
                $("#quizNext").style.display =
                    "none";
            }

            return;
        }

        renderQuiz();
    }


    const quizNext =
        $("#quizNext");

    if (quizNext) {
        quizNext.addEventListener(
            "click",
            nextQuizQuestion
        );
    }


    const quizRestart =
        $("#quizRestart");

    if (quizRestart) {

        quizRestart.addEventListener(
            "click",
            () => {

                quizIndex = 0;
                quizScore = 0;

                renderQuiz();
            }
        );
    }

    renderQuiz();
    renderFaultCase();


    /* =========================================
       SCROLL PROGRESS
    ========================================= */

    const progress =
        $(".scroll-progress");

    function updateScrollProgress() {

        if (!progress) return;

        const scrollTop =
            window.scrollY;

        const scrollHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            scrollHeight > 0
                ? (scrollTop / scrollHeight) * 100
                : 0;

        progress.style.width =
            `${percentage}%`;
    }

    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );

    updateScrollProgress();


    /* =========================================
       BACK TO TOP
    ========================================= */

    const backToTop =
        $(".back-to-top");

    if (backToTop) {

        window.addEventListener(
            "scroll",
            () => {

                backToTop.classList.toggle(
                    "show",
                    window.scrollY > 500
                );
            },
            { passive: true }
        );

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        );
    }


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-links a");

    if (sections.length && navLinks.length) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        navLinks.forEach(link => {

                            link.classList.remove(
                                "active"
                            );

                            if (
                                link.getAttribute("href") ===
                                `#${entry.target.id}`
                            ) {
                                link.classList.add(
                                    "active"
                                );
                            }
                        });
                    });
                },
                {
                    rootMargin:
                        "-30% 0px -60% 0px"
                }
            );

        sections.forEach(
            section =>
                observer.observe(section)
        );
    }


    /* =========================================
       FINAL STATUS
    ========================================= */

    console.log(
        "VoltLab Day 12 loaded successfully ⚡"
    );

});
