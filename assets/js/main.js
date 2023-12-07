// containers
const main = async () => {
  const title_div = document.querySelector("#context-title");
  const context_div = document.querySelector("#context-ctx");

  const picture_div = document.querySelector("#picture");

  const question_div = document.querySelector("#question");
  const option_div = document.querySelector("#opt");
  const options_div = document.querySelectorAll(".opts");
  const next_button = document.querySelector("#next");

  // json lore data
  const data_file = await fetch("/assets/data/data.json");
  const data = await data_file.json();

  // variables context
  let context = 0;
  let current_opt = undefined;

  // init
  const setContext = (context) => {
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
  setContext(context);
  

  // add events
  for (const i of options_div) {
    i.addEventListener('click', () => {
      // click on options
      // click on opt that already have choosed: unselect all
      // click on opt choose it then update <current_opt>
      // click on opt choose it then update <current_opt>
      // unblur or blur button, deactivate click
      // on hover, mouse cursor
    });
  }
  next_button.addEventListener('click', () => {
    console.log("bruh");
    // click
    // next context
    // if opt not choosed, then button blurred
    // on hover, if opt not choosed, default
    // on hover, if opt choosed, cursor
    if(current_opt){
      context = current_opt.idSuiv;
      setContext(context)
    }
  });
};

main().catch((error) => {
  console.log("bruh");
  console.log(error);
});
