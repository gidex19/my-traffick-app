var experimentnumber = 1
var vehicleSelect = document.getElementById('vehiclemulti')
var vehicles = getSelectedVehicles(vehicleSelect)
var durationSelect = document.getElementById('durationinput')
var redo  = Number(durationSelect.value)
var letsgobtn = document.getElementById('letsgobtn')
var firstsection = document.getElementById('parametersection')
let test = document.getElementById('testheader')
var divtoedit = document.getElementById('divtoedit')
var actionsection = document.getElementById('actionsection')
var resetbtn = document.getElementById('reset')
var timebtn = document.getElementById('time')
var startbtn = document.getElementById('start')
var nextbtn = document.getElementById('next')
var explabel = document.getElementById('explabel')
var chartsection = document.getElementById('chartsection')
var tablesection = document.getElementById('tablesection')
var chartcontainer = document.getElementById('chartcontainer')
var tablesection = document.getElementById('tablesection')

var showchartbtnbar = document.getElementById('showchartbar')
var showchartbtnline = document.getElementById('showchartline')
var showchartbtnpie = document.getElementById('showchartpie')
var showtablebtn = document.getElementById('showtable')


//timebtn.addEventListener('click', timeAction)
startbtn.addEventListener('click', timeAction)
resetbtn.addEventListener('click', reset)
//eventlisteners for buttons to display bar, line charts and tables
showtablebtn.addEventListener('click', showTable)
showchartbtnline.addEventListener('click', showChart.bind(null, 'line', 'cornflowerblue') )
showchartbtnbar.addEventListener('click', showChart.bind(null, 'bar', 'blue') )
showchartbtnpie.addEventListener('click', showChart.bind(null, 'pie', 'blue') )

//var plusbuttons = document.getElementsByClassName('plus')
//console.log(divtoedit.lastElementChild)
//console.log(s.getElementById('plus'))
//console.log(firstsection.nextElementSibling)
letsgobtn.addEventListener('click', letsGoAction)
nextbtn.addEventListener('click', nextAction)

function total(dlist){
    let ini = 0
    dlist.forEach((i)=>{
        ini += i
    })
    return ini
}

function reset() {
    let countinputs = document.querySelectorAll('.countinput')
    countinputs.forEach((countinput) => {
        countinput.value = 0
    })
    timebtn.textContent = '01:00:00'
    // next just reset the time ...

}

function showTable(){
    let table_items = document.querySelectorAll('#table_items')
    table_items.forEach((item)=>{
        item.remove()
    })
    let allcvv = document.querySelectorAll('.cvv')
    allcvv.forEach((item)=>{
        item.remove()
    })
    tablesection.style.display = 'block'
    chartsection.style.display = 'none'

    var table = document.createElement('table')
    table.id = 'table_items'
    var countinputs = document.querySelectorAll('.countinput')
    var itemlength = countinputs.length
    //console.log(itemlength)
    table.className = 'table table-dark'
    var theader = document.createElement('thead')
    var tbody = document.createElement('tbody')
    var parsed = JSON.parse(window.localStorage.getItem(`exp1`))
    //console.log(parsed)
    let vehiclelist = parsed.names
    let thr = document.createElement('tr')
    let th1 = document.createElement('th')
    th1.scope = 'col'
    th1.innerHTML = 'S/N'
    thr.appendChild(th1)
    
    vehiclelist.forEach((v)=>{
        let thh = document.createElement('th')
        thh.scope = 'col'
        thh.innerHTML = v
        thr.appendChild(thh)
    })
    theader.appendChild(thr)
    
    table.appendChild(theader)
    for (i=1; i<=redo; i++){
        var parsed = JSON.parse(window.localStorage.getItem(`exp${i}`))
        let tr = document.createElement('tr')    
        let th = document.createElement('th')
        th.scope = 'row'
        th.innerHTML = i
        tr.appendChild(th)
        for (s=1; s<=itemlength; s++){
            let td = document.createElement('td')
            td.innerHTML = parsed.counts[s-1]
            tr.appendChild(td)
        }
        tbody.appendChild(tr)
    }    
    table.appendChild(tbody)
    
    tablesection.appendChild(table)
}


function timeAction(e) {
    e.preventDefault()
    enableincrementbtns()
    enableinputtime()
    var result = {}
    let namelist = []
    let countlist = []
    result['experiment'] = experimentnumber
    let countinputs = document.querySelectorAll('.countinput')
    let inputnames = document.querySelectorAll('.inputname')
    //console.log(countinputs[3].value)
    //console.log(inputnames[3].placeholder)
    /*countinputs.forEach((countinput)=>{
        console.log(countinputs[3])
    })
    inputnames.forEach((inputname)=>{
        console.log(inputnames[3].placeholder)
    }) */

    var itemlength = countinputs.length
    //console.log(itemlength)
    const datenow = new Date()
    //const launchDate = datenow.getDate() 
    const launchDate = datenow
    launchDate.setHours(datenow.getHours()+ 1)
    //launchDate.setMinutes(datenow.getMinutes() + 0.5)

    // Update every second
    const intvl = setInterval(() => {
        // Get todays date and time (ms)
        const now = new Date().getTime();

        // Distance from now and the launch date (ms)
        const distance = launchDate - now;

        // Time calculation
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        //console.log(`hours: ${hours} mins: ${mins} seconds: ${seconds}`)  
        timebtn.textContent = `${hours}:${mins}:${seconds}`
        // If launch date is reached
        if (distance < 0) {
            // Stop countdown
            clearInterval(intvl);
            timebtn.textContent = "Elapsed"
            let countinputs = document.querySelectorAll('.countinput')
            let plusbtns = document.querySelectorAll('#plus')
            let minusbtns = document.querySelectorAll('#minus')
            countinputs.forEach((countinput) => {
                countinput.disabled = true
            })
            // disable all necessary button until the next experiment is started
            disableincrementbtns()
            resetbtn.style.display = 'none'
            startbtn.style.display = 'none'
            // make next button visible to make possible the commencement of next experiment
            nextbtn.style.display = 'inline'
            for (i = 0; i < itemlength; i++) {
                let name = inputnames[i].placeholder
                let count = countinputs[i].value
                namelist.push(name)
                countlist.push(count)  
            }
            let sum = total(countlist)
            result['names'] = namelist
            result['counts'] = countlist
            result['total'] = sum

            window.localStorage.setItem(`exp${experimentnumber}`, JSON.stringify(result))
            storeditem = window.localStorage.getItem(`exp${experimentnumber}`)
            parseditem = JSON.parse(window.localStorage.getItem(`exp${experimentnumber}`))
            
            alert(`data for Experiment No: ${experimentnumber} has been saved, press the Next button to continue the experiment`)
            disableincrementbtns()
            disableinputtime()
        }
    }, 1000);
}

function nextAction(){
    if (experimentnumber < redo){ 
        experimentnumber +=1
        reset()
        timebtn.textContent = '01:00:00'
        resetbtn.style.display = 'inline'
        startbtn.style.display = 'inline'
        nextbtn.style.display = 'none'
        disableincrementbtns()
        disableinputtime()
        explabel.textContent = `Experiment Number: ${experimentnumber}/${redo}`
    }
    else{
        nextbtn.textContent = 'Finished'
        showchartbtnline.style.display ='inline'
        showchartbtnbar.style.display ='inline'
        showchartbtnpie.style.display ='inline'
        showtablebtn.style.display ='inline'
        var tips = document.getElementById('tips')
        tips.style.display = 'block'
    }
}

function createChart(i, chart_type, dcolor){
    var parsed = JSON.parse(window.localStorage.getItem(`exp${i}`))
    let vehiclelist = parsed.names
    let counts = parsed.counts
    
    
    let mychart = document.getElementById(i).getContext('2d');
    let popChart = new Chart(mychart, {
        type: chart_type,  //others are pie,bar, horizontalBar, line, doughnut, radar, polarArea
        data: {
            labels:vehiclelist,
            datasets: [
                {
                    data:counts,
                    label: 'Traffick Census App ',
                    backgroundColor: ['green', 'gold', 'blueviolet', 'salmon', 'slategray'],
                    borderWidth: 0,
                    borderColor: 'blue',
                    hoverBorderWidth: 3,
                    hoverBorderColor: 'blue'
                }
            ]
        },
        options: {
            title:{
                display: true,
                text:`Chart Representation for Experiment No: ${i}`,
                fontSize: 20,
                fontColor: dcolor
            },
            legend:{
                display: true,
                position: 'top',
                labels: {
                    fontColor: 'black'
                    }
            },
            layout:{
                padding:{
                    left: 0, right: 0, top: 20, bottom: 0
                }
            },
            tooltips:{
                // tooltip is automatically enabled except when stated as false
                enabled: true
            }
        }
    });

}


function showChart(chart_type, dcolor){
    let countinputs = document.querySelectorAll('.countinput')
    var itemlength = countinputs.length

    let allcvv = document.querySelectorAll('.cvv')
    allcvv.forEach((item)=>{
        item.remove()
    })
    let table_items = document.querySelectorAll('#table_items')
    table_items.forEach((item)=>{
        item.remove()
    })
    
    for (i=1; i<=itemlength; i++){
        let cv = document.createElement('canvas')
        cv.id = i
        cv.className = "mt-3 cvv"
        
        chartcontainer.appendChild(cv)
    }
    let cv = document.createElement('canvas')
    let totalid = itemlength + 1
    //console.log(totalid)
    cv.id = totalid
    cv.className = "mt-3 cvv"
    chartcontainer.appendChild(cv)
    var totallist = []
    var vehiclelist = []
    for (i=1; i<=itemlength; i++){
        createChart(i, chart_type, dcolor)
    }
    for (i=1; i<=itemlength; i++){
        var parsed = JSON.parse(window.localStorage.getItem(`exp${i}`))
        let total = parsed.total
        vehiclelist = parsed.names 
        totallist.push(total)
    }
    
     let mychart = document.getElementById(totalid).getContext('2d');
     let popChart = new Chart(mychart, {
         type: chart_type,  //others are pie,bar, horizontalBar, line, doughnut, radar, polarArea
         data: {
             labels:vehiclelist,
             datasets: [
                 {
                     data:totallist,
                     label: 'Traffick Census App ',
                     backgroundColor: ['green', 'gold', 'blueviolet', 'salmon', 'slategray'],
                     borderWidth: 0,
                     borderColor: 'blue',
                     hoverBorderWidth: 3,
                     hoverBorderColor: 'blue'
                 }
             ]
         },
         options: {
            title:{
                display: true,
                text:'Chart Representation for Total vehicles per hour' ,
                fontSize: 20,
                fontColor: dcolor
            },
            legend:{
                display: true,
                position: 'top',
                labels: {
                    fontColor: 'black'
                    }
            },
            layout:{
                padding:{
                    left: 0, right: 0, top: 20, bottom: 0
                }
            },
            tooltips:{
                // tooltip is automatically enabled except when stated as false
                enabled: true
            }
        }
    });
}



function disableincrementbtns(){
    let allplusbtns = document.querySelectorAll('#plus')
    let allminusbtns = document.querySelectorAll('#minus')
    allplusbtns.forEach((btn)=>{
        btn.disabled = true
    })
    allminusbtns.forEach((btn)=>{
        btn.disabled = true
    })
}
function enableincrementbtns(){
    let allplusbtns = document.querySelectorAll('#plus')
    let allminusbtns = document.querySelectorAll('#minus')
    allplusbtns.forEach((btn)=>{
        btn.disabled = false
    })
    allminusbtns.forEach((btn)=>{
        btn.disabled = false
    })
}
function disableinputtime(){
    let countinputs = document.querySelectorAll('.countinput')
    countinputs.forEach((countinput)=>{
        countinput.disabled = true
    })
}
function enableinputtime(){
    let countinputs = document.querySelectorAll('.countinput')
    countinputs.forEach((countinput)=>{
        countinput.disabled = false
    })
}

function getSelectedVehicles(e) {
    let optionsLength = e.options.length - 1;
    let options = e.options
    let result = []
    for (let i = 0; i <= optionsLength; i++) {
        opt = options[i]
        if (opt.selected) {
            result.push(opt.value)
        }
    }
    return result
    }


function createMyDiv(e) {
//console.log(e.target.classList.contains())
    // make the action section visible by setting display to block
    //let experimentlabel = document.getElementById('explabel')
    //console.log(experimentlabel)   
    actionsection.style.display = 'block'
    //obtain selected vehicle's list and create group buttons and inputs for each of them
    var vehicles = getSelectedVehicles(vehicleSelect)
    let position = 0
    vehicles.forEach(function (vehicle) {
        position = position + 1
            //experimentlabel.innerText = `Experiment Number: ${position}`
            //console.log(position)    
        var itemcontainer = document.getElementById('itemcontainer')
        lastdiv = itemcontainer.lastElementChild
        let containerdiv = document.createElement('div')
        containerdiv.className = "input-group mb-2 " + position
        let prependdiv = document.createElement('div')
        prependdiv.className = "input-group-prepend " + position
        let appenddiv = document.createElement('div')
        appenddiv.className = "input-group-append " + position

        let btnplus = document.createElement('button')
        btnplus.className = "btn btn-primary font-weight-bold plus " + position
        btnplus.textContent = '+'
        btnplus.onclick = plusAction
        btnplus.id = 'plus'
        btnplus.type = 'button'
        let btnminus = document.createElement('button')
        btnminus.className = "btn btn-primary font-weight-bold minus " + position
        btnminus.type = 'button'
        btnminus.setAttribute('identifier', vehicle)
        btnminus.textContent = '-'
        btnminus.onclick = minusAction
        btnminus.id = 'minus'
        let inputname = document.createElement('input')
        inputname.type = 'text'
        inputname.className = "form-control inputname " + position
        inputname.placeholder = vehicle
        inputname.disabled = true

        let inputtime = document.createElement('input')
        inputtime.type = 'number'
        inputtime.className = "form-control ml-4 countinput " + position
        inputtime.value = 0
        inputtime.min = '0'
        prependdiv.appendChild(btnminus)
        appenddiv.appendChild(btnplus)

        containerdiv.appendChild(prependdiv)
        containerdiv.appendChild(inputname)
        containerdiv.appendChild(appenddiv)
        containerdiv.appendChild(inputtime)

        itemcontainer.appendChild(containerdiv)
        //console.log(prependdiv)
        //console.log(appenddiv)
    })
        //console.log(itemcontainer)
        explabel.textContent = `Experiment Number: ${experimentnumber}/${redo}`
        firstsection.remove()
        //console.log(plusbuttons)
        disableinputtime()
        disableincrementbtns()
    }

function plusAction(e) {
    e.preventDefault()
    let countinputs = document.querySelectorAll('.countinput')
    let l = e.target.classList.length
    let index = e.target.classList[l - 1]
    countinputs.forEach(function (countinput) {
        if (countinput.classList.contains(index)) {
            let val = Number(countinput.value)
            countinput.value = val + 1
        }

        })

    }
function minusAction(e) {
    e.preventDefault()
    let countinputs = document.querySelectorAll('.countinput')
    let l = e.target.classList.length
    let index = e.target.classList[l - 1]
    countinputs.forEach(function (countinput) {
        if (countinput.classList.contains(index)) {
            let val = Number(countinput.value)
            if (val == 0) {
                console.log(val)
            }
            else {
                countinput.value = val - 1
            }

        }

    })

}


function letsGoAction(e) {
    e.preventDefault()
    var vehiclesSelected = getSelectedVehicles(vehicleSelect)
    var durationSelected = durationSelect.value
    if (vehiclesSelected.length < 4) {
        alert("Select at least 4 vehicle types")
    }
    else {
        createMyDiv(e)
    }

}


