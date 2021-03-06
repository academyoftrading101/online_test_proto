socket = io.connect()

function placeTestCards(data)
{
    //data 0= name, 1= discription 2= isAdmin 3= date 4= time 5 = login time 6=testDuration
    let testList = document.getElementById("testListBox")
    let div1 = document.createElement('div')
    div1.setAttribute("id", data[0])
    if(data[2])
        div1.setAttribute("class", "card mb-5 mr-2 col-md-4 shadow")
    else    
        div1.setAttribute("class", "card mb-5 mr-2 col-md-4 shadow")
    div1.setAttribute("style", "padding: 0; background-size: cover;")
    let div2 = document.createElement('div')
    div2.setAttribute("class", "card-header cb shadow card-title text-center")
    div2.appendChild(document.createTextNode(data[0]))
    let div3 = document.createElement('div')
    div3.setAttribute("class", "card-body")
    // let h5 = document.createElement('h5')
    // h5.setAttribute("class", "")
    // h5.setAttribute("style", "padding:10px; " )
    // h5.appendChild(document.createTextNode(data[0]))
    let p1 = document.createElement('p')
    p1.setAttribute("class", "card-text")
    p1.appendChild(document.createTextNode(data[1]))
    let p2 = document.createElement('p')
    p2.setAttribute("class", "card-text")
    p2.appendChild(document.createTextNode("test date : "+data[3]))
    let p3 = document.createElement('p')
    p3.setAttribute("class", "card-text")
    p3.appendChild(document.createTextNode("test starts at : "+data[4]))
    let p4 = document.createElement('p')
    p4.setAttribute("class", "card-text")
    p4.setAttribute("style", "margin-bottom:0;")
    p4.appendChild(document.createTextNode("login after : "+data[5]))
    let p5 = document.createElement('p')
    p5.setAttribute("class", "card-text")
    p5.appendChild(document.createTextNode("(no late entry would be allowed)"))
    let p6 = document.createElement('p')
    p6.setAttribute("class", "card-text")
    p6.appendChild(document.createTextNode("test duration : "+data[6]))
    //div3.appendChild(h5)
    div3.appendChild(p1)
    div3.appendChild(p2)
    div3.appendChild(p3)
    div3.appendChild(p4)
    div3.appendChild(p5)
    div3.appendChild(p6)
    let div4 = document.createElement('div')
    div4.setAttribute("class", "text-center")
    let test = document.createElement('img')
    test.setAttribute("src", "/UI/register.svg")
    test.setAttribute("class", "hov")
    test.onclick = ()=>{
        location.href='/signup'
    }
//    test.appendChild(document.createTextNode("Register"))
    div4.appendChild(test);
    div3.appendChild(div4)
    div1.appendChild(div2)
    div1.appendChild(div3)

    testList.appendChild(div1)
}

socket.emit("getTestCards")

socket.on("testData", d=>{
    for(let i = 0; i<d.length; i++)
    {
        let testTime = d[i].testTime
        if(d[i].testTime > 60)
        {
            testTime = Math.floor(testTime/60)+" hr "+ Math.floor(testTime%60)+" mins"
        }
        else
        {
            testTime = testTime + " mins"
        }
        if(i == (d.length - 1))
        {
            let cardDate = [d[i].testName, d[i].description, true, d[i].date, d[i].startTime, d[i].timeFrom, testTime]
            placeTestCards(cardDate)
        }
        else
        {
            let cardDate = [d[i].testName, d[i].description, false, d[i].date, d[i].startTime, d[i].timeFrom, testTime]
            placeTestCards(cardDate)
        }
    }
})