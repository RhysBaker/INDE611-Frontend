import React, { Component } from "react";
import Sketch from "react-p5";
import { CirclePicker } from "react-color";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

export class draw extends Component {
  state = {
    strokeCol: "#fff",
  };

  handleChangeComplete = (color) => {
    this.setState({ strokeCol: color.hex });
  };

  setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.displayWidth / 2, p5.displayHeight / 2).parent(
      canvasParentRef
    ); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
    p5.background("#f2f2f2");
  };

  draw = (p5) => {
    var s = document.getElementById("strokeSlider").value;

    p5.strokeWeight(s);
    p5.stroke(this.state.strokeCol);
    if (p5.mouseIsPressed === true) {
      p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
    }
  };

  keyTyped = (p5) => {
    //if the user hits the p key they will be prompted to enter a file name
    if (p5.key === "p") {
      var fileName = prompt("Please enter screenshot name");
      //if they enter a file name it will save a jpg image of the canvas
      if (p5.fileName !== "") {
        p5.saveCanvas(p5.canvas, fileName, "jpg");
      } else {
        //if no file name is entered it will alert the user to try again
        alert("sorry you didnt enter a screenshot name, try again");
      }
    }
  };

  render() {
    return (
      <Card>
        <CardContent>
          <Typography
            variant="subtitle2"
            align="center"
            style={{ marginBottom: 20 }}
          >
            Press P to save your image!
          </Typography>
          <div className="draw-container">
            <div className="draw">
              <Sketch
                setup={this.setup}
                draw={this.draw}
                keyTyped={this.keyTyped}
              />
              <div className="picker">
                <CirclePicker
                  colors={[
                    "#f44336",
                    "#e91e63",
                    "#9c27b0",
                    "#673ab7",
                    "#3f51b5",
                    "#2196f3",
                    "#03a9f4",
                    "#00bcd4",
                    "#009688",
                    "#4caf50",
                    "#8bc34a",
                    "#cddc39",
                    "#ffeb3b",
                    "#ffc107",
                    "#ff9800",
                    "#ff5722",
                    "#795548",
                    "#f2f2f2",
                  ]}
                  color={this.state.strokeCol}
                  onChangeComplete={this.handleChangeComplete}
                />
              </div>
              <div className="sSlider">
                <label style={{ paddingRight: 20 }} for="strokeSlider">
                  Thickness
                </label>
                <input type="range" id="strokeSlider" min="1" max="10" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default draw;
