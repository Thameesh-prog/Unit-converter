
const category = document.getElementById("category");
const inputValue = document.getElementById("inputValue");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");

const units = {
    length: {
        Meter: 1,
        Kilometer: 1000,
        Centimeter: 0.01,
        Millimeter: 0.001,
        Mile: 1609.344,
        Foot: 0.3048,
        Inch: 0.0254
    },

    weight: {
        Kilogram: 1,
        Gram: 0.001,
        Milligram: 0.000001,
        Pound: 0.45359237,
        Ounce: 0.028349523125
    },

    temperature: {
        Celsius: "C",
        Fahrenheit: "F",
        Kelvin: "K"
    }
};

function loadUnits() {
    const selectedCategory = category.value;
    const availableUnits = Object.keys(units[selectedCategory]);

    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    availableUnits.forEach(unit => {
        fromUnit.add(new Option(unit, unit));
        toUnit.add(new Option(unit, unit));
    });

    if (selectedCategory === "length") {
        toUnit.value = "Kilometer";
    } else if (selectedCategory === "weight") {
        toUnit.value = "Gram";
    } else {
        toUnit.value = "Fahrenheit";
    }

    convert();
}

function convertTemperature(value, from, to) {
    let celsius;

    if (from === "Celsius") {
        celsius = value;
    } else if (from === "Fahrenheit") {
        celsius = (value - 32) * 5 / 9;
    } else {
        celsius = value - 273.15;
    }

    if (to === "Celsius") return celsius;
    if (to === "Fahrenheit") return celsius * 9 / 5 + 32;

    return celsius + 273.15;
}

function convert() {
    const value = Number(inputValue.value);
    const from = fromUnit.value;
    const to = toUnit.value;

    if (inputValue.value.trim() === "" || !Number.isFinite(value)) {
        result.textContent = "Please enter a valid number.";
        return;
    }

    let answer;

    if (category.value === "temperature") {
        answer = convertTemperature(value, from, to);
    } else {
        const baseValue = value * units[category.value][from];
        answer = baseValue / units[category.value][to];
    }

    result.textContent =
        `${value} ${from} = ${Number(answer.toFixed(6))} ${to}`;
}

category.addEventListener("change", loadUnits);
convertBtn.addEventListener("click", convert);

inputValue.addEventListener("input", convert);
fromUnit.addEventListener("change", convert);
toUnit.addEventListener("change", convert);

loadUnits();
