import "./styles.css";

var progresses;

function init() {
  var initProgresses = [
    {
      name: "Almák",
      currentCh: 5
    },
    {
      name: "Körték",
      currentCh: 70
    }
  ];
  if (window.localStorage.getItem("progresses") === null) {
    window.localStorage.setItem("progresses", JSON.stringify(initProgresses));
  }
}

function read() {
  console.log(window.localStorage.getItem("progresses"));
  progresses = JSON.parse(window.localStorage.getItem("progresses"));
}

function write(newValue) {
  window.localStorage.setItem("progresses", JSON.stringify(newValue));
}

function render() {
  document.getElementById("app").innerHTML = `
    <div id="lines"></div>
  `;
  progresses.forEach(function(book, index) {
    var template = `
    <div class="line">
      <button data-index=${index} id="delete-${index}" class="deleteButton">&#x1F5D1;</button>
      <div class="name">${book.name}</div>
      <div id="progress-${index}" class="progress">${book.currentCh}</div>
      <div class="buttons">
        <button data-index=${index}  id="minus-${index}" class="adjustButton minus">-</button>
        <button data-index=${index} data-up=true id="plus-${index}"  class="adjustButton plus">+</button>
      </div>
    </div>
    `;

    document.getElementById("lines").innerHTML += template;
  });

  document.getElementById("app").innerHTML += `
  <div class="addNew">
    <div class="inputs">
      <input id="newName"  type="text"   placeholder="Új elem" >
      <input id="newValue" type="number" placeholder="Érték" >
    </div>
    <button id="runNew">Felvétel</button>
  </div>
  `;

  var buttons = document.querySelectorAll(".adjustButton");
  buttons.forEach(function(button, i) {
    button.onclick = function(up, index) {
      var line = this.dataset.index;
      if (this.hasAttribute("data-up")) {
        console.log(typeof progresses[line].currentCh);
        progresses[line].currentCh += 1;
      } else {
        progresses[line].currentCh -= 1;
      }
      write(progresses);
      document.getElementById("progress-" + line).innerHTML =
        progresses[line].currentCh;
    };
  });
  document.getElementById("runNew").onclick = function() {
    newLine();
  };

  document.querySelectorAll(".deleteButton").forEach(function(button, i) {
    button.onclick = function() {
      deleteLine(this);
    };
  });
}

function newLine(name, initValue = 0) {
  console.log(progresses);
  name = document.getElementById("newName").value;
  initValue = parseInt(document.getElementById("newValue").value);
  progresses.push({
    name: name,
    currentCh: initValue
  });
  write(progresses);
  read(); //FELESLEGES?
  render();
  // console.log(progresses);
}

function editLine() {}

function deleteLine(button) {
  console.log(button);
  console.log(button.dataset.index);
  progresses.splice(button.dataset.index, 1);
  write(progresses);
  read();
  render();
}

init();
read();
render();
