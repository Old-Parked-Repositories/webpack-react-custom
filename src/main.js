import React from "react";
import ReactDOM from "react-dom";
import Main from "@/components/Main";
import  "./style.scss";

ReactDOM.render(<Main/>, document.getElementById('app'));

module.hot.accept();