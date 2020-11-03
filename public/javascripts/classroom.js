import { makeXHRRequest } from './request-helper.js';

export function getAllStudents() {
  // need to change endpoint
  const requestUrl = baseApiUrl + "/results/summary";
  makeXHRRequest(requestUrl, null, 'GET').then(function (res) {
      const jsonResponse = JSON.parse(res.response);
      const students = jsonResponse.students;
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
  } else {
    students.forEach((student) => {
      studentsHtml += ` <div class="student-row">
                            <div class="student-text-section">
                                    <div class="student-text">
                                            ${student.player_name}
                                            <div class="student-percent">
                                                ${student.percent}%
                                            </div>
                                    </div>
                            </div>
                        </div>`;
    });
  }
  studentsDOM.innerHTML = studentsHtml;
  addClickListenersToStudentRows(students);
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
    // const unit = question.tags[0];
    // const unitID = question.level;
    // window.location = `/${unit}/${unitID}/questions/view-question?id=${question.id}`;
}

window.addEventListener("DOMContentLoaded", (event) => {
  getAllStudents();
});
