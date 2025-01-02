const express = require('express');
const problemsController = require('../controllers/problemsController');

const router = express.Router();

/**
 * Route handler for problems-related endpoints.
 * The routes define the necessary HTTP methods to interact with the problems data.
 * 
 * @module problemRoutes
 */

/**
 * Route to fetch all problems.
 * This route uses the `getAllProblems` controller function to retrieve all problems.
 * 
 * @route GET /problems
 * @returns {Object} List of all problems or error message
 */
router.get('/problems', problemsController.getAllProblems);

/**
 * Route to fetch a single problem by its ID.
 * This route uses the `getSingleProblem` controller function to retrieve the problem by its unique identifier.
 * 
 * @route GET /problem/:id
 * @param {string} id - The unique identifier of the problem to retrieve.
 * @returns {Object} The requested problem or a 404 error message if not found
 */
router.get('/problem/:id', problemsController.getSingleProblem);

/**
 * Route to create a new problem.
 * This route uses the `createNewProblem` controller function to create a new problem based on the provided data in the request body.
 * 
 * @route POST /problem
 * @body {Object} The problem data, including short_description, description, and priority.
 * @returns {Object} The created problem or an error message
 */
router.post('/problem', problemsController.createNewProblem);

/**
 * Route to update an existing problem by its ID.
 * This route uses the `updateExistingProblem` controller function to update an existing problem based on the provided ID and data in the request body.
 * 
 * @route PUT /problem/:id
 * @param {string} id - The unique identifier of the problem to update.
 * @body {Object} The updated problem data.
 * @returns {Object} The updated problem or a 404 error message if not found
 */
router.put('/problem/:id', problemsController.updateExistingProblem);

/**
 * Route to delete a problem by its ID.
 * This route uses the `deleteExistingProblem` controller function to delete a problem by its unique identifier.
 * 
 * @route DELETE /problem/:id
 * @param {string} id - The unique identifier of the problem to delete.
 * @returns {Object} A confirmation message or an error message
 */
router.delete('/problem/:id', problemsController.deleteExistingProblem);

module.exports = router;
