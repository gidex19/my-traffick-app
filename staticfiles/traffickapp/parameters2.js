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
var explabel = document.getElementById('explabel')
var submitbtn = document.getElementById('submit')
var resetbtn = document.getElementById('reset')
var nextbtn = document.getElementById('next')
var chartsection = document.getElementById('chartsection')
var tablesection = document.getElementById('tablesection')
var chartcontainer = document.getElementById('chartcontainer')

var showchartbtn = document.getElementById('showchart')
var showtablebtn = document.getElementById('showtable')


chartsection.style.display = 'none'

// adding event listeners
letsgobtn.addEventListener('click', letsGoAction)
submitbtn.addEventListener('click', submitAction)
nextbtn.addEventListener('click', nextAction)
resetbtn.addEventListener('click', reset)
showchartbtn.addEventListener('click', showChart)
showtablebtn.addEventListener('click', showTable)

function showTable(){
    let table = document.createElement('table')
    let header = document.createElement('tbody')

    let cv1 = document.createElement('canvas')
    cv1.id =1
    let cv2 = document.createElement('canvas')
    cv2.id =2

    //chartcontainer.appendChild(cv1)
    //chartcontainer.appendChild(cv2)

    // table.class = 'table table-hover'
    // table.createTHead().class = 'bgh'
    // table.createTBody()
    //console.log(cv)
}
function createChart(i){
    var parsed = JSON.parse(window.localStorage.getItem(`expr${i}`))
    console.log(parsed)
    let vehiclelist = parsed.names
    let counts = parsed.counts
    console.log(vehiclelist)
    console.log(counts)
    
    let mychart = document.getElementById(i).getContext('2d');
    let popChart = new Chart(mychart, {
        type: 'bar',  //others are pie,bar, horizontalBar, line, doughnut, radar, polarArea
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
                fontColor: 'black'
            },
            legend:{
                display: true,
                position: 'top',
                labels: {
                    fontColor: 'pink'
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

function showChart(){
    let countinputs = document.querySelectorAll('.countinput')
    var itemlength = countinputs.length
    
    for (i=1; i<=itemlength; i++){
        let cv = document.createElement('canvas')
        cv.id = i
        cv.className = "mt-3"
        
        chartcontainer.appendChild(cv)
    }
    let cv = document.createElement('canvas')
    let totalid = itemlength + 1
    console.log(totalid)
    cv.id = totalid
    cv.className = "mt-3"
    chartcontainer.appendChild(cv)
    var totallist = []
    var vehiclelist = []
    for (i=1; i<=itemlength; i++){
        createChart(i)
    }
    for (i=1; i<=itemlength; i++){
        var parsed = JSON.parse(window.localStorage.getItem(`expr${i}`))
        let total = parsed.total
        vehiclelist = parsed.names 
        totallist.push(total)
    }
    console.log(totallist)
    console.log(vehiclelist)
//  var parsed = JSON.parse(window.localStorage.getItem(`expr${i}`))
//     console.log(parsed)
//     let vehiclelist = parsed.names
//     let counts = parsed.counts
//     console.log(vehiclelist)
//     console.log(counts)
    
     let mychart = document.getElementById(totalid).getContext('2d');
     let popChart = new Chart(mychart, {
         type: 'bar',  //others are pie,bar, horizontalBar, line, doughnut, radar, polarArea
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
                fontColor: 'black'
            },
            legend:{
                display: true,
                position: 'top',
                labels: {
                    fontColor: 'pink'
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
    


function total(dlist){
    let ini = 0
    dlist.forEach((i)=>{
        ini += i
    })
    return ini
}



function submitAction(e){
    e.preventDefault()
    var result = {}
    let namelist = []
    let countlist = []
    result['experiment'] = experimentnumber
    let countinputs = document.querySelectorAll('.countinput')
    let inputnames = document.querySelectorAll('.inputname')
    var itemlength = countinputs.length
    //console.log(itemlength)
    for (i=0; i<itemlength; i++){
        let name = inputnames[i].placeholder
        let count = Number(countinputs[i].value)
        namelist.push(name)
        countlist.push(count)
    }
    let sum = total(countlist)
    result['names'] = namelist
    result['counts'] = countlist
    result['total'] = sum
    window.localStorage.setItem(`expr${experimentnumber}`,JSON.stringify(result))
    storeditem = window.localStorage.getItem(`expr${experimentnumber}`)
    parseditem = JSON.parse(window.localStorage.getItem(`expr${experimentnumber}`))
    console.log(storeditem)
    console.log(parseditem)
    countinputs.forEach((countinput)=>{
        countinput.disabled = true})
    disableincrementbtns()
    resetbtn.style.display = 'none'
    submitbtn.style.display = 'none'    
    alert(`data for Experiment No: ${experimentnumber} has been saved, press the Next button to continue the experiment`)

    nextbtn.style.display = 'inline'
}

function nextAction(){
    if (experimentnumber < redo){
        resetbtn.style.display = 'inline'
        submitbtn.style.display = 'inline' 
        experimentnumber +=1
        reset()
        explabel.textContent = `Experiment Number: ${experimentnumber}/${redo}`
        nextbtn.style.display = 'none'
        enableincrementbtns()   
        enableinputtime()
        
    }
    else{
        nextbtn.textContent = 'Finished'
        showchartbtn.style.display ='inline'
        showtablebtn.style.display ='inline'
    }

}

function reset() {
    let countinputs = document.querySelectorAll('.countinput')
    countinputs.forEach((countinput) => {
        countinput.value = 0
    })
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
        prependdiv.appendChild(btnminus)
        appenddiv.appendChild(btnplus)

        containerdiv.appendChild(prependdiv)
        containerdiv.appendChild(inputname)
        containerdiv.appendChild(appenddiv)
        containerdiv.appendChild(inputtime)

        itemcontainer.appendChild(containerdiv)

    })
    explabel.textContent = `Experiment Number: ${experimentnumber}/${redo}`
    firstsection.remove()
    //console.log(plusbuttons)
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
        