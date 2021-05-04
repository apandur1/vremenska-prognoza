import React from 'react'
import "./App.css"

function shiftajDane(dani) {
    let pocetak = 0
    let danas = new Date()
    pocetak = danas.getDay()
    pocetak -= 1
    if(pocetak === -1)
        pocetak = 6
    let novi = []
    for(let i = 0; i < 7; i++) {
        let br = (pocetak + i) % 7
        novi.push(dani[br])
    }
    return novi
}

export default function Dan({objekt, brojac}) {
    let dani = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota", "Nedjelja"]
    dani = shiftajDane(dani)
    return (
        <div className={" sedmica"}>
            {dani[brojac]}
            <br></br>
            <img src={`http://openweathermap.org/img/w/${objekt.weather[0].icon}.png`} alt={"Dan"}></img>
            <br></br>
            Temp: {objekt.temp.day}°C
            <br></br>
            Max: {objekt.temp.max}
            <br></br>
            Min: {objekt.temp.min}
            <br></br>
        </div>
    )
}