const client = require('./client')

client.insert({}, (error, reminder) => {
    if (!error) {
        console.log('New Reminder created successfully', reminder)
    } else {
        console.error(error)
    }

})
