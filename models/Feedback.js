const db = require('../config/db');

exports.createFeedback = (data) => {
    return db.one(
        `INSERT INTO feedback
        (restaurant_id, customer_name, rating, comment)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [
            data.restaurantId,
            data.customerName,
            data.rating,
            data.comment || ''
        ]
    );
};

exports.getFeedbackForRestaurant = (restaurantId) => {
    return db.any(
        `SELECT *
         FROM feedback
         WHERE restaurant_id = $1
         ORDER BY created_at DESC`,
        [restaurantId]
    );
};