socket = io.connect()

function placeTestCards(data)
{
    //data 0= name, 1= discription 2= isAdmin 3= date 4= time 5 = login time
    let testList = document.getElementById("testListBox")
    let div1 = document.createElement('div')
    div1.setAttribute("id", data[0])
    if(data[2])
        div1.setAttribute("class", "card")
    else    
        div1.setAttribute("class", "card mb-5")
    div1.setAttribute("style", "min-width: inherit; background-color: #AFF9CA")
    let div2 = document.createElement('div')
    div2.setAttribute("class", "card-header")
    div2.appendChild(document.createTextNode("Test"))
    let div3 = document.createElement('div')
    div3.setAttribute("class", "card-body")
    let h5 = document.createElement('h5')
    h5.setAttribute("class", "card-title")
    h5.appendChild(document.createTextNode(data[0]))
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
    p4.appendChild(document.createTextNode("login after : "+data[5] + " no late entry would be allowed"))
    div3.appendChild(h5)
    div3.appendChild(p1)
    div3.appendChild(p2)
    div3.appendChild(p3)
    div3.appendChild(p4)
    let test = document.createElement('button')
    test.setAttribute("id", "startTest")
    test.setAttribute("type", "button")
    test.setAttribute("class", "btn btn-outline-info col-md-4 offset-md-4")
    test.onclick = ()=>{
        location.href='/signup'
    }
    test.appendChild(document.createTextNode("Register"))
    div3.appendChild(test);
    div1.appendChild(div2)
    div1.appendChild(div3)

    testList.appendChild(div1)
}

socket.emit("getTestCards")

socket.on("testData", d=>{
    for(let i = 0; i<d.length; i++)
    {
        if(i == (d.length - 1))
        {
            let cardDate = [d[i].testName, d[i].description, true, d[i].date, d[i].startTime, d[i].timeFrom]
            placeTestCards(cardDate)
        }
        else
        {
            let cardDate = [d[i].testName, d[i].description, false, d[i].date, d[i].startTime, d[i].timeFrom]
            placeTestCards(cardDate)
        }
    }
})