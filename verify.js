document.addEventListener("DOMContentLoaded", function () {
    var video = document.getElementById('video'); // Video

    var canvas = document.querySelector('canvas');
    var context = canvas.getContext('2d');
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




    // On Take Photo Button Click
    document.getElementById('capture').addEventListener('click', async function () {
        context.fillRect(0, 0, w, h);
        context.drawImage(video, 0, 0, w, h);
        var dataURI = canvas.toDataURL('image/jpeg');
        console.log(dataURI)
        const blob = await fetch(dataURI).then(it => it.blob());
        const file = new File([blob], 'fileName.jpg', {type:"image/jpeg", lastModified:new Date()});
        console.log(file)
    })





});
