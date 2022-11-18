
type Place = {

    city : string,
    country: string,
    superHost: boolean,
    title: string,
    rating: number,
    maxGuests: number,
    type:string,
    beds:Number | null,
    photo:string

}

class Card {
    readonly place: Place;

    constructor(place : Place){
        this.place = place;
    }

    static addCard(location:Place,doc : Document = document){
        let card_list = doc.querySelector(".cards") as HTMLDivElement
        let template = doc.querySelector("[data-location]") as HTMLTemplateElement 
        let clone = doc.importNode(template.content, true)
    
        let img = clone.querySelector("img") as HTMLImageElement
        let type = clone.querySelector(".card_bottom p") as HTMLParagraphElement// `${location.type} ${beds} beds`
        let note = clone.querySelector(".note p") as HTMLParagraphElement
        let title = clone.querySelector(".card_title") as HTMLParagraphElement
        
        img.src = location.photo;
    
        if (location.beds == null || location.beds == 0 ){
            type.textContent = `${location.type} no bed`
        }
        else if(location.beds>0){
            type.textContent = `${location.type} ${location.beds} beds`
        }
        else
        {
            type.textContent = `${location.type} `
        } 
        
        note.textContent = `${location.rating}`
        title.textContent = `${location.title}`
    
        if(location.superHost){
            let s_host = clone.querySelector(".super_host") as HTMLDivElement
            s_host.style.display = "flex"
        }
    
        card_list.appendChild(clone);
    }

    add(){
        Card.addCard(this.place);
    }

}

const host:Place ={
    city: "Oulu",
    country: "Finland",
    superHost: false,
    title: "Beautiful new studio apartment nearby the center",
    rating: 4.49,
    maxGuests: 2,
    type: "Entire apartment",
    beds: 1,
    photo: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2255&q=80"
}

const host2:Place ={
    city: "Oulu",
    country: "Finland",
    superHost: true,
    title: "Cozy woodhouse flat with wooden sauna",
    rating: 4.38,
    maxGuests: 4,
    type: "Entire house",
    beds: null,
    photo: "https://images.unsplash.com/photo-1522156373667-4c7234bbd804?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=930&q=80"
}

const host3:Place = {
    city: "Turku",
    country: "Finland",
    superHost: true,
    title: "Nice 2 room apartment close to everything",
    rating: 4.34,
    maxGuests: 6,
    type: "Entire apartment",
    beds: 3,
    photo: "https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1275&q=80"
}


let c = new Card(host);
let c2 = new Card(host2);
let c3 = new Card(host3);
// c.add()
// c2.add()
// c3.add()
// c.add()

let dummy_var = "before"

class DBHandler{
    json_reques:string
    db:Array<Place> = []

    constructor(json:string){
        this.json_reques=json
        this.getJson()

    }

    getJson(){

 
        fetch(this.json_reques)
        .then((response) =>{
            
            if( !response.ok ){
                throw new Error("HTTP error " + response.status);       
            }
            return response.json()

        })
        .then((data)=>{
            let db:Array<Place> = data
            dummy_var = "after"
            this.resolveRequest(db)
            
        })
        .catch((e)=>{
            console.log(e)
        })
        
    }
    
    resolveRequest(db:Array<Place>){
        
        let card_list = document.querySelectorAll(".card") 
        
        card_list.forEach(elem=>elem.remove())
        
        db.filter((plc)=>{
            return plc.rating > 4.5
        })
        .forEach((plc)=>{
            let card = new Card(plc)
            card.add();
        })
    }

    
    
}

let search_icon = document.querySelector(".search_bar .material-symbols-rounded") as HTMLElement

search_icon.addEventListener('click',()=>{
    let search_location= 
    document.querySelector(".search_bar .location") as HTMLParagraphElement
    console.log(dummy_var)
    
})

let db = new DBHandler("./stays.json")

console.log(dummy_var)


