const Task = require('../models/Task');

// GET /api/analytics
const getAnalytics = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [statusBreakdown, priorityBreakdown, total] = await Promise.all([
      Task.aggregate([
        { $match: { user: userId } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      Task.aggregate([
        { $match: { user: userId } },
        { $group: { _id: '$priority', count: { $sum: 1 } } },
      ]),
      Task.countDocuments({ user: userId }),
    ]);

    const statusMap = { todo: 0, 'in-progress': 0, done: 0 };
    statusBreakdown.forEach(({ _id, count }) => { statusMap[_id] = count; });

    const priorityMap = { low: 0, medium: 0, high: 0 };
    priorityBreakdown.forEach(({ _id, count }) => { priorityMap[_id] = count; });

    const completed = statusMap['done'];
    const pending = total - completed;
    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Overdue tasks
    const overdue = await Task.countDocuments({
      user: userId,
      status: { $ne: 'done' },
      dueDate: { $lt: new Date() },
    });

    res.json({
      success: true,
      data: {
        total,
        completed,
        pending,
        inProgress: statusMap['in-progress'],
        completionPercentage,
        overdue,
        statusBreakdown: statusMap,
        priorityBreakdown: priorityMap,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAnalytics };
