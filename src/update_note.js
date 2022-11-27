const client = require('./client')

client.update({}, (error, reminder) => {
    if (!error) {
        console.log('Reminder Has been successfully updated', reminder)
    } else {
        console.error(error)
    }
})
