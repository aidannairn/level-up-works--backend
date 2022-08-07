const connection = require('../config/database')
const env = require('../config/dotenv')

const getProjectItems = async (req, res) => {
  const projectID = req.params.projectID

  const db = env('db')

  try {
    /* Split query into two Common Table Expressions (CTEs) to eliminate "Aggregate Fanout" when using multiple LEFT JOINs.
    
    [REFERENCE] - https://stackoverflow.com/a/46280040
    */
    const [projects] = await connection.query(`
      WITH AGG_Instruction_Elements AS (
        SELECT 
          Projects.id AS projectID,
          Projects.project_name AS projectName,
          Projects.video_link AS videoLink,
          Projects.activity_type AS activityType,
          Projects.year_level AS yearLevel,
          Projects.difficulty,
          Projects.subscription,
          Projects.topic,
          
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'pageID', Instruction_Elements.page_id,
              'elementType', Instruction_Elements.element_type,
              'elementContent', Instruction_Elements.element_content,
              'elementJSON', Instruction_Element_JSON.content
            )
          ) AS instructions
        
        FROM ${db}.Projects
        JOIN ${db}.Instruction_Elements
          ON Instruction_Elements.project_id = ${projectID}
        LEFT JOIN ${db}.Instruction_Element_JSON 
          ON Instruction_Element_JSON.element_id = Instruction_Elements.id
        
        GROUP BY projectID
      ),
      
      AGG_Learning_Objective_Elements AS (
        SELECT
          Projects.id AS projectID,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'pageID', Learning_Objective_Elements.page_id,
              'elementType', Learning_Objective_Elements.element_type,
              'elementContent', Learning_Objective_Elements.element_content,
              'elementJSON', Learning_Objective_Element_JSON.content
            )
          ) AS learningObjectives

        FROM ${db}.Projects
        JOIN ${db}.Learning_Objective_Elements
          ON Learning_Objective_Elements.project_id = ${projectID}
        LEFT JOIN ${db}.Learning_Objective_Element_JSON 
          ON Learning_Objective_Element_JSON.element_id = Learning_Objective_Elements.id 
        
        GROUP BY projectID
      )
      
      SELECT * FROM AGG_Instruction_Elements JOIN AGG_Learning_Objective_Elements USING (projectID)
    `)

    res.status(200).json(projects[0])

  } catch (error) {
    console.log(error)
  }
}

module.exports = { getProjectItems }