/// <reference path="../lib/@types/xrm/index.d.ts" />
var Account;
(function (Account) {
    function getClientUrl() {
        var url = Xrm.Page.context.getClientUrl();
        var b = 1;
        alert(url);
    }
    Account.getClientUrl = getClientUrl;
})(Account || (Account = {}));
//# sourceMappingURL=Account.js.map