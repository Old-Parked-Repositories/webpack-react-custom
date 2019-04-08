import _ from "lodash";
import  "./style.scss";
import Bridge from "./bridge.jpeg";
import Data from "./myxml.xml";
import Data2 from "./mycsv.csv";
import printMe from "./print";

function component() {
  let element = document.createElement("div");
  let btn = document.createElement("button");

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(["Hello", "webpack"], " ");
  element.classList.add("hello");

  btn.innerHTML = "Click me and check the console";
  
  btn.onclick = printMe;

  var bridgeImage = new Image();
  bridgeImage.src = Bridge;

  // element.appendChild(bridgeImage);
  element.appendChild(btn);

  console.log([Data, Data2]);

  return element;
}

let element = component();
document.body.appendChild(element);

if (module.hot) {
  module.hot.accept("./print.js", function() {
    console.log("Accepting the updated printMe module!");
    document.body.removeChild(element);
    element = component(); 
    document.body.appendChild(element);
  })
}
