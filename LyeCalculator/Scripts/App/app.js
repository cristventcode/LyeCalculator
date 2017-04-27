/// <reference path="../Scripts/typings/jquery/jquery.d.ts"/>
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
    var thisSession = new sessionDetails, tolistBtn = document.getElementById("tolist-btn"), listHolder, amountTableItem = document.getElementById("amount-table-items"), amountTableHolder = document.getElementById("amount-table-holder");
    // IIFE to generate the selection list based on the sample data
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
    // Add the ingredient selected from the list
    tolistBtn.addEventListener("click", function () {
        var selectionValue = listHolder.value;
        thisSession.ingredients.push(selectionValue);
        renderAmountList();
        toggleAmountHolder();
    });
    // Render ingredients list from session object
    var renderAmountList = function renderAmountList() {
        var list = thisSession.ingredients;
        amountTableItem.innerHTML = "";
        var _loop_1 = function(item) {
            var ingName = sampleData.filter(function (name) { return name.id == list[item]; })[0];
            var ingTemplate = "<td><span class=\"ingredient-item\">" + ingName.name + "</span></td>\n                               <td><input class=\"form-control\" value=\"0\"/></td>\n                               <td class=\"text-center\"><button class=\"btn btn-xs btn-default delete-btn\">X</button><span class=\"hidden\">" + ingName.id + "</span></td>";
            var element = document.createElement("tr");
            element.innerHTML = ingTemplate;
            amountTableItem.appendChild(element);
        };
        for (var item in list) {
            _loop_1(item);
        }
    };
    // Display or hide the amount table based on session ingredients length 
    function toggleAmountHolder() {
        var table = amountTableHolder, amount = thisSession.ingredients.length;
        (amount > 0) ? table.classList.remove("hidden") : table.classList.add("hidden");
    }
    // Delete amount table rows on click and update session object
    $(document).on('click', ".delete-btn", function (event) {
        var itemId = event.currentTarget.nextSibling.textContent;
        var itemIndex = thisSession.ingredients.indexOf(itemId);
        thisSession.ingredients.splice(itemIndex, 1);
        renderAmountList();
    });
})(Main || (Main = {}));
//# sourceMappingURL=app.js.map