let postIndex = 0;
const images = ["https://cdn.sharechat.com/f20331d1-df42-4ed1-821a-37bb781c467c-029472bb-e0dd-41fc-8a22-939176f96a45.jpeg",
    "https://cdn.sharechat.com/acecb9c4-72de-434b-bb2e-cc489fc53fa8-d05120df-319a-452c-b34b-74e2cdb41be8.jpeg",
    "https://cdn.sharechat.com/5b46c3b0-fc3b-4e4b-be36-5b5cdd84573e-1e3a2064-44ae-43a7-9542-301574dae298.jpeg",
    "https://cdn.sharechat.com/71e4a629-b63a-4669-8fa5-a7a533f3b13e-979e586b-f5c2-46a1-94d3-c5b33322d51a.jpeg",
    "https://cdn.sharechat.com/2c82401a-9e25-44f2-a46b-4d11701131c3-f48e3b15-d3ec-4c46-b09f-40dc09389bcc.jpeg"]
document.addEventListener("DOMContentLoaded", function () {
    var video = document.getElementById('video'); // Video

    var canvas = document.querySelector('canvas');
    var context = canvas.getContext('2d');
    var image = document.querySelector('img');
    var emotion = document.getElementById('emotion');
    var w, h, ratio;

    //add loadedmetadata which will helps to identify video attributes

    video.addEventListener('loadedmetadata', function () {
        ratio = video.videoWidth / video.videoHeight;
        w = video.videoWidth - 100;
        h = parseInt(w / ratio, 10);
        canvas.width = w;
        canvas.height = h;

    }, false);



    // Stream Camera To Video Element
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
            }).catch(function (error) {
                console.log(error)
            })
    }




    // On Take Action Button Click
    document.getElementById('capture').addEventListener('click', async function () {
        context.fillRect(0, 0, w, h);
        context.drawImage(video, 0, 0, w, h);
        var dataURI = canvas.toDataURL('image/jpeg');
        console.log(dataURI)
        image.src = images[(postIndex) % images.length]
        postIndex++;

        (async () => {
            emotion.innerHTML = `Emotion Loading...`
            const rawResponse = await fetch('https://ec5c-2406-7400-63-464-4d9c-9f0b-6815-d6dd.ngrok.io/isDrowsy', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ dataURI })
            });
            const content = await rawResponse.json();
            const isClosed = content == '1';
            const sleepyText = 'Drowsy';
            const awakeText = 'Awake';
            console.log("CONTENT::::", content)
            if(isClosed){
                emotion.innerHTML = `Emotion: ${sleepyText}`
                alert(`Please Focus. Your emotion is detected as Emotion ${sleepyText}`)
            }else {
                emotion.innerHTML = `Emotion: ${awakeText}`
            }
            
            
        })();




    })





});
