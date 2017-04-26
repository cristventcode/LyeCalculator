
namespace Main {
    class ingredient {
        name: string;
        solid: number;
        liquid: number;
    };

    class session {
        type: string;
        unit: string;
        superfat: number;
    };

    const sampleData: ingredient[] = [
        { name: "Almond Oil", solid: .14, liquid: .21 },
        { name: "Avocado Butter", solid: .13, liquid: .20 },
        { name: "Castor Oil", solid: .14, liquid: .19 },
        { name: "Kokum Butter", solid: .14, liquid: .20 },
        { name: "Mango Butter", solid: .14, liquid: .20 },
    ];

    (function loadSelectList() {
        let listHolder = document.getElementById("ingredient-select");

        for (let ing in sampleData) {
            let element = document.createElement("option");
            element.innerText = sampleData[ing].name;
            listHolder.appendChild(element);
        };

    })();
}

