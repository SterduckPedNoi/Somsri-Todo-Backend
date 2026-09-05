import Route from '@ioc:Adonis/Core/Route'

const registerEndpoints = () => {
  Route.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() }
  })

  Route.get('/categories', 'CategoriesController.index')
  Route.post('/categories', 'CategoriesController.store')
  Route.put('/categories/:id', 'CategoriesController.update')
  Route.delete('/categories/:id', 'CategoriesController.destroy')

  Route.get('/todos', 'TodosController.index')
  Route.post('/todos', 'TodosController.store')
  Route.get('/todos/:id', 'TodosController.show')
  Route.put('/todos/:id', 'TodosController.update')
  Route.patch('/todos/:id/toggle', 'TodosController.toggle')
  Route.delete('/todos/:id', 'TodosController.destroy')
}

Route.get('/', async () => {
  return {
    name: 'To Do Receipt RESTful API Server',
    version: '1.1.0',
    status: 'running',
    endpoints: {
      todos: '/api/todos',
      categories: '/api/categories',
      health: '/api/health',
    },
  }
})

Route.group(registerEndpoints).prefix('/api')
Route.group(registerEndpoints)

