
const socket = io.connect();

var testData, myTestData;


var signinrememberme = getCookie("signinrememberme")
if(signinrememberme)
{
    let e = getCookie('signinemail')
    window.onload = function() {
        document.getElementById("login_form").style.display = "none"
        tryLogin(e, "", true)
    }
}
var peer  = null

socket.on("yolo", (id2)=>{
    console.log("yolo called")
    socket.emit("createRoom", "test")
    try
    {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
          }).then((_stream)=>{dopeer(_stream, 'Admin')}).catch(e => {alert(`getusermedia error ${e.name}`);})
    }
    catch
    {

    }
       
})

socket.on("yolo2", ()=>{
    console.log("yolo?")
})

function dopeer(stream, id2) {
    peer = new Peer({ host: 'peerjs-server.herokuapp.com', secure: true, port: 443, config: { 'iceServers': [{ urls: ["stun:bn-turn1.xirsys.com"] }, { username: "2DESHRopnmBH54Nl0LnZp4iY6WQdMmKK05RhglV0NRjsX2EP67KUq48J0bSiHsyTAAAAAGBHKAFvbmxpbmV0ZXN0LXByb3RvdHlwZQ==", credential: "a930829e-80ab-11eb-8bb9-0242ac140004", urls: ["turn:bn-turn1.xirsys.com:80?transport=udp", "turn:bn-turn1.xirsys.com:3478?transport=udp", "turn:bn-turn1.xirsys.com:80?transport=tcp", "turn:bn-turn1.xirsys.com:3478?transport=tcp", "turns:bn-turn1.xirsys.com:443?transport=tcp", "turns:bn-turn1.xirsys.com:5349?transport=tcp"] }] } });
    
    peer.on('open', function (id) {
        var call = peer.call(id2, stream);
                call.on('stream', (stream)=>{
                    console.log("call connected")
                })
        });
}



window.onunload = ()=>{
    socket.emit("logout", document.getElementById("input0").value, "")
}

var userData;

function tryLogin(e, p, b)
{
    socket.emit("tryLogin", e, p, b);
    //if(!b)
    {
        document.getElementById("modal-title").innerHTML = "wait";
        document.getElementById("modal-body").innerHTML = '<div class=""><div><p class="text-center display-4" style="font-size:medium; margin-bottom:0; margin-top:0.1rem">Signing in please wait</p></div><div class="text-center mt-5"><span "><img height="150" src="/kid.gif"></span></div></div>'
        $('#modal').modal('toggle');
    }
    
}


function register(data){
    //console.log(userData[0])
    socket.emit("register", {id:userData[0]._id, d:data})
    document.getElementById("modal-title").innerHTML = "wait";
    document.getElementById("modal-body").innerHTML = '<div class="d-flex inline-flex"><div><p class="display-4 mr-4" style="font-size:medium; margin-bottom:0; margin-top:0.1rem">Registering for the test please wait</p></div><div class="spinner-border" role="status"><span class="sr-only"></span></div></div>'
    //$('#modal').modal('toggle');
    // document.getElementById("modal-title").innerHTML = "Waiting";
    // document.getElementById("modal-body").innerHTML = '<p class="d-inline-flex display-4" style="font-size: x-large;">Registering...</p>';
    // $('#modal').modal('toggle');
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

let lateObj = {}


function placeTestCards(data)
{
    //data 0= name, 1= discription 2= isAdmin 3= date 4= time 5 = login time 6=tests 7= ismytests 8= testDuration 9= attempted
    let testList = document.getElementById(data[6])
    let div1 = document.createElement('div')
    if(data[7])
    {
        div1.setAttribute("id", data[0]+"1")
    }
    else
    {
        div1.setAttribute("id", data[0]+"0")
    }
    div1.setAttribute("class", "card mb-3 shadow")
    div1.setAttribute("style", "padding: 0; background-size: auto; min-height: 375px")
    let div2 = document.createElement('div')
    div2.setAttribute("class", "card-header cb shadow card-title text-center")
    div2.appendChild(document.createTextNode(data[0]))
    let div3 = document.createElement('div')
    div3.setAttribute("class", "card-body")
    // let h5 = document.createElement('h5')
    // h5.setAttribute("class", "card-title")
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
    p6.appendChild(document.createTextNode("test duration : "+data[8]))
    
    //div3.appendChild(h5)
    div3.appendChild(p1)
    div3.appendChild(p2)
    div3.appendChild(p3)
    div3.appendChild(p4)
    div3.appendChild(p5)
    div3.appendChild(p6)
    if(!data[2])
    {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        var d = new Date(),
            h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
            m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        var time = h + ':' + m;


        today = dd + '/' + mm + '/' + yyyy;
        if (data[3] < today || data[4] < time) {
            if(data[7])
            {
                lateObj[data[0]] = true
            }
        }
        let div4 = document.createElement('div')
        div4.setAttribute("class", "text-center d-flex inline-flex")
        let test = document.createElement('img')
        test.setAttribute("id", "startTest"+data[0])
        test.setAttribute("class", "hov mr-1 mt-2")
        test.setAttribute("style", "max-height:45px")
        let testName = data[0]
        if(data[7] && !data[9] && !lateObj[data[0]])
        {
            
            test.setAttribute("src", "/UI/Component 20 (1).svg")
            test.onclick = () => {
                socket.emit("confirmData", { uid: userData[0]._id, testName: data[0] })
                document.getElementById("modal-title").innerHTML = "wait";
                document.getElementById("modal-body").innerHTML = '<div class="d-flex inline-flex"><div><p class="display-4 mr-4" style="font-size:medium; margin-bottom:0; margin-top:0.1rem">Checking details please wait</p></div><div class="spinner-border" role="status"><span class="sr-only"></span></div></div>'
                $('#modal').modal('toggle');
                socket.on("confirmData", () => {
                    $('#modal').modal('toggle');
                    var today = new Date();
                    var dd = String(today.getDate()).padStart(2, '0');
                    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                    var yyyy = today.getFullYear();

                    var d = new Date(),
                        h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
                        m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
                    var time = h + ':' + m;


                    today = dd + '/' + mm + '/' + yyyy;
                    let date = data[3];
                    var token = getCookie("token" + userData[0]._id);
                    socket.emit("currentMACTest", { testName: data[0], user: token })
                    socket.on("currentMACTest", (result) => {
                        if (result) {
                            //if(true)
                            if (date == today && data[5] <= time && data[4] >= time) {
                                var d = new Date();
                                d.setTime(d.getTime() + (12 * 60 * 60 * 1000));
                                var expires = "expires=" + d.toUTCString();
                                document.cookie = "testName=" + data[0] + ";" + expires
                                document.cookie = "startTime=" + data[4] + ";" + expires
                                document.cookie = "userId=" + userData[0]._id + ";" + expires
                                let newUrl = "/" + data[0]
                                newUrl = newUrl.replaceAll(/ /g, "%20")
                                socket.emit("newUrl", newUrl)
                                socket.on("newUrl", (url) => {
                                    document.getElementById("modal-title").innerHTML = "wait";
                                    document.getElementById("modal-body").innerHTML = "starting test please wait";
                                    $('#modal').modal('toggle');
                                    let timeOut = setTimeout(() => {
                                        $('#modal').modal('toggle');
                                        location.href = url
                                    }, 2000);
                                    $('#modal').on('hidden.bs.modal', function (e) {
                                        clearInterval(timeOut)
                                        location.href = url
                                    })

                                })
                            }
                            else if (date < today || data[4] < time) {
                                document.getElementById("modal-title").innerHTML = "failed";
                                document.getElementById("modal-body").innerHTML = '<p class="d-inline-flex display-4" style="font-size: large;">you were late, cant attempt this test. try other tests if you like to </p>';
                                $('#modal').modal('toggle');
                            }
                            else {
                                document.getElementById("modal-title").innerHTML = "try later";
                                document.getElementById("modal-body").innerHTML = '<p class="d-inline-flex display-4" style="font-size: large;">cant take this test right now. try on ' + data[3] + ' after ' + data[5] + '</p>';
                                $('#modal').modal('toggle');
                            }
                        }
                        else {
                            document.getElementById("modal-title").innerHTML = "Alert";
                            document.getElementById("modal-body").innerHTML = '<p class="d-inline-flex display-4" style="font-size: large;">cant take this test on this device either switch to registered device or create a ticket to change device permission' + '</p>';
                            $('#modal').modal('toggle');
                        }
                    })
                })
                socket.on("notConfirmData", ()=>{
                    test.setAttribute("disabled", true)
                    document.getElementById("modal-title").innerHTML = "Failed";
                    document.getElementById("modal-body").innerHTML = "Data is corrupted please unregister and register again for this test";
                    let timeOut = setTimeout(() => {
                        $('#modal').modal('toggle');
                    }, 2000);
                    $('#modal').on('hidden.bs.modal', function (e) {
                        clearInterval(timeOut)
                    })
                })
            }
            div4.appendChild(test);
            div3.appendChild(div4)
        }
        else if(!data[7])
        {
            test.classList.remove("mr-1")
            test.classList.remove("mt-2")
            div4.classList.remove("d-flex")
            div4.classList.remove("inline-flex")
            test.setAttribute("src", "/UI/register.svg")
            test.setAttribute("style", "")
            test.onclick = ()=>{
                register(data);
            }
            div4.appendChild(test);
            div3.appendChild(div4)
        }     
        if(data[7])
        {
            div3.setAttribute("style", "background-color: #7a64ff; color:white;")
        }
        
        if(data[7] && !data[9] && !lateObj[data[0]])
        {
            let test2 = document.createElement('img')
            test2.setAttribute("src", "/UI/Component 21 (2) (1).svg")
            test2.setAttribute("style", "max-height:45px")
            test2.setAttribute("class", "hov mt-2")
            test2.setAttribute("id", "unregister"+data[0])
            test2.onclick = ()=>{
                document.getElementById("modal-title").innerHTML = "wait";
                document.getElementById("modal-body").innerHTML = '<div class="d-flex inline-flex"><div><p class="display-4 mr-4" style="font-size:medium; margin-bottom:0; margin-top:0.1rem">Unregistering please wait</p></div><div class="spinner-border" role="status"><span class="sr-only"></span></div></div>'
                $('#modal').modal('toggle');
                socket.emit("unregister", {uid:userData[0]._id, testName:data[0]} )
            }
            div4.appendChild(test2);
            div3.appendChild(div4)
        }
    }
    div1.appendChild(div2)
    div1.appendChild(div3)
    if(data[7])
        {
            let but = document.createElement('button')
            but.setAttribute("id", "alert"+data[0])
            but.setAttribute("class", "btn btn-danger col-md-12")
            but.disabled = true
            if(data[9])
            {
                but.appendChild(document.createTextNode('Already Attempted !'))
                div3.appendChild(but);
            }
            else if(lateObj[data[0]])
            {
                but.appendChild(document.createTextNode('you missed it'))
                div3.appendChild(but);
            }
        }
    testList.appendChild(div1)
}

function forgotpassword()
{
    document.getElementById("modal-title").innerHTML = "wait";
    document.getElementById("modal-body").innerHTML = '<div class="d-flex inline-flex"><div><p class="display-4 mr-4" style="font-size:medium; margin-bottom:0; margin-top:0.1rem">sending email to entered mail please wait</p></div><div class="spinner-border" role="status"><span class="sr-only"></span></div></div>'
    $('#modal').modal('toggle');
    socket.emit("forgotPassword", document.getElementById("input0").value)
}

function loggedIn(uName)
{
    document.getElementById("login_form").style.display = "none";
    document.getElementById("welcome-msg").innerHTML = 'Welcome, '+uName;
    document.getElementById("upcoming-tests").style.display = "flex";
    document.getElementById("signup").style.display = "none"
    document.getElementById("signin").style.display = "none"
    document.getElementById("logout").style.display = "block"
    document.getElementById("logout").onclick = ()=>{
        document.cookie = "signinrememberme=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "signinemail=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.getElementById("logouthref").setAttribute("href", "signin")
    }
    
}

socket.on("LoggedIn", (data, testsData, myTestsData)=>{
    if(document.getElementById("signinrememberme").checked == true)
    {
        let d = new Date();
        d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = "signinrememberme="+true+";" + expires
        document.cookie = "signinemail="+data[0].email+";" + expires
    }
    userData = data;
    document.getElementById("input0").classList.remove("is-invalid");
    document.getElementById("input0").classList.add("is-valid");
    document.getElementById("input1").classList.remove("is-invalid");
    document.getElementById("input1").classList.add("is-valid");
    document.getElementById("invalid0").innerHTML = ""
    document.getElementById("invalid1").innerHTML = ""
    document.getElementById("modal-title").innerHTML = "Success";
    document.getElementById("modal-body").classList.add("text-center")
    document.getElementById("modal-body").innerHTML = '<img height="100px" src="/test.gif">' + "<br>" + "<div class='mt-5'>Successfully Logged In </div>";
    //$('#modal').modal('toggle');
    //if(!b)
    {
        let timeOut = setTimeout(() => {
            $('#modal').modal('toggle');
            loggedIn(data[0].userName)
        }, 3500);
        $('#modal').on('hidden.bs.modal', function (e) {
            clearInterval(timeOut)
            loggedIn(data[0].userName)
        })
    }
    for(let i = 0; i<testsData.length; i++)
    {
        let testTime = testsData[i].testTime
        if(testsData[i].testTime > 60)
        {
            testTime = Math.floor(testTime/60)+" hr "+ Math.floor(testTime%60)+" mins"
        }
        else
        {
            testTime = testTime + " mins"
        }
        let upcomingCardData = [testsData[i].testName, testsData[i].description, false, testsData[i].date, testsData[i].startTime, testsData[i].timeFrom, "tests", false, testTime]
        placeTestCards(upcomingCardData);
    }
    let attempted = false
    for(let i = 0; i<myTestsData.length; i++)
    {
        for(let j = 0; j < myTestsData[i].participants.length; j++){
            //console.log(myTestsData[i].participants[j].attempted)
            if(myTestsData[i].participants[j].pid == userData[0]._id)
            {
                attempted = myTestsData[i].participants[j].attempted
                break
            }
        }
        let testTime = myTestsData[i].testTime
        if(myTestsData[i].testTime > 60)
        {
            testTime = Math.floor(testTime/60)+" hr "+ Math.floor(testTime%60)+" mins"
        }
        else
        {
            testTime = testTime + " mins"
        }
        let myCardData = [myTestsData[i].testName, myTestsData[i].description, false, myTestsData[i].date, myTestsData[i].startTime, myTestsData[i].timeFrom, "myTests", true, testTime, attempted]
        placeTestCards(myCardData);       
    }
});

socket.on("LogInFailed", (data)=>{
    document.getElementById("modal-title").innerHTML = "Failed";
    document.getElementById("modal-body").innerHTML = "Failed to login";
    //$('#modal').modal('toggle');
    let timeOut = setTimeout(() => {
        $('#modal').modal('toggle');
    }, 3000);
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

socket.on("alreadyRegistered", ()=>{
    document.getElementById("modal-title").innerHTML = "Failed";
    document.getElementById("modal-body").innerHTML = '<p class="d-inline-flex display-4" style="font-size: large;">You are already Registered for this test</p>';
    //$('#modal').modal('toggle');
    let timeOut = setTimeout(() => {
        $('#modal').modal('toggle');
    }, 2000);
    $('#modal').on('hidden.bs.modal', function (e) {
        clearInterval(timeOut)
    })
})

socket.on("registered", (testsData, token)=>{
    document.getElementById("modal-title").innerHTML = "Success";
    document.getElementById("modal-body").innerHTML = '<p class="d-inline-flex display-4" style="font-size: large;">Successfully registered for beta test<br></p>';
    //$('#modal').modal('toggle');
    let timeOut = setTimeout(() => {
        $('#modal').modal('toggle');
    }, 2000);
    $('#modal').on('hidden.bs.modal', function (e) {
        clearInterval(timeOut)
    })
    let testTime = testsData.testTime
        if(testsData.testTime > 60)
        {
            testTime = Math.floor(testTime/60)+" hr "+ Math.floor(testTime%60)+" mins"
        }
        else
        {
            testTime = testTime + " mins"
        }
    let myCardData = [testsData.testName, testsData.description, false, testsData.date, testsData.startTime, testsData.timeFrom, "myTests", true, testTime]
    placeTestCards(myCardData);
    var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = "token"+userData[0]._id+"="+token+ ";" + expires
    //console.log("token"+userData[0]._id+"="+token)
})

var once2 = true

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
            socket.emit("logout", document.getElementById("input0").value, "")
            tryLogin();
            document.getElementById("useHere").style.display = "none"
        }
        useHere.setAttribute("data-dismiss", "modal")
        footer.appendChild(useHere)
        once2 = false
    }
    //$('#modal').modal('toggle');
    let timeOut = setTimeout(() => {
        $('#modal').modal('toggle');
    }, 3000);
    $('#modal').on('hidden.bs.modal', function (e) {
        clearInterval(timeOut)
    })
})

socket.on("unregister", (testName)=>{
    document.getElementById("modal-title").innerHTML = "Success";
    document.getElementById("modal-body").innerHTML = "you have unregistered from this test";
    //$('#modal').modal('toggle');
    let timeOut = setTimeout(() => {
        $('#modal').modal('toggle');
    }, 2000);
    $('#modal').on('hidden.bs.modal', function (e) {
        clearInterval(timeOut)
    })
    document.getElementById(testName+"1").style.display = "none"
})

socket.on("emailSent", ()=>{
    document.getElementById("modal-title").innerHTML = "Success";
    document.getElementById("modal-body").innerHTML = "an email has been sent to the entered email";
    //$('#modal').modal('toggle');
    let timeOut = setTimeout(() => {
        $('#modal').modal('toggle');
    }, 3000);
    $('#modal').on('hidden.bs.modal', function (e) {
        clearInterval(timeOut)
    })
})

socket.on("forgotPasswordFailed", ()=>{
    document.getElementById("modal-title").innerHTML = "Failed";
    document.getElementById("modal-body").innerHTML = "this email is not registered with this website";
    //$('#modal').modal('toggle');
    let timeOut = setTimeout(() => {
        $('#modal').modal('toggle');
    }, 3000);
    $('#modal').on('hidden.bs.modal', function (e) {
        clearInterval(timeOut)
    })
})