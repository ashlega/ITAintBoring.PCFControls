/// <reference path="../lib/@types/xrm/index.d.ts" />
var Contact;
(function (Contact) {
    function getClientUrl() {
        var url = Xrm.Page.context.getClientUrl();
        var b = 1;
        alert(url);
    }
    Contact.getClientUrl = getClientUrl;
})(Contact || (Contact = {}));
//# sourceMappingURL=Contact.js.map