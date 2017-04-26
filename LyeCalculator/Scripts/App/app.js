var Main;
(function (Main) {
    var ingredient = (function () {
        function ingredient() {
        }
        return ingredient;
    }());
    ;
    var sessionDetails = (function () {
        function sessionDetails() {
            this.ingredients = [];
        }
        return sessionDetails;
    }());
    ;
    var sampleData = [
        { id: 1, name: "Almond Oil", solid: .14, liquid: .21 },
        { id: 2, name: "Avocado Butter", solid: .13, liquid: .20 },
        { id: 3, name: "Castor Oil", solid: .14, liquid: .19 },
        { id: 4, name: "Kokum Butter", solid: .14, liquid: .20 },
        { id: 5, name: "Mango Butter", solid: .14, liquid: .20 },
    ];
    var thisSession = new sessionDetails;
    var tolistBtn = document.getElementById("tolist-btn"), listHolder, amountTableItem = document.getElementById("amount-table-items");
    (function loadSelectList() {
        listHolder = document.getElementById("ingredient-select");
        for (var ing in sampleData) {
            var element = document.createElement("option");
            element.innerText = sampleData[ing].name;
            element.value = sampleData[ing].id.toString();
            listHolder.appendChild(element);
        }
        ;
    })();
    tolistBtn.addEventListener("click", function () {
        var selectionValue = listHolder.value;
        thisSession.ingredients.push(1);
        var ingDetials = sampleData.filter(function (item) { return item.id == selectionValue; })[0];
        alert(ingDetials.name);
        var ingTemplate = "<td><span class=\"ingredient-item\"></span></td >\n                           <td><input class=\"form-control\" />0</td>\n                           <td class=\"text-center\"> <button class=\"btn btn-xs btn-default delete-this-btn\" > X </button></td>";
    });
})(Main || (Main = {}));
//# sourceMappingURL=app.js.map