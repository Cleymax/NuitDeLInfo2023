const title_div = document.querySelector("#context-title");
const context_div = document.querySelector("#context-ctx");

const picture_div = document.querySelector("#picture");

const question_div = document.querySelector("#question");
const option_list = document.querySelector("#opt");
const next_button = document.querySelector("#next");

// variables context
let context = 0;
let current_opt = undefined;

const next = (data) => {
  let opt = undefined;
  for (const i of data) {
    if(i["idSuiv"] == current_opt) {
      opt = i;
    }
  }

  if (opt) {
    newData(opt);
  }
}

const opt_click = (e) => {
  // click on options
  // click on opt that already have choosed: unselect all
  // click on opt choose it then update <current_opt>
  // click on opt choose it then update <current_opt>
  // unblur or blur button, deactivate click
  // on hover, mouse cursor
  if(e.target.id == current_opt){
    current_opt = undefined;
    next_button.disabled = true;
  } else {
    current_opt = e.target.id;
    next_button.disabled = false;
  }
}

const newData = (data) => {
  const title = data["titre"];
  const text = data["text"];
  const image = data["image"];
  const opts = data["options"];

  title_div.innerHTML = title;
  context_div.innerHTML = text;
  picture_div.src = image;

  for (const i of opts) {
    const p = document.createElement("li")
    p.className = "opt"
    const n = document.createTextNode(i["texte"]);
    p.appendChild(n)
    p.id = i.idSuiv;
    p.addEventListener('click', opt_click);
    option_list.appendChild(p);
  }
}

const init = (data) => {
  newData(data[0]);
}

// containers
const main = async () => {

  // json lore data
  const data_file = await fetch("/assets/data/data.json");
  const data = await data_file.json();

  init(data);
  next_button.disabled = true; 

  next_button.addEventListener('click', () => {
    next(data);
  });
};

main().catch((error) => {
  console.log("bruh");
  console.log(error);
});
