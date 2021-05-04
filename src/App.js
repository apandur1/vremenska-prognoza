import { useState, useEffect }  from 'react'
import "./App.css"
import Sedmica from "./Sedmica";

function povecajPrvoSlovo(x) {
    let novi = ""
    for (let i = 0; i < x.length; i++) {
        if(i === 0)
            novi += x.charAt(i).toUpperCase()
        else
            novi += x.charAt(i)
    }
    return novi
}

function App() {
    const apiKey = '09d95e4c8488c9878d48b2879373ae0c';
    const [apiData, setApiData] = useState({});
    const [apiSedmica, setApiSedmica] = useState({})
    const [grad, setGrad] = useState('')
    const [potvrdaGrad, setPotvrdaGrad] = useState('')

    const sedmicaUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${potvrdaGrad}&cnt=7&appid=${apiKey}&units=metric`
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${potvrdaGrad}&appid=${apiKey}&units=metric&lang=hr`

    useEffect(() => {
        Promise.all([
            fetch(apiURL),
            fetch(sedmicaUrl)
        ])
            .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
            .then(([data1, data2]) => {
                setApiData(data1)
                setApiSedmica(data2)
            });
    }, [apiURL, sedmicaUrl]);

    const inputHandler = (event) => {
        setGrad(event.target.value);
    }

    const enterHandler = (event) => {
        if(event.key === 'Enter')
            setPotvrdaGrad(event.target.value)
    }

    const submitHandler = () => {
        setPotvrdaGrad(grad)
    }

    return (
        <div className="App container d-flex justify-content-center">
            <div className={"centar d-flex justify-content-center"}>
                <div className={"col-md-12 justify-content-center"}>
                    <div className = "row justify-content-center">
                        <h1>Amelinhova vremenska prognoza</h1>
                    </div>
                    <div className="row justify-content-center">
                        <input type="text" onChange={inputHandler} onKeyPress={enterHandler} placeholder={"Grad"} id={"inputGrad"}/>
                        <button className={"btn-primary"} onClick={submitHandler}>Potvrdi</button>
                    </div>

                    {apiData.main ? (
                        <>
                            <div className={"row justify-content-center grad-drzava"}>
                                {apiData.name}, {apiData.sys.country}
                            </div>
                            <div className={"glavno row justify-content-center"}>
                                <div className={"col-md-5 offset-1"}>
                                    <div className={"trenutni-rezultat"}>
                                        <img src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`} id={"rez-slika"} alt={"Rezultat"}></img>
                                        <h2>
                                            {apiData.main.temp} °C
                                        </h2>
                                    </div>
                                </div>
                                <div className={"opis col-md-4"}>
                                    {povecajPrvoSlovo(apiData.weather[0].description)}
                                    <br></br>
                                    Minimalna temperatura: {apiData.main.temp_min}
                                    <br></br>
                                    Maksimalna temperatura: {apiData.main.temp_max}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div>

                        </div>
                    )}
                    {apiSedmica.city ? (
                        <div className={"row justify-content-center"}>
                            <Sedmica sedmica = {apiSedmica.list} />
                        </div>
                    ) : (
                        <div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;

