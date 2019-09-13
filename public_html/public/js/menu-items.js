var menu_items = document.querySelectorAll(".menu__item");
var hooks = [];
var menu_trigger = document.getElementById("menu-trigger");
var scrolling = false;

function init_hooks() {
    for (let i = 0; i < menu_items.length; i++) {
        let hash = menu_items[i].hash.slice(1);
        hooks[i] = document.getElementById(hash);
    }
}

var handleScroll = throttle(function (event) {
    if (scrolling) {
        return;
    }
    var wy = window.scrollY;
    for (let i = hooks.length - 1; i >= 0; i--) {
        let ey = getTopOffset(hooks[i]);
        if ((wy + 200) > ey) {
            activateMenuItem(event, i);
            break;
        }

    }
}, 250);


function activateMenuItem(event, index, scroll = false) {
    var item = null;
    for (let i = 0; i < menu_items.length; i++) {
        if (i !== index) {
            menu_items[i].classList.remove('menu__item--active');
        } else {
            item = menu_items[i];
            menu_items[i].classList.add('menu__item--active');
        }
    }
    if (scroll) {
        if (window.innerWidth < 900) {
            closeMenu();
        } else {
            event.preventDefault();
            scrolling = true;
            setTimeout(function () {
                scrolling = false;
            }, 2000);
            hooks[index].scrollIntoView({behavior: "smooth"});
        }
}
}

function closeMenu() {
    menu_trigger.checked = false;
}

onDocumentReadyStateComplete(() => {
    init_hooks();
});

window.addEventListener('scroll', function (e) {
    handleScroll(e);
}, false);

for (let i = 0; i < menu_items.length; i++) {
    menu_items[i].addEventListener('click', function (e) {
        activateMenuItem(e, i, true);
    });
}