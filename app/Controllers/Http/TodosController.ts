import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'
import Category from 'App/Models/Category'

export default class TodosController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const status = request.input('status')
      const categoryId = request.input('category_id')

      const query = Todo.query().orderBy('id', 'asc')

      if (categoryId) {
        query.where('category_id', categoryId)
      }

      if (status === 'completed') {
        query.where('is_completed', true)
      } else if (status === 'active') {
        query.where('is_completed', false)
      }

      const todos = await query

      return response.status(200).json({
        success: true,
        data: todos,
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to retrieve todos',
        error: error.message,
      })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const title = request.input('title')
      let categoryId = request.input('category_id')

      if (!title || typeof title !== 'string' || title.trim().length === 0) {
        return response.status(422).json({
          success: false,
          message: 'Title is required and must not be empty',
        })
      }

      if (!categoryId) {
        const defaultCategory = await Category.query().orderBy('id', 'asc').first()
        categoryId = defaultCategory ? defaultCategory.id : null
      }

      const todo = await Todo.create({
        title: title.trim(),
        categoryId: categoryId ? Number(categoryId) : null,
        isCompleted: false,
      })

      return response.status(201).json({
        success: true,
        message: 'Todo created successfully',
        data: todo,
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to create todo',
        error: error.message,
      })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const todo = await Todo.find(params.id)

      if (!todo) {
        return response.status(404).json({
          success: false,
          message: `Todo with ID ${params.id} not found`,
        })
      }

      return response.status(200).json({
        success: true,
        data: todo,
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to retrieve todo',
        error: error.message,
      })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const todo = await Todo.find(params.id)

      if (!todo) {
        return response.status(404).json({
          success: false,
          message: `Todo with ID ${params.id} not found`,
        })
      }

      const { title, is_completed, category_id } = request.only([
        'title',
        'is_completed',
        'category_id',
      ])

      if (title !== undefined) {
        if (typeof title !== 'string' || title.trim().length === 0) {
          return response.status(422).json({
            success: false,
            message: 'Title must not be empty',
          })
        }
        todo.title = title.trim()
      }

      if (is_completed !== undefined) {
        todo.isCompleted = Boolean(is_completed)
      }

      if (category_id !== undefined) {
        todo.categoryId = Number(category_id)
      }

      await todo.save()

      return response.status(200).json({
        success: true,
        message: 'Todo updated successfully',
        data: todo,
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to update todo',
        error: error.message,
      })
    }
  }

  public async toggle({ params, response }: HttpContextContract) {
    try {
      const todo = await Todo.find(params.id)

      if (!todo) {
        return response.status(404).json({
          success: false,
          message: `Todo with ID ${params.id} not found`,
        })
      }

      todo.isCompleted = !todo.isCompleted
      await todo.save()

      return response.status(200).json({
        success: true,
        message: 'Todo status toggled successfully',
        data: todo,
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to toggle todo status',
        error: error.message,
      })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const todo = await Todo.find(params.id)

      if (!todo) {
        return response.status(404).json({
          success: false,
          message: `Todo with ID ${params.id} not found`,
        })
      }

      await todo.delete()

      return response.status(200).json({
        success: true,
        message: 'Todo deleted successfully',
        data: { id: Number(params.id) },
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to delete todo',
        error: error.message,
      })
    }
  }
}
