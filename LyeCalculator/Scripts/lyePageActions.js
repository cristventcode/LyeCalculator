
var sampleData = [
    { id: 1, name: "Almond Oil", solid: .14, liquid: .21 },
    { id: 2, name: "Avocado Butter", solid: .13, liquid: .20 },
    { id: 3, name: "Castor Oil", solid: .14, liquid: .19 },
    { id: 4, name: "Kokum Butter", solid: .14, liquid: .20 },
    { id: 5, name: "Mango Butter", solid: .14, liquid: .20 },
];


var typeUnits = {
    type: "",
    unit: "",
    superFat: 0
}


var typeSelect = document.getElementById("type-select"),
    unitSelect = document.getElementById("unit-select"),
    fatSelect = document.getElementById("fat-select");
