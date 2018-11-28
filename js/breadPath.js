function makeBreadPath() {
    function isPathExistInCookies(path) {
        for (var i = 0; i < breadCrumbs.length; i++)
            if (breadCrumbs[i].path === path)
                return i < 1 ? 1 : i;
        return false;
    }
    var breadCrumbs = JSON.parse(getCookie("bread"));
    var result = isPathExistInCookies(window.location.pathname);
    if (!result)
    {
        var obj = {};
        obj.host = window.location.host;
        obj.path = window.location.pathname;
        breadCrumbs.push(obj);
        document.cookie = "bread=" + JSON.stringify(breadCrumbs);
    }
}

function breadChain() {
    var breadCrumbs = JSON.parse(getCookie("bread"));
    var breadChain_wrapper = document.createElement("div");
    for (var i = 0; i < breadCrumbs.length; i++)
    {
        var breadChainElementName = findBreadChainElementName(breadCrumbs[i].path);
        var ceil = document.createElement("a");
        ceil.setAttribute("href", breadCrumbs[i].path);
        ceil.innerText = breadChainElementName;
        breadChain_wrapper.appendChild(ceil);
    }
        document.body.insertBefore(breadChain_wrapper, document.body.firstChild);

    function findBreadChainElementName (path){
        var arr = path.split("/");
        return  arr[arr.length - 1].slice(0, -5) === "index" ? "home" : arr[arr.length - 1].slice(0, -5);
    }
}
