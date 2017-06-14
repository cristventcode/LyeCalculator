// Sample data
//var sampleData = [
//    { id: 1, name: "Almond Oil", solid: .14, liquid: .21 },
//    { id: 2, name: "Avocado Butter", solid: .13, liquid: .20 },
//    { id: 3, name: "Castor Oil", solid: .14, liquid: .19 },
//    { id: 4, name: "Kokum Butter", solid: .14, liquid: .20 },
//    { id: 5, name: "Mango Butter", solid: .14, liquid: .20 },
//];

var ingredients = {
    "Almond Oil": {
        solid: .14,
        liquid: .21
    },
    "Avocado Butter": {
        solid: .13,
        liquid: .20
    },
    "Castor Oil": {
        solid: .14,
        liquid: .19
    },
    "Kokum Butter": {
        solid: .14,
        liquid: .20
    },
    "Mango Butter": {
        solid: .14,
        liquid: .20
    }
}

// Load ingredient select inputs
//$(document).ready(function () {
//    listHolder = document.getElementById("ingredient-select");
//    for (let ing in sampleData) {
//        let element = document.createElement("option");
//        element.innerText = sampleData[ing].name;
//        element.value = sampleData[ing].id.toString();
//        listHolder.appendChild(element);
//    };
//})

// Step 1 object data
var step1 = {
    type: "",
    unit: "",
    superFat: 0
}

var step2 = {}

// Step 1 selects 
var typeSelect = document.getElementById("type-select"),
    unitSelect = document.getElementById("unit-select"),
    fatSelect = document.getElementById("fat-select");

// Step containers
var step1Container = document.getElementById("step1-container"),
    collapse1 = document.getElementById("collapse1"),
    step2Container = document.getElementById("step2-container"),
    collapse2 = document.getElementById("collapse2"),
    step3Container = document.getElementById("step3-container"),
    collapse3 = document.getElementById("collapse3");

//Step buttons
var step1Submit = document.getElementById("step1-submit"),
    step2Submit = document.getElementById("step2-submit");

// Other containers 
var amountTableHolder = document.getElementById("amount-table-holder");

// Step 1 button actions
step1Submit.addEventListener("click", function () {
    if (typeSelect.value == "-1" || typeSelect.unit == "-1") {
        document.getElementById("step1-error").innerText = "Please select TYPE and UNIT"
    } else {
        step1.type = typeSelect.value;
        step1.unit = unitSelect.value;
        toggleContainer(step2Container, "show")
        switchCollapse(collapse1, collapse2);
        console.log(step1);
    }
})

// Switch collapsed elements
function switchCollapse(first, second) {
    first.classList.remove("in");
    second.classList.add("in");
}

// Hide or show container
function toggleContainer(container, action) {
    if (action == "show") {
        container.classList.remove("hidden");
    } else {
        container.classList.add("hidden");
    }
}

// Add amounts and oil to data object
$(document).on('change', ".ing-input", function (event) {
    var oil = event.currentTarget.previousElementSibling.innerText.toString();
    var amount = parseFloat(event.currentTarget.value);
    step2[oil] = amount;
});


// Step 2 button actions
step2Submit.addEventListener("click", function () {
    toggleContainer(step3Container, "show")
    switchCollapse(collapse2, collapse3);
    console.log(step2)
    genResults();
})




//
var results = {
    lye: 0,
    weight: 0,
    lyeWeightTotal: 0,
    ingTotal: 0,
    lyeLiquid: 0,
    oilsFats: 0,
    batchTotal: 0
}

// Display Results
function genResults() {
    var locationList = document.getElementById("ing-list-section"),
        lyeTd = document.getElementById("lye-td"),
        weightTd = document.getElementById("weight-td"),
        lyeWeightTd = document.getElementById("lyeWeight-td"),
        oilsFatsTd = document.getElementById("oilsFats-td"),
        totalLyeWeightTd = document.getElementById("total-lyeWeight-td"),
        totalOilsFatsTd = document.getElementById("total-oilsFats-td"),
        totalBatchTd = document.getElementById("total-batch-td");

    var total = 0;
    for (var item in step2) {
        total += step2[item];
    }

    results.ingTotal = total;

    var lyeAmount = 0;

    for (var item in step2) {
        lyeAmount += parseFloat(step2[item] * ingredients[item].solid);
    }

    results.lye = (lyeAmount);

    var inputWeight = (total * .33);

    results.weight = parseFloat(inputWeight);
    results.lyeLiquid = parseFloat(results.lye + results.weight);
    results.oilsFats = results.ingTotal;
    results.lyeWeightTotal = results.lyeLiquid;
    results.batchTotal = results.oilsFats + results.lyeWeightTotal;

    console.log(results);

    lyeTd.innerText = results.lye.toFixed(2) + " g";
    weightTd.innerText = results.weight.toFixed(2) + " g";
    lyeWeightTd.innerText = results.lyeLiquid.toFixed(2) + " g";
    oilsFatsTd.innerText = (results.ingTotal).toFixed(2) + " g";
    totalLyeWeightTd.innerText = results.lyeWeightTotal.toFixed(2) + " g";
    totalOilsFatsTd.innerText = results.oilsFats.toFixed(2) + " g";
    totalBatchTd.innerText = results.batchTotal.toFixed(2) + " g";

    for (var item in step2) {
        $(locationList).after("<tr> <td>" + item + "</td><td>" + step2[item].toFixed(2) + " g</td><td>" + ((step2[item] / total) * 100).toFixed(1) + " %</td> </tr>");
    }
}