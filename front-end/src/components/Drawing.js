import React, { Component } from "react";
import classNames from "../drawing.css";
import { Link } from "react-router-dom";
import playlogo from "../images/sunnyplay.png";
import sidewalk from "../images/sidewalk.png";
import CanvasDraw from "react-canvas-draw";

class Drawing extends Component {
  state = {
    color: "#ffc600",
    width: 400,
    height: 400,
    brushRadius: 10,
    lazyRadius: 12,
  };

  componentDidMount() {
    // let's change the color randomly every 2 seconds. fun!
    window.setInterval(() => {
      this.setState({
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      });
    }, 2000);
  }

  submitHandler = (event) => {
    const savedDraw = localStorage.getItem("savedDrawing");

    let data = {
      svgdrawing: savedDraw,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    };
    fetch("http://localhost:3001/drawings", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.saveableCanvas.clear();
        localStorage.setItem("drawingId", data.id);
      });
  };

  render() {
    const characterPic = localStorage.getItem("character");
    
    return (
      <div>
        <div className="bg-yellow-100 bg-left-top bg-repeat-x bg-auto bannerFondo">
          <div className="float-right">
            <Link to="/myplayground">
              <img
                className="m-4 rounded-full hvr-pulse"
                src={characterPic}
                alt="user"
              />
            </Link>
          </div>
        </div>
        <div className="-mt-64 ">
          <div className="w-full text-center">
            <h1 className="text-5xl font-bold text-white">
              <Link to="/playground">
                <img className="playlogo" src={playlogo} alt="logo" />
              </Link>
            </h1>
          </div>
        </div>

        <center>
          <div className="container items-center pt-20">
            <div className="flex items-center w-1/4 p-2 bg-white shadow bg-opacity-80 rounded-xl ">
              <div className="flex items-center "></div>
              <div className="flex-grow p-2">
                <div className="lg-pageheading">Drawing</div>
              </div>
            </div>
          </div>
        </center>

        <div>
          <center>
            <div className="container items-center pt-20">
              <div className="flex items-center w-1/2 p-2 bg-white border-8 border-yellow-300 border-double shadow rounded-xl">
                <div className="flex items-center "></div>
                <div className="flex-grow p-2">
                  <div className="pageheading">
                    see your drawing on the sidewalk
                  </div>
                </div>
              </div>
            </div>
          </center>

          <div className="flex-container">
            <Link to="/sidewalk">
              <img
                className="hvr-pulse "
                src={sidewalk}
                alt="logo"
                style={{ float: "right" }}
              />
            </Link>
            <div className="drawing-container">
              <div className={classNames.tools}>
                <button
                  className="bttn focus:outline-none"
                  onClick={() => {
                    localStorage.setItem(
                      "savedDrawing",
                      this.saveableCanvas.getSaveData()
                    );

                    this.submitHandler();
                  }}
                >
                  Save
                </button>
                <button className="bttn focus:outline-none" onClick={() => {}}>
                  Clear
                </button>
                <button
                  className="bttn focus:outline-none"
                  onClick={() => {
                    this.saveableCanvas.undo();
                  }}
                >
                  Undo
                </button>

                <div>
                  <label>Brush-size:</label>
                  <input
                    type="number"
                    value={this.state.brushRadius}
                    onChange={(e) =>
                      this.setState({
                        brushRadius: parseInt(e.target.value, 10),
                      })
                    }
                  />
                </div>
              </div>
              <div>
                Current color:{" "}
                <div
                  style={{
                    display: "inline-block",
                    width: "24px",
                    height: "24px",
                    backgroundColor: this.state.color,
                    border: "1px solid #272727",
                  }}
                />
              </div>
              <CanvasDraw
                loadTimeOffset={0}
                hideInterface
                hideGrid
                ref={(canvasDraw) => (this.saveableCanvas = canvasDraw)}
                brushColor={this.state.color}
                brushRadius={this.state.brushRadius}
                lazyRadius={this.state.lazyRadius}
                canvasWidth={this.state.width}
                canvasHeight={this.state.height}
              />

              <button
                className="bttn focus:outline-none"
                onClick={() => {
                  this.loadableCanvas.loadSaveData(
                    localStorage.getItem("savedDrawing")
                  );
                }}
              >
                replay my drawing
              </button>
              <CanvasDraw
                disabled
                hideGrid
                ref={(canvasDraw) => (this.loadableCanvas = canvasDraw)}
                saveData={localStorage.getItem("savedDrawing")}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Drawing;
