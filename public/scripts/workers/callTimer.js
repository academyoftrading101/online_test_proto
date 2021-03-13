onmessage = function(e) 
{
    let interval
    if(e.data == "start")   
    {
        interval = setInterval(() => {
            postMessage("check");
        }, 5000);
    }
}