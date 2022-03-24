const localStorageTasks = JSON.parse(localStorage.getItem('localStorageTasks'))
let taskObjects = localStorage.getItem('localStorageTasks') !== null ? localStorageTasks : []

const btnAdd = document.querySelector('.btn-add')

btnAdd.onclick = () => {
  // Cria uma nova task e adiciona a mesma no array em que estão as outras tarefas e atualiza o localsotrage e a tela
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
  updateLocalStorage()
}

const generateID = () =>{
  // Gera um id necessário para cada task nova
  const IDHead = Date.now().toString(36)
  const IDTail = Math.random().toString(36).substring(2)

  return IDHead+IDTail
}

const removeTask = taskID =>{
  // Remove a task do array taskObjects
  taskObjects = taskObjects.filter(task => taskID != task.id)

  init()
  updateLocalStorage()
}

const updateLocalStorage = () => {
  // Atualiza o local storage
  localStorage.setItem('localStorageTasks', JSON.stringify(taskObjects))
}

const init = () => {
  // Sincroniza as tasks que aparecem na tela com as do local storage
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
