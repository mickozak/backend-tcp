const axios = require("axios");
const { SN_URL, SN_USER, SN_PASSWORD } = require("../config/config");

/**
 * Retrieves all problems from the ServiceNow API.
 * @async
 * @function
 * @param {Object} req - The request object, containing query and parameters.
 * @param {Object} res - The response object, used to send data back to the client.
 * @returns {Object} JSON object containing the list of problems or error message.
 */
const getAllProblems = async (req, res) => {
  try {
    // Make GET request to fetch all problems
    const response = await axios.get(`${SN_URL}/api/now/table/problem`, {
      auth: {
        username: SN_USER,
        password: SN_PASSWORD,
      },
    });
    res.json(response.data.result); // Send problems data in the response
  } catch (error) {
    // If there's an error, log it and send a 500 response
    console.error("Error fetching problems:", error);
    res.status(500).json({ message: "Error fetching problems" });
  }
};

/**
 * Retrieves a single problem by its ID from the ServiceNow API.
 * @async
 * @function
 * @param {Object} req - The request object, containing the problem ID as a parameter.
 * @param {Object} res - The response object, used to send data back to the client.
 * @returns {Object} JSON object containing the requested problem or error message.
 */
const getSingleProblem = async (req, res) => {
  const { id } = req.params; // Extract the problem ID from the request parameters
  try {
    // Make GET request to fetch the problem with the provided ID
    const problemResponse = await axios.get(
      `${SN_URL}/api/now/table/problem/${id}`,
      {
        auth: {
          username: SN_USER,
          password: SN_PASSWORD,
        },
      }
    );
    const problem = problemResponse.data.result;

    if (problem) {
      // Fetch the work notes from sys_journal_field where element_id is the problem ID
      const workNotesResponse = await axios.get(
        `${SN_URL}/api/now/table/sys_journal_field`,
        {
          auth: {
            username: SN_USER,
            password: SN_PASSWORD,
          },
          params: {
            element_id: id, // 'element_id' links journal field entries to the problem
            name: "problem",
            element: "work_notes",
          },
        }
      );

      const workNotes = workNotesResponse.data.result;

      res.json({ problem, workNotes }); // Send problem with work notes in the response
    } else {
      res.status(404).json({ message: `Problem with ID ${id} not found` }); // Problem not found
    }
  } catch (error) {
    // Log the error and send a 500 response
    console.error(`Error fetching problem with ID ${id}:`, error);
    res.status(500).json({ message: `Error fetching problem with ID ${id}` });
  }
};

/**
 * Creates a new problem in the ServiceNow API.
 * @async
 * @function
 * @param {Object} req - The request object, containing the problem details in the body.
 * @param {Object} res - The response object, used to send data back to the client.
 * @returns {Object} JSON object containing the created problem or error message.
 */
const createNewProblem = async (req, res) => {
  const { short_description, description, priority } = req.body; // Extract problem details from the request body
  const newProblemData = {
    short_description,
    description,
    priority,
  };
  try {
    // Make POST request to create a new problem
    const response = await axios.post(
      `${SN_URL}/api/now/table/problem`,
      newProblemData,
      {
        auth: {
          username: SN_USER,
          password: SN_PASSWORD,
        },
      }
    );
    res.status(201).json(response.data.result); // Send the created problem as a response
  } catch (error) {
    // Log the error and send a 500 response
    console.error("Error creating problem:", error);
    res.status(500).json({ message: "Error creating problem" });
  }
};

/**
 * Updates an existing problem in the ServiceNow API.
 * @async
 * @function
 * @param {Object} req - The request object, containing the problem ID as a parameter and updated data in the body.
 * @param {Object} res - The response object, used to send data back to the client.
 * @returns {Object} JSON object containing the updated problem or error message.
 */
const updateExistingProblem = async (req, res) => {
  const { id } = req.params; // Extract the problem ID from the request parameters
  const updateData = req.body; // Extract updated data from the request body
  try {
    // Make PUT request to update the problem
    const response = await axios.put(
      `${SN_URL}/api/now/table/problem/${id}`,
      updateData,
      {
        auth: {
          username: SN_USER,
          password: SN_PASSWORD,
        },
      }
    );
    const updatedProblem = response.data.result;
    if (updatedProblem) {
      res.json(updatedProblem); // Send the updated problem as a response
    } else {
      res.status(404).json({ message: `Problem with ID ${id} not found` }); // Problem not found
    }
  } catch (error) {
    // Log the error and send a 500 response
    console.error(`Error updating problem with ID ${id}:`, error);
    res.status(500).json({ message: `Error updating problem with ID ${id}` });
  }
};

/**
 * Deletes an existing problem from the ServiceNow API.
 * @async
 * @function
 * @param {Object} req - The request object, containing the problem ID as a parameter.
 * @param {Object} res - The response object, used to send data back to the client.
 * @returns {Object} JSON object confirming deletion or error message.
 */
const deleteExistingProblem = async (req, res) => {
  const { id } = req.params; // Extract the problem ID from the request parameters
  try {
    // Make DELETE request to remove the problem
    const response = await axios.delete(
      `${SN_URL}/api/now/table/problem/${id}`,
      {
        auth: {
          username: SN_USER,
          password: SN_PASSWORD,
        },
      }
    );

    res.json({ message: `Problem with ID ${id} deleted successfully` }); // Confirm successful deletion
  } catch (error) {
    // Log the error and send a 500 response
    console.error(`Error deleting problem with ID ${id}:`, error);
    res.status(500).json({ message: `Error deleting problem with ID ${id}` });
  }
};

module.exports = {
  getAllProblems,
  getSingleProblem,
  createNewProblem,
  updateExistingProblem,
  deleteExistingProblem,
};
