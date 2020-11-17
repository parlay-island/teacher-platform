// general request types
export const POST = "POST";
export const PUT = "PUT";
export const GET = "GET";
export const DELETE = "DELETE";

// status codes
export const SUCCESS_CODE = 200;
export const MULTIPLE_CHOICES_CODE = 300;
export const BAD_REQUEST_CODE = 400;
export const UNAUTHORIZED_CODE = 401;

// Parlay Island backend URLs
export const LEVELS_ENDPOINT = "/levels/";
export const PLAYERS_ENDPOINT = "/players/";
export const TEACHER_INFO_ENDPOINT = "/teachers/me/";
export const TEACHER_LOGIN_ENDPOINT = "/auth/token/login/?format=json";
export const LOGOUT_ENDPOINT = "/auth/token/logout/";
export const QUESTIONS_BY_LEVEL_ENDPOINT = "/questions/?level=";
export const CREATE_TEACHER_ENDPOINT = "/auth/users/?format=json";
export const QUESTIONS_ENDPOINT = "/questions/";

// routes
export const CHOOSE_UNIT_URL = "/choose-unit";
export const LOG_IN_URL = "/log-in";

// session storage
export const SESSION_STORAGE_QUESTION_KEY = "question";

// local storage
export const TEACHER_NAME_KEY = "teacher_name";
export const AUTH_KEY = "auth_token";
export const CLASS_CODE = "class_code";

// for adding a question
export const QUESTION_ADD_ERROR_MESSAGE = "Something went wrong when trying to add your question. Please try again";
export const QUESTION_ADD_SUCCESS_MESSAGE = "You successfully added a new question.";
export const QUESTION_UPDATE_SUCCESS_MESSAGE = "You successfully updated this question.";
export const MISSING_INPUT_MESSAGE = "Please fill out the question and ALL answer choices.";
export const MISSING_CHOICE_SELECTION_MESSAGE = "Please select the CORRECT answer choice.";
export const QUESTION_BODY = "body";
export const QUESTION_TAGS = "tags";
export const QUESTION_ANSWER = "answer";
export const QUESTION_CHOICES = "choices";
export const QUESTION_LEVEL = "level";

// for adding a unit
export const UNIT_NAME = "name";
export const ADD_UNIT_SUCCESS_MESSAGE = "You have successfully added a unit!";
export const ADD_UNIT_FAIL_MESSAGE = "There was a problem adding your unit. Please try again.";

// for rendering units
export const NO_UNITS_TEXT = "There are currently no units for your questions.";
export const UNITS_FETCH_ERROR_TEXT = "There was a problem fetching the units.";

// for classroom
export const STUDENTS_FETCH_ERROR_TEXT = "There was a problem fetching student results.";
export const NO_STUDENTS_TEXT = "There are currently no student results for your class.";
export const STRUGGLING_STUDENTS_DESCRIPTION_PLURAL = "These are the students who have the lowest overall question accuracy.";
export const STRUGGLING_STUDENTS_DESCRIPTION_SINGULAR = "This is the student who has the lowest overall question accuracy"

// for log-in
export const USERNAME_FIELD = "username";
export const PASSWORD_FIELD = "password";
export const TEACHER_INFO_FETCH_ERROR_MESSAGE = "There was a problem fetching your information. Please check your credentials and log in again."
export const INVALID_CREDENTIALS_MESSAGE = "Invalid username or password. Please log in again."

// for nav bar
export const MISSING_INFORMATION_MESSAGE = "Could not find your information. Please log in";
export const LOG_OUT_ERROR_MESSAGE = "Could not log out. Please try again";

// for questions
export const QUESTIONS_FETCH_ERROR_MESSAGE = "There was a problem fetching the questions.";
export const NO_QUESTIONS_MESSAGE = "There are currently no questions for this unit.";
export const NO_ANSWERS_MESSAGE = "0.00% answered";
export const PERCENT_CORRECT_MESSAGE = "% correct";
export const PERCENT_ANSWERED_MESSAGE ="% answered";
export const QUESTIONS_PERCENT_DESCRIPTION = "The percent at the right of each question row is the percentage of students who answered that question correctly."
export const DELETE_ERROR_MESSAGE = "Something went wrong when trying to delete a question. Please try again."

// for register
export const TEACHER_NAME_FIELD = "name";
export const TEACHER_EMAIL_FIELD = "email";
export const TEACHER_USERNAME_FIELD = "username";
export const TEACHER_PASSWORD_FIELD = "password";
export const TEACHER_BOOLEAN_FIELD = "is_teacher";
export const MISMATCHED_PASSWORDS_MESSAGE = "Passwords do not match.";
export const TEACHER_SUCCESS_MESSAGE = "You have successfully created a teacher account!";
export const REGISTRATION_INPUT_ERROR_MESSAGE = "Your password is not long enough (needs to be at least 8 chars), your email is invalid, or your username is already taken.";
export const REGISTRATION_FAIL_MESSAGE = "Registration Failed. Please try again";

// request helper
export const INVALID_LOGIN_CREDENTIALS_MESSAGE = "Your login credentials have become invalid, so you have been automatically logged out. Please log in again";

// view student
export const MISSING_STUDENT_MESSAGE = "This student could not be found.";
export const NO_STUDENT_RESULTS_MESSAGE = "There are currently no results for this student.";
export const NO_STUDENT_RESULTS_PER_UNIT_MESSAGE = "This student has no responses for this unit.";

// misc 
export const REDIRECT_URL_DURATION = 1000;
export const GREEN_COLOR = "green";
export const YELLOW_COLOR = "yellow";
export const ORANGE_COLOR = "orange";
export const RED_COLOR = "red";