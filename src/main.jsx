import React, { useState, useRef, useEffect } from "react";
// import b2A from "./buturi-2A.mov"
// import b2s from "./buturi-seibutu2.mov"
// import c2A from "./chiri-2A.mov"
// import c2s from "./chiri-seibutu3.mov"
// import c2AO from "./chiri-2A-original2.mov"
// import c2sO from "./chiri-seibutu-original2.mov"
// import b2k from "./buturi-kissa.mov"
// import a2k from "./annnai-kissa.mov"
import mp from "./map.png"
import ds from "./downstairs.png"
import us from "./upstairs.png"
import nwimg from "./now.png"

import './App.css';
const rooms = ["選択する", "音楽室", '物理実験室', '美術室', '地理室', '地学室', '生物講義室', '生物室', 'コモンスペース(調整中)', '2-A', '2-B', '2-C', '2-1', '2-2', '2-3', '2-4'];
// const videos = [[null, null, b2A, b2s, b2k], [null, null, c2AO, c2sO]];
// const video_after_buturi = [[null, null, b2A, b2s], [null, null, c2A, c2s]];

function Main({ roomIndex }) {
    const direcVideo = useRef(null);
    const picker = useRef(null);
    let options = rooms.map((value, index) => <option value={index} key={index}>{value}</option>)
    const [vidStyle, setVidStyle] = useState({ display: "none" });
    const [prevCap, setPrevCap] = useState("");
    // const [vidSrc, setVidSrc] = useState(b2A);
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
                <canvas id="direcVideo" ref={direcVideo} style={vidStyle} width={2500} height={2000}></canvas>
            </div>
            <script src="script.js"></script>
        </div>
    );
    function updateInfo() {
        picker.current.selectedIndex = localStorage.getItem('destination')
        if (localStorage.getItem('currentLocation') != roomIndex) {
            localStorage.setItem('previousLocation', localStorage.getItem('currentLocation'));
        }
        if (localStorage.getItem('destination') == roomIndex) {
            localStorage.setItem('destination', null);
            localStorage.setItem('previousLocation', null);
        }
        localStorage.setItem('currentLocation', roomIndex);
        setPrevCap(rooms[localStorage.getItem('previousLocation')]);
        // alert('hello')
        let destination = localStorage.getItem("destination");
        document.getElementById('destinationCaption').innerText = "目的地: " + (destination > 0 ? rooms[destination] : "");

    }
    function showDirections() {
        localStorage.setItem("destination", picker.current.selectedIndex);
        updateInfo();
        setVidStyle({ display: "inline" });
        function showMap(now, dest, prev) {
            var cnvs = document.getElementById('direcVideo');
            var ctx = cnvs.getContext('2d');
            let coords = [[0, 0], [616, 260], [1997, 260], [597, 960], [1050, 960], [1578, 960], [1815, 960], [2000, 960], [1163, 1088], [364, 1586], [364, 1586], [862, 1586], [1543, 1642], [1717, 1642], [2097, 1642], [2219, 1642], [862, 260], [1717, 260], [862, 960], [1717, 960], [862, 1460], [364, 1460], [1717, 1700], [2100, 1700]];
            let paths = [[1, 16], [2, 17], [3, 18], [4, 18], [4, 5], [5, 19], [6, 19], [6, 7], [9, 21], [10, 21], [11, 20], [12, 13], [13, 19], [13, 22], [14, 23], [14, 15], [16, 18], [17, 19], [18, 20], [20, 21], [20, 21], [22, 23]]
            let dis = new Array(30);
            let inf = Infinity;

            function manhattanDis(x, y) {
                return Math.abs(coords[x][0] - coords[y][0]) + Math.abs(coords[x][1] - coords[y][1])
            }
            for (let i = 0; i < 30; i++) {
                dis[i] = new Array(30);
                for (let j = 0; j < 30; j++) {
                    dis[i][j] = new Array(2);
                    dis[i][j][0] = inf;
                }
            }
            for (let i = 0; i < paths.length; i++) {
                let s = paths[i][0];
                let t = paths[i][1];
                dis[s][t][0] = manhattanDis(s, t);
                dis[s][t][1] = t;
                dis[t][s][0] = manhattanDis(s, t);
                dis[t][s][1] = s;
            }
            for (let k = 0; k < 30; k++) {
                for (let i = 0; i < 30; i++) {
                    for (let j = 0; j < 30; j++) {
                        if (dis[i][j][0] > dis[i][k][0] + dis[k][j][0]) {
                            dis[i][j][0] = dis[i][k][0] + dis[k][j][0];
                            dis[i][j][1] = dis[i][k][1];
                        }
                    }
                }
            }

            function drawRoute(now, dest, c) {
                let animnow = 0;
                function draws2t(s, t, c, id) {
                    let isAnim = true;
                    if (Math.min(s, t) == 16 && Math.max(s, t) == 18) {
                        if (s == 16) {
                            var render = function () {
                                if (isAnim === true) {
                                    if (animnow == id) {
                                        var img = new Image();
                                        /* 画像が読み込まれてからcanvasへ書き出す */
                                        img.onload = function () {
                                            ctx.drawImage(img, coords[16][0] + 10, coords[16][1] - 30, 50, 50);
                                        };
                                        /* 画像URLを指定して、画像のロードを開始する */
                                        img.src = ds;
                                        isAnim = false;
                                        animnow++;
                                    }
                                    requestAnimationFrame(render);
                                }
                            };
                            render();

                        } else {
                            var render = function () {
                                if (isAnim === true) {
                                    if (animnow == id) {
                                        var img = new Image();
                                        /* 画像が読み込まれてからcanvasへ書き出す */
                                        img.onload = function () {
                                            ctx.drawImage(img, coords[18][0] - 50, coords[18][1] - 30, 50, 50);
                                        };
                                        /* 画像URLを指定して、画像のロードを開始する */
                                        img.src = us;
                                        isAnim = false;
                                        animnow++;
                                    }
                                    requestAnimationFrame(render);
                                }
                            };
                            render();
                        }
                        return;
                    }
                    if (Math.min(s, t) == 17 && Math.max(s, t) == 19) {
                        if (s == 17) {
                            var render = function () {
                                if (isAnim === true) {
                                    if (animnow == id) {
                                        var img = new Image();
                                        /* 画像が読み込まれてからcanvasへ書き出す */
                                        img.onload = function () {
                                            ctx.drawImage(img, coords[17][0] - 40, coords[17][1] - 70, 50, 50);
                                        };
                                        /* 画像URLを指定して、画像のロードを開始する */
                                        img.src = ds;
                                        isAnim = false;
                                        animnow++;
                                    }
                                    requestAnimationFrame(render);
                                }
                            };
                            render();
                        } else {
                            var render = function () {
                                if (isAnim === true) {
                                    if (animnow == id) {
                                        var img = new Image();
                                        /* 画像が読み込まれてからcanvasへ書き出す */
                                        img.onload = function () {
                                            ctx.drawImage(img, coords[19][0] - 50, coords[19][1] - 50, 50, 50);
                                        };
                                        /* 画像URLを指定して、画像のロードを開始する */
                                        img.src = us;
                                        isAnim = false;
                                        animnow++;
                                    }
                                    requestAnimationFrame(render);
                                }
                            };
                            render();
                        }
                        return;
                    }

                    let sx = coords[s][0];
                    let sy = coords[s][1];
                    let gx = coords[t][0];
                    let gy = coords[t][1];
                    let nx = coords[s][0];
                    let ny = coords[s][1];
                    var render = function () {
                        ctx.beginPath();
                        ctx.moveTo(sx, sy);
                        ctx.lineTo(nx, ny);
                        ctx.strokeStyle = c;
                        ctx.lineWidth = 10;
                        ctx.closePath();
                        ctx.stroke();
                        if (isAnim === true) {
                            if (animnow == id) {
                                if (gx > sx) {
                                    nx += 31;
                                } else if (gx < sx) {
                                    nx -= 31;
                                }
                                if (gy > sy) {
                                    ny += 31;
                                } else if (gy < sy) {
                                    ny -= 31;
                                }
                                if (nx < Math.min(sx, gx) || nx > Math.max(sx, gx)) {
                                    nx = gx;
                                    isAnim = false;
                                    animnow++;
                                }
                                if (ny < Math.min(sy, gy) || ny > Math.max(sy, gy)) {
                                    ny = gy;
                                    isAnim = false;
                                    animnow++;
                                }
                            }
                            requestAnimationFrame(render)
                        }

                    };
                    render();
                    ctx.beginPath();
                    // ctx.moveTo(coords[s][0], coords[s][1]);
                    // ctx.lineTo(coords[t][0], coords[t][1]);

                    ctx.stroke();
                }
                let cnt = 0;
                while (now != dest && cnt < 30) {
                    draws2t(now, dis[now][dest][1], c, cnt);
                    now = dis[now][dest][1];
                    cnt++;
                }
            }
            function drawRouteNoAnim(now, dest, c) {
                function draws2t(s, t, c, id) {
                    var img = new Image();
                    if (Math.min(s, t) == 16 && Math.max(s, t) == 18) {
                        return;
                    }
                    if (Math.min(s, t) == 17 && Math.max(s, t) == 19) {
                        return;
                    }
                    ctx.strokeStyle = c;
                    ctx.lineWidth = 10;
                    ctx.moveTo(coords[s][0], coords[s][1]);
                    ctx.lineTo(coords[t][0], coords[t][1]);
                    ctx.stroke();
                }
                let cnt = 0;
                while (now != dest && cnt < 30) {
                    draws2t(now, dis[now][dest][1], c, cnt);
                    now = dis[now][dest][1];
                    cnt++;
                }
            }
            function image() {
                var img = new Image();
                img.src = mp;
                img.onload = function () {
                    // alert('p')
                    ctx.drawImage(img, 0, 0, 2500, 2000);
                    {
                        var img2 = new Image();
                        /* 画像が読み込まれてからcanvasへ書き出す */
                        img2.onload = function () {
                            ctx.drawImage(img2, coords[now][0] - 250, coords[now][1]);
                        };
                        /* 画像URLを指定して、画像のロードを開始する */
                        img2.src = nwimg;
                    }
                    if (prev > 0) {
                        if (dis[prev][now][0] + dis[now][dest][0] == dis[prev][dest][0]) {
                            drawRouteNoAnim(prev, dest, "skyblue");
                        } else {
                            drawRouteNoAnim(prev, dest, "orange");
                        }

                    }
                    drawRoute(now, dest, "rgba(255, 0, 0, 1)");

                };

            }
            image();
        }
        if (roomIndex != localStorage.getItem('destination')) showMap(roomIndex, localStorage.getItem('destination'), localStorage.getItem('previousLocation'));
    }

}





export default Main;