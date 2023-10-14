const addTimer = `
  INSERT INTO timer_config(
    time
  )
  VALUES ($1) RETURNING id,created_at
`;




module.exports={addTimer}
