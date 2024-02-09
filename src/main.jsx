import React, { useState, useRef, useEffect } from "react";
import { useParams } from 'react-router-dom'
// import b2A from "./buturi-2A.mov"
// import b2s from "./buturi-seibutu2.mov"
// import c2A from "./chiri-2A.mov"
// import c2s from "./chiri-seibutu3.mov"
// import c2AO from "./chiri-2A-original2.mov"
// import c2sO from "./chiri-seibutu-original2.mov"
// import b2k from "./buturi-kissa.mov"
// import a2k from "./annnai-kissa.mov"
import mp from "./map3.png"
import ds from "./downstairs.png"
import us from "./upstairs.png"
import nwimg from "./now.png"
import glimg from "./goal2.png"
import img1 from "./assets/1.jpeg"
import './App.css';

const roomNames = new Map([['1-A', 1], ['1-B', 2], ['1-C', 3], ['2-A', 4], ['2-B', 5], ['2-C', 6], ['3-A', 7], ['3-B', 8], ['3-C', 9], ['1-1', 10], ['1-2', 11], ['1-3', 12], ['1-4', 13], ['2-1', 14], ['2-2', 15], ['2-3', 16], ['2-4', 17], ['3-1', 18], ['3-2', 19], ['3-3', 20], ['3-4', 21], ['music', 22], ['physics2', 23], ['physics1', 24], ['art', 25], ['geography', 26], ['geology', 27], ['biology2', 28], ['biology1', 29], ['technology', 30], ['infirmary', 31], ['chemistry2', 32], ['chemistry1', 33], ['library', 34], ['CS', 35], ['OS', 36]])



const rooms = ['行き先を選択', '1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C', '1-1', '1-2', '1-3', '1-4', '2-1', '2-2', '2-3', '2-4', '3-1', '3-2', '3-3', '3-4', '音楽室', '物理講義室', '物理実験室', '美術室', '地理室', '地学室', '生物講義室', '生物実験室', '技術室', '保健室', '化学講義室', '化学実験室', '図書スペース', 'コンピュータースペース', 'オープンスペース'];
// const videos = [[null, null, b2A, b2s, b2k], [null, null, c2AO, c2sO]];
// const video_after_buturi = [[null, null, b2A, b2s], [null, null, c2A, c2s]];

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('./assets', false, /\.(png|jpe?g|svg)$/));

function Main() {
    let { roomName } = useParams();
    let roomIndex = roomNames.get(roomName);
    console.log(roomIndex)
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
                <canvas id="direcVideo" ref={direcVideo} style={vidStyle} width={1017} height={1692}></canvas>
                <div id='routeImgs'></div>
            </div>
            <script src="script.js"></script>
        </div>
    );
    function simpleLine(bg, ed) {
        var cnvs = document.getElementById('direcVideo');
        var context = cnvs.getContext('2d');
        context.beginPath();
        context.moveTo(bg[0], bg[1]);
        context.lineTo(ed[0], ed[1]);
        context.strokeStyle = "red";
        context.lineWidth = 10;
        context.stroke();
    }
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
        if (roomIndex == localStorage.getItem('destination')) {
            updateInfo();
            return;
        }
        let items = document.querySelectorAll('#routeImgs img');
        for (const item of items) {
            item.remove();
        }
        updateInfo();
        setVidStyle({ display: "inline" });

        function showMap(now, dest, prev) {
            var cnvs = document.getElementById('direcVideo');
            var ctx = cnvs.getContext('2d');
            let coords = [[0, 0], [128, 387], [177, 387], [332, 387], [128, 970], [177, 970], [332, 970], [128, 1545], [177, 1545], [332, 1545], [652, 1550], [720, 1550], [856, 1550], [925, 1550], [635, 974], [720, 974], [856, 974], [925, 974], [652, 388], [720, 388], [856, 388], [925, 388], [247, 124], [737, 124], [813, 124], [247, 709], [440, 709], [625, 709], [737, 709], [813, 709], [247, 1292], [391, 1292], [737, 1292], [813, 1292], [477, 993], [634, 993], [0, 0], [635, 387], [447, 387], [152, 387], [357, 387], [152, 970], [357, 970], [152, 1545], [357, 1545], [152, 306], [357, 306], [152, 899], [357, 899], [152, 1470], [357, 1470], [152, 420], [357, 420], [152, 1000], [357, 1000], [152, 1575], [357, 1575], [705, 1550], [684, 1550], [870, 1550], [904, 1550], [705, 974], [672, 974], [870, 974], [905, 974], [670, 388], [903, 388], [705, 1583], [871, 1583], [705, 997], [871, 997], [684, 1588], [904, 1588], [672, 1000], [905, 1000], [670, 426], [903, 426], [358, 124], [358, 709], [358, 1292], [694, 124], [694, 709], [694, 1292], [477, 970], [634, 974]];
            let paths = [[1, 39], [2, 39], [39, 45], [45, 46], [39, 51], [46, 40], [3, 40], [40, 52], [40, 38], [4, 41], [5, 41], [41, 47], [41, 53], [47, 48], [42, 48], [42, 54], [6, 42], [7, 43], [8, 43], [43, 55], [43, 49], [49, 50], [9, 44], [44, 56], [51, 53], [53, 55], [52, 54], [54, 56], [78, 48], [79, 44], [10, 58], [58, 57], [57, 11], [58, 71], [57, 67], [57, 82], [57, 67], [67, 68], [68, 59], [59, 60], [12, 59], [60, 13], [60, 72], [62, 73], [62, 61], [61, 69], [15, 61], [69, 70], [70, 63], [63, 64], [16, 63], [64, 17], [18, 65], [65, 19], [73, 75], [20, 66], [66, 21], [66, 76], [71, 73], [72, 74], [73, 75], [74, 76], [22, 77], [80, 23], [23, 24], [25, 78], [78, 26], [26, 27], [27, 81], [28, 29], [81, 28], [30, 79], [79, 31], [31, 82], [82, 32], [32, 33], [79, 78], [78, 77], [80, 81], [81, 82], [81, 61], [64, 74], [65, 75], [42, 83], [83, 34], [34, 35], [35, 84], [14, 84], [84, 62]]
            let kaidan = new Set([51, 52, 53, 54, 55, 56, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82]);
            let dis = new Array(100);
            let inf = Infinity;

            // return

            function manhattanDis(x, y) {
                return Math.abs(coords[x][0] - coords[y][0]) + Math.abs(coords[x][1] - coords[y][1]) + ((kaidan.has(x) && kaidan.has(y)) ? 10000 : 0)
            }
            for (let i = 0; i < 100; i++) {
                dis[i] = new Array(100);
                for (let j = 0; j < 100; j++) {
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
            for (let k = 0; k < 100; k++) {
                for (let i = 0; i < 100; i++) {
                    for (let j = 0; j < 100; j++) {
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
                    // if (Math.min(s, t) == 16 && Math.max(s, t) == 18) {
                    //     if (s == 16) {
                    console.log(s, t);
                    if (kaidan.has(s) && kaidan.has(t)) {
                        // console.log("hey")
                        var render = function () {
                            if (isAnim === true) {
                                if (animnow == id) {
                                    var img = new Image();
                                    /* 画像が読み込まれてからcanvasへ書き出す */
                                    img.onload = function () {
                                        ctx.drawImage(img, coords[s][0] + 10, coords[s][1] - 30, 50, 50);
                                    };
                                    /* 画像URLを指定して、画像のロードを開始する */
                                    if (coords[s][1] > coords[t][1]) {
                                        img.src = us;
                                    } else {
                                        img.src = ds;
                                    }

                                    isAnim = false;
                                    animnow++;
                                    console.log("skipping: " + String(s) + " " + String(t))
                                }
                                requestAnimationFrame(render);
                            }
                        };
                        render();
                        return;
                    }


                    //     } else {
                    //         var render = function () {
                    //             if (isAnim === true) {
                    //                 if (animnow == id) {
                    //                     var img = new Image();
                    //                     /* 画像が読み込まれてからcanvasへ書き出す */
                    //                     img.onload = function () {
                    //                         ctx.drawImage(img, coords[18][0] - 50, coords[18][1] - 30, 50, 50);
                    //                     };
                    //                     /* 画像URLを指定して、画像のロードを開始する */
                    //                     img.src = us;
                    //                     isAnim = false;
                    //                     animnow++;
                    //                 }
                    //                 requestAnimationFrame(render);
                    //             }
                    //         };
                    //         render();
                    //     }
                    //     return;
                    // }
                    // if (Math.min(s, t) == 17 && Math.max(s, t) == 19) {
                    //     if (s == 17) {
                    //         var render = function () {
                    //             if (isAnim === true) {
                    //                 if (animnow == id) {
                    //                     var img = new Image();
                    //                     /* 画像が読み込まれてからcanvasへ書き出す */
                    //                     img.onload = function () {
                    //                         ctx.drawImage(img, coords[17][0] - 40, coords[17][1] - 70, 50, 50);
                    //                     };
                    //                     /* 画像URLを指定して、画像のロードを開始する */
                    //                     img.src = ds;
                    //                     isAnim = false;
                    //                     animnow++;
                    //                 }
                    //                 requestAnimationFrame(render);
                    //             }
                    //         };
                    //         render();
                    //     } else {
                    //         var render = function () {
                    //             if (isAnim === true) {
                    //                 if (animnow == id) {
                    //                     var img = new Image();
                    //                     /* 画像が読み込まれてからcanvasへ書き出す */
                    //                     img.onload = function () {
                    //                         ctx.drawImage(img, coords[19][0] - 50, coords[19][1] - 50, 50, 50);
                    //                     };
                    //                     /* 画像URLを指定して、画像のロードを開始する */
                    //                     img.src = us;
                    //                     isAnim = false;
                    //                     animnow++;
                    //                 }
                    //                 requestAnimationFrame(render);
                    //             }
                    //         };
                    //         render();
                    //     }
                    //     return;
                    // }


                    let sx = coords[s][0];
                    let sy = coords[s][1];
                    let gx = coords[t][0];
                    let gy = coords[t][1];
                    let nx = coords[s][0];
                    let ny = coords[s][1];
                    var render = function () {

                        if (isAnim === true) {

                            if (animnow == id) {
                                let ox = nx;
                                let oy = ny;
                                console.log("rendering: " + String(s) + " " + String(t));
                                if (gx > sx) {
                                    nx += 15;
                                } else if (gx < sx) {
                                    nx -= 15;
                                }
                                if (gy > sy) {
                                    ny += 15;
                                } else if (gy < sy) {
                                    ny -= 15;
                                }
                                let flag = 0;
                                if (nx <= Math.min(sx, gx) || nx >= Math.max(sx, gx)) {
                                    nx = gx;
                                    flag++;
                                }
                                if (ny <= Math.min(sy, gy) || ny >= Math.max(sy, gy)) {
                                    ny = gy;
                                    flag++;

                                }
                                if (flag == 2) {
                                    isAnim = false;
                                    animnow++;
                                }
                                ctx.beginPath();
                                ctx.moveTo(ox, oy);
                                ctx.lineTo(nx, ny);
                                ctx.strokeStyle = c;
                                ctx.lineWidth = 7;
                                ctx.closePath();
                                ctx.stroke();
                            }
                            requestAnimationFrame(render)
                        }

                    };
                    render();
                    // ctx.beginPath();
                    // ctx.moveTo(coords[s][0], coords[s][1]);
                    // ctx.lineTo(coords[t][0], coords[t][1]);

                    // ctx.stroke();
                }
                let cnt = 0;
                while (now != dest && cnt < 100) {
                    draws2t(now, dis[now][dest][1], c, cnt);
                    //画像表示
                    {
                        // let routeImgs = document.getElementById('routeImgs');
                        // let new_element = document.createElement('img');
                        // // new_element.src = getImage(String(now));
                        // new_element.src = images[String(now) + '.jpeg'];
                        // new_element.style.width = '100%';
                        // routeImgs.appendChild(new_element);
                    }
                    now = dis[now][dest][1];
                    cnt++;
                }
                let routeImgs = document.getElementById('routeImgs');
                let new_element = document.createElement('img');
                // new_element.src = getImage(String(now));
                new_element.src = images[String(dest) + '.jpeg'];
                new_element.style.width = '100%';
                routeImgs.appendChild(new_element);
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
                    ctx.drawImage(img, 0, 0, 1017, 1692);
                    // for (let i = 0; i < paths.length; i++) {
                    //     if (kaidan.has(paths[i][0]) && kaidan.has(paths[i][1])) {
                    //         continue;
                    //     }
                    //     simpleLine(coords[paths[i][0]], coords[paths[i][1]]);
                    // }
                    // return;
                    {
                        var img2 = new Image();
                        /* 画像が読み込まれてからcanvasへ書き出す */
                        img2.onload = function () {
                            ctx.globalAlpha = 0.8;
                            ctx.drawImage(img2, coords[now][0] - 100, coords[now][1] - 15, 200, 200);
                            ctx.globalAlpha = 1.0;

                        };
                        /* 画像URLを指定して、画像のロードを開始する */
                        img2.src = nwimg;
                        var img3 = new Image();
                        /* 画像が読み込まれてからcanvasへ書き出す */
                        img3.onload = function () {
                            // ctx.globalAlpha = 0.8;
                            ctx.drawImage(img3, coords[dest][0] - 30, coords[dest][1] - 90, 80, 80);
                            // ctx.globalAlpha = 1.0;

                        };
                        /* 画像URLを指定して、画像のロードを開始する */
                        img3.src = glimg;
                    }
                    // if (prev > 0) {
                    //     if (dis[prev][now][0] + dis[now][dest][0] == dis[prev][dest][0]) {
                    //         drawRouteNoAnim(prev, dest, "skyblue");
                    //     } else {
                    //         drawRouteNoAnim(prev, dest, "orange");
                    //     }

                    // }
                    drawRoute(now, dest, "rgba(255, 0, 0, 1)");

                };

            }
            image();
        }
        showMap(roomIndex, localStorage.getItem('destination'), localStorage.getItem('previousLocation'));
    }

}





export default Main;