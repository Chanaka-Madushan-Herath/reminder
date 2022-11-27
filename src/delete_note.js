const client = require('./client')

client.delete({}, (error, reminder) => {
    if (!error) {
        console.log('Reminder Has been successfully deleted',reminder)
    } else {
        console.error(error)
    }
})
