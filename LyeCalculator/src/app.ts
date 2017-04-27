
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

    let thisSession = new sessionDetails;

    let tolistBtn = document.getElementById("tolist-btn"),
        listHolder: any,
        amountTableItem = document.getElementById("amount-table-items"),
        amountTableHolder = document.getElementById("amount-table-holder");

    (function loadSelectList() {
        listHolder = document.getElementById("ingredient-select");

        for (let ing in sampleData) {
            let element = document.createElement("option");
            element.innerText = sampleData[ing].name;
            element.value = sampleData[ing].id.toString();
            listHolder.appendChild(element);
        };
    })();

    tolistBtn.addEventListener("click", function () {
        let selectionValue = listHolder.value;
        thisSession.ingredients.push(selectionValue);
        renderAmountList();
        toggleAmountHolder();
    });

    function renderAmountList() {
        var list = thisSession.ingredients;
        amountTableItem.innerHTML = "";
        for (let item in list) {
            let ingName = sampleData.filter(name => name.id == list[item])[0].name;

            let ingTemplate = `<td><span class="ingredient-item">${ingName}</span></td>
                               <td><input class="form-control" value="0"/></td>
                               <td class="text-center"><button class="btn btn-xs btn-default delete-btn">X</button></td>`;
            let element = document.createElement("tr");
            element.innerHTML = ingTemplate;
            amountTableItem.appendChild(element);
        }
    }

    function toggleAmountHolder() {
        let table = amountTableHolder,
            amount: number = thisSession.ingredients.length;
        (amount > 0) ? table.classList.remove("hidden") : table.classList.add("hidden");
    }
}


