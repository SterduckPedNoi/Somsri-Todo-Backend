import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {
  public async index({ response }: HttpContextContract) {
    try {
      const categories = await Category.query()
        .withCount('todos', (query) => query.as('total_todos'))
        .withCount('todos', (query) => query.where('is_completed', true).as('completed_todos'))
        .orderBy('id', 'asc')

      const formatted = categories.map((cat) => ({
        ...cat.toJSON(),
        total_todos: Number(cat.$extras.total_todos || 0),
        completed_todos: Number(cat.$extras.completed_todos || 0),
      }))

      return response.status(200).json({
        success: true,
        data: formatted,
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to retrieve categories',
        error: error.message,
      })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const name = request.input('name')

      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return response.status(422).json({
          success: false,
          message: 'Category name is required',
        })
      }

      const category = await Category.create({
        name: name.trim().toUpperCase(),
      })

      return response.status(201).json({
        success: true,
        message: 'Category created successfully',
        data: {
          ...category.toJSON(),
          total_todos: 0,
          completed_todos: 0,
        },
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to create category',
        error: error.message,
      })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const category = await Category.find(params.id)

      if (!category) {
        return response.status(404).json({
          success: false,
          message: `Category with ID ${params.id} not found`,
        })
      }

      const name = request.input('name')
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return response.status(422).json({
          success: false,
          message: 'Category name must not be empty',
        })
      }

      category.name = name.trim().toUpperCase()
      await category.save()

      const updatedCat = await Category.query()
        .where('id', category.id)
        .withCount('todos', (query) => query.as('total_todos'))
        .withCount('todos', (query) => query.where('is_completed', true).as('completed_todos'))
        .firstOrFail()

      return response.status(200).json({
        success: true,
        message: 'Category updated successfully',
        data: {
          ...updatedCat.toJSON(),
          total_todos: Number(updatedCat.$extras.total_todos || 0),
          completed_todos: Number(updatedCat.$extras.completed_todos || 0),
        },
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to update category',
        error: error.message,
      })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const category = await Category.find(params.id)

      if (!category) {
        return response.status(404).json({
          success: false,
          message: `Category with ID ${params.id} not found`,
        })
      }

      const count = await Category.query().count('* as total')
      if (Number(count[0].$extras.total) <= 1) {
        return response.status(400).json({
          success: false,
          message: 'Cannot delete the only remaining category',
        })
      }

      await category.delete()

      return response.status(200).json({
        success: true,
        message: 'Category deleted successfully',
        data: { id: Number(params.id) },
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to delete category',
        error: error.message,
      })
    }
  }
}
