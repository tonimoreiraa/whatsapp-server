import Route from '@ioc:Adonis/Core/Route'

Route.post('/messages', 'MessagesController.store')
Route.resource('/webhooks', 'WebhooksController').only(['store', 'index', 'destroy'])

Route.get('/code', 'WhatsAppsController.getQrCode')

Route.get('/scan', async ({ view }) => {
    return await view.render('scan')
})