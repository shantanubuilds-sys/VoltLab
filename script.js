/* =====================================================
   VOLTLAB DAY 10
   Complete JavaScript
===================================================== */


/* =====================================================
   HELPER FUNCTIONS
===================================================== */

function get(id) {
    return document.getElementById(id);
}

function setText(id, value) {
    const element = get(id);

    if (element) {
        element.textContent = value;
    }
}

function number(value) {
    return Number(value);
}


/* =====================================================
   OHM'S LAW
===================================================== */

const voltageSlider = get("voltageSlider");
const resistanceSlider = get("resistanceSlider");

function updateOhmsLaw() {

    if (!voltageSlider || !resistanceSlider) return;

    const voltage = number(voltageSlider.value);
    const resistance = number(resistanceSlider.value);

    const current = voltage / resistance;

    setText("voltageValue", voltage);
    setText("resistanceValue", resistance);
    setText("currentResult", current.toFixed(2));

    const bulb = document.querySelector(".bulb-glass");

    if (bulb) {

        const brightness = Math.min(
            0.8,
            Math.max(0.1, current / 4)
        );

        bulb.style.background =
            `rgba(246,207,112,${brightness})`;

        bulb.style.boxShadow =
            `0 0 ${10 + current * 8}px rgba(246,207,112,${brightness})`;
    }

    const statusDot = get("circuitStatusDot");
    const status = get("circuitStatus");
    const info = get("circuitInfo");

    if (current < 0.5) {

        if (status) status.textContent = "Low Current";

        if (info) {
            info.textContent =
                "A small amount of current is flowing.";
        }

    } else if (current < 2.5) {

        if (status) status.textContent = "Circuit Active";

        if (info) {
            info.textContent =
                "Current is flowing normally.";
        }

    } else {

        if (status) status.textContent = "High Current";

        if (info) {
            info.textContent =
                "The circuit is carrying a relatively high current.";
        }
    }

    if (statusDot) {

        if (current >= 2.5) {
            statusDot.style.background = "var(--yellow)";
        } else {
            statusDot.style.background = "var(--green)";
        }
    }
}

if (voltageSlider) {
    voltageSlider.addEventListener("input", updateOhmsLaw);
}

if (resistanceSlider) {
    resistanceSlider.addEventListener("input", updateOhmsLaw);
}


/* =====================================================
   SERIES CIRCUIT
===================================================== */

const seriesVoltage = get("seriesVoltage");
const r1 = get("r1");
const r2 = get("r2");
const r3 = get("r3");

function updateSeries() {

    if (!seriesVoltage || !r1 || !r2 || !r3) return;

    const voltage = number(seriesVoltage.value);

    const R1 = number(r1.value);
    const R2 = number(r2.value);
    const R3 = number(r3.value);

    const totalResistance = R1 + R2 + R3;

    const current = voltage / totalResistance;

    const drop1 = current * R1;
    const drop2 = current * R2;
    const drop3 = current * R3;

    setText("seriesVoltageValue", voltage);

    setText("r1Value", R1);
    setText("r2Value", R2);
    setText("r3Value", R3);

    setText("seriesTotal", totalResistance);
    setText("seriesCurrent", current.toFixed(2));

    setText("drop1", drop1.toFixed(2));
    setText("drop2", drop2.toFixed(2));
    setText("drop3", drop3.toFixed(2));

    setText("seriesR1Diagram", `${R1}Ω`);
    setText("seriesR2Diagram", `${R2}Ω`);
    setText("seriesR3Diagram", `${R3}Ω`);
}

[
    seriesVoltage,
    r1,
    r2,
    r3
].forEach(element => {

    if (element) {
        element.addEventListener("input", updateSeries);
    }

});


/* =====================================================
   PARALLEL CIRCUIT
===================================================== */

const parallelVoltage = get("parallelVoltage");
const p1 = get("p1");
const p2 = get("p2");
const p3 = get("p3");

function updateParallel() {

    if (!parallelVoltage || !p1 || !p2 || !p3) return;

    const voltage = number(parallelVoltage.value);

    const R1 = number(p1.value);
    const R2 = number(p2.value);
    const R3 = number(p3.value);

    const equivalent =
        1 /
        (
            (1 / R1) +
            (1 / R2) +
            (1 / R3)
        );

    const branch1 = voltage / R1;
    const branch2 = voltage / R2;
    const branch3 = voltage / R3;

    const totalCurrent =
        branch1 +
        branch2 +
        branch3;

    setText("parallelVoltageValue", voltage);

    setText("p1Value", R1);
    setText("p2Value", R2);
    setText("p3Value", R3);

    setText(
        "parallelEquivalent",
        equivalent.toFixed(2)
    );

    setText(
        "parallelTotalCurrent",
        totalCurrent.toFixed(2)
    );

    setText(
        "branch1",
        branch1.toFixed(2)
    );

    setText(
        "branch2",
        branch2.toFixed(2)
    );

    setText(
        "branch3",
        branch3.toFixed(2)
    );
}

[
    parallelVoltage,
    p1,
    p2,
    p3
].forEach(element => {

    if (element) {
        element.addEventListener("input", updateParallel);
    }

});


/* =====================================================
   POWER & ENERGY LAB
===================================================== */

const powerVoltage = get("powerVoltage");
const powerCurrent = get("powerCurrent");
const usageTime = get("usageTime");

function updatePower() {

    if (!powerVoltage || !powerCurrent || !usageTime) return;

    const voltage = number(powerVoltage.value);
    const current = number(powerCurrent.value);
    const time = number(usageTime.value);

    const power = voltage * current;

    const energyWh = power * time;

    const energyKwh = energyWh / 1000;

    setText("powerVoltageValue", voltage);
    setText("powerCurrentValue", current);
    setText("usageTimeValue", time);

    setText("powerResult", power.toFixed(0));
    setText("powerResult2", power.toFixed(0));

    setText(
        "energyResult",
        energyWh.toFixed(0)
    );

    setText(
        "kwhResult",
        energyKwh.toFixed(2)
    );

    const meterFill = get("powerMeterFill");

    if (meterFill) {

        const percentage =
            Math.min(
                100,
                (power / 4800) * 100
            );

        meterFill.style.width =
            `${Math.max(2, percentage)}%`;
    }

    let statusText = "";

    if (power < 100) {

        statusText = "Low power load";

    } else if (power < 1000) {

        statusText = "Moderate power load";

    } else {

        statusText = "High power load";
    }

    setText("powerStatus", statusText);

    let insight = "";

    if (power < 100) {

        insight =
            "This load uses relatively little power. Longer operation may still add up over time.";

    } else if (power < 1000) {

        insight =
            "This is a moderate electrical load. Both power rating and operating time affect energy consumption.";

    } else {

        insight =
            "This is a high-power load. Reducing operating time can significantly reduce energy consumption.";
    }

    setText("powerInsight", insight);
}

[
    powerVoltage,
    powerCurrent,
    usageTime
].forEach(element => {

    if (element) {
        element.addEventListener("input", updatePower);
    }

});


/* =====================================================
   DAY 10
   ELECTRICITY COST SIMULATOR
===================================================== */

const appliancePreset = get("appliancePreset");
const appliancePower = get("appliancePower");
const dailyHours = get("dailyHours");
const billingDays = get("billingDays");
const tariff = get("tariff");

const reducedHours = get("reducedHours");


function calculateCost() {

    if (
        !appliancePower ||
        !dailyHours ||
        !billingDays ||
        !tariff
    ) {
        return;
    }

    const powerWatts =
        Math.max(
            0,
            number(appliancePower.value)
        );

    const hoursPerDay =
        Math.max(
            0,
            number(dailyHours.value)
        );

    const days =
        Math.max(
            0,
            number(billingDays.value)
        );

    const price =
        Math.max(
            0,
            number(tariff.value)
        );


    /*
        Convert W → kW
        Energy = Power × Time
    */

    const powerKW =
        powerWatts / 1000;

    const dailyKWh =
        powerKW * hoursPerDay;

    const monthlyKWh =
        dailyKWh * days;

    const dailyCost =
        dailyKWh * price;

    const monthlyCost =
        monthlyKWh * price;


    setText(
        "dailyHoursValue",
        hoursPerDay
    );

    setText(
        "billingDaysValue",
        days
    );


    setText(
        "dailyEnergy",
        dailyKWh.toFixed(2)
    );

    setText(
        "monthlyEnergy",
        monthlyKWh.toFixed(2)
    );

    setText(
        "dailyCost",
        dailyCost.toFixed(2)
    );

    setText(
        "monthlyCost",
        monthlyCost.toFixed(2)
    );


    /* -----------------------------------------
       Consumption Meter
    ----------------------------------------- */

    const consumptionPercent =
        Math.min(
            100,
            (monthlyKWh / 500) * 100
        );

    setText(
        "consumptionPercent",
        Math.round(consumptionPercent)
    );

    const meter =
        get("costMeterFill");

    if (meter) {

        meter.style.width =
            `${Math.max(2, consumptionPercent)}%`;
    }


    /* -----------------------------------------
       Message
    ----------------------------------------- */

    let message = "";

    if (monthlyKWh < 20) {

        message =
            "This appliance has a relatively low monthly energy demand.";

    } else if (monthlyKWh < 100) {

        message =
            "This appliance has a moderate monthly energy demand. Usage time makes a noticeable difference.";

    } else if (monthlyKWh < 250) {

        message =
            "This appliance can contribute significantly to monthly electricity consumption.";

    } else {

        message =
            "This is a high monthly energy demand. Reducing operating time could make a noticeable difference.";
    }

    setText(
        "costMessage",
        message
    );


    /* -----------------------------------------
       What-if Saving
    ----------------------------------------- */

    calculateSavings(
        powerWatts,
        hoursPerDay,
        days,
        price
    );
}


/* =====================================================
   SAVINGS CALCULATOR
===================================================== */

function calculateSavings(
    powerWatts,
    originalHours,
    days,
    price
) {

    if (!reducedHours) return;

    const reduced =
        Math.min(
            originalHours,
            Math.max(
                0,
                number(reducedHours.value)
            )
        );

    const originalMonthly =
        (powerWatts / 1000) *
        originalHours *
        days *
        price;

    const reducedMonthly =
        (powerWatts / 1000) *
        reduced *
        days *
        price;

    const saving =
        Math.max(
            0,
            originalMonthly - reducedMonthly
        );

    setText(
        "reducedHoursValue",
        reduced
    );

    setText(
        "monthlySaving",
        saving.toFixed(2)
    );
}


/* =====================================================
   APPLIANCE PRESETS
===================================================== */

if (appliancePreset) {

    appliancePreset.addEventListener(
        "change",
        function () {

            const selected =
                appliancePreset.value;

            if (selected !== "custom") {

                appliancePower.value =
                    selected;

                appliancePower.dispatchEvent(
                    new Event("input")
                );
            }
        }
    );
}


/* =====================================================
   COST EVENT LISTENERS
===================================================== */

[
    appliancePower,
    dailyHours,
    billingDays,
    tariff,
    reducedHours
].forEach(element => {

    if (element) {

        element.addEventListener(
            "input",
            calculateCost
        );
    }
});


/* =====================================================
   QUIZ
===================================================== */

const quizData = [

    {
        question:
            "A 12 V source is connected to a 6 Ω resistor. What current flows?",

        options: [
            "0.5 A",
            "2 A",
            "6 A",
            "72 A"
        ],

        answer: 1,

        explanation:
            "Using I = V / R, 12 / 6 = 2 A."
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

        answer: 2,

        explanation:
            "A series circuit has one path, so the same current flows through every component."
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

        answer: 1,

        explanation:
            "Every parallel branch is connected across the same two points, so each branch receives the same voltage."
    },


    {
        question:
            "A device uses 10 V and draws 2 A. What is its power?",

        options: [
            "5 W",
            "12 W",
            "20 W",
            "100 W"
        ],

        answer: 2,

        explanation:
            "Power is P = V × I, so 10 × 2 = 20 W."
    },


    {
        question:
            "What happens to current in a parallel circuit?",

        options: [
            "It cannot flow",
            "It becomes zero",
            "It divides between branches",
            "It becomes identical everywhere"
        ],

        answer: 2,

        explanation:
            "The total current divides among the available parallel paths."
    }

];


let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;


function loadQuiz() {

    const question =
        quizData[quizIndex];

    if (!question) return;

    setText(
        "quizCurrent",
        quizIndex + 1
    );

    setText(
        "quizTotal",
        quizData.length
    );

    setText(
        "quizScore",
        quizScore
    );

    setText(
        "quizQuestion",
        question.question
    );


    const progress =
        ((quizIndex + 1) /
            quizData.length) *
        100;

    const quizProgress =
        get("quizProgress");

    if (quizProgress) {

        quizProgress.style.width =
            `${progress}%`;
    }


    const optionsContainer =
        get("quizOptions");

    const feedback =
        get("quizFeedback");

    if (!optionsContainer) return;


    optionsContainer.innerHTML = "";

    if (feedback) {
        feedback.innerHTML = "";
    }


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
                () => checkAnswer(index)
            );

            optionsContainer.appendChild(
                button
            );
        }
    );
}


/* =====================================================
   CHECK ANSWER
===================================================== */

function checkAnswer(selectedIndex) {

    if (quizAnswered) return;

    quizAnswered = true;

    const question =
        quizData[quizIndex];

    const buttons =
        document.querySelectorAll(
            ".quiz-option"
        );

    buttons.forEach(button => {
        button.disabled = true;
    });


    if (
        selectedIndex ===
        question.answer
    ) {

        quizScore++;

        if (buttons[selectedIndex]) {

            buttons[selectedIndex]
                .classList.add("correct");
        }

        setText(
            "quizFeedback",
            `✓ Correct! ${question.explanation}`
        );

    } else {

        if (buttons[selectedIndex]) {

            buttons[selectedIndex]
                .classList.add("wrong");
        }

        if (buttons[question.answer]) {

            buttons[question.answer]
                .classList.add("correct");
        }

        setText(
            "quizFeedback",
            `✗ Not quite. ${question.explanation}`
        );
    }


    setText(
        "quizScore",
        quizScore
    );


    setTimeout(() => {

        quizIndex++;

        if (
            quizIndex >=
            quizData.length
        ) {

            showQuizResult();

        } else {

            loadQuiz();
        }

    }, 1400);
}


/* =====================================================
   QUIZ RESULT
===================================================== */

function showQuizResult() {

    const questionArea =
        document.querySelector(
            ".question-area"
        );

    const result =
        get("quizResult");

    const finalScore =
        get("finalScore");

    const resultTitle =
        get("resultTitle");

    const resultMessage =
        get("resultMessage");


    if (questionArea) {

        questionArea.classList.add(
            "hidden"
        );
    }

    if (result) {

        result.classList.remove(
            "hidden"
        );
    }

    if (finalScore) {

        finalScore.textContent =
            quizScore;
    }


    let title = "";
    let message = "";

    if (quizScore === 5) {

        title = "⚡ Perfect Run!";

        message =
            "You nailed every concept. VoltLab has nothing left to hide from you.";

    } else if (quizScore >= 4) {

        title = "🔥 Excellent Work!";

        message =
            "Your fundamentals are looking strong. One more pass and you're golden.";

    } else if (quizScore >= 3) {

        title = "💪 Solid Understanding!";

        message =
            "You've got the important ideas. Review the concepts you missed and try again.";

    } else {

        title = "🧠 Keep Experimenting!";

        message =
            "Electricity takes practice. Go back through the labs, change the values and run the challenge again.";
    }


    setText(
        "resultTitle",
        title
    );

    setText(
        "resultMessage",
        message
    );
}


/* =====================================================
   RESTART QUIZ
===================================================== */

const restartQuiz =
    get("restartQuiz");

if (restartQuiz) {

    restartQuiz.addEventListener(
        "click",
        () => {

            quizIndex = 0;
            quizScore = 0;

            const questionArea =
                document.querySelector(
                    ".question-area"
                );

            const result =
                get("quizResult");

            if (questionArea) {

                questionArea.classList.remove(
                    "hidden"
                );
            }

            if (result) {

                result.classList.add(
                    "hidden"
                );
            }

            loadQuiz();
        }
    );
}


/* =====================================================
   PAGE SCROLL PROGRESS
===================================================== */

const pageProgress =
    get("pageProgress");

const backToTop =
    get("backToTop");


function updateScrollUI() {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement
            .scrollHeight -
        window.innerHeight;

    const progress =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    if (pageProgress) {

        pageProgress.style.width =
            `${progress}%`;
    }


    if (backToTop) {

        if (scrollTop > 500) {

            backToTop.classList.add(
                "visible"
            );

        } else {

            backToTop.classList.remove(
                "visible"
            );
        }
    }
}

window.addEventListener(
    "scroll",
    updateScrollUI,
    { passive: true }
);


/* =====================================================
   BACK TO TOP
===================================================== */

if (backToTop) {

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


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(
        "main section"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting)
                    return;

                const id =
                    entry.target.id;

                navLinks.forEach(link => {

                    link.classList.remove(
                        "active"
                    );

                    if (
                        link.getAttribute(
                            "href"
                        ) === `#${id}`
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


sections.forEach(section => {

    observer.observe(section);
});


/* =====================================================
   INITIALIZE EVERYTHING
===================================================== */

updateOhmsLaw();

updateSeries();

updateParallel();

updatePower();

calculateCost();

loadQuiz();

updateScrollUI();


console.log(
    "⚡ VoltLab Day 10 loaded successfully."
);
