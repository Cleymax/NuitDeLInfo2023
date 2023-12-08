const title_div = document.querySelector("#context-title");
const context_div = document.querySelector("#context-ctx");

const picture_div = document.querySelector("#picture");

const question_div = document.querySelector("#question");
const option_list = document.querySelector("#opt");
const next_button = document.querySelector("#next");

const opt_click = () => {
  // click on options
  // click on opt that already have choosed: unselect all
  // click on opt choose it then update <current_opt>
  // click on opt choose it then update <current_opt>
  // unblur or blur button, deactivate click
  // on hover, mouse cursor
  console.log("bruh");
}

const init = async (data) => {
  const data_first = data[0];
  const title = data_first["titre"];
  const text = data_first["text"];
  const image = data_first["image"];
  const opts = data_first["options"];

  title_div.innerHTML = title;
  context_div.innerHTML = text;
  picture_div.src = image;

  for (const i of opts) {
    const p = document.createElement("li")
    p.className = "opts"
    const n = document.createTextNode(i["texte"]);
    p.appendChild(n)
    p.addEventListener('click', opt_click);
    option_list.appendChild(p);
  }
}

// containers
const main = async () => {

  // json lore data
  const data_file = await fetch("/assets/data/data.json");
  const data = await data_file.json();

  init(data);

  // variables context
  let context = 0;
  let current_opt = undefined; 

  next_button.addEventListener('click', () => {
    // click
    // next context
    // if opt not choosed, then button blurred
    // on hover, if opt not choosed, default
    // on hover, if opt choosed, cursor
    console.log("next")
    if(current_opt){
      context = current_opt.idSuiv;
      title_div.innerText = data[context].titre;
      context_div.innerText = data[context].text;
      if(data[context].image){
        picture_div.src = data[context].image
      }
      option_div.innerHTML = '';
      data[context].options.forEach(opt => {
        let op = document.createElement("li");
        op.classList.add("opts");
        op.innerText = opt.texte;
        op.id = opt.idSuiv
        option_div.appendChild(op);
      });
    }
  });
};

main().catch((error) => {
  console.log("bruh");
  console.log(error);
});
