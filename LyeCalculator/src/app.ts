
/// <reference path="../Scripts/typings/jquery/jquery.d.ts"/>

namespace Main {

    // -- Classes start--
    export class ingredient {
        id: number
        name: string;
        solid: number;
        liquid: number;
    };

    class sessionDetails {
        type: string;
        unit: string;
        superfat: number;
        ingredients: number[] = [];
    };

    class ingredientInput extends ingredient {
        amount: number = 0;
        addAmount(ing: ingredient, amount: number) {
            this.id = ing.id,
                this.name = ing.name,
                this.liquid = ing.liquid,
                this.solid = ing.solid,
                this.amount = amount
        }
    }

    class resultData {
        ingredientList: ingredientInput[] = [];
        lye: number = 0;
        liquid: number = 0;
        oilsAndFats: number = 0;
    }
    // -- Classes end --


    // Set sample data object
    const sampleData: ingredient[] = [
        { id: 1, name: "Almond Oil", solid: .14, liquid: .21 },
        { id: 2, name: "Avocado Butter", solid: .13, liquid: .20 },
        { id: 3, name: "Castor Oil", solid: .14, liquid: .19 },
        { id: 4, name: "Kokum Butter", solid: .14, liquid: .20 },
        { id: 5, name: "Mango Butter", solid: .14, liquid: .20 },
    ];

    // Variable declarations
    let thisSession = new sessionDetails,
        thisResults = new resultData,
        tolistBtn = document.getElementById("tolist-btn"),
        listHolder: any,
        amountTableItem = document.getElementById("amount-table-items"),
        amountTableHolder = document.getElementById("amount-table-holder"),
        getResultsBtn = document.getElementById("get-results-btn");

    // IIFE to generate the selection list based on the sample data
    (function loadSelectList() {
        listHolder = document.getElementById("ingredient-select");
        for (let ing in sampleData) {
            let element = document.createElement("option");
            element.innerText = sampleData[ing].name;
            element.value = sampleData[ing].id.toString();
            listHolder.appendChild(element);
        };

    })();

    // Add the ingredient selected from the list
    tolistBtn.addEventListener("click", function () {
        let selectionValue = listHolder.value;
        thisSession.ingredients.push(selectionValue);
        renderAmountList();
        toggleAmountHolder();
    });

    // Render ingredients list from session object
    var renderAmountList = function renderAmountList() {
        var list = thisSession.ingredients;
        amountTableItem.innerHTML = "";
        for (let item in list) {
            let itemObject = getIngById(list[item]);
            let ingTemplate = `<td><span class="ingredient-item">${itemObject.name}</span></td>
                               <td><input type="text" id="ing-input-${item}" class="form-control amount-list-input" placeholder="0"/><span class="hidden">${itemObject.id}</span></td>
                               <td class="text-center"><button class="btn btn-xs btn-default delete-btn">X</button><span class="hidden">${itemObject.id}</span></td>`;
            let element = document.createElement("tr");
            element.innerHTML = ingTemplate;
            amountTableItem.appendChild(element);
        }
    }

    // Display or hide the amount table based on session ingredients length 
    function toggleAmountHolder() {
        let table = amountTableHolder,
            amount: number = thisSession.ingredients.length;
        (amount > 0) ? table.classList.remove("hidden") : table.classList.add("hidden");
    }

    // Delete amount table rows on click and update session object
    $(document).on('click', ".delete-btn", function (event) {
        let itemId: any = event.currentTarget.nextSibling.textContent;
        let itemIndex: number = thisSession.ingredients.indexOf(itemId);
        thisSession.ingredients.splice(itemIndex, 1);
        renderAmountList();
        toggleAmountHolder();
    });

    getResultsBtn.addEventListener("click", function () {
        let resultTable = document.getElementById("result-table");

        var inputList = document.getElementsByClassName("amount-list-input");

        for (let x = 0; x < inputList.length; x++) {
            let elementId = inputList[x].id;
            let element = <HTMLInputElement>document.getElementById(elementId);

            let ingId = (element.nextSibling.textContent);

            let ingObject = getIngById(parseInt(ingId))

            let newIngInput = new ingredientInput;

            newIngInput.addAmount(ingObject, parseInt(element.value));

            thisResults.ingredientList.push(newIngInput);
        }
        console.log(thisResults);

        renderResultData();
    });

    // Search sample data to get ingredient details by id
    function getIngById(searchId: number) {
        return sampleData.filter(item => item.id == searchId)[0];
    }


    function renderResultData() {
        let tableElement = document.createElement("table");

        tableElement.classList.add("table");
        tableElement.id = "result-table";

        for (let item in thisResults.ingredientList) {
            let list = thisResults.ingredientList;
            thisResults.oilsAndFats += list[item].amount;
        }

        let ingRowsElements: string = "";

        for (let item in thisResults.ingredientList) {
            let list = thisResults.ingredientList;
            let template = `<tr><td>${list[item].name}</td> <td>${(list[item].amount).toFixed(2)} </td> <td>${((list[item].amount / thisResults.oilsAndFats) * 100).toFixed(1)} % </td></tr>`;
            ingRowsElements += template;
        }

        let tableTemplate = `
                        <tr class="table-heading">
                            <th>Lye & Liquid</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                        <tr>
                            <td>Lye (Sodium Hydroxide)</td>
                            <td>0.36 g</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>g of liquid</td>
                            <td>0.66 g</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><b>Total</b></td>
                            <td>1.02 g</td>
                            <td></td>
                        </tr>
                        <tr class="table-heading">
                            <th>Oils & Fats</th>
                            <th>Amount</th>
                            <th>%</th>
                        </tr>
                            ${ingRowsElements}
                        <tr>
                            <td><b>Total</b></td>
                            <td>1.00 g</td>
                            <td>100 %</td>
                        </tr>
                        <tr>
                        <tr class="table-heading">
                            <th>Totals</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                        <tr>
                            <td>Lye & Liquid</td>
                            <td>0.66 g</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Oils & Fats</td>
                            <td>1.02 g</td>
                            <td></td>
                        </tr>
                        <tr class="table-heading">
                            <th>Total Batch Yield</th>
                            <th>3.02 g</th>
                            <th></th>
                        </tr>
`;

        var genTable = document.getElementById("result-table-holder");

        genTable.innerHTML = "";

        tableElement.innerHTML = tableTemplate;

        genTable.appendChild(tableElement);
    }

}


