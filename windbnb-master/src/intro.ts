
type Place = {

    city : string,
    country: string,
    supHost: boolean,
    title: string,
    rating: number,
    maxGuests: number,
    type:string,
    beds:number,
    photo:Number

}



class Card {
    readonly place: Place;

    constructor(place : Place){
        this.place = place;
    }
    
    // getCardElem( ): HTMLElement {

    //     let card_template = document.querySelector("")

    //     let card_name : string = `${this.place.city},${this.place.country}`

        
    //     let card_div : string = document.createComment

    //     return null;
        
    // }

}

