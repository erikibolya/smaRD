function init_check_services_menu() {
    var menus = document.getElementsByClassName("service__menu");
    var length = menus.length;
    for (var i = 0; i < length; i++) {
        var l1 = menus[i].firstElementChild.offsetWidth;
        var l2 = menus[i].firstElementChild.firstElementChild.scrollWidth;
        if (l1 > l2) {
            menus[i].classList.add('service__menu--center');
            menus[i].classList.remove('service__menu--overflowing');
        } else {
            menus[i].classList.remove('service__menu--center');
            menus[i].classList.add('service__menu--overflowing');
        }
    }
}

function init_horizontalScrolling() {
    var viewports = document.querySelectorAll('.service__menu__wrapper');
    for (let i = 0; i < viewports.length; i++) {
        let hasMoved = false;
        let prev_x = 0;
        new ScrollBooster({
            viewport: viewports[i], // required
            mode: 'x',
            bounce: false,
            textSelection: false,
            onUpdate: (data) => {
                viewports[i].scrollLeft = data.position.x;
                if (data.dragOffsetPosition.x === 0) {
                    prev_x = 0;
                }
                if (data.dragOffsetPosition.x !== prev_x) {
                    hasMoved = true;
                    prev_x = data.dragOffsetPosition.x;
                }
            },
            onClick: (data, event) => {
                if (hasMoved) {
                    hasMoved = false;
                    prev_x = data.dragOffsetPosition.x;
                    event.preventDefault();
                }
            }

        });
    }
}

function check_service_hash() {
    let hash = window.location.hash.slice(1);
    if (hash.startsWith("service_")) {
        document.body.classList.add('body--lock');
        document.getElementById(hash).focus();
    } else {
        document.body.classList.remove('body--lock');
    }
}


check_service_hash();

onDocumentReadyStateComplete(() => {
    init_check_services_menu();
    init_horizontalScrolling();
});

window.addEventListener('hashchange', check_service_hash, false);
window.addEventListener('resize', init_check_services_menu, false);

