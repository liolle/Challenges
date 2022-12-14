"use strict";
class Card {
    constructor(place) {
        this.place = place;
    }
    static addCard(location, doc = document) {
        let card_list = doc.querySelector(".cards");
        let template = doc.querySelector("[data-location]");
        let clone = doc.importNode(template.content, true);
        let img = clone.querySelector("img");
        let type = clone.querySelector(".card_bottom p"); // `${location.type} ${beds} beds`
        let note = clone.querySelector(".note p");
        let title = clone.querySelector(".card_title");
        img.src = location.photo;
        if (location.beds == null || location.beds == 0) {
            type.textContent = `${location.type} no bed`;
        }
        else if (location.beds > 0) {
            type.textContent = `${location.type} ${location.beds} beds`;
        }
        else {
            type.textContent = `${location.type} `;
        }
        note.textContent = `${location.rating}`;
        title.textContent = `${location.title}`;
        if (location.superHost) {
            let s_host = clone.querySelector(".super_host");
            s_host.style.display = "flex";
        }
        card_list.appendChild(clone);
    }
    add() {
        Card.addCard(this.place);
    }
}
const host = {
    city: "Oulu",
    country: "Finland",
    superHost: false,
    title: "Beautiful new studio apartment nearby the center",
    rating: 4.49,
    maxGuests: 2,
    type: "Entire apartment",
    beds: 1,
    photo: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2255&q=80"
};
const host2 = {
    city: "Oulu",
    country: "Finland",
    superHost: true,
    title: "Cozy woodhouse flat with wooden sauna",
    rating: 4.38,
    maxGuests: 4,
    type: "Entire house",
    beds: null,
    photo: "https://images.unsplash.com/photo-1522156373667-4c7234bbd804?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=930&q=80"
};
const host3 = {
    city: "Turku",
    country: "Finland",
    superHost: true,
    title: "Nice 2 room apartment close to everything",
    rating: 4.34,
    maxGuests: 6,
    type: "Entire apartment",
    beds: 3,
    photo: "https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1275&q=80"
};
let c = new Card(host);
let c2 = new Card(host2);
let c3 = new Card(host3);
// c.add()
// c2.add()
// c3.add()
// c.add()
let dummy_var = "before";
class DBHandler {
    constructor(json) {
        this.db = [];
        this.json_reques = json;
        this.getJson();
    }
    getJson() {
        fetch(this.json_reques)
            .then((response) => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
            .then((data) => {
            let db = data;
            dummy_var = "after";
            this.resolveRequest(db);
        })
            .catch((e) => {
            console.log(e);
        });
    }
    resolveRequest(db) {
        let card_list = document.querySelectorAll(".card");
        card_list.forEach(elem => elem.remove());
        db.filter((plc) => {
            return plc.rating > 4.5;
        })
            .forEach((plc) => {
            let card = new Card(plc);
            card.add();
        });
    }
}
let search_icon = document.querySelector(".search_bar .material-symbols-rounded");
search_icon.addEventListener('click', () => {
    let search_location = document.querySelector(".search_bar .location");
    console.log(dummy_var);
});
let db = new DBHandler("./stays.json");
console.log(dummy_var);
