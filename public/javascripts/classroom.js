import { makeXHRRequest } from './request-helper.js';

export function getAllStudents() {
  const requestUrl = baseApiUrl + "/players/";
  makeXHRRequest(requestUrl, null, 'GET').then(function (res) {
      const jsonResponse = JSON.parse(res.response);
      const students = jsonResponse.players;
      makeStudentsHtml(students);
  }).catch(function (error) {
      console.log('something went wrong when fetching student results', error);
      displayStudentsFetchError();
  });
}

function displayStudentsFetchError() {
  const studentsDOM = document.getElementsByClassName("all-students-body")[0];
  let errorHtml = `<div class="no-students-text">
                          There was a problem fetching student results. 
                      </div>`;
  studentsDOM.innerHTML = errorHtml;
}

function makeStudentsHtml(students) {
  const studentsDOM = document.getElementsByClassName("all-students-body")[0];
  let studentsHtml = "";
  if (students == null || students.length == 0) {
    studentsHtml += ` <div class="no-students-text">
                                There are currently no student results for your class.
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
  var descriptionText = `These are the ${numStudents} students who have the lowest overall question accuracy.`;
  if (numStudents == 0) {
    descriptionText = 'There are currently no student results for your class';
  }
  if (numStudents == 1) {
    descriptionText = `This is the student who has the lowest overall question accuracy`;
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
    return "var(--green)";
  } else if (accuracy > 50) {
    return "var(--yellow)";
  } else if (accuracy > 25) {
    return "var(--orange)";
  } else {
    return "var(--red)";
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
