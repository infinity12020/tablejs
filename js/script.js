
let tbody = document.querySelector('tbody')
let modal = document.querySelector('dialog')
let clos = document.querySelector('.cross')


function reloadTable(arr, place) {
   

    for(let item of arr) {
        let tr = document.createElement('tr')
        let num = document.createElement('td')
        let name = document.createElement('td')
        let age = document.createElement('td')
        let tools = document.createElement('td')
        let deleteBtn = document.createElement('button')
        let deleteImg = document.createElement('img')

        place.append(tr)
        tr.append(num, name, age, tools)
        tools.append( deleteBtn)
        deleteBtn.append(deleteImg)
        deleteImg.src = 'img/trash.png'
        deleteImg.alt = 'delete'

        num.innerHTML = arr.indexOf(item) + 1
        name.innerHTML = item.name
        age.innerHTML = item.age

        deleteBtn.onclick = () => {
            arr.splice(arr.indexOf(item), 1)
            reloadTable(arr, tbody)
        }

      
    }
}

clos.onclick = () => {
    modal.close()
}
let peoples = []
let form = document.forms.tables
let inps = form.querySelectorAll('input')
let modalForm = document.forms.modalForm

let errors = 0
form.onsubmit = (e) => {
    e.preventDefault()
    inps.forEach(inp => {
        if (inp.value === '') ++errors
    })

    if(errors === 0) submit()
}

function submit() {
    let value = {
        id: Math.random()
    }
    new FormData(form).forEach((val, key) => {
        value[key] = val
    })
    value.age = new Date().getFullYear() - +value.age

    if(value.age < new Date().getFullYear() - 100) return
    if(!isNaN(value.name)) return

    peoples.push(value)
    
    reloadTable(peoples, tbody)
}
