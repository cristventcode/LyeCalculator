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

// Table data elements for results 
var locationList = document.getElementById("ing-list-section"),
    lyeTd = document.getElementById("lye-td"),
    weightTd = document.getElementById("weight-td"),
    lyeWeightTd = document.getElementById("lyeWeight-td"),
    oilsFatsTd = document.getElementById("oilsFats-td"),
    totalLyeWeightTd = document.getElementById("total-lyeWeight-td"),
    totalOilsFatsTd = document.getElementById("total-oilsFats-td"),
    totalBatchTd = document.getElementById("total-batch-td");

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

// Results data object
var results = {
    lye: 0,
    weight: 0,
    lyeWeightTotal: 0,
    ingTotal: 0,
    lyeLiquid: 0,
    oilsFats: 0,
    batchTotal: 0
};

// Display Results
function genResults() {
    fillResults();
    displayResults();
    displayIngList();
}

function displayIngList() {
    var u = (step1.unit == "gram") ? " g" : " oz";
    for (var item in step2) {
        $(locationList).after("<tr> <td>" + item + "</td><td>" + step2[item].toFixed(2) + u + "</td><td>" + ((step2[item] / results.ingTotal) * 100).toFixed(1) + " %</td> </tr>");
    }
}

function getInputAmount(total) {
    if (step1.type == "solid") {
        return parseFloat(total * .33);
    } else {
        return parseFloat(total * .60);
    }
}

function getIngCount() {
    var total = 0;
    for (var item in step2) {
        total += step2[item];
    }
    return total;
}

function getLyeAmount() {
    var lyeAmount = 0;
    for (var item in step2) {
        if (step1.type == "solid") {
            lyeAmount += parseFloat(step2[item] * ingredients[item].solid);
        } else {
            lyeAmount += parseFloat(step2[item] * ingredients[item].liquid);
        }
    }
    return lyeAmount;
}

function fillResults() {
    results.ingTotal = getIngCount();
    results.lye = getLyeAmount();
    results.weight = getInputAmount(results.ingTotal);
    results.lyeLiquid = parseFloat(results.lye + results.weight);
    results.oilsFats = results.ingTotal;
    results.lyeWeightTotal = results.lyeLiquid;
    results.batchTotal = results.oilsFats + results.lyeWeightTotal;
}

function displayResults() {
    var u = (step1.unit == "gram") ? " g" : " oz";

    lyeTd.innerText = results.lye.toFixed(2) + u;
    weightTd.innerText = results.weight.toFixed(2) + u;
    lyeWeightTd.innerText = results.lyeLiquid.toFixed(2) + u;
    oilsFatsTd.innerText = (results.ingTotal).toFixed(2) + u;
    totalLyeWeightTd.innerText = results.lyeWeightTotal.toFixed(2) + u;
    totalOilsFatsTd.innerText = results.oilsFats.toFixed(2) + u;
    totalBatchTd.innerText = results.batchTotal.toFixed(2) + u;
}

$("#print-page-btn").click(function(){
    window.print();
})