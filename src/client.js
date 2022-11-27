const grpc = require('grpc')
const PROTO_PATH = './reminders.proto'
const ReminderService = grpc.load(PROTO_PATH).ReminderService
const client = new ReminderService('localhost:8080', grpc.credentials.createInsecure())
module.exports = client
