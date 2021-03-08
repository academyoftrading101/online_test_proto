const socket = io.connect();
var listofInputs = new Array(9)
listofInputs = ["", "", "", "", "", "", "", "", ""];


function tryLogin()
{
    document.getElementById("modal-title").innerHTML = "wait";
    let text = "Signing in please wait"
    document.getElementById("modal-body").innerHTML = '<div class="d-flex inline-flex"><div><p class="display-4 mr-4" style="font-size:medium; margin-bottom:0; margin-top:0.1rem">'+text+'</p></div><div class="spinner-border" role="status"><span class="sr-only"></span></div></div>'
    $('#modal').modal('toggle');
    socket.emit("tryAdminLogin", document.getElementById("input0").value, document.getElementById("input1").value);
}

window.onunload = ()=>{socket.emit("logout", document.getElementById("input0").value, "admin")}

function start()
{
    document.getElementById("modal-title").innerHTML = "Alert";
    document.getElementById("modal-body").innerHTML = "are you sure you want to start BETA test ?";
    document.getElementById("modal-cancel").innerHTML = "Sure"
    document.getElementById("modal-cancel").onclick = ()=>{
        $('#modal').modal('toggle'); 
        console.log("test started")
        socket.emit("startTest");
    }
    $('#modal').modal('toggle'); 
}

function createTest()
{
    document.getElementById("testForm").style.display = "block";
}

let allGood2 = [false, false, false]

function validateAll()
{
    let allGood = [false, false, false, false, false, false, false, false, false];
    for(var i = 0; i < listofInputs.length; i++)
    {
        listofInputs[i] = document.getElementById("input1"+i).value
        if(listofInputs[i] == "")
        {
            document.getElementById("input1"+i).classList.remove("is-valid")
            document.getElementById("input1"+i).classList.add("is-invalid")
            document.getElementById("invalid1"+i).innerHTML = "required"
            allGood[i] = false
        }
        else
        {
            document.getElementById("input1"+i).classList.remove("is-invalid")
            document.getElementById("input1"+i).classList.add("is-valid")
            document.getElementById("invalid1"+i).innerHTML = ""
            allGood[i] = true
        }
    }
    for(let i in allGood)
    {
        if(!allGood[i])
        {
            return
        }
    }
    for(let i = 5; i < 8; i++)
    {
        socket.emit("checkNoOfQuestions", {i:(i-5), j:listofInputs[i]} )
    }
    
    socket.on("allGood", (b, ij)=>{
        if(!b)
        {
            document.getElementById("input1"+(ij+5)).classList.remove("is-valid")
            document.getElementById("input1"+(ij+5)).classList.add("is-invalid")
            document.getElementById("invalid1"+(ij+5)).innerHTML = "Pick a lower number"
            document.getElementById("modal-title").innerHTML = "Failed";
            document.getElementById("modal-body").innerHTML = "entered number of questions was too high than available in question bank";
            $('#modal').modal('toggle');
            allGood2[ij] = false
            return
        }
        else
        {
            allGood2[(ij)] = true
        }
        for(let i in allGood2)
        {
            if(!allGood2[i])
            {
                return
            }
        }
        socket.emit("newTest", listofInputs)
        document.getElementById("modal-title").innerHTML = "wait";
        let text = "adding new test please wait"
        document.getElementById("modal-body").innerHTML = '<div class="d-flex inline-flex"><div><p class="display-4 mr-4" style="font-size:medium; margin-bottom:0; margin-top:0.1rem">'+text+'</p></div><div class="spinner-border" role="status"><span class="sr-only"></span></div></div>'
        $('#modal').modal('toggle');
        allGood2 = [false, false, false]
    })
    
}

function validateAll2(testName)
{
    let allGood = [false, false, false, false, false, false, false, false, false];
    for(var i = 0; i < listofInputs.length; i++)
    {
        listofInputs[i] = document.getElementById("input1"+i).value
        if(listofInputs[i] == "")
        {
            document.getElementById("input1"+i).classList.remove("is-valid")
            document.getElementById("input1"+i).classList.add("is-invalid")
            document.getElementById("invalid1"+i).innerHTML = "required"
            allGood[i] = false
        }
        else
        {
            document.getElementById("input1"+i).classList.remove("is-invalid")
            document.getElementById("input1"+i).classList.add("is-valid")
            document.getElementById("invalid1"+i).innerHTML = ""
            allGood[i] = true
        }
    }
    for(let i in allGood)
    {
        if(!allGood[i])
        {
            return
        }
    }
    for(let i = 5; i < 8; i++)
    {
        socket.emit("checkNoOfQuestions", {i:(i-5), j:listofInputs[i]} )
    }
    
    socket.on("allGood", (b, ij)=>{
        if(!b)
        {
            document.getElementById("input1"+(ij+5)).classList.remove("is-valid")
            document.getElementById("input1"+(ij+5)).classList.add("is-invalid")
            document.getElementById("invalid1"+(ij+5)).innerHTML = "Pick a lower number"
            document.getElementById("modal-title").innerHTML = "Failed";
            document.getElementById("modal-body").innerHTML = "entered number of questions was too high than available in question bank";
            $('#modal').modal('toggle');
            allGood2[ij] = false
            return
        }
        else
        {
            allGood2[(ij)] = true
        }
        for(let i in allGood2)
        {
            if(!allGood2[i])
            {
                return
            }
        }
        socket.emit("updateTest", {testName:testName, listofInputs:listofInputs})
        document.getElementById("modal-title").innerHTML = "wait";
        let text = "adding new test please wait"
        document.getElementById("modal-body").innerHTML = '<div class="d-flex inline-flex"><div><p class="display-4 mr-4" style="font-size:medium; margin-bottom:0; margin-top:0.1rem">'+text+'</p></div><div class="spinner-border" role="status"><span class="sr-only"></span></div></div>'
        $('#modal').modal('toggle');
        allGood2 = [false, false, false]
    })
    
}

let flag = {}

function placeTestCards(data)
{
    //data 0= name, 1= discription 2= isAdmin 3= date 4= time 5 = login time 6= testDuration
    let testList = document.getElementById("tests")
    let div1 = document.createElement('div')
    div1.setAttribute("id", data[0])
    div1.setAttribute("class", "card col-md-4 mb-3 mr-2")
    div1.setAttribute("style", "max-width: 18rem; background-color: #AFF9CA")
    //let div2 = document.createElement('div')
    //div2.setAttribute("class", "card-header")
    //div2.appendChild(document.createTextNode("Test"))
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
    let p5 = document.createElement('p')
    p5.setAttribute("class", "card-text")
    p5.appendChild(document.createTextNode("test duration : "+data[6]))
    div3.appendChild(h5)
    div3.appendChild(p1)
    div3.appendChild(p2)
    div3.appendChild(p3)
    div3.appendChild(p4)
    div3.appendChild(p5)
    //div1.appendChild(div2)
    div1.appendChild(div3)
    if(data[2])
    {
        let editTest = document.createElement('button')
        editTest.setAttribute("type", "button")
        editTest.setAttribute("class", "btn btn-outline-success")
        editTest.onclick = ()=>{
            showTestUpdateform(data[0])
        }
        editTest.appendChild(document.createTextNode('edit test'))
        let test = document.createElement('button')
        let newLink=data[0].replace(/\s+/g, '')
        test.setAttribute("id", newLink+"details")
        test.setAttribute("type", "button")
        test.setAttribute("class", "btn btn-outline-info")
        test.onclick = ()=>{
            //document.getElementById(newLink+"Participants").style.display = "block";
            socket.emit("noOfParticipants", {testName:data[0], id:newLink})
        }
        test.appendChild(document.createTextNode('view details'))
        div1.appendChild(editTest);
        div1.appendChild(test);
        let participants = document.createElement('div')
        participants.setAttribute("id", newLink+"Participants")
        participants.setAttribute("style", "display:none;")
        participants.appendChild(document.createTextNode('no. of Participants :'))
        div1.appendChild(participants)
        let participants2 = document.createElement('div')
        participants2.setAttribute("id", newLink+"num")
        participants2.setAttribute("style", "display:none;")
        participants2.setAttribute("class", "text-center")
        div1.appendChild(participants2)
        flag[newLink.valueOf()] = true
        
        
        
    }
    testList.appendChild(div1)
}

var testId

function nextQuestion()
{
    if(document.getElementById("input30").value == "")
    {   
        document.getElementById("modal-title").innerHTML = "Alert";
        document.getElementById("modal-body").innerHTML = "Please dont leave the Question tab empty";
        let timeOut = setTimeout(() => {
            $('#modal').modal('toggle');
        }, 2000);
        $('#modal').on('hidden.bs.modal', function (e) {
            clearInterval(timeOut)
        })
    }
    else
    {
        let inputQuestion = []
        for(let i = 0; i<5; i++)
        {
            //if(document.getElementById("input3"+i).value != "")
             
            inputQuestion.push(document.getElementById("input3"+i).value)
        }
        for(var i = 5; i < 8; i++)
        {
            if(document.getElementById("input3"+i).checked)
            {
                inputQuestion.push((i-5))
                inputQuestion.push(document.getElementById("input38").value)
                socket.emit("inputQuestion", inputQuestion)
                document.getElementById("modal-title").innerHTML = "wait";
                let text = "saving new question please wait"
                document.getElementById("modal-body").innerHTML = '<div class="d-flex inline-flex"><div><p class="display-4 mr-4" style="font-size:medium; margin-bottom:0; margin-top:0.1rem">'+text+'</p></div><div class="spinner-border" role="status"><span class="sr-only"></span></div></div>'
                $('#modal').modal('toggle');
                return
            }
        }
        document.getElementById("modal-title").innerHTML = "Alert";
        document.getElementById("modal-body").innerHTML = "Please choose a difficulty";
        $('#modal').modal('toggle');
    }
}

function finish()
{
    testId = ""
}

function placeQuestion(data)
{
    // 0=id, 1=q, 2-5=o 6= 
    let mainUl = document.getElementById("questions"+data[0]);
    let mainLi = document.createElement('li')
    mainLi.setAttribute("class", "list-group-item")
    mainLi.setAttribute("style", "max-width: 80vw;")
    let question = document.createElement('p')
    question.appendChild(document.createTextNode(data[1]))
    let optionsUl = document.createElement('ul')
    optionsUl.setAttribute("class", "list-group")
    for(let i = 0; i<4;i++)
    {
        if(data[(i+2)] != "")
        {
            let optionLi = document.createElement("li")
            optionLi.setAttribute("class", "list-group-item option_Style hov text-white")
            optionLi.setAttribute("style", "max-width: 200px;")
            let option = document.createElement('p')
            option.appendChild(document.createTextNode(data[(i+2)]))
            optionLi.appendChild(option)
            optionsUl.appendChild(optionLi)
        }
    }

    mainLi.appendChild(question)
    mainLi.appendChild(optionsUl)
    let optionLi2 = document.createElement("li")
    optionLi2.setAttribute("class", "list-group-item option_Style hov text-white mb-3")
    optionLi2.setAttribute("style", "max-width: 200px;")
    let option2 = document.createElement('p')
    option2.appendChild(document.createTextNode(data[(Number(data[7]) + 1)]))
    let label = document.createElement('p')
    label.appendChild(document.createTextNode('correct Answer :'))
    label.setAttribute("class", "mt-5 mb-2")
    optionLi2.appendChild(option2)
    optionsUl.appendChild(label)
    optionsUl.appendChild(optionLi2)
    if(data[0] != 0)
    {
        let button = document.createElement('button')
        button.setAttribute("class", "btn btn-outline-success mt-2 offset-md-10")
        button.onclick = ()=>{
            document.getElementById("updateSearch").style.display = "none"
            socket.emit("updateQuestion", data[6]);
        }
        button.appendChild(document.createTextNode("Update"))
        let button2 = document.createElement('button')
        button2.setAttribute("class", "btn btn-outline-danger mt-2 ml-2")
        button2.onclick = ()=>{
            document.getElementById("updateSearch").style.display = "none"
            socket.emit("deleteQuestion", data[6]);
            document.getElementById("modal-title").innerHTML = "wait";
            let text = "deleting question please wait"
            document.getElementById("modal-body").innerHTML = '<div class="d-flex inline-flex"><div><p class="display-4 mr-4" style="font-size:medium; margin-bottom:0; margin-top:0.1rem">'+text+'</p></div><div class="spinner-border" role="status"><span class="sr-only"></span></div></div>'
            $('#modal').modal('toggle');
        }
        button2.appendChild(document.createTextNode("Delete"))
        mainLi.appendChild(button);
        mainLi.appendChild(button2);
    }
    mainUl.appendChild(mainLi)
}

function slide(id){
    if(document.getElementById(id).style.display == "none"){
        //$("#viewQuestionsOptions").slideDown("slow");
        document.getElementById(id).style.display = "block"
    }
    else{
        //$("#viewQuestionsOptions").slideUp("slow");
        document.getElementById(id).style.display = "none"
    }
}

function slide2(id){
    if(document.getElementById(id).style.display == "block"){
        document.getElementById(id).style.display = "none"
    }
}

function showQuestions(index)
{
    //if(document.getElementById("questions").style.display == "none")
    {
        document.getElementById("questions").style.display = "block"
        socket.emit("showQuestions", index, 0);
    }
    // else
    // {
    //     document.getElementById("questions").style.display = "none"
    // }
    
}

function updateList()
{
    document.getElementById("updateSearch").style.display = "block"
    socket.emit("showQuestions", 3, 1);
}

let once = [0, 1, 2];

function numberOfQuestion(id)
{
    if(once.includes(id))
    {
        let index = once.indexOf(id);
        once.splice(index, 1)
        socket.emit("numberOfQuestion", id)
    }
}

function setNumberOfQuestions(id, n)
{
    // set questions from here
}

function loggedIn(uName)
{
    document.getElementById("admin_login_form").style.display = "none";
    document.getElementById("welcome-msg").innerHTML = 'Welcome Admin, '+uName;   
    document.getElementById("upcoming-tests").style.display = "block"; 
    document.getElementById("tests").style.display = "block"
    document.getElementById("questionBank").style.display = "block";
    document.getElementById("signup").style.display = "none"
    document.getElementById("signin").style.display = "none"
    document.getElementById("logout").style.display = "block"
    document.getElementById("logouthref").setAttribute("href", "admin")
}

function showTestUpdateform (testName)
{
    document.getElementById("createTestHeading").style.display = "none"
    document.getElementById("createTest").style.display = "none"
    socket.emit("showTestList", testName)
    document.getElementById("testForm").style.display = "block"
    document.getElementById("addTest").innerHTML = "Update"
    document.getElementById("cancel").style.display = "block"
    document.getElementById("deleteTest").style.display = "block"
}

function revertTestForm()
{
    for(let i = 0; i < 9; i++)
    {
        document.getElementById("input1"+i).value = ""
    }
    document.getElementById("createTestHeading").style.display = "block"
    document.getElementById("createTest").style.display = "block"
    document.getElementById("testForm").style.display = "none"
    document.getElementById("addTest").innerHTML = "Add Test"
    document.getElementById("addTest").onclick = ()=>{
        validateAll()
    }
    document.getElementById("cancel").style.display = "none"
    document.getElementById("deleteTest").style.display = "none"
}

socket.on("adminLoggedIn", (data, data1)=>{
    document.getElementById("input0").classList.remove("is-invalid");
    document.getElementById("input0").classList.add("is-valid");
    document.getElementById("input1").classList.remove("is-invalid");
    document.getElementById("input1").classList.add("is-valid");
    document.getElementById("invalid0").innerHTML = ""
    document.getElementById("invalid1").innerHTML = ""
    document.getElementById("modal-title").innerHTML = "Success";
    document.getElementById("modal-body").innerHTML = "Successfully Logged In";
    //$('#modal').modal('toggle');
    let timeOut = setTimeout(() => {
        $('#modal').modal('toggle');
        loggedIn(data[0].userName)
    }, 2000);
    $('#modal').on('hidden.bs.modal', function (e) {
        clearInterval(timeOut)
        loggedIn(data[0].userName)
    })
    
    for(let i = 0; i<data1.length; i++)
    {
        let testTime = data1[i].testTime
        if(data1[i].testTime > 60)
        {
            testTime = Math.floor(testTime/60)+" hr "+ Math.floor(testTime%60)+" mins"
        }
        else
        {
            testTime = testTime + " mins"
        }
        let cardDate = [data1[i].testName, data1[i].description, true, data1[i].date, data1[i].startTime, data1[i].timeFrom, testTime]
        placeTestCards(cardDate)
        
    }
});

socket.on("adminLogInFailed", (data)=>{
    document.getElementById("modal-title").innerHTML = "Failed";
    document.getElementById("modal-body").innerHTML = "Failed to login";
    let timeOut = setTimeout(() => {
        $('#modal').modal('toggle');
    }, 2000);
    $('#modal').on('hidden.bs.modal', function (e) {
        clearInterval(timeOut)
    })
    if(data == "email")
    {
        document.getElementById("input0").classList.remove("is-valid");
        document.getElementById("input0").classList.add("is-invalid");
        document.getElementById("invalid0").innerHTML = "bad credentials"
    }
    else if(data == "password")
    {
        document.getElementById("input1").classList.remove("is-valid");
        document.getElementById("input1").classList.add("is-invalid");
        document.getElementById("invalid1").innerHTML = "bad credentials"
    }
})

socket.on("testAdded", (id)=>{
    testId = id
    document.getElementById("modal-title").innerHTML = "Success";
    document.getElementById("modal-body").innerHTML = '<p class="d-inline-flex display-4" style="font-size: large;">Successfully created a new test</p>';
    let timeOut = setTimeout(() => {
        $('#modal').modal('toggle');
    }, 2000);
    $('#modal').on('hidden.bs.modal', function (e) {
        clearInterval(timeOut)
    })
    let testTime = document.getElementById("input18").value
    if(testTime > 60)
    {
        testTime = Math.floor(testTime/60)+" hr "+ Math.floor(testTime%60)+" mins"
    }
    else
    {
        testTime = testTime + " mins"
    }
    let cardDate = [document.getElementById("input10").value, document.getElementById("input14").value, true, document.getElementById("input11").value, document.getElementById("input12").value, document.getElementById("input13").value, testTime]
    placeTestCards(cardDate)
})

socket.on("testAlreadyExists", ()=>{
    document.getElementById("input10").classList.remove("is-valid")
    document.getElementById("input10").classList.add("is-invalid")
    document.getElementById("invalid10").innerHTML = "already exists"
    document.getElementById("modal-title").innerHTML = "Failed";
    document.getElementById("modal-body").innerHTML = '<p class="d-inline-flex display-4" style="font-size: large;">test with that name already exists</p>';
    let timeOut = setTimeout(() => {
        $('#modal').modal('toggle');
    }, 2000);
    $('#modal').on('hidden.bs.modal', function (e) {
        clearInterval(timeOut)
    })
})

socket.on("saved", ()=>{
    document.getElementById("modal-title").innerHTML = "success";
    document.getElementById("modal-body").innerHTML = "question saved";
    let timeOut = setTimeout(() => {
        $('#modal').modal('toggle');
    }, 2000);
    $('#modal').on('hidden.bs.modal', function (e) {
        clearInterval(timeOut)
    })
    for(let i = 0; i<5; i++)
        {
            document.getElementById("input3"+i).value = ""
        }
})

socket.on("showQuestions", (questions, type)=>{
    document.getElementById("questions"+type).innerHTML = ""
    for(let i in questions)
    {
        let questionData = [type, questions[i].question, questions[i].option1, questions[i].option2, questions[i].option3, questions[i].option4, questions[i]._id, questions[i].ans]
        //console.log(questionData[(Number(questionData[7]) + 2)])
        placeQuestion(questionData)
    }
})

socket.on("updateQuestion", (question)=>{
    let ogValues = [];
    let newValues = [];
    document.getElementById("questionUpdateField").style.display = "block"
    ogValues[0] = document.getElementById("input40").value = question.question;
    ogValues[1] = document.getElementById("input41").value = question.option1;
    ogValues[2] = document.getElementById("input42").value = question.option2;
    ogValues[3] = document.getElementById("input43").value = question.option3;
    ogValues[4] = document.getElementById("input44").value = question.option4;
    ogValues[6] = question.questionType;
    ogValues[5] = document.getElementById("input45").value = question.ans;
    if(question.questionType == "0")
    {
        document.getElementById("input46").checked = true;
    }
    else if(question.questionType == "1")
    {
        document.getElementById("input47").checked = true;
    }
    else if(question.questionType == "2")
    {
        document.getElementById("input48").checked = true;
    }
    document.getElementById("updateButton").onclick = ()=>{
        for(let i = 0; i < 6; i++)
        {
            if(document.getElementById("input4"+i).value != ogValues[i])
            {
                newValues[i] = document.getElementById("input4"+i).value;
            }
            else
            {
                newValues[i] = ""
            }
        }
        for(var i = 6; i < 9; i++)
        {
            if(document.getElementById("input4"+i).checked && ogValues[6] != (i-6))
            {
                newValues[6] = String(i-6)
                socket.emit("updateValues", {n:newValues, qid:question._id})
                document.getElementById("modal-title").innerHTML = "wait";
                let text = "updating question please wait"
                document.getElementById("modal-body").innerHTML = '<div class="d-flex inline-flex"><div><p class="display-4 mr-4" style="font-size:medium; margin-bottom:0; margin-top:0.1rem">'+text+'</p></div><div class="spinner-border" role="status"><span class="sr-only"></span></div></div>'
                $('#modal').modal('toggle');
                return
            }
            else
            {
                newValues[6] = ""
            }
        }
        socket.emit("updateValues", {n:newValues, qid:question._id})
    }
})

socket.on("updated", ()=>{
    document.getElementById("modal-title").innerHTML = "Success";
    document.getElementById("modal-body").innerHTML = "Successfully Updated the question";
    let timeOut = setTimeout(() => {
        $('#modal').modal('toggle');
    }, 2000);
    $('#modal').on('hidden.bs.modal', function (e) {
        clearInterval(timeOut)
    })
    document.getElementById("questionUpdateField").style.display = "none"
    updateList();
})

socket.on("deleted", ()=>{
    document.getElementById("modal-title").innerHTML = "Success";
    document.getElementById("modal-body").innerHTML = "Successfully deleted the question";
    let timeOut = setTimeout(() => {
        $('#modal').modal('toggle');
    }, 2000);
    $('#modal').on('hidden.bs.modal', function (e) {
        clearInterval(timeOut)
    })
    updateList();
})

socket.on("noOfParticipants", (n, id)=>{
    document.getElementById(id+"num").innerHTML = n
    console.log(flag[id.valueOf()])
    if(flag[id.valueOf()])
    {
        // document.getElementById(id+"Participants").style.display = "block"
        // document.getElementById(id+"num").style.display = "block"
        $("#"+id+"Participants").slideDown("slow");
        $("#"+id+"num").slideDown("slow");  
        flag[id.valueOf()] = false  
        //console.log("works1 " + id)            
    }
    else
    {
        $("#"+id+"Participants").slideUp("slow");
        $("#"+id+"num").slideUp("slow");  
        // document.getElementById(id+"Participants").style.display = "none"
        // document.getElementById(id+"num").style.display = "none"
        flag[id.valueOf()] = true
        //console.log("works2 " + id)
    }
    
})

socket.on("numberOfQuestion", (id, n)=>{
    let dropdown = document.getElementById("dropdown"+id)
    for(let i = 0; i < n; i++)
    {
        let p = document.createElement("p")
        //p.setAttribute("id", "dropdownId"+id+i)
        p.setAttribute("class", "dropdown-item dropdownItems")
        p.setAttribute("style", "padding:0; margin:0; padding-left: 20px")
        p.onclick = ()=>{
            setNumberOfQuestions(id, i);
        }
        p.appendChild(document.createTextNode((i+1)))
        dropdown.appendChild(p)
    }
})
let once2 = true
socket.on("alreadyLoggedIn", ()=>{
    document.getElementById("modal-title").innerHTML = "Failed";
    document.getElementById("modal-body").innerHTML = "already logged in on other device/browser tab";
    if(once2)
    {
        let footer = document.getElementsByClassName("modal-footer")[0]
        let useHere = document.createElement('button')
        useHere.setAttribute("id", "useHere")
        useHere.setAttribute("class", "btn btn-primary")
        useHere.appendChild(document.createTextNode('Use Here'))
        useHere.onclick = ()=>{
            socket.emit("logout", document.getElementById("input0").value, "admin")
            document.getElementById("useHere").style.display = "none"
        }
        useHere.setAttribute("data-dismiss", "modal")
        footer.appendChild(useHere)
        once2 = false
    }
    let timeOut = setTimeout(() => {
        $('#modal').modal('toggle');
    }, 2000);
    $('#modal').on('hidden.bs.modal', function (e) {
        clearInterval(timeOut)
    })
})

socket.on("showTestList", (test)=>{
    let ogvalues = new Array(9)
    let newValues = new Array(9)
    ogvalues[0] = document.getElementById("input10").value = test.testName
    ogvalues[1] = document.getElementById("input11").value = test.date
    ogvalues[2] = document.getElementById("input12").value = test.startTime
    ogvalues[3] = document.getElementById("input13").value = test.timeFrom
    ogvalues[4] = document.getElementById("input14").value = test.description
    ogvalues[5] = document.getElementById("input15").value = test.noofquestions[0]
    ogvalues[6] = document.getElementById("input16").value = test.noofquestions[1]
    ogvalues[7] = document.getElementById("input17").value = test.noofquestions[2]
    ogvalues[8] = document.getElementById("input18").value = test.testTime
    document.getElementById("addTest").onclick = ()=>{
        document.getElementById("modal-title").innerHTML = "wait";
        let text = "Updating test please wait"
        document.getElementById("modal-body").innerHTML = '<div class="d-flex inline-flex"><div><p class="display-4 mr-4" style="font-size:medium; margin-bottom:0; margin-top:0.1rem">'+text+'</p></div><div class="spinner-border" role="status"><span class="sr-only"></span></div></div>'
        $('#modal').modal('toggle');
        document.getElementById(test.testName).style.display="none"
        for(let i = 0; i < 9; i++)
        {
            if(ogvalues[i] != document.getElementById("input1"+i).value)
            {
                newValues[i] = document.getElementById("input1"+i).value
            }
            else
            {
                newValues[i] = ""
            }
        }
        validateAll2(test.testName)
    }
    document.getElementById("deleteTest").onclick = ()=>{
        document.getElementById("modal-title").innerHTML = "wait";
        let text = "Deleting test please wait"
        document.getElementById("modal-body").innerHTML = '<div class="d-flex inline-flex"><div><p class="display-4 mr-4" style="font-size:medium; margin-bottom:0; margin-top:0.1rem">'+text+'</p></div><div class="spinner-border" role="status"><span class="sr-only"></span></div></div>'
        $('#modal').modal('toggle');
        socket.emit("deleteTest", test.testName)
    }
})

socket.on("testUpdated", ()=>{
    document.getElementById("modal-title").innerHTML = "Success";
    document.getElementById("modal-body").innerHTML = '<p class="d-inline-flex display-4" style="font-size: large;">Successfully Updated the test</p>';
    let timeOut = setTimeout(() => {
        $('#modal').modal('toggle');
    }, 2000);
    $('#modal').on('hidden.bs.modal', function (e) {
        clearInterval(timeOut)
    })
    let testTime = document.getElementById("input18").value
    if(testTime > 60)
    {
        testTime = Math.floor(testTime/60)+" hr "+ Math.floor(testTime%60)+" mins"
    }
    else
    {
        testTime = testTime + " mins"
    }
    let cardDate = [document.getElementById("input10").value, document.getElementById("input14").value, true, document.getElementById("input11").value, document.getElementById("input12").value, document.getElementById("input13").value, testTime]
    placeTestCards(cardDate)
    revertTestForm()
})

socket.on("testDeleted", (testName)=>{
    document.getElementById(testName).style.display = "none"
    document.getElementById("modal-title").innerHTML = "Success";
    document.getElementById("modal-body").innerHTML = '<p class="d-inline-flex display-4" style="font-size: large;">Successfully Deleted the test</p>';
    let timeOut = setTimeout(() => {
        $('#modal').modal('toggle');
    }, 2000);
    $('#modal').on('hidden.bs.modal', function (e) {
        clearInterval(timeOut)
    })
})