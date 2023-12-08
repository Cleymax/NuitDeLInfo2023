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
    if(i["id"] == current_opt) {
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
  option_list.childNodes.forEach(child => {
    child.classList.remove("selected_opt");
  });
  if(e.target.id == current_opt){
    current_opt = undefined;
    next_button.disabled = true;
  } else {
    current_opt = e.target.id;
    e.target.classList.add("selected_opt");
    next_button.disabled = false;
  }
  if(current_opt == undefined){
    next_button.classList.add("desactive_next")
    next_button.classList.remove("active_next")
  }else{
    next_button.classList.remove("desactive_next")
    next_button.classList.add("active_next")
  }
}

const newData = (data) => {
  const title = data["titre"];
  const text = data["text"];
  const image = data["image"];
  const opts = data["options"];

  title_div.innerHTML = title;
  context_div.innerHTML = text;
  if(image){
      picture_div.src = image;
  }

  option_list.innerHTML = '';

  for (const i of opts) {
    const p = document.createElement("li")
    p.className = "opts"
    const n = document.createTextNode(i["texte"]);
    p.appendChild(n)
    p.id = i.idSuiv;
    p.addEventListener('click', opt_click);
    option_list.appendChild(p);
  }

  if(data.is_end){
    next_button.innerText = "Retour à l'accueil";
    next_button.disabled = false;
    next_button.addEventListener("click", () => {
        window.location.href = "/";
    })
    question_div.style.display = "none";
    var s = document.createElement("img");
    s.id = "secret";
    s.src = data.secret;
    s.style.position = "absolute"
    s.style.width = "auto";
    s.style.height = Math.floor((Math.random() * 200) + 100).toString() + "px";
    s.style.rotate = Math.floor(Math.random() * 360).toString() + "deg";
    s.style.top = Math.floor((Math.random() * window.innerHeight * 0.8) + (window.innerHeight * 0.1)).toString() + "px";
    s.style.left = Math.floor((Math.random() * window.innerWidth * 0.8) + (window.innerWidth * 0.1)).toString() + "px";
    s.addEventListener("click", () => {
      var c = document.createElement("p");
      c.innerText = "le code secret est : ";
      console.log(current_opt)
      switch (current_opt) {
        case "12":
          c.innerText += "Danse * * *";
          break;
        case "13":
          c.innerText += "* enchantée * *";
          break;
        case "14":
          c.innerText += "* * des *";
          break;
        case "15":
          c.innerText += "* * * noix";
          break;
        default:
          break;
      }
      c.innerText += "\nVous devriez essayer de trouver les autres fin pour rassembler tous les morceaux."
      s.style.display = "none";
      document.getElementById("code-secret").appendChild(c)
    })
    document.getElementById("main").appendChild(s);
  }else{
    current_opt = undefined;
    next_button.disabled = true;
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
