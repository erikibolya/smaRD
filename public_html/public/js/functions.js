function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
            func.apply(context, args);
    };
}

function throttle(func, wait = 100) {
    let timer = null;
    return function (...args) {
        if (timer === null) {
            timer = setTimeout(() => {
                func.apply(this, args);
                timer = null;
            }, wait);
        }
    };
}

function getTopOffset(elem) { // crossbrowser version
    var box = elem.getBoundingClientRect();
    var body = document.body;
    var docEl = document.documentElement;
    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var clientTop = docEl.clientTop || body.clientTop || 0;
    var top = box.top + scrollTop - clientTop;
    return Math.round(top);
}

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}

function documentIsFinishedLoading() {
    return /^complete|^i|^c/.test(document.readyState);
}

function onDocumentReadyStateComplete(doWork) {
    var intervalId;
    if (documentIsFinishedLoading()) {
        doWork();
    } else {
        intervalId = setInterval(() => {
            if (documentIsFinishedLoading()) {
                doWork();
                clearInterval(intervalId);
            }
        }, 250);
    }
}

Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1)
        return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};