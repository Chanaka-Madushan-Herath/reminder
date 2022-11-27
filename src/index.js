const grpc = require('grpc')
const uuid = require('uuid');

const remindersProto = grpc.load('reminders.proto')

const reminders = [
    { id: '1', title: 'Reminder 1', content: 'Content 1'},
    { id: '2', title: 'Reminder 2', content: 'Content 2'}
]

const server = new grpc.Server()

server.addService(remindersProto.reminderService.service, {
    list: (_, callback) => {
        callback(null, reminders)
    },
    insert: (call, callback) => {
        let reminder = call.request
        reminder.id = uuid.v1()
        reminders.push(reminder)
        callback(null, reminder)
    },
    delete: (call, callback) => {
        let existingReminderIndex = reminders.findIndex((n) => n.id === call.request.id)
        if (existingReminderIndex !== -1) {
            let reminder = reminders[existingReminderIndex]
            reminders.splice(existingReminderIndex, 1)
            callback(null, reminder)
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            })
        }
    },
    update: (call, callback) => {
        let existingReminderIndex = reminders.findIndex((n) => n.id === call.request.id)
        if (existingReminderIndex !== -1) {
            let reminder = call.request
            reminder.id = uuid.v1()
            reminders[existingReminderIndex] = reminder
            callback(null, reminder)
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            })
        }
    }
})

server.bind('127.0.0.1:8080', grpc.ServerCredentials.createInsecure())

server.start()
