
/// <reference path="../Scripts/typings/jquery/jquery.d.ts"/>

namespace Main {

    class ingredient {
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

    const sampleData: ingredient[] = [
        { id: 1, name: "Almond Oil", solid: .14, liquid: .21 },
        { id: 2, name: "Avocado Butter", solid: .13, liquid: .20 },
        { id: 3, name: "Castor Oil", solid: .14, liquid: .19 },
        { id: 4, name: "Kokum Butter", solid: .14, liquid: .20 },
        { id: 5, name: "Mango Butter", solid: .14, liquid: .20 },
    ];

    let thisSession = new sessionDetails,
        tolistBtn = document.getElementById("tolist-btn"),
        listHolder: any,
        amountTableItem = document.getElementById("amount-table-items"),
        amountTableHolder = document.getElementById("amount-table-holder");


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
            let ingName = sampleData.filter(name => name.id == list[item])[0];

            let ingTemplate = `<td><span class="ingredient-item">${ingName.name}</span></td>
                               <td><input class="form-control" value="0"/></td>
                               <td class="text-center"><button class="btn btn-xs btn-default delete-btn">X</button><span class="hidden">${ingName.id}</span></td>`;
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
    $(document).on('click', ".delete-btn", function(event) {
        let itemId: any = event.currentTarget.nextSibling.textContent;
        let itemIndex: number = thisSession.ingredients.indexOf(itemId);
        thisSession.ingredients.splice(itemIndex, 1);
        renderAmountList();
    });
}


