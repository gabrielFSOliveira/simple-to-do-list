let taskObjects = []

const btnAdd = document.querySelector('.btn-add')

btnAdd.onclick = () => {
  const inpName = document.querySelector('.inp-new-item')

  if (inpName.value.trim() != ""){
    let newTask = {
      name: inpName.value.trim(),
      id: generateID()
    }
  
    taskObjects.push(newTask)
  }

  inpName.value = ""

  init()
}

const generateID = () =>{
  const IDHead = Date.now().toString(36)
  const IDTail = Math.random().toString(36).substring(2)

  return IDHead+IDTail
}

const removeTask = taskID =>{
  taskObjects = taskObjects.filter(task => taskID != task.id)

  init()
}

const init = () => {
  const ulTask = document.querySelector('ul.ul-tasks')

  ulTask.innerHTML = ""

  if (taskObjects.length == 0) {
    ulTask.innerHTML = "<li><p>Sem Tarefas</p></li>"
  } else {
    taskObjects.forEach(task => {
      ulTask.innerHTML += `<li><p>${task.name}</p><button onclick="removeTask('${task.id}')"><span class="icon-trash"></span></button></li>`
    })
  }
}

init()
