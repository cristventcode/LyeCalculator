/// <reference path="app.ts"/>
var Main;
(function (Main) {
    var person = (function () {
        function person() {
            this.name = "Cristian";
        }
        return person;
    }());
    Main.person = person;
})(Main || (Main = {}));
//# sourceMappingURL=testingThis.js.map