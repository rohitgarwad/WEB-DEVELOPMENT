const checkBoxList = document.querySelectorAll('.custom-checkbox')
const inputList = document.querySelectorAll('.goal-input')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')
const progressLabel = document.querySelector('.progress-label')

const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Woah! You just completed all the goals, time for chill :D',
]

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}
let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
progressValue.style.width = `${(completedGoalsCount / inputList.length) * 100}%`
progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputList.length} completed`
progressLabel.innerText = allQuotes[completedGoalsCount]

checkBoxList.forEach((checkBox) => {
    checkBox.addEventListener('click', () => {
        const allGoalsAdded = [...inputList].every((input) => {
            return input.value 
        })
        if (allGoalsAdded) {
            checkBox.parentElement.classList.toggle('completed')
            const inputId = checkBox.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed
            completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
            localStorage.setItem('allGoals', JSON.stringify(allGoals))

            progressValue.style.width = `${(completedGoalsCount / inputList.length) * 100}%`
            progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`
            progressLabel.innerText = allQuotes[completedGoalsCount]

        } else {
            progressBar.classList.add('show-error')
        }
    })
})

inputList.forEach((input) => {

    input.value = allGoals[input.id] ? allGoals[input.id].value : ''

    if (allGoals[input.id] && allGoals[input.id].completed) {
        input.parentElement.classList.add('completed')
    }

    input.addEventListener('focus', () => {
        progressBar.classList.remove('show-error')
    })

    input.addEventListener('input', (e) => {
        if (allGoals[input.id] && allGoals[input.id].completed) {
            e.target.value = allGoals[input.id].value
            return
        }
        input.value = input.value.trim() ? input.value : ''
        allGoals[input.id] = {
            value: input.value,
            completed: false
        }
        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })
})