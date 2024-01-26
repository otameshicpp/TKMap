let roomNames = ["物理実験室", "地理室"];


// function updateInfo() {
//     destination = localStorage.getItem("destination");
//     document.getElementById('destinationCaption').innerText = destination;
//     if (destination == '2-AHR') {
//         direcVideo.src = "/buturi-2A.mov";
//     } else if (destination == '生物室') {
//         direcVideo.src = "/buturi-seibutu2.mov";
//     } else if (destination == '喫茶班') {

//     }
//     direcVideo.style.display = "inline";
//     direcVideo.play()
// }
// function showDirections() {
//     picker = document.getElementById('destinationPicker')
//     direcVideo = document.getElementById('direcVideo');
//     localStorage.setItem("destination", picker.options[picker.selectedIndex].value);
//     updateInfo();
// }

function getRoomName(index) {
    return roomNames[index];
}

// export default updateInfo, showDirections, getRoomName;