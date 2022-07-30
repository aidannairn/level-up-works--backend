const connection = require('../config/database')
const env = require('../config/dotenv')

const getProjectItems = async (req, res) => {
  const projectID = req.params.projectID

  const db = env('db')

  try {
    const [projects] = await connection.query(`
    SELECT
      Projects.id AS projectID,
      Projects.project_name AS projectName,
      Projects.video_link AS videoLink,
      Projects.activity_type AS activityType,
      Projects.year_level AS yearLevel,
      Projects.difficulty,
      Projects.subscription,
      Projects.subject_matter AS subjectMatter,

      JSON_ARRAYAGG(
        JSON_OBJECT(
          'pageID', Instruction_Elements.page_id,
          'elementType', Instruction_Elements.element_type,
          'elementContent', Instruction_Elements.element_content
        )
      ) AS instructions
    
    FROM ${db}.Projects

    JOIN ${db}.Instruction_Elements ON Instruction_Elements.project_id = ${projectID}

    WHERE ${db}.Projects.id = ?`, [projectID])

    res.status(200).json(projects[0])

  } catch (error) {
    console.log(error)
  }
}

module.exports = { getProjectItems }