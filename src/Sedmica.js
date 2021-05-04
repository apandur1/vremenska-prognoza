import React from 'react'
import Dan from "./Dan";
import "./App.css"

export default function Sedmica({sedmica}) {
    let br = 0
    return (
        sedmica.map(dan => {
            return <Dan key = {dan.dt} objekt={dan} brojac = {br++} />
        })
    )
}