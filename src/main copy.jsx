import React, { useState, useRef, useEffect } from "react";
import b2A from "./buturi-2A.mov"
import b2s from "./buturi-seibutu2.mov"
import c2A from "./chiri-2A.mov"
import c2s from "./chiri-seibutu3.mov"
import c2AO from "./chiri-2A-original2.mov"
import c2sO from "./chiri-seibutu-original2.mov"
import b2k from "./buturi-kissa.mov"
import a2k from "./annnai-kissa.mov"

import './App.css';
const rooms = ["選択する", "物理実験室", '地理室', '2A HR', '生物室', '喫茶班', '案内所'];
const videos = [[null, null, b2A, b2s, b2k], [null, null, c2AO, c2sO]];
const video_after_buturi = [[null, null, b2A, b2s], [null, null, c2A, c2s]];

function Main({ roomIndex }) {
    const direcVideo = useRef(null);
    const picker = useRef(null);
    let options = rooms.map((value, index) => <option value={index} key={index}>{value}</option>)
    const [vidStyle, setVidStyle] = useState({ display: "none" });
    const [prevCap, setPrevCap] = useState("");
    const [vidSrc, setVidSrc] = useState(b2A);
    useEffect(() => {
        updateInfo();
    }, [])
    return (
        <div>
            <div class="header">
                <h1>文化祭 Map</h1>
            </div>
            <div class="container">
                <p>現在地: {rooms[roomIndex]}</p>
                <p id="destinationCaption"></p>
                <div className="destination-select">
                    <p id="previousLocationCaption">前回いた場所: {prevCap}</p>
                    <select id="destinationPicker" ref={picker}>
                        {options}
                    </select>
                    <br />
                    <button onClick={showDirections}>Show Directions</button>
                </div >
                <video src={vidSrc} id="direcVideo" ref={direcVideo} muted autoPlay playsInline style={vidStyle}></video>
            </div>
            <script src="script.js"></script>
        </div>
    );
    function updateInfo() {
        if (roomIndex == 6) {
            localStorage.setItem('destination', 5)
            setVidSrc(a2k)
            setVidStyle({ display: "inline" });
        }
        picker.current.selectedIndex = localStorage.getItem('destination')
        if (localStorage.getItem('currentLocation') != roomIndex) {
            localStorage.setItem('previousLocation', localStorage.getItem('currentLocation'));
        }
        if (localStorage.getItem('destination') == roomIndex) {
            localStorage.setItem('destination', null);
        }
        localStorage.setItem('currentLocation', roomIndex);
        setPrevCap(rooms[localStorage.getItem('previousLocation')]);
        // alert('hello')
        let destination = localStorage.getItem("destination");
        document.getElementById('destinationCaption').innerText = "目的地: " + rooms[destination];
        if (!(destination > 0)) {
            setVidStyle({ display: "none" });
            return;
        }
        else if (roomIndex == 6) {
            return;
        }
        if (destination != roomIndex) {
            if (localStorage.getItem('previousLocation') == 1) {
                setVidSrc(video_after_buturi[roomIndex - 1][destination - 1]);
            }
            else {
                setVidSrc(videos[roomIndex - 1][destination - 1]);
            }
            setVidStyle({ display: "inline" });
        }
        else {
            setVidStyle({ display: "none" });
        }
    }
    function showDirections() {
        localStorage.setItem("destination", picker.current.selectedIndex);
        updateInfo();
    }

}





export default Main;