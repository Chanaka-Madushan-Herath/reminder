const client = require('./client')

client.list({}, (error, reminders) => {
    if (!error) {
        console.log('successfully fetch List reminders')
        console.log(reminders)
    } else {
        console.error(error)
    }
})
