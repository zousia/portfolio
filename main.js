var activePage;
// link buttons and corresponding pages
const NAVbtns = {
    page1: { btn: document.getElementById("btn_page_1"), page: document.getElementById("page_1")},
    page2: { btn: document.getElementById("btn_page_2"), page: document.getElementById("page_2")},
    page3: { btn: document.getElementById("btn_page_3"), page: document.getElementById("page_3")},
}
const btnBackIndex = document.getElementsByClassName("back_index");
const pageAccueil = document.getElementById("page_accueil");
const smallGZ = document.getElementById("small_gZ");
const smallName = document.getElementById("small_name");


var OnAccueilPage = function() {
    pageAccueil.style.display = "block";
    smallGZ.style.display = "none";
    smallName.style.display = "none";
}

var OffAccueilPage = function() {
    pageAccueil.style.display = "none";
    smallGZ.style.display = "block";
    smallName.style.display = "block";
}
OnAccueilPage();

var OnToggleBtnColor = function(value) {
    value.btn.classList.remove('bg-color-m1');
    value.btn.classList.remove('text-color-l1');
    value.btn.classList.add("bg-gradMyNavBtnAct");
    value.btn.classList.add("text-color-myNavBtnAct");

    return value;
}

var OffToggleBtnColor = function(value) {
    value.btn.classList.remove("bg-gradMyNavBtnAct");
    value.btn.classList.remove("text-color-myNavBtnAct");
    value.btn.classList.add("bg-color-m1");
    value.btn.classList.add("text-color-l1");

    return value;
}

// do not display other pages on load
window.addEventListener("load", event => {
    for (const [key, value] of Object.entries(NAVbtns)) {
        value.page.style.display = "none";
    }
    for (var btn of btnBackIndex) {
        btn.style.display = "none";
    }
})
// back to index page 
for (var btn of btnBackIndex) {
    btn.addEventListener("pointerdown", event => {
        console.log(`ACCUEIL target = ${event.target.id}`);
        // display accueil appropriate page design
        OnAccueilPage();

        activePage.style.display = "none";
        for (const [key, value] of Object.entries(NAVbtns)) {
            if (value.page.style.display == "block") {
                value.page.style.display == "none";
            }
        }
        // reset color btn nav and btn back display none
        btn.style.display = "none";
        for (const [key, value] of Object.entries(NAVbtns)) {
            OffToggleBtnColor(value);
        }
    })
}
    
// display corresponding page on button click
for (const [key, value] of Object.entries(NAVbtns)) {
    value.page.style.display = "none";
    //console.log(`page.style.display = ${value.page.id} ${value.page.style.display}`);
    value.btn.addEventListener("pointerdown", event => {
        event.preventDefault();
        if (event.target == value.btn) {
            activePage = value.page;
            activePage.style.display = "block";

            window.location.href='#';

            for (const [key, value] of Object.entries(NAVbtns)) {
                if (value.page.style.display == "block" && value.btn != event.target){
                    //console.log(`value.page = ${value.page.id}`);
                    value.page.style.display = "none";
                    //console.log(`after page.style.display = ${value.page.id} ${value.page.style.display}`);
                }
            }
            // display appropriate internal page design
            OffAccueilPage();
            
        } else if (activePage != event.target) {
            value.page.style.display = "none";
        } 
        // display back index btn
        for (var btn of btnBackIndex) {
            btn.style.display = "block";
        }

        // change button color
        for (const [key, value] of Object.entries(NAVbtns)) {
            if (value.page.style.display === "block") {
                OnToggleBtnColor(value);
            } else {
                OffToggleBtnColor(value);
            }
        }
    })
}


// get my images and carrousels for each project
const projects = {
    viverrinDetails: {
        el: document.getElementById("projet_viverrin_details"), 
        images: document.getElementById("projet_viverrin_details").querySelectorAll("img"),
        visi: 0,
        carrous: document.getElementById("viverrin_carrousel")
    },
    registreDetails: {
        el: document.getElementById("projet_registre_details"),
        images: document.getElementById("projet_registre_details").querySelectorAll("img"),
        visi: 0,
        carrous: document.getElementById("registre_carrousel")
    },
    routageDetails: {
        el: document.getElementById("projet_routage2_details"),
        images: document.getElementById("projet_routage2_details").querySelectorAll("img"),
        visi: 0,
        carrous: document.getElementById("routage_carrousel")
    }
}


const dealImages = function(project){
    for (let image of project.images) {
        // set style display value for each image
        image.style.display = "block";
        image.parentNode.style.display = "block";
        image.parentNode.parentNode.style.display = "block";
        // display none for each image on load
        // but keep the first one visible
        if (image != project.images[0]) {
            image.style.display = "none";
        }
    }
};


var myCarousels = document.getElementsByClassName("myCarousel");
var myPrevious = document.getElementsByClassName("previous");
var myNextos = document.getElementsByClassName("nexto");
var myTotals = document.getElementsByClassName("total");

// display carrousels and arrows
for (var carrousel of myCarousels) {
    carrousel.style.display = "block";
    carrousel.classList.add("mt-3");
}
for (var prev of myPrevious) {
    prev.style.display = "inline";
}
for (var nexto of myNextos) {
    nexto.style.display = "inline";
}
for (var total of myTotals) {
    total.style.display = "inline";
}

const animCarrousel = function(keys) {
    if(keys.carrous.classList.contains("transition2")) {
        keys.carrous.classList.remove("transition2");
        keys.carrous.classList.add("transition");
    } else if(keys.carrous.classList.contains("transition")) {
        keys.carrous.classList.add(`transition2`);
        keys.carrous.classList.remove("transition");

    } else {
        keys.carrous.classList.add(`transition`);
    }
    return keys
}


if (myCarousels) {

    for (const [projet, keys] of Object.entries(projects)) {
        // set display value for images 
        dealImages(keys);

        // append only first image for each project's carrousel
        keys.carrous.append(keys.images[keys.visi]);
        var count = document.getElementById(`total_${keys.el.id}`);
        count.innerHTML = `${keys.visi+1}/${keys.images.length}`;

        // listen to click event of this project zone
        keys.el.addEventListener('pointerdown', event => {
            var regPrev = new RegExp(`previous`);
            var regNexto = new RegExp(`nexto`);

            visible = keys.visi;
            var prevImg = keys.images[visible-1]
            var nextImg = keys.images[visible+1]

            if (regPrev.test(event.target.classList) && visible > 0) {
                // clean container
                keys.images[keys.visi].style.display = "none";
                keys.carrous.innerHTML = "";
                // append new image to container
                prevImg.style.display = "block";
                keys.carrous.append(prevImg);

                // update visible value for the project
                keys.visi--;
                // update count in html span
                count = document.getElementById(`total_${keys.el.id}`);
                count.innerHTML = "";
                count.innerHTML = `${keys.visi+1}/${keys.images.length}`;
                // add transition to image display
                animCarrousel(keys);

            } else if (regNexto.test(event.target.classList) && visible < keys.images.length - 1) {
                // clean container
                keys.images[keys.visi].style.display = "none";
                keys.carrous.innerHTML = "";
                 // append new image to container
                nextImg.style.display = "block";
                keys.carrous.append(nextImg);

                // update visible value for the project
                keys.visi++;
                // update count in html span
                count = document.getElementById(`total_${keys.el.id}`);
                count.innerHTML = "";
                count.innerHTML = `${keys.visi+1}/${keys.images.length}`;
                // add transition to image display
                animCarrousel(keys);
            }

        })
    }
}

