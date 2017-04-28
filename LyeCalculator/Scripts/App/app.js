/// <reference path="../Scripts/typings/jquery/jquery.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main;
(function (Main) {
    // -- Classes start--
    var ingredient = (function () {
        function ingredient() {
        }
        return ingredient;
    }());
    Main.ingredient = ingredient;
    ;
    var sessionDetails = (function () {
        function sessionDetails() {
            this.ingredients = [];
        }
        return sessionDetails;
    }());
    ;
    var ingredientInput = (function (_super) {
        __extends(ingredientInput, _super);
        function ingredientInput() {
            _super.apply(this, arguments);
            this.amount = 0;
        }
        ingredientInput.prototype.addAmount = function (ing, amount) {
            this.id = ing.id,
                this.name = ing.name,
                this.liquid = ing.liquid,
                this.solid = ing.solid,
                this.amount = amount;
        };
        return ingredientInput;
    }(ingredient));
    var resultData = (function () {
        function resultData() {
            this.ingredientList = [];
            this.lye = 0;
            this.liquid = 0;
            this.oilsAndFats = 0;
        }
        return resultData;
    }());
    // -- Classes end --
    // Set sample data object
    var sampleData = [
        { id: 1, name: "Almond Oil", solid: .14, liquid: .21 },
        { id: 2, name: "Avocado Butter", solid: .13, liquid: .20 },
        { id: 3, name: "Castor Oil", solid: .14, liquid: .19 },
        { id: 4, name: "Kokum Butter", solid: .14, liquid: .20 },
        { id: 5, name: "Mango Butter", solid: .14, liquid: .20 },
    ];
    // Variable declarations
    var thisSession = new sessionDetails, thisResults = new resultData, tolistBtn = document.getElementById("tolist-btn"), listHolder, amountTableItem = document.getElementById("amount-table-items"), amountTableHolder = document.getElementById("amount-table-holder"), getResultsBtn = document.getElementById("get-results-btn");
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
        for (var item in list) {
            var itemObject = getIngById(list[item]);
            var ingTemplate = "<td><span class=\"ingredient-item\">" + itemObject.name + "</span></td>\n                               <td><input type=\"text\" id=\"ing-input-" + item + "\" class=\"form-control amount-list-input\" placeholder=\"0\"/><span class=\"hidden\">" + itemObject.id + "</span></td>\n                               <td class=\"text-center\"><button class=\"btn btn-xs btn-default delete-btn\">X</button><span class=\"hidden\">" + itemObject.id + "</span></td>";
            var element = document.createElement("tr");
            element.innerHTML = ingTemplate;
            amountTableItem.appendChild(element);
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
        toggleAmountHolder();
    });
    getResultsBtn.addEventListener("click", function () {
        var resultTable = document.getElementById("result-table");
        var inputList = document.getElementsByClassName("amount-list-input");
        for (var x = 0; x < inputList.length; x++) {
            var elementId = inputList[x].id;
            var element = document.getElementById(elementId);
            var ingId = (element.nextSibling.textContent);
            var ingObject = getIngById(parseInt(ingId));
            var newIngInput = new ingredientInput;
            newIngInput.addAmount(ingObject, parseInt(element.value));
            thisResults.ingredientList.push(newIngInput);
        }
        console.log(thisResults);
        renderResultData();
    });
    // Search sample data to get ingredient details by id
    function getIngById(searchId) {
        return sampleData.filter(function (item) { return item.id == searchId; })[0];
    }
    function renderResultData() {
        var tableElement = document.createElement("table");
        tableElement.classList.add("table");
        tableElement.id = "result-table";
        for (var item in thisResults.ingredientList) {
            var list = thisResults.ingredientList;
            thisResults.oilsAndFats += list[item].amount;
        }
        var ingRowsElements = "";
        for (var item in thisResults.ingredientList) {
            var list = thisResults.ingredientList;
            var template = "<tr><td>" + list[item].name + "</td> <td>" + list[item].amount + " </td> <td>" + list[item].amount / thisResults.oilsAndFats + " </td></tr>";
            ingRowsElements += template;
        }
        var tableTemplate = "\n                        <tr class=\"table-heading\">\n                            <th>Lye & Liquid</th>\n                            <th>Amount</th>\n                            <th></th>\n                        </tr>\n                        <tr>\n                            <td>Lye (Sodium Hydroxide)</td>\n                            <td>0.36 g</td>\n                            <td></td>\n                        </tr>\n                        <tr>\n                            <td>g of liquid</td>\n                            <td>0.66 g</td>\n                            <td></td>\n                        </tr>\n                        <tr>\n                            <td><b>Total</b></td>\n                            <td>1.02 g</td>\n                            <td></td>\n                        </tr>\n                        <tr class=\"table-heading\">\n                            <th>Oils & Fats</th>\n                            <th>Amount</th>\n                            <th>%</th>\n                        </tr>\n                            " + ingRowsElements + "\n                        <tr>\n                            <td><b>Total</b></td>\n                            <td>1.00 g</td>\n                            <td>100%</td>\n                        </tr>\n                        <tr>\n                        <tr class=\"table-heading\">\n                            <th>Totals</th>\n                            <th>Amount</th>\n                            <th></th>\n                        </tr>\n                        <tr>\n                            <td>Lye & Liquid</td>\n                            <td>0.66 g</td>\n                            <td></td>\n                        </tr>\n                        <tr>\n                            <td>Oils & Fats</td>\n                            <td>1.02 g</td>\n                            <td></td>\n                        </tr>\n                        <tr class=\"table-heading\">\n                            <th>Total Batch Yield</th>\n                            <th>3.02 g</th>\n                            <th></th>\n                        </tr>\n";
        var genTable = document.getElementById("result-table-holder");
        genTable.innerHTML = "";
        tableElement.innerHTML = tableTemplate;
        genTable.appendChild(tableElement);
    }
})(Main || (Main = {}));
//# sourceMappingURL=app.js.map