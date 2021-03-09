onmessage = function(e) {
    if(e.data.type == "timer")
    {
        var count = ((e.data.time)*60 - 1)
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
    else if(e.data.type == "wait")
    {
        var x = setInterval(function() {
            var d = new Date(),
            h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
            m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
            var time = h + ':' + m;
            if(time == e.data.time)
            {
                postMessage("startTest");
                clearInterval(x);
                
                // let count = 60
                // let x2 = setInterval(() => {
                //     postMessage(count);
                //     count--
                //     if (count == 0) {
                //         clearInterval(x2);
                //         postMessage("count");
                //         return;
                //     }
                // }, 1000)
                return
            }
        }, 1000);
    }
}