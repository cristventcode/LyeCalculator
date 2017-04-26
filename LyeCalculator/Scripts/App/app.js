var Main;
(function (Main) {
    var ingredient = (function () {
        function ingredient() {
        }
        return ingredient;
    }());
    ;
    var session = (function () {
        function session() {
        }
        return session;
    }());
    ;
    var sampleData = [
        { name: "Almond Oil", solid: .14, liquid: .21 },
        { name: "Avocado Butter", solid: .13, liquid: .20 },
        { name: "Castor Oil", solid: .14, liquid: .19 },
        { name: "Kokum Butter", solid: .14, liquid: .20 },
        { name: "Mango Butter", solid: .14, liquid: .20 },
    ];
    (function loadSelectList() {
        var listHolder = document.getElementById("ingredient-select");
        for (var ing in sampleData) {
            var element = document.createElement("option");
            element.innerText = sampleData[ing].name;
            listHolder.appendChild(element);
        }
        ;
    })();
})(Main || (Main = {}));
//# sourceMappingURL=app.js.map