fetch('/weather?address=london').then((response) => {
    response.json().then(data => {
        if(data.error) {
            return console.log(data.error)
        } 
        return console.log(data.location)
    })
})
const url = '/weather?address='
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    msg1.textContent = "Loading..."
    const address = search.value
    fetch(url+address).then(resp => {
        resp.json().then(data => {
            if(data.error) {
                msg1.textContent = data.error
                return
            }
            msg1.textContent = data.location
            msg2.textContent = data.forecastData
            return
        })
    })
    console.log('testing')
})