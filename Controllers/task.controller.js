import Task from '../models/task.model.js';

export const createTask = async (req, res) => {
  try {
    const { title, status, dueDate, userId } = req.body;

    if (!title || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Title and userId are required fields.',
      });
    }

    const newTask = new Task({
      title,
      status,
      dueDate,
      userId,
    });

    const savedTask = await newTask.save();

    res.status(201).json({
      success: true,
      data: savedTask,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { status } = req.query;

    const query = {};
    if (status) {
      query.status = status;
    }

    const total = await Task.countDocuments(query);
    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total,
      page,
      limit,
      data: tasks,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};