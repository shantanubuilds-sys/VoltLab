/* =========================================
   VOLTLAB DAY 12
   CIRCUIT TROUBLESHOOTER
   Diagnose → Understand → Fix
   Cleaned + Bug-Fixed Version
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =========================================
       CORE HELPERS
    ========================================= */

    const $ = (selector, root = document) => root.querySelector(selector);

    const $$ = (selector, root = document) =>
        [...root.querySelectorAll(selector)];

    const setText = (selector, value) => {
        const element = $(selector);

        if (element) {
            element.textContent = value;
        }
    };

    const formatNumber = (value, decimals = 2) => {
        const number = Number(value);

        return Number.isFinite(number)
            ? number.toFixed(decimals)
            : "0";
    };

    const getNumber = (input, fallback = 0) => {
        if (!input) return fallback;

        const value = Number(input.value);

        return Number.isFinite(value)
            ? value
            : fallback;
    };

    const bindInput = (inputs, handler) => {
        inputs
            .filter(Boolean)
            .forEach(input => {
                input.addEventListener("input", handler);
            });
    };

    /* =========================================
       OHM'S LAW
    ========================================= */

    const voltageSlider = $("#voltage");
    const resistanceSlider = $("#resistance");

    function calculateOhmsLaw() {
        if (!voltageSlider || !resistanceSlider) return;

        const voltage = getNumber(voltageSlider);
        const resistance = getNumber(resistanceSlider);

        const current =
            resistance > 0
                ? voltage / resistance
                : 0;

        setText("#voltageValue", `${voltage} V`);
        setText("#resistanceValue", `${resistance} Ω`);
        setText("#currentResult", `${formatNumber(current)} A`);

        setText(
            "#ohmFormula",
            `I = V / R = ${voltage} / ${resistance}`
        );

        const lamp = $("#ohmLamp");

        if (lamp) {
            const active = current > 0;

            lamp.style.opacity = active ? "1" : "0.35";
            lamp.style.transform = active
                ? "scale(1.05)"
                : "scale(1)";
        }
    }

    bindInput(
        [voltageSlider, resistanceSlider],
        calculateOhmsLaw
    );

    calculateOhmsLaw();

    /* =========================================
       SERIES CIRCUIT
    ========================================= */

    const seriesVoltage = $("#seriesVoltage");
    const seriesR1 = $("#seriesR1");
    const seriesR2 = $("#seriesR2");
    const seriesR3 = $("#seriesR3");

    function calculateSeries() {
        if (
            !seriesVoltage ||
            !seriesR1 ||
            !seriesR2 ||
            !seriesR3
        ) {
            return;
        }

        const voltage = getNumber(seriesVoltage);
        const resistances = [
            getNumber(seriesR1),
            getNumber(seriesR2),
            getNumber(seriesR3)
        ];

        const totalResistance =
            resistances.reduce(
                (total, resistance) =>
                    total + resistance,
                0
            );

        const current =
            totalResistance > 0
                ? voltage / totalResistance
                : 0;

        const voltageDrops = resistances.map(
            resistance => current * resistance
        );

        setText(
            "#seriesVoltageValue",
            `${voltage} V`
        );

        setText(
            "#seriesR1Value",
            `${resistances[0]} Ω`
        );

        setText(
            "#seriesR2Value",
            `${resistances[1]} Ω`
        );

        setText(
            "#seriesR3Value",
            `${resistances[2]} Ω`
        );

        setText(
            "#seriesTotal",
            `${formatNumber(totalResistance)} Ω`
        );

        setText(
            "#seriesCurrent",
            `${formatNumber(current)} A`
        );

        setText(
            "#drop1",
            `${formatNumber(voltageDrops[0])} V`
        );

        setText(
            "#drop2",
            `${formatNumber(voltageDrops[1])} V`
        );

        setText(
            "#drop3",
            `${formatNumber(voltageDrops[2])} V`
        );
    }

    bindInput(
        [
            seriesVoltage,
            seriesR1,
            seriesR2,
            seriesR3
        ],
        calculateSeries
    );

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

        const voltage = getNumber(parallelVoltage);

        const resistances = [
            getNumber(parallelR1),
            getNumber(parallelR2),
            getNumber(parallelR3)
        ];

        const branchCurrents = resistances.map(
            resistance =>
                resistance > 0
                    ? voltage / resistance
                    : 0
        );

        const reciprocalResistance =
            resistances.reduce(
                (total, resistance) =>
                    total +
                    (resistance > 0
                        ? 1 / resistance
                        : 0),
                0
            );

        const equivalentResistance =
            reciprocalResistance > 0
                ? 1 / reciprocalResistance
                : 0;

        const totalCurrent =
            branchCurrents.reduce(
                (total, current) =>
                    total + current,
                0
            );

        setText(
            "#parallelVoltageValue",
            `${voltage} V`
        );

        setText(
            "#parallelR1Value",
            `${resistances[0]} Ω`
        );

        setText(
            "#parallelR2Value",
            `${resistances[1]} Ω`
        );

        setText(
            "#parallelR3Value",
            `${resistances[2]} Ω`
        );

        setText(
            "#parallelEquivalent",
            `${formatNumber(equivalentResistance)} Ω`
        );

        setText(
            "#parallelCurrent",
            `${formatNumber(totalCurrent)} A`
        );

        setText(
            "#parallelI1",
            `${formatNumber(branchCurrents[0])} A`
        );

        setText(
            "#parallelI2",
            `${formatNumber(branchCurrents[1])} A`
        );

        setText(
            "#parallelI3",
            `${formatNumber(branchCurrents[2])} A`
        );
    }

    bindInput(
        [
            parallelVoltage,
            parallelR1,
            parallelR2,
            parallelR3
        ],
        calculateParallel
    );

    calculateParallel();

    /* =========================================
       POWER & ENERGY
    ========================================= */

    const powerVoltage = $("#powerVoltage");
    const powerCurrent = $("#powerCurrent");
    const powerHours = $("#powerHours");

    function calculatePower() {
        if (
            !powerVoltage ||
            !powerCurrent ||
            !powerHours
        ) {
            return;
        }

        const voltage = getNumber(powerVoltage);
        const current = getNumber(powerCurrent);
        const hours = getNumber(powerHours);

        const power = voltage * current;
        const energyWh = power * hours;
        const energyKWh = energyWh / 1000;

        setText(
            "#powerVoltageValue",
            `${voltage} V`
        );

        setText(
            "#powerCurrentValue",
            `${current} A`
        );

        setText(
            "#powerHoursValue",
            `${hours} h`
        );

        setText(
            "#powerResult",
            `${formatNumber(power)} W`
        );

        setText(
            "#energyWh",
            `${formatNumber(energyWh)} Wh`
        );

        setText(
            "#energyKWh",
            `${formatNumber(energyKWh)} kWh`
        );
    }

    bindInput(
        [
            powerVoltage,
            powerCurrent,
            powerHours
        ],
        calculatePower
    );

    calculatePower();

    /* =========================================
       ELECTRICITY COST SIMULATOR
    ========================================= */

    const applianceSelect = $("#appliance");
    const costPower = $("#costPower");
    const costHours = $("#costHours");
    const costDays = $("#costDays");
    const tariff = $("#tariff");
    const reducedHours = $("#reducedHours");

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

    function getCostInputs() {
        return {
            power: Math.max(
                0,
                getNumber(costPower)
            ),

            hours: Math.max(
                0,
                getNumber(costHours)
            ),

            days: Math.max(
                0,
                getNumber(costDays)
            ),

            rate: Math.max(
                0,
                getNumber(tariff)
            )
        };
    }

    function calculateSavings() {
        if (
            !costPower ||
            !costHours ||
            !costDays ||
            !tariff ||
            !reducedHours
        ) {
            return;
        }

        const {
            power,
            hours,
            days,
            rate
        } = getCostInputs();

        const reduced = Math.max(
            0,
            getNumber(reducedHours)
        );

        const originalCost =
            (power * hours / 1000) *
            days *
            rate;

        const reducedCost =
            (power * reduced / 1000) *
            days *
            rate;

        const savings = Math.max(
            0,
            originalCost - reducedCost
        );

        setText(
            "#reducedHoursValue",
            `${reduced} h/day`
        );

        setText(
            "#monthlySavings",
            `₹${formatNumber(savings, 0)}`
        );
    }

    function calculateCost() {
        if (
            !costPower ||
            !costHours ||
            !costDays ||
            !tariff
        ) {
            return;
        }

        const {
            power,
            hours,
            days,
            rate
        } = getCostInputs();

        const dailyEnergy =
            (power * hours) / 1000;

        const monthlyEnergy =
            dailyEnergy * days;

        const dailyCost =
            dailyEnergy * rate;

        const monthlyCost =
            monthlyEnergy * rate;

        setText(
            "#dailyEnergy",
            `${formatNumber(dailyEnergy)} kWh`
        );

        setText(
            "#monthlyEnergy",
            `${formatNumber(monthlyEnergy)} kWh`
        );

        setText(
            "#dailyCost",
            `₹${formatNumber(dailyCost)}`
        );

        setText(
            "#monthlyCost",
            `₹${formatNumber(monthlyCost)}`
        );

        setText(
            "#monthlyCostBig",
            `₹${formatNumber(monthlyCost, 0)}`
        );

        calculateSavings();
    }

    if (applianceSelect) {
        applianceSelect.addEventListener(
            "change",
            () => {
                const selectedAppliance =
                    applianceSelect.value;

                const hasPreset =
                    Object.prototype.hasOwnProperty.call(
                        appliancePresets,
                        selectedAppliance
                    );

                if (
                    selectedAppliance !== "custom" &&
                    hasPreset &&
                    costPower
                ) {
                    costPower.value =
                        appliancePresets[selectedAppliance];
                }

                calculateCost();
            }
        );
    }

    bindInput(
        [
            costPower,
            costHours,
            costDays,
            tariff
        ],
        calculateCost
    );

    bindInput(
        [reducedHours],
        calculateSavings
    );

    calculateCost();

    /* =========================================
       CIRCUIT BUILDER
    ========================================= */

    let builderComponents = [];
    let builderMode = "series";
    let builderPowered = false;
    let componentId = 1;

    const builderVoltage = $("#builderVoltage");
    const builderVoltageValue =
        $("#builderVoltageValue");

    const seriesModeBtn =
        $("#seriesModeBtn");

    const parallelModeBtn =
        $("#parallelModeBtn");

    const addBulbBtn =
        $("#addBulbBtn");

    const addResistorBtn =
        $("#addResistorBtn");

    const addSwitchBtn =
        $("#addSwitchBtn");

    const powerCircuitBtn =
        $("#powerCircuitBtn");

    const resetBuilderBtn =
        $("#resetBuilderBtn");

    const builderCircuit =
        $("#builderCircuit");

    const componentList =
        $("#componentList");

    function createComponent(type) {
        const resistance =
            type === "bulb"
                ? 10
                : type === "resistor"
                    ? 20
                    : 0;

        return {
            id: componentId++,
            type,
            resistance,
            closed: true
        };
    }

    function addComponent(type) {
        builderComponents.push(
            createComponent(type)
        );

        updateBuilder();
    }

    function removeComponent(id) {
        builderComponents =
            builderComponents.filter(
                component =>
                    component.id !== id
            );

        updateBuilder();
    }

    function setBuilderMode(mode) {
        if (
            mode !== "series" &&
            mode !== "parallel"
        ) {
            return;
        }

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

        updateBuilder();
    }

    function toggleBuilderPower() {
        builderPowered = !builderPowered;

        updatePowerButton();

        updateBuilder();
    }

    function updatePowerButton() {
        if (!powerCircuitBtn) return;

        powerCircuitBtn.textContent =
            builderPowered
                ? "⏹ Turn OFF"
                : "▶ Turn ON";
    }

    function resetBuilder() {
        builderComponents = [];
        builderPowered = false;
        componentId = 1;

        updatePowerButton();
        updateBuilder();
    }

    function getPositiveResistance(value) {
        const resistance = Number(value);

        if (!Number.isFinite(resistance)) {
            return 1;
        }

        return Math.max(
            1,
            resistance
        );
    }

    function calculateResistance(
        resistors
    ) {
        if (!resistors.length) {
            return 0;
        }

        if (builderMode === "series") {
            return resistors.reduce(
                (total, component) =>
                    total +
                    getPositiveResistance(
                        component.resistance
                    ),
                0
            );
        }

        const reciprocal =
            resistors.reduce(
                (total, component) => {
                    const resistance =
                        getPositiveResistance(
                            component.resistance
                        );

                    return total +
                        1 / resistance;
                },
                0
            );

        return reciprocal > 0
            ? 1 / reciprocal
            : 0;
    }

    function getBuilderState() {
        const voltage = builderVoltage
            ? Math.max(
                0,
                getNumber(
                    builderVoltage,
                    12
                )
            )
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

        const hasOpenSwitch =
            switches.some(
                component =>
                    component.closed === false
            );

        const totalResistance =
            calculateResistance(
                resistors
            );

        const current =
            builderPowered &&
            !hasOpenSwitch &&
            totalResistance > 0
                ? voltage / totalResistance
                : 0;

        const activeBulbs =
            current > 0
                ? builderComponents.filter(
                    component =>
                        component.type === "bulb"
                ).length
                : 0;

        const isOn =
            builderPowered &&
            !hasOpenSwitch &&
            current > 0;

        return {
            voltage,
            resistors,
            switches,
            hasOpenSwitch,
            totalResistance,
            current,
            activeBulbs,
            isOn
        };
    }

    function calculateBuilder() {
        const state =
            getBuilderState();

        if (builderVoltageValue) {
            builderVoltageValue.textContent =
                `${state.voltage} V`;
        }

        setText(
            "#builderResistance",
            `${formatNumber(
                state.totalResistance
            )} Ω`
        );

        setText(
            "#builderCurrent",
            `${formatNumber(
                state.current
            )} A`
        );

        setText(
            "#activeBulbs",
            `${state.activeBulbs}`
        );

        setText(
            "#componentCount",
            `${builderComponents.length} components`
        );

        const status =
            $("#builderStatus");

        if (status) {
            status.textContent =
                state.isOn
                    ? "Circuit ON"
                    : "Circuit OFF";

            status.className =
                `circuit-status ${
                    state.isOn
                        ? "on"
                        : "off"
                }`;
        }

        return state;
    }

    function getComponentIcon(type) {
        const icons = {
            bulb: "💡",
            resistor: "▱",
            switch: "⏻"
        };

        return icons[type] || "⚡";
    }

    function getComponentName(type) {
        const names = {
            bulb: "Bulb",
            resistor: "Resistor",
            switch: "Switch"
        };

        return names[type] || "Component";
    }

    function isComponentActive(
        component,
        state
    ) {
        if (!state || !state.isOn) {
            return false;
        }

        if (component.type === "switch") {
            return component.closed;
        }

        return (
            component.type === "bulb" ||
            component.type === "resistor"
        );
    }

    /* =========================================
       BUILDER COMPONENT LIST
    ========================================= */

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

        componentList.replaceChildren();

        builderComponents.forEach(
            component => {
                const row =
                    document.createElement("div");

                row.className =
                    "component-row";

                const icon =
                    document.createElement("div");

                icon.className =
                    "component-row-icon";

                icon.textContent =
                    getComponentIcon(
                        component.type
                    );

                const info =
                    document.createElement("div");

                info.className =
                    "component-row-info";

                const name =
                    document.createElement("strong");

                name.textContent =
                    `${getComponentName(
                        component.type
                    )} #${component.id}`;

                const type =
                    document.createElement("span");

                type.textContent =
                    component.type === "switch"
                        ? "Control switch"
                        : "Resistance";

                info.append(
                    name,
                    type
                );

                row.append(
                    icon,
                    info
                );

                if (
                    component.type === "bulb" ||
                    component.type === "resistor"
                ) {
                    createResistanceControl(
                        row,
                        component
                    );
                } else {
                    createSwitchControl(
                        row,
                        component
                    );
                }

                const remove =
                    document.createElement("button");

                remove.className =
                    "remove-component";

                remove.type = "button";

                remove.textContent =
                    "Remove";

                remove.setAttribute(
                    "aria-label",
                    `Remove ${getComponentName(
                        component.type
                    )} #${component.id}`
                );

                remove.addEventListener(
                    "click",
                    () => {
                        removeComponent(
                            component.id
                        );
                    }
                );

                row.appendChild(remove);

                componentList.appendChild(row);
            }
        );
    }

    function createResistanceControl(
        row,
        component
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

        input.setAttribute(
            "aria-label",
            `${getComponentName(
                component.type
            )} resistance`
        );

        input.addEventListener(
            "input",
            () => {
                component.resistance =
                    getPositiveResistance(
                        input.value
                    );

                updateBuilder({
                    renderList: false
                });
            }
        );

        const unit =
            document.createElement("span");

        unit.textContent = "Ω";

        valueBox.append(
            input,
            unit
        );

        row.appendChild(valueBox);
    }

    function createSwitchControl(
        row,
        component
    ) {
        const switchButton =
            document.createElement("button");

        switchButton.className =
            "toggle-btn";

        switchButton.type = "button";

        switchButton.textContent =
            component.closed
                ? "Closed"
                : "Open";

        switchButton.setAttribute(
            "aria-pressed",
            String(component.closed)
        );

        switchButton.addEventListener(
            "click",
            () => {
                component.closed =
                    !component.closed;

                updateBuilder();
            }
        );

        row.appendChild(
            switchButton
        );
    }

    /* =========================================
       BUILDER CIRCUIT DIAGRAM
    ========================================= */

    function renderCircuitDiagram(
        state
    ) {
        if (!builderCircuit) return;

        builderCircuit.replaceChildren();

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
            renderSeriesDiagram(state);
        } else {
            renderParallelDiagram(state);
        }
    }

    function renderSeriesDiagram(state) {
        builderComponents.forEach(
            (component, index) => {
                builderCircuit.appendChild(
                    createBuilderItem(
                        component,
                        state
                    )
                );

                if (
                    index <
                    builderComponents.length - 1
                ) {
                    const connector =
                        document.createElement("div");

                    connector.className =
                        "builder-connector";

                    if (state.isOn) {
                        connector.classList.add(
                            "active"
                        );
                    }

                    builderCircuit.appendChild(
                        connector
                    );
                }
            }
        );
    }

    function renderParallelDiagram(state) {
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
                    isComponentActive(
                        component,
                        state
                    )
                ) {
                    branch.classList.add(
                        "active"
                    );
                }

                branch.appendChild(
                    createBuilderItem(
                        component,
                        state
                    )
                );

                branches.appendChild(
                    branch
                );
            }
        );

        layout.appendChild(
            branches
        );

        builderCircuit.appendChild(
            layout
        );
    }

    function createBuilderItem(
        component,
        state
    ) {
        const item =
            document.createElement("div");

        item.className =
            "builder-item";

        if (
            isComponentActive(
                component,
                state
            )
        ) {
            item.classList.add(
                "active"
            );
        }

        const icon =
            document.createElement("div");

        icon.className =
            "builder-item-icon";

        icon.textContent =
            getComponentIcon(
                component.type
            );

        const label =
            document.createElement("div");

        label.className =
            "builder-item-label";

        label.textContent =
            component.type === "switch"
                ? component.closed
                    ? "Closed"
                    : "Open"
                : `${component.resistance} Ω`;

        item.append(
            icon,
            label
        );

        return item;
    }

    /* =========================================
       BUILDER EXPLANATION
    ========================================= */

    function updateBuilderExplanation(
        state
    ) {
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

        if (state.hasOpenSwitch) {
            explanation.textContent =
                "The switch is open, so the circuit path is broken and current cannot flow.";

            return;
        }

        if (!state.resistors.length) {
            explanation.textContent =
                "The circuit needs at least one resistive component before current can be calculated.";

            return;
        }

        if (builderMode === "series") {
            explanation.textContent =
                "Series circuit: resistances add together and the same current flows through each component.";

            return;
        }

        explanation.textContent =
            "Parallel circuit: each branch gets the source voltage and the total current is the sum of branch currents.";
    }

    /* =========================================
       BUILDER UPDATE PIPELINE
    ========================================= */

    function updateBuilder(
        options = {}
    ) {
        const {
            renderList = true
        } = options;

        const state =
            calculateBuilder();

        if (renderList) {
            renderComponentList();
        }

        renderCircuitDiagram(
            state
        );

        updateBuilderExplanation(
            state
        );
    }

    bindInput(
        [builderVoltage],
        () => {
            updateBuilder({
                renderList: false
            });
        }
    );

    seriesModeBtn?.addEventListener(
        "click",
        () => {
            setBuilderMode("series");
        }
    );

    parallelModeBtn?.addEventListener(
        "click",
        () => {
            setBuilderMode("parallel");
        }
    );

    addBulbBtn?.addEventListener(
        "click",
        () => {
            addComponent("bulb");
        }
    );

    addResistorBtn?.addEventListener(
        "click",
        () => {
            addComponent("resistor");
        }
    );

    addSwitchBtn?.addEventListener(
        "click",
        () => {
            addComponent("switch");
        }
    );

    powerCircuitBtn?.addEventListener(
        "click",
        toggleBuilderPower
    );

    resetBuilderBtn?.addEventListener(
        "click",
        resetBuilder
    );

    updatePowerButton();
    updateBuilder();

    /* =========================================
       CIRCUIT TROUBLESHOOTER
    ========================================= */

    const faultCases = [
        {
            title:
                "The circuit won't turn on",

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
            title:
                "Current suddenly becomes zero",

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
            title:
                "Why did current decrease?",

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
            title:
                "One branch has a problem",

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

        setText(
            "#faultTitle",
            fault.title
        );

        setText(
            "#faultDescription",
            fault.description
        );

        setText(
            "#faultNumber",
            `Case ${
                currentFault + 1
            } / ${faultCases.length}`
        );

        setText(
            "#faultScore",
            `Score: ${troubleScore}`
        );

        setText(
            "#faultStreak",
            `🔥 Streak: ${troubleStreak}`
        );

        setText(
            "#faultBest",
            `🏆 Best: ${bestTroubleStreak}`
        );

        const options =
            $("#faultOptions");

        if (!options) return;

        options.replaceChildren();

        troubleAnswered = false;

        fault.options.forEach(
            (option, index) => {
                const button =
                    document.createElement("button");

                button.className =
                    "quiz-option";

                button.type = "button";

                button.textContent =
                    option;

                button.addEventListener(
                    "click",
                    () => {
                        answerFault(index);
                    }
                );

                options.appendChild(
                    button
                );
            }
        );

        setText(
            "#faultFeedback",
            ""
        );

        const nextButton =
            $("#faultNext");

        if (nextButton) {
            nextButton.style.display =
                "none";
        }
    }

    function answerFault(
        selectedIndex
    ) {
        if (troubleAnswered) return;

        const fault =
            faultCases[currentFault];

        if (!fault) return;

        troubleAnswered = true;

        const buttons =
            $$("#faultOptions button");

        buttons.forEach(
            (button, index) => {
                button.disabled = true;

                if (
                    index === fault.answer
                ) {
                    button.classList.add(
                        "correct"
                    );
                }

                if (
                    index === selectedIndex &&
                    index !== fault.answer
                ) {
                    button.classList.add(
                        "wrong"
                    );
                }
            }
        );

        if (
            selectedIndex ===
            fault.answer
        ) {
            troubleScore += 10;
            troubleStreak++;

            bestTroubleStreak =
                Math.max(
                    bestTroubleStreak,
                    troubleStreak
                );

            setText(
                "#faultFeedback",
                `✅ Correct! ${fault.explanation}`
            );
        } else {
            troubleStreak = 0;

            setText(
                "#faultFeedback",
                `❌ Not quite. ${fault.explanation}`
            );
        }

        setText(
            "#faultScore",
            `Score: ${troubleScore}`
        );

        setText(
            "#faultStreak",
            `🔥 Streak: ${troubleStreak}`
        );

        setText(
            "#faultBest",
            `🏆 Best: ${bestTroubleStreak}`
        );

        const nextButton =
            $("#faultNext");

        if (nextButton) {
            nextButton.style.display =
                "inline-flex";
        }
    }

    function nextFaultCase() {
        const completed =
            currentFault ===
            faultCases.length - 1;

        currentFault =
            (currentFault + 1) %
            faultCases.length;

        renderFaultCase();

        /*
         * Show completion feedback after
         * rendering the next case.
         *
         * The old version set this message
         * before renderFaultCase(), which
         * immediately erased it.
         */
        if (completed) {
            setText(
                "#faultFeedback",
                `🎉 Challenge complete! Final score: ${troubleScore}`
            );
        }
    }

    $("#faultNext")?.addEventListener(
        "click",
        nextFaultCase
    );

    $("#inspectCircuitBtn")?.addEventListener(
        "click",
        inspectMyCircuit
    );

    /* =========================================
       INSPECT MY CIRCUIT
    ========================================= */

    function inspectMyCircuit() {
        const report =
            $("#inspectionReport");

        if (!report) return;

        if (!builderComponents.length) {
            report.innerHTML = `
                <strong>🔍 Diagnosis</strong>
                <p>Your circuit is empty.</p>
                <p>Add a bulb or resistor and turn the circuit ON.</p>
            `;

            return;
        }

        const state =
            getBuilderState();

        let diagnosis;
        let recommendation;

        if (!builderPowered) {
            diagnosis =
                "🔴 Power is OFF.";

            recommendation =
                "Turn the virtual circuit ON before diagnosing current flow.";
        } else if (state.hasOpenSwitch) {
            diagnosis =
                "🟠 Open switch detected.";

            recommendation =
                "Close the switch to restore the circuit path.";
        } else if (!state.resistors.length) {
            diagnosis =
                "🟠 No resistive components detected.";

            recommendation =
                "Add a bulb or resistor so the simulator can calculate current.";
        } else if (
            state.totalResistance <= 0
        ) {
            diagnosis =
                "🔴 Invalid resistance.";

            recommendation =
                "Give the circuit components a resistance greater than zero.";
        } else {
            diagnosis =
                "🟢 No basic fault detected.";

            recommendation =
                `The circuit can carry approximately ${
                    formatNumber(state.current)
                } A of current at ${
                    state.voltage
                } V.`;
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

        setText(
            "#quizQuestion",
            question.question
        );

        setText(
            "#quizProgress",
            `Question ${
                quizIndex + 1
            } / ${quizQuestions.length}`
        );

        setText(
            "#quizScore",
            `Score: ${quizScore}`
        );

        const options =
            $("#quizOptions");

        if (!options) return;

        options.replaceChildren();

        quizAnswered = false;

        question.options.forEach(
            (option, index) => {
                const button =
                    document.createElement("button");

                button.className =
                    "quiz-option";

                button.type = "button";

                button.textContent =
                    option;

                button.addEventListener(
                    "click",
                    () => {
                        answerQuiz(index);
                    }
                );

                options.appendChild(
                    button
                );
            }
        );

        setText(
            "#quizFeedback",
            ""
        );

        const nextButton =
            $("#quizNext");

        if (nextButton) {
            nextButton.style.display =
                "none";
        }
    }

    function answerQuiz(
        selectedIndex
    ) {
        if (quizAnswered) return;

        const question =
            quizQuestions[quizIndex];

        if (!question) return;

        quizAnswered = true;

        const buttons =
            $$("#quizOptions button");

        buttons.forEach(
            (button, index) => {
                button.disabled = true;

                if (
                    index === question.answer
                ) {
                    button.classList.add(
                        "correct"
                    );
                }

                if (
                    index === selectedIndex &&
                    index !== question.answer
                ) {
                    button.classList.add(
                        "wrong"
                    );
                }
            }
        );

        if (
            selectedIndex ===
            question.answer
        ) {
            quizScore++;

            setText(
                "#quizFeedback",
                "✅ Correct!"
            );
        } else {
            setText(
                "#quizFeedback",
                "❌ Incorrect. Try to remember the concept."
            );
        }

        setText(
            "#quizScore",
            `Score: ${quizScore}`
        );

        const nextButton =
            $("#quizNext");

        if (nextButton) {
            nextButton.style.display =
                "inline-flex";
        }
    }

    function nextQuizQuestion() {
        quizIndex++;

        if (
            quizIndex >=
            quizQuestions.length
        ) {
            setText(
                "#quizQuestion",
                `🎉 Quiz complete! You scored ${
                    quizScore
                }/${quizQuestions.length}.`
            );

            const options =
                $("#quizOptions");

            if (options) {
                options.replaceChildren();
            }

            setText(
                "#quizFeedback",
                "Restart the quiz to try again."
            );

            const nextButton =
                $("#quizNext");

            if (nextButton) {
                nextButton.style.display =
                    "none";
            }

            return;
        }

        renderQuiz();
    }

    $("#quizNext")?.addEventListener(
        "click",
        nextQuizQuestion
    );

    $("#quizRestart")?.addEventListener(
        "click",
        () => {
            quizIndex = 0;
            quizScore = 0;
            quizAnswered = false;

            renderQuiz();
        }
    );

    renderQuiz();
    renderFaultCase();

    /* =========================================
       SCROLL PROGRESS
    ========================================= */

    const progress =
        $(".scroll-progress");

    function updateScrollProgress() {
        if (!progress) return;

        const scrollHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            scrollHeight > 0
                ? (
                    window.scrollY /
                    scrollHeight
                ) * 100
                : 0;

        progress.style.width =
            `${percentage}%`;
    }

    window.addEventListener(
        "scroll",
        updateScrollProgress,
        {
            passive: true
        }
    );

    updateScrollProgress();

    /* =========================================
       BACK TO TOP
    ========================================= */

    const backToTop =
        $(".back-to-top");

    if (backToTop) {
        const updateBackToTop = () => {
            backToTop.classList.toggle(
                "show",
                window.scrollY > 500
            );
        };

        window.addEventListener(
            "scroll",
            updateBackToTop,
            {
                passive: true
            }
        );

        updateBackToTop();

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
        $$("section[id]");

    const navLinks =
        $$(".nav-links a");

    if (
        sections.length &&
        navLinks.length &&
        "IntersectionObserver" in window
    ) {
        const observer =
            new IntersectionObserver(
                entries => {
                    entries.forEach(
                        entry => {
                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }

                            navLinks.forEach(
                                link => {
                                    link.classList.toggle(
                                        "active",
                                        link.getAttribute(
                                            "href"
                                        ) ===
                                        `#${entry.target.id}`
                                    );
                                }
                            );
                        }
                    );
                },
                {
                    rootMargin:
                        "-30% 0px -60% 0px"
                }
            );

        sections.forEach(
            section => {
                observer.observe(section);
            }
        );
    }

    /* =========================================
       INITIALIZATION COMPLETE
    ========================================= */

    console.log(
        "VoltLab Day 12 loaded successfully ⚡"
    );
});
