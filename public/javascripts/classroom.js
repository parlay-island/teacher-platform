import { makeXHRRequest } from './request-helper.js';
import { PLAYERS_ENDPOINT, GET, STUDENTS_FETCH_ERROR_TEXT, NO_STUDENTS_TEXT, STRUGGLING_STUDENTS_DESCRIPTION_PLURAL, STRUGGLING_STUDENTS_DESCRIPTION_SINGULAR, 
GREEN_COLOR, ORANGE_COLOR, YELLOW_COLOR, RED_COLOR} from './constants.js';
/**
 * This file is responsible for displaying the classroom to track student progress.
 * It performs a GET request to get all the students, as well as 
 * displaying the struggling students who have the lowest overall question accuracy.
 * 
 * @author: Holly Ansel, Jessica Su
 */
export function getAllStudents() {
  const requestUrl = baseApiUrl + PLAYERS_ENDPOINT;
  makeXHRRequest(requestUrl, null, GET).then(function (res) {
      const jsonResponse = JSON.parse(res.response);
      const students = jsonResponse.players;
      makeStudentsHtml(students);
  }).catch(function (error) {
      console.log(error);
      displayStudentsFetchError();
  });
}

function displayStudentsFetchError() {
  const studentsDOM = document.getElementsByClassName("all-students-body")[0];
  let errorHtml = `<div class="no-students-text">
                        ${STUDENTS_FETCH_ERROR_TEXT}
                      </div>`;
  studentsDOM.innerHTML = errorHtml;
}

function makeStudentsHtml(students) {
  const studentsDOM = document.getElementsByClassName("all-students-body")[0];
  let studentsHtml = "";
  if (students == null || students.length == 0) {
    studentsHtml += ` <div class="no-students-text">
                                ${NO_STUDENTS_TEXT}
                            </div>`;
    makeStrugglingStudentsDescription(0);
  } else {
    const studentsCopy = [...students];
    studentsCopy.sort((s1, s2) => s2.accuracy - s1.accuracy);
    const strugglingStudents = studentsCopy.slice(Math.max(studentsCopy.length - 4, 0));
    makeStrugglingStudentsHtml(strugglingStudents);

    students.forEach((student) => {
      studentsHtml += ` <div class="student-row">
                            <div class="student-text-section">
                                    <div class="student-text">
                                            ${student.name}
                                            <div class="student-percent">
                                              ${Number((student.accuracy).toFixed(2))}%
                                            </div>
                                    </div>
                            </div>
                        </div>`;
    });
  }
  studentsDOM.innerHTML = studentsHtml;
  addClickListenersToStudentRows(students);
}

function makeStrugglingStudentsDescription(numStudents) {
  const strugglingStudentsDescriptionDOM = document.getElementsByClassName('struggling-students-description')[0];
  var descriptionText;
  if (numStudents == 0) {
    descriptionText = NO_STUDENTS_TEXT;
  }
  else if (numStudents == 1) {
    descriptionText = STRUGGLING_STUDENTS_DESCRIPTION_SINGULAR;
  } else {
    descriptionText = STRUGGLING_STUDENTS_DESCRIPTION_PLURAL;
  }
  strugglingStudentsDescriptionDOM.innerHTML = descriptionText;
}

function makeStrugglingStudentsHtml(strugglingStudents) {
    makeStrugglingStudentsDescription(strugglingStudents.length);
    const strugglingStudentsDOM = document.getElementsByClassName("struggling-students-container")[0];
    let strugglingStudentsHtml = "";
    strugglingStudents.forEach((student, index) => {
      strugglingStudentsHtml += `<div class="struggling-student-tile" id="${student.id}-tile">
                                    ${student.name}
                                    <div class="struggling-student-tile-accuracy">
                                    ${Number((student.accuracy).toFixed(2))}%
                                    </div>
                                  </div>`;
    });
    strugglingStudentsDOM.innerHTML = strugglingStudentsHtml;
    addBackgroundColorsToStrugglingStudents(strugglingStudents);
}

function addBackgroundColorsToStrugglingStudents(strugglingStudents) {
  strugglingStudents.forEach((student) => {
    document.getElementById(`${student.id}-tile`).style.backgroundColor = getStudentColorBasedOnAccuracy(student.accuracy);
  });
}

function getStudentColorBasedOnAccuracy(accuracy) {
  if (accuracy > 75) {
    return `var(--${GREEN_COLOR})`;
  } else if (accuracy > 50) {
    return `var(--${YELLOW_COLOR})`;
  } else if (accuracy > 25) {
    return `var(--${ORANGE_COLOR})`;
  } else {
    return `var(--${RED_COLOR})`;
  }
}

function addClickListenersToStudentRows(students) {
  const studentRows = Array.from(
    document.getElementsByClassName("student-text-section")
  );
  if (studentRows.length > 0) {
    studentRows.forEach((studentRow, index) => {
      studentRow.addEventListener("click", function (event) {
        sendToStudentPage(students[index]);
        event.preventDefault();
      });
    });
  }
}

function sendToStudentPage(student) {
    window.location = `/classroom/view-student/${student.id}`;
}

window.addEventListener("DOMContentLoaded", (event) => {
  getAllStudents();
});
