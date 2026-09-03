/* =====================================================
   VOLTLAB v0.8
   INTERACTIVE ELECTRICITY ENGINE
===================================================== */


/* =========================
   OHM'S LAW
========================= */

const voltageSlider =
    document.getElementById("voltage");

const resistanceSlider =
    document.getElementById("resistance");

const voltageValue =
    document.getElementById("voltageValue");

const resistanceValue =
    document.getElementById("resistanceValue");

const currentValue =
    document.getElementById("currentValue");

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


function calculateCurrent() {

    const voltage =
        Number(voltageSlider.value);

    const resistance =
        Number(resistanceSlider.value);

    const current =
        voltage / resistance;


    voltageValue.textContent =
        voltage;

    resistanceValue.textContent =
        resistance;

    currentValue.textContent =
        current.toFixed(2);


    circuitVoltage.textContent =
        voltage;

    circuitResistance.textContent =
        resistance;

    circuitCurrent.textContent =
        current.toFixed(2);


    let brightness =
        1 + current / 2;


    if (brightness > 3) {

        brightness = 3;

    }


    bulb.style.filter =
        `brightness(${brightness})`;


    let speed =
        3 - current / 5;


    if (speed < 0.4) {

        speed = 0.4;

    }


    electrons.forEach(function (electron) {

        electron.style.animationDuration =
            `${speed}s`;

    });


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


voltageSlider.addEventListener(
    "input",
    calculateCurrent
);

resistanceSlider.addEventListener(
    "input",
    calculateCurrent
);


calculateCurrent();



/* =========================
   SERIES CIRCUIT
========================= */

const seriesVoltage =
    document.getElementById("seriesVoltage");

const r1 =
    document.getElementById("r1");

const r2 =
    document.getElementById("r2");

const r3 =
    document.getElementById("r3");


const seriesVoltageValue =
    document.getElementById(
        "seriesVoltageValue"
    );

const r1Value =
    document.getElementById("r1Value");

const r2Value =
    document.getElementById("r2Value");

const r3Value =
    document.getElementById("r3Value");


const totalResistance =
    document.getElementById(
        "totalResistance"
    );

const seriesCurrent =
    document.getElementById(
        "seriesCurrent"
    );

const voltageDrop1 =
    document.getElementById(
        "voltageDrop1"
    );

const voltageDrop2 =
    document.getElementById(
        "voltageDrop2"
    );

const voltageDrop3 =
    document.getElementById(
        "voltageDrop3"
    );


function calculateSeriesCircuit() {

    const voltage =
        Number(seriesVoltage.value);

    const resistor1 =
        Number(r1.value);

    const resistor2 =
        Number(r2.value);

    const resistor3 =
        Number(r3.value);


    const total =
        resistor1 +
        resistor2 +
        resistor3;


    const current =
        voltage / total;


    seriesVoltageValue.textContent =
        voltage;

    r1Value.textContent =
        resistor1;

    r2Value.textContent =
        resistor2;

    r3Value.textContent =
        resistor3;


    totalResistance.textContent =
        total;

    seriesCurrent.textContent =
        current.toFixed(2);


    voltageDrop1.textContent =
        (current * resistor1)
            .toFixed(2);

    voltageDrop2.textContent =
        (current * resistor2)
            .toFixed(2);

    voltageDrop3.textContent =
        (current * resistor3)
            .toFixed(2);

}


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


calculateSeriesCircuit();



/* =========================
   PARALLEL CIRCUIT
========================= */

const parallelVoltage =
    document.getElementById(
        "parallelVoltage"
    );

const parallelR1 =
    document.getElementById(
        "parallelR1"
    );

const parallelR2 =
    document.getElementById(
        "parallelR2"
    );

const parallelR3 =
    document.getElementById(
        "parallelR3"
    );


const parallelVoltageValue =
    document.getElementById(
        "parallelVoltageValue"
    );

const parallelR1Value =
    document.getElementById(
        "parallelR1Value"
    );

const parallelR2Value =
    document.getElementById(
        "parallelR2Value"
    );

const parallelR3Value =
    document.getElementById(
        "parallelR3Value"
    );


const parallelTotalResistance =
    document.getElementById(
        "parallelTotalResistance"
    );

const parallelTotalCurrent =
    document.getElementById(
        "parallelTotalCurrent"
    );

const branchCurrent1 =
    document.getElementById(
        "branchCurrent1"
    );

const branchCurrent2 =
    document.getElementById(
        "branchCurrent2"
    );

const branchCurrent3 =
    document.getElementById(
        "branchCurrent3"
    );


function calculateParallelCircuit() {

    const voltage =
        Number(parallelVoltage.value);

    const resistor1 =
        Number(parallelR1.value);

    const resistor2 =
        Number(parallelR2.value);

    const resistor3 =
        Number(parallelR3.value);


    const inverseResistance =
        (1 / resistor1) +
        (1 / resistor2) +
        (1 / resistor3);


    const equivalentResistance =
        1 / inverseResistance;


    const current1 =
        voltage / resistor1;

    const current2 =
        voltage / resistor2;

    const current3 =
        voltage / resistor3;


    const totalCurrent =
        current1 +
        current2 +
        current3;


    parallelVoltageValue.textContent =
        voltage;

    parallelR1Value.textContent =
        resistor1;

    parallelR2Value.textContent =
        resistor2;

    parallelR3Value.textContent =
        resistor3;


    parallelTotalResistance.textContent =
        equivalentResistance.toFixed(2);

    parallelTotalCurrent.textContent =
        totalCurrent.toFixed(2);


    branchCurrent1.textContent =
        current1.toFixed(2);

    branchCurrent2.textContent =
        current2.toFixed(2);

    branchCurrent3.textContent =
        current3.toFixed(2);

}


parallelVoltage.addEventListener(
    "input",
    calculateParallelCircuit
);

parallelR1.addEventListener(
    "input",
    calculateParallelCircuit
);

parallelR2.addEventListener(
    "input",
    calculateParallelCircuit
);

parallelR3.addEventListener(
    "input",
    calculateParallelCircuit
);


calculateParallelCircuit();



/* =========================
   POWER & ENERGY
========================= */

const powerVoltage =
    document.getElementById(
        "powerVoltage"
    );

const powerCurrent =
    document.getElementById(
        "powerCurrent"
    );

const usageTime =
    document.getElementById(
        "usageTime"
    );


const powerVoltageValue =
    document.getElementById(
        "powerVoltageValue"
    );

const powerCurrentValue =
    document.getElementById(
        "powerCurrentValue"
    );

const usageTimeValue =
    document.getElementById(
        "usageTimeValue"
    );


const powerResult =
    document.getElementById(
        "powerResult"
    );

const energyWh =
    document.getElementById(
        "energyWh"
    );

const energyKwh =
    document.getElementById(
        "energyKwh"
    );


const powerMeterFill =
    document.getElementById(
        "powerMeterFill"
    );

const powerStatus =
    document.getElementById(
        "powerStatus"
    );

const energyInsight =
    document.getElementById(
        "energyInsight"
    );


function calculatePower() {

    const voltage =
        Number(powerVoltage.value);

    const current =
        Number(powerCurrent.value);

    const time =
        Number(usageTime.value);


    const power =
        voltage * current;

    const energy =
        power * time;

    const kwh =
        energy / 1000;


    powerVoltageValue.textContent =
        voltage;

    powerCurrentValue.textContent =
        current;

    usageTimeValue.textContent =
        time;


    powerResult.textContent =
        power.toFixed(1);

    energyWh.textContent =
        energy.toFixed(1);

    energyKwh.textContent =
        kwh.toFixed(2);


    let meterPercentage =
        (power / 4800) * 100;


    if (meterPercentage > 100) {

        meterPercentage = 100;

    }


    powerMeterFill.style.width =
        meterPercentage + "%";


    if (power < 100) {

        powerStatus.textContent =
            "Low Power 🟢";

        energyInsight.textContent =
            "This represents a low-power electrical load.";

    }

    else if (power < 500) {

        powerStatus.textContent =
            "Medium Power 🟡";

        energyInsight.textContent =
            "This circuit is consuming a moderate amount of electrical power.";

    }

    else if (power < 1500) {

        powerStatus.textContent =
            "High Power 🟠";

        energyInsight.textContent =
            "This circuit is consuming a significant amount of electrical power.";

    }

    else {

        powerStatus.textContent =
            "Very High Power 🔴";

        energyInsight.textContent =
            "This represents a high-power electrical load. In real systems, components and wiring must be appropriately rated.";

    }

}


powerVoltage.addEventListener(
    "input",
    calculatePower
);

powerCurrent.addEventListener(
    "input",
    calculatePower
);

usageTime.addEventListener(
    "input",
    calculatePower
);


calculatePower();



/* =========================
   QUIZ SYSTEM
========================= */

const quizQuestions = [

    {

        question:
            "According to Ohm's Law, what is the current when voltage is 12 V and resistance is 6 Ω?",

        options: [

            "0.5 A",
            "2 A",
            "6 A",
            "72 A"

        ],

        answer: 1,

        explanation:
            "Using I = V ÷ R, the current is 12 ÷ 6 = 2 A."

    },


    {

        question:
            "What remains the same through every component in a series circuit?",

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
            "What remains the same across every branch in a parallel circuit?",

        options: [

            "Current",
            "Voltage",
            "Resistance",
            "Power"

        ],

        answer: 1,

        explanation:
            "Each branch is connected across the same supply, so every branch receives the same voltage."

    },


    {

        question:
            "What is the electrical power when voltage is 10 V and current is 2 A?",

        options: [

            "5 W",
            "8 W",
            "12 W",
            "20 W"

        ],

        answer: 3,

        explanation:
            "Using P = V × I, the power is 10 × 2 = 20 W."

    },


    {

        question:
            "Which statement about a parallel circuit is correct?",

        options: [

            "It has only one path for current.",
            "The same current flows through every branch.",
            "Current divides between branches.",
            "Voltage divides equally across all branches."

        ],

        answer: 2,

        explanation:
            "A parallel circuit has multiple paths, so current divides between branches."

    }

];


let currentQuestionIndex =
    0;

let quizScore =
    0;

let questionAnswered =
    false;


const quizQuestion =
    document.getElementById(
        "quizQuestion"
    );

const quizOptions =
    document.getElementById(
        "quizOptions"
    );

const quizFeedback =
    document.getElementById(
        "quizFeedback"
    );

const quizNextButton =
    document.getElementById(
        "quizNextButton"
    );

const quizProgressText =
    document.getElementById(
        "quizProgressText"
    );

const quizProgressFill =
    document.getElementById(
        "quizProgressFill"
    );

const quizCard =
    document.getElementById(
        "quizCard"
    );

const quizResult =
    document.getElementById(
        "quizResult"
    );

const finalScore =
    document.getElementById(
        "finalScore"
    );

const performanceTitle =
    document.getElementById(
        "performanceTitle"
    );

const performanceMessage =
    document.getElementById(
        "performanceMessage"
    );

const restartQuiz =
    document.getElementById(
        "restartQuiz"
    );


function loadQuestion() {

    questionAnswered =
        false;

    quizNextButton.disabled =
        true;

    quizFeedback.className =
        "quiz-feedback";

    quizFeedback.textContent =
        "";


    const currentQuestion =
        quizQuestions[currentQuestionIndex];


    quizQuestion.textContent =
        currentQuestion.question;


    quizOptions.innerHTML =
        "";


    currentQuestion.options.forEach(
        function (option, index) {

            const optionButton =
                document.createElement(
                    "button"
                );


            optionButton.className =
                "quiz-option";


            optionButton.textContent =
                option;


            optionButton.addEventListener(
                "click",

                function () {

                    checkAnswer(
                        index,
                        optionButton
                    );

                }

            );


            quizOptions.appendChild(
                optionButton
            );

        }

    );


    quizProgressText.textContent =
        `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;


    const progress =
        ((currentQuestionIndex + 1) /
            quizQuestions.length) * 100;


    quizProgressFill.style.width =
        progress + "%";


    if (
        currentQuestionIndex ===
        quizQuestions.length - 1
    ) {

        quizNextButton.textContent =
            "See Results 🏆";

    }

    else {

        quizNextButton.textContent =
            "Next Question →";

    }

}


function checkAnswer(
    selectedIndex,
    selectedButton
) {

    if (questionAnswered) {

        return;

    }


    questionAnswered =
        true;


    const currentQuestion =
        quizQuestions[currentQuestionIndex];


    const optionButtons =
        document.querySelectorAll(
            ".quiz-option"
        );


    optionButtons.forEach(
        function (button, index) {

            button.disabled =
                true;


            if (
                index ===
                currentQuestion.answer
            ) {

                button.classList.add(
                    "correct"
                );

            }

        }

    );


    if (
        selectedIndex ===
        currentQuestion.answer
    ) {

        quizScore++;


        quizFeedback.classList.add(
            "show",
            "correct-feedback"
        );


        quizFeedback.innerHTML =
            `✅ Correct! <br><br>${currentQuestion.explanation}`;

    }

    else {

        selectedButton.classList.add(
            "wrong"
        );


        quizFeedback.classList.add(
            "show",
            "wrong-feedback"
        );


        quizFeedback.innerHTML =
            `❌ Not quite. <br><br>${currentQuestion.explanation}`;

    }


    quizNextButton.disabled =
        false;

}


function showQuizResult() {

    quizCard.style.display =
        "none";


    quizResult.classList.add(
        "show"
    );


    finalScore.textContent =
        quizScore;


    const percentage =
        (quizScore /
            quizQuestions.length) * 100;


    if (percentage === 100) {

        performanceTitle.textContent =
            "⚡ Electrical Master";

        performanceMessage.textContent =
            "Perfect score. Your understanding of VoltLab concepts is strong.";

    }

    else if (percentage >= 80) {

        performanceTitle.textContent =
            "🔋 Circuit Explorer";

        performanceMessage.textContent =
            "Strong performance. You understand most of the core electricity concepts.";

    }

    else if (percentage >= 60) {

        performanceTitle.textContent =
            "⚙️ Voltage Learner";

        performanceMessage.textContent =
            "You have a solid foundation, but revisiting a few concepts will make it stronger.";

    }

    else {

        performanceTitle.textContent =
            "🧠 Future Engineer";

        performanceMessage.textContent =
            "The foundation is still being built. Explore the labs again and take the challenge once more.";

    }

}


quizNextButton.addEventListener(
    "click",

    function () {

        currentQuestionIndex++;


        if (
            currentQuestionIndex <
            quizQuestions.length
        ) {

            loadQuestion();

        }

        else {

            showQuizResult();

        }

    }

);


restartQuiz.addEventListener(
    "click",

    function () {

        currentQuestionIndex =
            0;

        quizScore =
            0;

        questionAnswered =
            false;


        quizResult.classList.remove(
            "show"
        );


        quizCard.style.display =
            "block";


        loadQuestion();

    }

);


loadQuestion();



/* =========================
   NAVIGATION
========================= */

const progressBar =
    document.getElementById(
        "progressBar"
    );

const backToTop =
    document.getElementById(
        "backToTop"
    );

const navigationLinks =
    document.querySelectorAll(
        ".nav-links a"
    );

const sections =
    document.querySelectorAll(
        "#home, #ohms, #series, #parallel, #power, #compare, #quiz"
    );


window.addEventListener(
    "scroll",

    function () {

        const scrollTop =
            window.scrollY;


        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        const progress =
            documentHeight > 0
                ? (scrollTop /
                    documentHeight) * 100
                : 0;


        progressBar.style.width =
            progress + "%";


        if (scrollTop > 500) {

            backToTop.classList.add(
                "show"
            );

        }

        else {

            backToTop.classList.remove(
                "show"
            );

        }


        let currentSection =
            "home";


        sections.forEach(
            function (section) {

                const sectionTop =
                    section.offsetTop -
                    150;


                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    currentSection =
                        section.getAttribute(
                            "id"
                        );

                }

            }

        );


        navigationLinks.forEach(
            function (link) {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute("href") ===
                    "#" + currentSection
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }

        );

    }

);


backToTop.addEventListener(
    "click",

    function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

);
