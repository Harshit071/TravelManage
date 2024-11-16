const db = require('../db/db');

// GET API to fetch travel options (flights, trains, taxis)
exports.getTravelOptions = async (req, res) => {
  const { from, to, date } = req.query;

  if (!from || !to || !date) {
    return res.status(400).json({
      success: false,
      message: 'Please provide the required query parameters: from, to, and date.'
    });
  }

  try {
    // Fetching flights, trains, and taxis from the database
    const [flights] = await db.query(
      'SELECT * FROM flights WHERE `from` = ? AND `to` = ? AND `date` = ?',
      [from, to, date]
    );
    
    const [trains] = await db.query(
      'SELECT * FROM trains WHERE `from` = ? AND `to` = ? AND `date` = ?',
      [from, to, date]
    );
    
    const [taxis] = await db.query(
      'SELECT * FROM taxis WHERE `from` = ? AND `to` = ? AND `date` = ?',
      [from, to, date]
    );

    // Return the data from all 3 tables
    res.status(200).json({
      success: true,
      data: {
        flights,
        trains,
        taxis
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch travel options from the database.',
      error: error.message
    });
  }
};
