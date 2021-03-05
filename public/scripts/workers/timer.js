onmessage = function(e) {
    var count = ((e.data)*60 - 1)
    var x = setInterval(function() {
        let seconds = count % 60;
        let minutes = Math.floor(count / 60);
        let hours = Math.floor(minutes / 60);
        minutes %= 60;
        hours %= 60;
        let workerResult = String( hours + "h "+ minutes + "m " + seconds + "s");
        count = count - 1;
        if (count == -2) {
            clearInterval(x);
            return;
        }
        else
        {
            postMessage(workerResult);
        }
    }, 1000);
    
    
}