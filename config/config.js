require("dotenv").config();

/**
 * Configuration module for ServiceNow credentials and URL.
 * Loads sensitive data (URL, username, password) from environment variables.
 *
 * @module config
 * @see {@link https://www.npmjs.com/package/dotenv} for more information on the dotenv package
 */
module.exports = {
  /**
   * The ServiceNow instance URL loaded from the environment variable.
   * @constant
   * @type {string}
   */
  SN_URL: process.env.SERVICENOW_URL,

  /**
   * The ServiceNow username loaded from the environment variable.
   * @constant
   * @type {string}
   */
  SN_USER: process.env.SERVICENOW_USER,

  /**
   * The ServiceNow password loaded from the environment variable.
   * @constant
   * @type {string}
   */
  SN_PASSWORD: process.env.SERVICENOW_PASSWORD,
};
