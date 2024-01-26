import './App.css';
import React, { useRef } from "react";
import chiri2A from "./chiri-2A.mov"


function RoomPicker({ listOfOptions }) {
    const picker = useRef(null);
    const direcVideo = useRef(null);
    let options = listOfOptions.map((value, index) => <option value={index} key={index}>{index}</option>)
    // picker = document.getElementById('destinationPicker')
    // let direcVideo = document.getElementById('direcVideo');
    function updateInfo() {
        let destination = localStorage.getItem("destination");

        document.getElementById('destinationCaption').innerText = destination;
        if (destination == '2-AHR') {
            direcVideo.current.src = "/buturi-2A.mov";
        } else if (destination == '生物室') {
            direcVideo.current.src = "/buturi-seibutu2.mov";
        } else if (destination == '喫茶班') {

        }
        direcVideo.current.style.display = "inline";
        // direcVideo.current.play()
    }
    function showDirections() {
        localStorage.setItem("destination", picker.current.selectedIndex);
        updateInfo();
    }
    return (
        <div className="destination-select">
            <p>{options}</p>
            <select id="destinationPicker" ref={picker}>
                {options}
            </select>
            <button onClick={showDirections}>Show Directions</button>
            <video ref={direcVideo} src={chiri2A}></video>
        </div>
    );
}



// const picker = document.getElementById('destinationPicker')
// const direcVideo = document.getElementById('direcVideo');
// const destination = localStorage.getItem("destination");


export default RoomPicker;
