const db = require('../db/db');

// POST API to add details for flights, trains, or taxis
exports.addTravelDetails = async (req, res) => {
  const { type, from, to, date, price } = req.body;

  // Check if all required fields are provided
  if (!type || !from || !to || !date || !price) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all the required details (type, from, to, date, price).'
    });
  }

  // Insert data into the corresponding table based on 'type'
  try {
    let table;
    if (type === 'flight') {
      table = 'flights';
    } else if (type === 'train') {
      table = 'trains';
    } else if (type === 'taxi') {
      table = 'taxis';
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid type. Must be one of "flight", "train", or "taxi".'
      });
    }

    const query = `INSERT INTO ${table} (\`from\`, \`to\`, \`date\`, \`price\`) VALUES (?, ?, ?, ?)`;
    const [result] = await db.query(query, [from, to, date, price]);

    res.status(201).json({
      success: true,
      message: `${type} details added successfully!`,
      id: result.insertId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add travel details.',
      error: error.message
    });
  }
};
