const addTimer = `
  INSERT INTO timer_config(
    time
  )
  VALUES ($1) RETURNING id,created_at
`;


const updateTimer=`
UPDATE timer_config 
SET time =$1
WHERE id = $2
RETURNING id,time,updated_at
`

module.exports={addTimer,updateTimer}