const title_div = document.querySelector("#context-title");

const context_div = document.querySelector("#context-ctx");

const picture_div = document.querySelector("#picture");

const question_div = document.querySelector("#question");
const option_div = document.querySelectorAll("#opt");
const options_div = document.querySelectorAll(".opts");
const next_button = document.querySelector("#next");

const data_file = await fetch("../data/data.json");
const data = await data_file.json();

let context = 0;
let current_opt = undefined;

next_button.addEventListener('click', next);

const choose = () => {
  // click on options
  // click on opt that already have choosed: unselect all
  // click on opt choose it then update <current_opt>
  // click on opt choose it then update <current_opt>
  // unblur or blur button, deactivate click
  // on hover, mouse cursor
}

const next = () => {
  // click
  // next context
  // if opt not choosed, then button blurred
  // on hover, if opt not choosed, default
  // on hover, if opt choosed, cursor
}
