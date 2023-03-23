let i = 0;
let speed = 50;
let timer = 0;
let p = Math.floor(Math.random() * 10);
let txt = "SETTING UP OF ROVER STATION ON THE REQUIRED POINT";
//  let data=[[1911.5,1911.5,1911.5,1911.5,1911.5,1911.5,1911.5,1911.5,1911.5,1911.5],
//   [2410,2426,2466,2453,2431,2443,2445,2458,2460,2463],
//   [106.00,89.00,82.00,103.00,78.00,86.00,75.00,110.00,93.00,72.00],
//   [21.26379137,17.29834791,14.78809739,19.0212373,15.01443696,16.18062088,14.05810684,20.12808783,16.95533273,13.05530372]];

let flag = true;
let itv = 0;
let qCount = 0;
let inferenceData = [
  ["<10", "10-20", "20-30", ">30"],
  [
    "Exceptionally Strong",
    "Strong",
    "Satisfactory for road surfacing",
    "Weak for road surfacing",
  ],
];
let myInt = 0;
let inCount = 0;
let secondSetup = false;

//final result steps
const steps = [
  "The initial processing of uploaded images will take place.",
  "The GCP points from DGPS survey is obtained in CSV format. The CSV file of the GCP points is uploaded.",
  "On the images mark the exact location of the points",
  "Reoptimize of the map takes place and gets geo referenced.",
  "Generate the orthomosaic map and  DEM.",
];

// MAP Notes
const notes = [
  "Image locations are gathered from image metadata and they are plotted in 3D space. Each image location is marked in red dots.",
  "Calibration between images takes place based on the common points between the images. Hence it creates a tie point in common point between the images",
  "Here blue tick indicates gcps",
  "Click on the marked image to view the zoomed image of GCP location.Click on each gcps and mark the targets and once completed proceed to reoptimization",
  "",
];

let unmarkedGcp = [];

// Prompt questions during simulation using objects
let questions = {
  ans1: 0,
  options: [],
  nextFunction: function () {},
  setOptions: function (d1, d2, d3, d4, d5) {
    questions.options = new Array(d1, d2, d3, d4, d5);
  },
  setOptions1: function (d1, d2, d3) {
    questions.options = new Array(d1, d2, d3);
  },
  setAns: function (ans) {
    questions.ans1 = ans;
  },
  frameQuestions: function (qun) {
    let myDiv = document.getElementById("question-div");
    let myDiv1 = document.getElementById("divq");
    // myDiv.style.visibility = "visible";
    myDiv.style.animation = "blinkingText 1s 1";
    myDiv.style.visibility = "visible";
    myDiv.classList.add("fadeIn");
    document.getElementById("divq").innerHTML = qun;
    //Create and append select list
    let selectList = document.createElement("select");
    selectList.setAttribute("id", "mySelect");
    selectList.setAttribute("autocomplete", "off");
    // selectList.setAttribute("onchange", "questions.setAnswer()");

    let button1 = document.createElement("input");
    button1.setAttribute("onclick", "questions.setAnswer(this)");
    button1.setAttribute("type", "button");
    button1.setAttribute("value", "OK");
    button1.setAttribute("style", "cursor:pointer");

    // Appending the contents to the division
    myDiv1.appendChild(selectList);
    myDiv1.appendChild(button1);

    //Create and append the options
    for (const element of questions.options) {
      let opt = document.createElement("option");
      opt.setAttribute("value", element);
      opt.text = element;
      selectList.appendChild(opt);
    }
  },
  setAnswer: function (ev) {
    let x = document.getElementById("mySelect");
    let i = x.selectedIndex;
    if (i == 0) {
      let dispAns = document.createElement("p");
      dispAns.innerHTML = "You have not selected any value";
      document.getElementById("divq").appendChild(dispAns);
      setTimeout(function () {
        dispAns.innerHTML = "";
      }, 200);
    } else if (i == questions.ans1) {
      ev.onclick = "";
      let dispAns = document.createElement("p");
      dispAns.innerHTML =
        "You are right <span class='boldClass'>&#128077;</span> ";
      document.getElementById("divq").appendChild(dispAns);
      questions.callNextFunction();
    } else {
      ev.onclick = "";
      let dispAns = document.createElement("p");
      dispAns.innerHTML =
        "You are Wrong <span class='boldClass'>&#128078;</span><br>Answer is: " +
        x.options[questions.ans1].text;
      document.getElementById("divq").appendChild(dispAns);
      questions.callNextFunction();
    }
  },
  setCallBack: function (cb) {
    nextFunction = cb;
  },
  callNextFunction: function () {
    setTimeout(function () {
      // document.getElementById("question-div").innerHTML = "";
      document.getElementById("question-div").style.animation = "";
      document.getElementById("question-div").style.visibility = "hidden";
      nextFunction();
    }, 800);
  },
};

//To set the questions division
function generateQuestion(
  qObject,
  qn,
  op1,
  op2,
  op3,
  op4,
  op5,
  ansKey,
  fn,
  dleft,
  dright,
  dwidth,
  dheight
) {
  document.getElementById("question-div").style.left = dleft + "px";
  document.getElementById("question-div").style.top = dright + "px";
  document.getElementById("question-div").style.width = dwidth + "px";
  document.getElementById("question-div").style.height = dheight + "px";
  qObject.setOptions(op1, op2, op3, op4, op5);
  qObject.setAns(ansKey);
  qObject.frameQuestions(qn);
  qObject.setCallBack(fn);
}
function generateQuestion1(
  qObject,
  qn,
  op1,
  op2,
  op3,
  ansKey,
  fn,
  dleft,
  dright,
  dwidth,
  dheight
) {
  document.getElementById("question-div").style.left = dleft + "px";
  document.getElementById("question-div").style.top = dright + "px";
  document.getElementById("question-div").style.width = dwidth + "px";
  document.getElementById("question-div").style.height = dheight + "px";
  qObject.setOptions1(op1, op2, op3);
  qObject.setAns(ansKey);
  qObject.frameQuestions(qn);
  qObject.setCallBack(fn);
}

function navNext() {
  for (let temp = 0; temp <= 18; temp++) {
    document.getElementById("canvas" + temp).style.visibility = "hidden";
  }
  simsubscreennum += 1;
  document.getElementById("canvas" + simsubscreennum).style.visibility =
    "visible";
  document.getElementById("nextButton").style.visibility = "hidden";
  magic();
}

//-----------------------------------------blink arrow on the next step---------------------------------------------
//blink arrow on the next step
function animatearrow() {
  if (document.getElementById("arrow1").style.visibility == "hidden")
    document.getElementById("arrow1").style.visibility = "visible";
  else document.getElementById("arrow1").style.visibility = "hidden";
}

//animate arrow at position
function animateArrowATPosition(left, top, degg) {
  document.getElementById("arrow1").style =
    "visibility:visible ;position:absolute; left:" +
    left +
    "px; top: " +
    top +
    "px; height: 30px; z-index: 10;";
  document.getElementById("arrow1").style.WebkitTransform =
    "rotate(" + degg + "deg)";
  // Code for IE9
  document.getElementById("arrow1").style.msTransform =
    "rotate(" + degg + "deg)";
  // Standard syntax
  document.getElementById("arrow1").style.transform = "rotate(" + degg + "deg)";
}

//stop blinking arrow
function myStopFunction() {
  clearInterval(myInt);
  document.getElementById("arrow1").style.visibility = "hidden";
}

function checkInputValid(e) {
  e.value = e.value.match(/\d*(\.\d*)?/)[0];
}

function magic() {
  if (simsubscreennum == 1) {
    myInt = setInterval(function () {
      animatearrow();
    }, 500);
    animateArrowATPosition(377.5, 510, 90);
    document.getElementById("can1-0").onclick = function () {
      myStopFunction();
      document.getElementById("can1-0").onclick = "";
      document.getElementById("can1-0").style.visibility = "hidden";
      document.getElementById("can1-1").style.visibility = "visible";
      document.getElementById("can1-5").style.visibility = "visible";
      myInt = setInterval(function () {
        animatearrow();
      }, 500);
      //animateArrowATPosition(left, top, rotate);
      animateArrowATPosition(530, 280, 270);
      document.getElementById("can1-5").onclick = function () {
        myStopFunction();
        document.getElementById("can1-5").onclick = "";
        document.getElementById("can1-5").style.visibility = "hidden";
        document.getElementById("can1-2").style.visibility = "visible";
        document.getElementById("can1-3").style.visibility = "visible";
        document.getElementById("can1-3").style.animation =
          "moveBase 1s forwards, moveBaseupdn 1s 4 forwards";
        setTimeout(function () {
          document.getElementById("can1-1").style.visibility = "hidden";
          document.getElementById("can1-3").style.visibility = "hidden";
          document.getElementById("can1-2").style.visibility = "hidden";
          document.getElementById("can1-4").style.visibility = "visible";
          document.getElementById("nextButton").style.visibility = "visible";
        }, 4001);
      };
    };
  } else if (simsubscreennum == 2) {
    document.getElementById("can1-4").style.visibility = "hidden";
    document.getElementById("nextButton").style.visibility = "hidden";
    myInt = setInterval(function () {
      animatearrow();
    }, 500);
    animateArrowATPosition(377.5, 390, 90);
    document.getElementById("can2-0").onclick = function () {
      myStopFunction();
      document.getElementById("can2-0").onclick = "";
      document.getElementById("can2-1").style.visibility = "visible";
      document.getElementById("can2-1").style.animation =
        "liftTripod 2s forwards";
      setTimeout(function () {
        document.getElementById("can2-1").style.visibility = "hidden";
        document.getElementById("can2-0").style.visibility = "hidden";
        document.getElementById("can2-11").style.visibility = "visible";
        document.getElementById("can2-11").style.animation =
          "rotateTripod 1.5s forwards";
        setTimeout(function () {
          document.getElementById("can2-11").style.visibility = "hidden";
          document.getElementById("can2-2").style.visibility = "visible";
          document.getElementById("can2-13").style.visibility = "visible";
          myInt = setInterval(function () {
            animatearrow();
          }, 500);
          animateArrowATPosition(430, 256, 360);
          document.getElementById("can2-13").onclick = function () {
            myStopFunction();
            document.getElementById("can2-13").onclick = "";
            document.getElementById("can2-3").style.visibility = "visible";
            document.getElementById("can2-3").style.animation =
              "moveHand 1s forwards, moveHandupdn 1s 4 forwards";
            setTimeout(function () {
              document.getElementById("can2-3").style.visibility = "hidden";
              document.getElementById("can2-4").style.visibility = "visible";
              document.getElementById("can2-4").style.animation =
                "moveHand1 1s forwards";
              setTimeout(function () {
                document.getElementById("can2-13").style.visibility = "hidden";
                document.getElementById("can2-3").style.visibility = "hidden";
                document.getElementById("can2-2").style.visibility = "hidden";
                document.getElementById("can2-4").style.visibility = "hidden";
                document.getElementById("can2-5").style.visibility = "visible";
                document.getElementById("can2-6").style.visibility = "hidden";
                document.getElementById("can2-9").style.visibility = "visible";
                document.getElementById("can2-9").style.animation =
                  "moveLeg 2s forwards";
                setTimeout(function () {
                  document.getElementById("can2-9").style.visibility = "hidden";
                  document.getElementById("can2-6").style.visibility =
                    "visible";
                  document.getElementById("can2-10").style.visibility =
                    "visible";
                  document.getElementById("can2-10").style.animation =
                    "moveHand4updn 1s forwards";
                  setTimeout(function () {
                    document.getElementById("can2-5").style.visibility =
                      "hidden";
                    document.getElementById("can2-6").style.visibility =
                      "hidden";
                    document.getElementById("can2-10").style.visibility =
                      "hidden";
                    document.getElementById("can2-7").style.visibility =
                      "visible";
                    document.getElementById("can2-3").style.visibility =
                      "visible";
                    document.getElementById("can2-3").style.animation =
                      "moveHand3 1s forwards, moveHand3dnup 1s 4 forwards";
                    document.getElementById("note1").style.visibility =
                      "visible";
                    setTimeout(function () {
                      document.getElementById("note1").style.visibility =
                        "hidden";
                      document.getElementById("can2-3").style.visibility =
                        "hidden";
                      document.getElementById("can2-7").style.visibility =
                        "hidden";
                      document.getElementById("can2-8").style.visibility =
                        "visible";
                      document.getElementById("nextButton").style.visibility =
                        "visible";
                    }, 4001);
                  }, 1001);
                }, 2001);
              }, 1001);
            }, 4001);
          };
        }, 1500);
      }, 2001);
    };
  } else if (simsubscreennum == 3) {
    document.getElementById("can2-8").style.visibility = "hidden";
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("note1").style.visibility = "hidden";
    document.getElementById("can3-0").style.visibility = "visible";
    document.getElementById("can3-1").style.visibility = "visible";
    myInt = setInterval(function () {
      animatearrow();
    }, 500);
    animateArrowATPosition(207.5, 240, 360);
    document.getElementById("can3-0").onclick = function () {
      myStopFunction();
      document.getElementById("can3-0").onclick = "";
      document.getElementById("can3-2").style.visibility = "visible";
      document.getElementById("can3-2").style.animation =
        "liftTripod1 1.5s forwards";
      setTimeout(function () {
        document.getElementById("can3-2").style.visibility = "hidden";
        document.getElementById("can3-0").style.visibility = "hidden";
        document.getElementById("can3-7").style.visibility = "visible";
        document.getElementById("can3-7").style.animation =
          "liftTripod1-1 1s forwards,moveTripod1 1s forwards";
        setTimeout(function () {
          document.getElementById("can3-7").style.visibility = "hidden";
          document.getElementById("can3-5").style.visibility = "visible";
          document.getElementById("can3-8").style.visibility = "visible";
          myInt = setInterval(function () {
            animatearrow();
          }, 500);
          animateArrowATPosition(415.5, 352, 360);
          document.getElementById("can3-8").onclick = function () {
            myStopFunction();
            document.getElementById("can3-8").onclick = "";
            document.getElementById("can3-8").style.visibility = "hidden";
            document.getElementById("can3-11").style.visibility = "visible";
            document.getElementById("can3-3").style.visibility = "visible";
            document.getElementById("can3-4").style.visibility = "visible";
            document.getElementById("can3-4").style.animation =
              "moveHand5updn 1s 4 forwards ";
            setTimeout(function () {
              document.getElementById("can3-3").style.visibility = "hidden";
              document.getElementById("can3-4").style.visibility = "hidden";
              document.getElementById("can3-10").style.visibility = "visible";
              document.getElementById("can3-9").style.visibility = "visible";
              document.getElementById("can3-10").style.animation =
                "movecentrerod 3s forwards ";
              setTimeout(function () {
                document.getElementById("can3-10").style.visibility = "hidden";
                document.getElementById("can3-11").style.visibility = "hidden";
                document.getElementById("can3-9").style.visibility = "hidden";
                document.getElementById("can3-5").style.visibility = "hidden";
                document.getElementById("can3-1").style.visibility = "hidden";
                document.getElementById("can3-6").style.visibility = "visible";
                document.getElementById("nextButton").style.visibility =
                  "visible";
              }, 3000);
            }, 4000);
          };
        }, 1001);
      }, 1501);
    };
  } else if (simsubscreennum == 4) {
    document.getElementById("can3-6").style.visibility = "hidden";
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("can4-0").style.visibility = "visible";
    document.getElementById("can4-5").style.visibility = "visible";
    myInt = setInterval(function () {
      animatearrow();
    }, 500);
    animateArrowATPosition(227.5, 165, 180);
    document.getElementById("can4-5").onclick = function () {
      myStopFunction();
      document.getElementById("can4-5").onclick = "";
      document.getElementById("can4-5").style.visibility = "hidden";
      document.getElementById("can4-1").style.visibility = "visible";
      document.getElementById("can4-2").style.visibility = "visible";
      document.getElementById("can4-2").style.animation =
        "moveHand6lr 1s 2 forwards ";
      setTimeout(function () {
        document.getElementById("can4-2").style.visibility = "hidden";
        document.getElementById("can4-1").style.visibility = "hidden";
        document.getElementById("can4-5").style.visibility = "hidden";
        document.getElementById("can4-0").style.visibility = "hidden";
        document.getElementById("can4-8").style.visibility = "visible";
        document.getElementById("can4-9").style.visibility = "visible";
        document.getElementById("can4-7").style.visibility = "visible";
        document.getElementById("can4-8").style.animation =
          "movefullTripod 2s 2 forwards ";
        // setTimeout(function(){
        document.getElementById("can4-6").style.visibility = "visible";
        document.getElementById("can4-3").style.visibility = "visible";
        document.getElementById("can4-4").style.visibility = "visible";
        document.getElementById("can4-3").style.animation =
          "moveTripod4 2.5s forwards ";
        setTimeout(function () {
          document.getElementById("can4-8").style.visibility = "hidden";
          document.getElementById("can4-9").style.visibility = "hidden";
          document.getElementById("can4-7").style.visibility = "hidden";
          document.getElementById("can4-0").style.visibility = "visible";
          document.getElementById("can4-3").style.visibility = "hidden";
          document.getElementById("can4-4").style.visibility = "hidden";
          document.getElementById("can4-6").style.visibility = "hidden";
          let q1 = Object.create(questions); //(ans,nextcanvasfn,left,top,length, height)
          generateQuestion(
            q1,
            "What is the full form of DGPS? ",
            "",
            "Differentiate globe position system",
            "Differential global position system",
            "Differential global positioning system",
            "None of the above",
            3,
            nextCanvas,
            450,
            150,
            250,
            150
          );
        }, 2501);
        // },4001);
      }, 2000);
    };
  } else if (simsubscreennum == 5) {
    document.getElementById("can4-0").style.visibility = "hidden";
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("can5-3").style.visibility = "visible";
    document.getElementById("can5-4").style.visibility = "visible";
    myInt = setInterval(function () {
      animatearrow();
    }, 500);
    animateArrowATPosition(330.5, 270, 180);
    document.getElementById("can5-4").onclick = function () {
      myStopFunction();
      document.getElementById("can5-4").onclick = "";
      document.getElementById("can5-4").style.visibility = "hidden";
      document.getElementById("can5-3").style.visibility = "hidden";
      document.getElementById("can5-0").style.visibility = "visible";
      document.getElementById("can5-1").style.visibility = "visible";
      myInt = setInterval(function () {
        animatearrow();
      }, 500);
      animateArrowATPosition(603.5, 135, 270);
      document.getElementById("can5-1").onclick = function () {
        myStopFunction();
        document.getElementById("can5-1").style.animation =
          "moveBattery 2.5s forwards ";
        setTimeout(function () {
          document.getElementById("can5-0").style.visibility = "hidden";
          document.getElementById("can5-1").style.visibility = "hidden";
          document.getElementById("can5-5").style.visibility = "visible";
          document.getElementById("can5-6").style.visibility = "visible";
          myInt = setInterval(function () {
            animatearrow();
          }, 500);
          animateArrowATPosition(355.5, 316, 90);
          document.getElementById("can5-6").onclick = function () {
            myStopFunction();
            document.getElementById("can5-6").onclick = "";
            document.getElementById("can5-5").style.visibility = "hidden";
            document.getElementById("can5-6").style.visibility = "hidden";
            document.getElementById("can5-2").style.visibility = "visible";
            document.getElementById("nextButton").style.visibility = "visible";
          };
        }, 2501);
      };
    };
  } else if (simsubscreennum == 6) {
    document.getElementById("can5-2").style.visibility = "hidden";
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("can6-0").style.visibility = "visible";
    myInt = setInterval(function () {
      animatearrow();
    }, 500);
    animateArrowATPosition(89.5, 245, 180);
    document.getElementById("can6-0").onclick = function () {
      myStopFunction();
      document.getElementById("can6-0").onclick = "";
      document.getElementById("can6-0").style.visibility = "hidden";
      document.getElementById("can6-1").style.visibility = "visible";
      document.getElementById("can6-2").style.visibility = "visible";
      document.getElementById("can6-1").style.animation =
        "moveHeadlr 1s 2 forwards ";
      setTimeout(function () {
        document.getElementById("can6-1").style.visibility = "hidden";
        document.getElementById("can6-2").style.visibility = "hidden";
        document.getElementById("can6-11").style.visibility = "visible";
        document.getElementById("can6-12").style.visibility = "visible";
        myInt = setInterval(function () {
          animatearrow();
        }, 500);
        animateArrowATPosition(127.5, 352, 180);
        document.getElementById("can6-11").onclick = function () {
          myStopFunction();
          document.getElementById("can6-11").onclick = "";
          document.getElementById("can6-5").style.visibility = "visible";
          document.getElementById("can6-5").style.animation =
            "moveHand8 1s forwards ";
          setTimeout(function () {
            document.getElementById("can6-11").style.visibility = "hidden";
            document.getElementById("can6-12").style.visibility = "hidden";
            document.getElementById("can6-5").style.visibility = "hidden";
            document.getElementById("can6-3").style.visibility = "visible";
            document.getElementById("can6-4").style.visibility = "visible";
            document.getElementById("can6-4").style.animation =
              "moveBasetotripod 1s forwards ";
            setTimeout(function () {
              document.getElementById("can6-4").style.visibility = "hidden";
              document.getElementById("can6-10").style.visibility = "visible";
              document.getElementById("can6-6").style.visibility = "visible";
              document.getElementById("can6-7").style.visibility = "visible";
              document.getElementById("can6-8").style.visibility = "visible";
              document.getElementById("can6-7").style.animation =
                "moveHandtofix 2.5s 2 forwards ";
              setTimeout(function () {
                document.getElementById("can6-3").style.visibility = "hidden";
                document.getElementById("can6-10").style.visibility = "hidden";
                document.getElementById("can6-6").style.visibility = "hidden";
                document.getElementById("can6-7").style.visibility = "hidden";
                document.getElementById("can6-8").style.visibility = "hidden";
                document.getElementById("can6-9").style.visibility = "visible";
                let q2 = Object.create(questions);
                generateQuestion(
                  q2,
                  "Accuracy that can be achieved by conducting DGPS survey is ______ ",
                  "",
                  "5cm",
                  "1-3cm",
                  "10-12cm",
                  "1-3 m",
                  2,
                  nextCanvas,
                  500,
                  150,
                  250,
                  150
                );
              }, 5000);
            }, 1000);
          }, 1000);
        };
      }, 2000);
    };
  } else if (simsubscreennum == 7) {
    document.getElementById("can6-9").style.visibility = "hidden";
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("can7-0").style.visibility = "visible";
    document.getElementById("can7-1").style.visibility = "visible";
    myInt = setInterval(function () {
      animatearrow();
    }, 500);
    animateArrowATPosition(137.5, 412, 180);
    document.getElementById("can7-1").onclick = function () {
      myStopFunction();
      document.getElementById("can7-1").onclick = "";
      document.getElementById("can7-1").style.visibility = "hidden";
      document.getElementById("can7-2").style.visibility = "visible";
      document.getElementById("can7-3").style.visibility = "visible";
      document.getElementById("can7-3").style.animation =
        "takereading 2s forwards ";
      setTimeout(function () {
        document.getElementById("can7-3").style.visibility = "hidden";
        let q3 = Object.create(questions);
        generateQuestion(
          q3,
          "What is the height of the rod connecting the tripod and the base head?",
          "",
          "25cm",
          "2.5cm",
          "25mm",
          "2.5m",
          1,
          nextCanvas1,
          490,
          150,
          250,
          150
        );
      }, 2000);
    };
  } else if (simsubscreennum == 8) {
    document.getElementById("nextButton").style.visibility = "visible";
    document.getElementById("can7-0").style.visibility = "hidden";
    document.getElementById("can7-2").style.visibility = "hidden";
    document.getElementById("can7-4").style.visibility = "hidden";
    document.getElementById("can7-5").style.visibility = "hidden";
    document.getElementById("note2").style.visibility = "hidden";
  } else if (simsubscreennum == 9) {
    document.getElementById("main").style.visibility = "visible";
    document.getElementById("main1-1").style.visibility = "visible";
    document.getElementById("desktop").style.visibility = "visible";
    document.getElementById("taskbar").style.visibility = "visible";
    document.getElementById("cnctwifi").style.visibility = "visible";

    document.getElementById("heading").innerHTML =
      "Connect to Trimble website.";

    myInt = setInterval(function () {
      animatearrow();
    }, 500);
    animateArrowATPosition(641.5, 543, 90);
    document.getElementById("cnctwifi").onclick = function () {
      myStopFunction();
      document.getElementById("connect").style.visibility = "visible";
      myInt = setInterval(function () {
        animatearrow();
      }, 500);
      animateArrowATPosition(747.5, 310, 360);
      document.getElementById("Wificonnect").onclick = function () {
        myStopFunction();
        document.getElementById("connect").style.visibility = "hidden";
        document.getElementById("cnctwifi").style.visibility = "hidden";
        document.getElementById("cnctdwifi").style.visibility = "visible";
        myInt = setInterval(function () {
          animatearrow();
        }, 500);
        animateArrowATPosition(142.5, 544, 90);
        document.getElementById("heading").innerHTML =
          "Connect to Trimble website.";
        document.getElementById("brwsr").onclick = function () {
          myStopFunction();
          document.getElementById("server").style.visibility = "visible";
          document.getElementById("desktop").style.visibility = "hidden";
          myInt = setInterval(function () {
            animatearrow();
          }, 500);
          animateArrowATPosition(368.5, 359, 90);
          document.getElementById("trimble").onclick = function () {
            myStopFunction();
            document.getElementById("server").style.visibility = "hidden";
            document.getElementById("cnctdwifi").style.visibility = "hidden";
            document.getElementById("taskbar").style.visibility = "hidden";
            document.getElementById("main1-4").style.visibility = "visible";
            document.getElementById("heading").innerHTML =
              "Enter User name and Password to login.";
            document.getElementById("main1-3").style.visibility = "visible";
            document.getElementById("login").style.visibility = "visible";
            setTimeout(function () {
              document.getElementById("uname").style.visibility = "visible";
              setTimeout(function () {
                document.getElementById("pswd").style.visibility = "visible";
                myInt = setInterval(function () {
                  animatearrow();
                }, 500);
                animateArrowATPosition(291.5, 192, 90);
                document.getElementById("k1btn").onclick = function () {
                  myStopFunction();
                  myInt = setInterval(function () {
                    animatearrow();
                  }, 500);
                  animateArrowATPosition(202.5, 117, 360);
                  document.getElementById("heading").innerHTML =
                    "Under Satellite Enable/Disable, Disable all the BeiDou satellites";
                  document.getElementById("butn2").onclick = function () {
                    if (document.getElementById("butn2").value == false) {
                      myStopFunction();
                      document.getElementById("butn2").value = true;
                      document.getElementById("butn2").style.top = "33px";

                      document.getElementById("main1-40").style.visibility =
                        "visible";
                      document.getElementById("butn3").style.top = "254px";
                      document.getElementById("butn4").style.top = "270px";
                      document.getElementById("main1-43").style.top = "101px";
                      document.getElementById("butn2-5").style.fontWeight =
                        "bold";
                      myInt = setInterval(function () {
                        animatearrow();
                      }, 500);
                      animateArrowATPosition(201.5, 198.5, 360);
                      document.getElementById("butn2-5").onclick = function () {
                        if (document.getElementById("butn2-5").value == false) {
                          myStopFunction();
                          document.getElementById("butn2-5").value = true;
                          document.getElementById("login").style.visibility =
                            "hidden";
                          document.getElementById("uname").style.visibility =
                            "hidden";
                          document.getElementById("pswd").style.visibility =
                            "hidden";
                          document.getElementById("butn4-2").style.fontWeight =
                            "bold";
                          document.getElementById("main1-8").style.visibility =
                            "visible";
                          myInt = setInterval(function () {
                            animatearrow();
                          }, 500);
                          animateArrowATPosition(464, 493.5, 360);
                          document.getElementById("butn1-83").onclick =
                            function () {
                              myStopFunction();
                              document.getElementById("sat-img").src =
                                "./images/disabled.png";
                              document.getElementById(
                                "main1-40"
                              ).style.visibility = "hidden";
                              document.getElementById("butn3").style.top =
                                "49px";
                              document.getElementById("butn4").style.top =
                                "65px";
                              document.getElementById("main1-43").style.top =
                                "-104px";
                              myInt = setInterval(function () {
                                animatearrow();
                              }, 500);
                              animateArrowATPosition(202.5, 149, 360);
                              document.getElementById("heading").innerHTML =
                                "Under receiver configuration set the antenna height and measurement method.";
                              document.getElementById("butn4").onclick =
                                function () {
                                  if (
                                    document.getElementById("butn4").value ==
                                    false
                                  ) {
                                    myStopFunction();
                                    document.getElementById(
                                      "butn4"
                                    ).value = true;
                                    document.getElementById("butn4").style.top =
                                      "65px";

                                    document.getElementById(
                                      "main1-8"
                                    ).style.visibility = "hidden";
                                    document.getElementById(
                                      "main1-42"
                                    ).style.visibility = "visible";
                                    document.getElementById(
                                      "main1-43"
                                    ).style.top = "104px";
                                    document.getElementById("butn3").style.top =
                                      "49px";
                                    myInt = setInterval(function () {
                                      animatearrow();
                                    }, 500);
                                    animateArrowATPosition(201.5, 180.5, 360);
                                    document.getElementById("butn4-2").onclick =
                                      function () {
                                        if (
                                          document.getElementById("butn4-2")
                                            .value == false
                                        ) {
                                          myStopFunction();
                                          document.getElementById(
                                            "butn4-2"
                                          ).value = true;
                                          document.getElementById(
                                            "login"
                                          ).style.visibility = "hidden";
                                          document.getElementById(
                                            "uname"
                                          ).style.visibility = "hidden";
                                          document.getElementById(
                                            "pswd"
                                          ).style.visibility = "hidden";
                                          document.getElementById(
                                            "butn4-2"
                                          ).style.fontWeight = "bold";
                                          document.getElementById(
                                            "main1-5"
                                          ).style.visibility = "visible";
                                          myInt = setInterval(function () {
                                            animatearrow();
                                          }, 500);
                                          animateArrowATPosition(
                                            657.5,
                                            170.5,
                                            360
                                          );
                                          document.getElementById(
                                            "optns"
                                          ).onclick = function () {
                                            myStopFunction();
                                            myInt = setInterval(function () {
                                              animatearrow();
                                            }, 500);
                                            animateArrowATPosition(
                                              657.5,
                                              201.5,
                                              360
                                            );
                                            document.getElementById(
                                              "optns"
                                            ).onchange = function () {
                                              document.getElementById(
                                                "optns"
                                              ).onclick = function () {
                                                myStopFunction();
                                                document.getElementById(
                                                  "chk"
                                                ).style.visibility = "visible";
                                                document.getElementById(
                                                  "ht"
                                                ).placeholder =
                                                  "Enter the height";
                                                document.getElementById(
                                                  "chk"
                                                ).onclick = function () {
                                                  if (
                                                    document.getElementById(
                                                      "ht"
                                                    ).value.length == 0
                                                  ) {
                                                    document.getElementById(
                                                      "ht"
                                                    ).placeholder =
                                                      "No value entered";
                                                  } else if (
                                                    document.getElementById(
                                                      "ht"
                                                    ).value.length > 0
                                                  ) {
                                                    if (
                                                      document.getElementById(
                                                        "ht"
                                                      ).value == 1.71
                                                    ) {
                                                      document.getElementById(
                                                        "rtht"
                                                      ).style.visibility =
                                                        "visible";
                                                      document.getElementById(
                                                        "chk"
                                                      ).style.visibility =
                                                        "hidden";
                                                      setTimeout(function () {
                                                        document.getElementById(
                                                          "rtht"
                                                        ).style.visibility =
                                                          "hidden";
                                                        document.getElementById(
                                                          "ht"
                                                        ).value = 1.71;
                                                        document.getElementById(
                                                          "ht"
                                                        ).disabled = true;
                                                        myInt = setInterval(
                                                          function () {
                                                            animatearrow();
                                                          },
                                                          500
                                                        );
                                                        animateArrowATPosition(
                                                          234.5,
                                                          346.5,
                                                          90
                                                        );
                                                      }, 1000);
                                                    } else {
                                                      document.getElementById(
                                                        "chk"
                                                      ).value = true;
                                                      document.getElementById(
                                                        "chk"
                                                      ).style.visibility =
                                                        "hidden";
                                                      document.getElementById(
                                                        "wrht"
                                                      ).style.visibility =
                                                        "visible";
                                                      setTimeout(function () {
                                                        document.getElementById(
                                                          "wrht"
                                                        ).style.visibility =
                                                          "hidden";
                                                        document.getElementById(
                                                          "rslt"
                                                        ).style.visibility =
                                                          "visible";
                                                        document.getElementById(
                                                          "rslt"
                                                        ).onclick =
                                                          function () {
                                                            document.getElementById(
                                                              "ht"
                                                            ).value = 1.71;
                                                            document.getElementById(
                                                              "rslt"
                                                            ).style.visibility =
                                                              "hidden";
                                                            document.getElementById(
                                                              "ht"
                                                            ).disabled = true;
                                                            myInt = setInterval(
                                                              function () {
                                                                animatearrow();
                                                              },
                                                              500
                                                            );
                                                            animateArrowATPosition(
                                                              234.5,
                                                              346.5,
                                                              90
                                                            );
                                                          };
                                                      }, 1000);
                                                    }
                                                  }
                                                  document.getElementById(
                                                    "kbtn1"
                                                  ).onclick = function () {
                                                    myStopFunction();
                                                    myInt = setInterval(
                                                      function () {
                                                        animatearrow();
                                                      },
                                                      500
                                                    );
                                                    animateArrowATPosition(
                                                      201.5,
                                                      197,
                                                      360
                                                    );
                                                    document.getElementById(
                                                      "heading"
                                                    ).innerHTML =
                                                      " In reference station give Here position and click ok.";
                                                    document.getElementById(
                                                      "butn4-3"
                                                    ).onclick = function () {
                                                      if (
                                                        document.getElementById(
                                                          "butn4-3"
                                                        ).value == false
                                                      ) {
                                                        myStopFunction();
                                                        document.getElementById(
                                                          "butn4-3"
                                                        ).value = true;
                                                        document.getElementById(
                                                          "butn4-2"
                                                        ).style.fontWeight =
                                                          "normal";
                                                        document.getElementById(
                                                          "butn4-3"
                                                        ).style.fontWeight =
                                                          "bold";
                                                        document.getElementById(
                                                          "main1-5"
                                                        ).style.visibility =
                                                          "hidden";
                                                        document.getElementById(
                                                          "main1-6"
                                                        ).style.visibility =
                                                          "visible";
                                                        myInt = setInterval(
                                                          function () {
                                                            animatearrow();
                                                          },
                                                          500
                                                        );
                                                        animateArrowATPosition(
                                                          389.5,
                                                          291.5,
                                                          360
                                                        );
                                                        document.getElementById(
                                                          "hrbtn"
                                                        ).onclick =
                                                          function () {
                                                            if (
                                                              document.getElementById(
                                                                "hrbtn"
                                                              ).value == false
                                                            ) {
                                                              myStopFunction();
                                                              document.getElementById(
                                                                "hrbtn"
                                                              ).value = true;
                                                              document.getElementById(
                                                                "refht"
                                                              ).innerHTML =
                                                                "-90";
                                                              myInt =
                                                                setInterval(
                                                                  function () {
                                                                    animatearrow();
                                                                  },
                                                                  500
                                                                );
                                                              animateArrowATPosition(
                                                                211,
                                                                542.5,
                                                                90
                                                              );
                                                              document.getElementById(
                                                                "kbtn2"
                                                              ).onclick =
                                                                function () {
                                                                  myStopFunction();
                                                                  myInt =
                                                                    setInterval(
                                                                      function () {
                                                                        animatearrow();
                                                                      },
                                                                      500
                                                                    );
                                                                  animateArrowATPosition(
                                                                    202,
                                                                    133.5,
                                                                    360
                                                                  );
                                                                  document.getElementById(
                                                                    "heading"
                                                                  ).innerHTML =
                                                                    "Data logging, Give Enable to login the data.";
                                                                  document.getElementById(
                                                                    "butn3"
                                                                  ).onclick =
                                                                    function () {
                                                                      if (
                                                                        document.getElementById(
                                                                          "butn3"
                                                                        )
                                                                          .value ==
                                                                        false
                                                                      ) {
                                                                        myStopFunction();
                                                                        document.getElementById(
                                                                          "butn3"
                                                                        ).value = true;
                                                                        document.getElementById(
                                                                          "main1-6"
                                                                        ).style.visibility =
                                                                          "hidden";
                                                                        document.getElementById(
                                                                          "main1-42"
                                                                        ).style.visibility =
                                                                          "hidden";
                                                                        document.getElementById(
                                                                          "main1-41"
                                                                        ).style.visibility =
                                                                          "visible";
                                                                        document.getElementById(
                                                                          "main1-43"
                                                                        ).style.top =
                                                                          "-18px";
                                                                        document.getElementById(
                                                                          "butn4"
                                                                        ).style.top =
                                                                          "151px";
                                                                        document.getElementById(
                                                                          "main1-7"
                                                                        ).style.visibility =
                                                                          "visible";
                                                                        document.getElementById(
                                                                          "tabdl1"
                                                                        ).style.visibility =
                                                                          "visible";
                                                                        myInt =
                                                                          setInterval(
                                                                            function () {
                                                                              animatearrow();
                                                                            },
                                                                            500
                                                                          );
                                                                        animateArrowATPosition(
                                                                          505,
                                                                          256,
                                                                          360
                                                                        );
                                                                        document.getElementById(
                                                                          "dlc"
                                                                        ).onclick =
                                                                          function () {
                                                                            myStopFunction();
                                                                            document.getElementById(
                                                                              "tabdl1"
                                                                            ).style.visibility =
                                                                              "hidden";
                                                                            document.getElementById(
                                                                              "tabdl2"
                                                                            ).style.visibility =
                                                                              "visible";
                                                                            document.getElementById(
                                                                              "dlc1"
                                                                            ).checked = true;
                                                                            myInt =
                                                                              setInterval(
                                                                                function () {
                                                                                  animatearrow();
                                                                                },
                                                                                500
                                                                              );
                                                                            animateArrowATPosition(
                                                                              669,
                                                                              256,
                                                                              360
                                                                            );
                                                                            document.getElementById(
                                                                              "dlc1"
                                                                            ).onclick =
                                                                              function () {
                                                                                myStopFunction();
                                                                                document.getElementById(
                                                                                  "dlc1"
                                                                                ).checked = true;
                                                                                // document.getElementById(
                                                                                //   "prmpt"
                                                                                // ).style.visibility =
                                                                                //   "visible";
                                                                                // document.getElementById(
                                                                                //   "tabdl"
                                                                                // ).style.top =
                                                                                //   "66px";
                                                                                // document.getElementById(
                                                                                //   "tabdl2"
                                                                                // ).style.top =
                                                                                //   "143px";
                                                                                // myInt =
                                                                                //   setInterval(
                                                                                //     function () {
                                                                                //       animatearrow();
                                                                                //     },
                                                                                //     500
                                                                                //   );
                                                                                // animateArrowATPosition(
                                                                                //   546,
                                                                                //   158.5,
                                                                                //   90
                                                                                // );
                                                                                // document.getElementById(
                                                                                //   "heading"
                                                                                // ).innerHTML =
                                                                                //   "Give disable to log out.";
                                                                                // document.getElementById(
                                                                                //   "kbtn3"
                                                                                // ).onclick =
                                                                                //   function () {
                                                                                //     myStopFunction();
                                                                                //     document.getElementById(
                                                                                //       "prmpt"
                                                                                //     ).style.visibility =
                                                                                //       "hidden";
                                                                                //     document.getElementById(
                                                                                //       "tabdl"
                                                                                //     ).style.top =
                                                                                //       "40px";
                                                                                //     document.getElementById(
                                                                                //       "tabdl1"
                                                                                //     ).style.visibility =
                                                                                //       "visible";
                                                                                //     document.getElementById(
                                                                                //       "tabdl2"
                                                                                //     ).style.visibility =
                                                                                //       "hidden";
                                                                                //     document.getElementById(
                                                                                //       "dlc"
                                                                                //     ).checked = false;
                                                                                //     document.getElementById(
                                                                                //       "dlc"
                                                                                //     ).disabled = true;
                                                                                document.getElementById(
                                                                                  "nextButton"
                                                                                ).style.visibility =
                                                                                  "visible";
                                                                                // };
                                                                              };
                                                                          };
                                                                      }
                                                                    };
                                                                };
                                                            }
                                                          };
                                                      }
                                                    };
                                                  };
                                                };
                                              };
                                            };
                                          };
                                        }
                                      };
                                  }
                                };
                            };
                        }
                      };
                    }
                  };
                };
              }, 400);
            }, 300);
          };
        };
      };
    };
  } else if (simsubscreennum == 10) {
    document.getElementById("nextButton").style.visibility = "hidden";
    // document.getElementById("canvas9").style.visibility = "hidden";
    // document.getElementById("main").style.visibility = "hidden";
    document.getElementById("main1").style.visibility = "hidden";
    document.getElementById("main1-1").style.visibility = "hidden";
    document.getElementById("main1-7").style.visibility = "hidden";
    document.getElementById("main1-4").style.visibility = "hidden";
    document.getElementById("main1-41").style.visibility = "hidden";
    document.getElementById("main1-3").style.visibility = "hidden";
    document.getElementById("main1-41").style.visibility = "hidden";
    document.getElementById("tabdl1").style.visibility = "hidden";
    document.getElementById("tabdl2").style.visibility = "hidden";
    typeWriter();
  } else if (simsubscreennum == 11) {
    document.getElementById("status").style.visibility = "hidden";
    document.getElementById("nextButton").style.visibility = "hidden";
    myInt = setInterval(function () {
      animatearrow();
    }, 500);
    animateArrowATPosition(377.5, 510, 90);
    document.getElementById("can10-0").onclick = function () {
      document.getElementById("can10-0").onclick = " ";
      myStopFunction();
      document.getElementById("can10-0").style.transform = "scale(0.5)";
      document.getElementById("can10-0").style.opacity = "0";
      setTimeout(() => {
        document.getElementById("can10-1").style.visibility = "visible";
        document.getElementById("can10-2").style.visibility = "visible";
        myInt = setInterval(function () {
          animatearrow();
        }, 500);
        animateArrowATPosition(359.5, 173, 180);
        document.getElementById("can10-1").onclick = function () {
          document.getElementById("can10-1").onclick = " ";
          myStopFunction();
          document.getElementById("can10-1").style.animation =
            "roverUpBottom 1s forwards";
          setTimeout(function () {
            document.getElementById("nextButton").style.visibility = "visible";
          }, 1200);
        };
      }, 501);
    };
  } else if (simsubscreennum == 12) {
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("can10-1").style.visibility = "hidden";
    document.getElementById("can10-2").style.visibility = "hidden";
    myInt = setInterval(function () {
      animatearrow();
    }, 500);
    animateArrowATPosition(330.5, 270, 180);
    document.getElementById("can11-4").onclick = function () {
      myStopFunction();
      document.getElementById("can11-4").onclick = "";
      document.getElementById("can11-4").style.visibility = "hidden";
      document.getElementById("can11-3").style.visibility = "hidden";
      document.getElementById("can11-0").style.visibility = "visible";
      document.getElementById("can11-1").style.visibility = "visible";
      myInt = setInterval(function () {
        animatearrow();
      }, 500);
      animateArrowATPosition(603.5, 135, 270);
      document.getElementById("can11-1").onclick = function () {
        myStopFunction();
        document.getElementById("can11-1").style.animation =
          "moveBattery 2.5s forwards ";
        setTimeout(function () {
          document.getElementById("can11-0").style.visibility = "hidden";
          document.getElementById("can11-1").style.visibility = "hidden";
          document.getElementById("can11-5").style.visibility = "visible";
          document.getElementById("can11-6").style.visibility = "visible";
          myInt = setInterval(function () {
            animatearrow();
          }, 500);
          animateArrowATPosition(355.5, 316, 90);
          document.getElementById("can11-6").onclick = function () {
            myStopFunction();
            document.getElementById("can11-6").onclick = "";
            document.getElementById("can11-5").style.visibility = "hidden";
            document.getElementById("can11-6").style.visibility = "hidden";
            document.getElementById("can11-2").style.visibility = "visible";
            document.getElementById("nextButton").style.visibility = "visible";
          };
        }, 2501);
      };
    };
  } else if (simsubscreennum == 13) {
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("can11-2").style.visibility = "hidden";

    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("can12-0").style.visibility = "visible";
    myInt = setInterval(function () {
      animatearrow();
    }, 500);
    animateArrowATPosition(89.5, 245, 180);
    document.getElementById("can12-0").onclick = function () {
      myStopFunction();
      document.getElementById("can12-0").onclick = "";
      document.getElementById("can12-0").style.visibility = "hidden";
      document.getElementById("can12-1").style.visibility = "visible";
      document.getElementById("can12-2").style.visibility = "visible";
      document.getElementById("can12-1").style.animation =
        "moveHeadlr 1s 2 forwards ";
      setTimeout(function () {
        document.getElementById("can12-1").style.visibility = "hidden";
        document.getElementById("can12-2").style.visibility = "hidden";
        document.getElementById("can12-11").style.visibility = "visible";
        document.getElementById("can12-12").style.visibility = "visible";
        setTimeout(function () {
          document.getElementById("can12-11").style.opacity = 0;
          document.getElementById("can12-12").style.opacity = 0;
          document.getElementById("can12-13").style.visibility = "visible";
          document.getElementById("can12-13").style.left = "323.5px";
          document.getElementById("can12-13").style.transform = "scale(1)";
          setTimeout(function () {
            document.getElementById("note22").style.visibility = "visible";
            document.getElementById("nextButton").style.visibility = "visible";
          }, 800);
        }, 800);
      }, 2000);
    };
  } else if (simsubscreennum == 14) {
    document.getElementById("note22").style.visibility = "hidden";
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("can12-13").style.visibility = "hidden";
    myInt = setInterval(function () {
      animatearrow();
    }, 500);
    animateArrowATPosition(150.5, 261, 360);
    document.getElementById("can13-1").onclick = function () {
      myStopFunction();
      document.getElementById("can13-1").onclick = "";
      document.getElementById("can13-2").style.visibility = "visible";
      document.getElementById("can13-1").style.left = "323.5px";
      document.getElementById("can13-2").style.left = "302px";
      setTimeout(function () {
        document.getElementById("can13-2").style.visibility = "hidden";
        document.getElementById("can13-3").style.visibility = "visible";
        myInt = setInterval(function () {
          animatearrow();
        }, 500);
        animateArrowATPosition(256.5, 403, -180);
        document.getElementById("can13-3").onclick = function () {
          myStopFunction();
          document.getElementById("can13-3").onclick = "";
          document.getElementById("can13-3").style.left = "271.5px";
          setTimeout(function () {
            document.getElementById("can13-3").style.visibility = "hidden";
            document.getElementById("can13-4").style.visibility = "visible";
            document.getElementById("can13-5").style.visibility = "visible";
            document.getElementById("can13-5").style.animation =
              "bipodRotate 1s 2 forwards";
            setTimeout(function () {
              document.getElementById("can13-5").style.visibility = "hidden";
              document.getElementById("nextButton").style.visibility =
                "visible";
            }, 2000);
          }, 900);
        };
      }, 1500);
    };
  } else if (simsubscreennum == 15) {
    document.getElementById("can13-4").style.visibility = "hidden";
    document.getElementById("can13-5").style.visibility = "hidden";
    document.getElementById("can13-6").style.visibility = "hidden";
    document.getElementById("nextButton").style.visibility = "hidden";
    myInt = setInterval(function () {
      animatearrow();
    }, 500);
    animateArrowATPosition(297.5, 391, 180);
    document.getElementById("can14-3").onclick = function () {
      document.getElementById("can14-3").onclick = " ";
      myStopFunction();
      document.getElementById("can14-3").style.transform = "rotate(10deg)";
      document.getElementById("can14-2").style.transform = "rotate(-21deg)";
      document.getElementById("can14-4").style.visibility = "visible";
      document.getElementById("can14-4").style.animation =
        "bubbleZoom 0.5s forwards";
      setTimeout(function () {
        document.getElementById("can14-5").style.visibility = "visible";
        document.getElementById("can14-4").style.transform = "scale(1)";
        document.getElementById("can14-4").style.animation =
          "bubble2Move 2s  forwards";
        setTimeout(function () {
          document.getElementById("can14-1").style.visibility = "hidden";
          document.getElementById("can14-2").style.visibility = "hidden";
          document.getElementById("can14-3").style.visibility = "hidden";
          document.getElementById("can14-4").style.visibility = "hidden";
          document.getElementById("can14-5").style.visibility = "hidden";
          document.getElementById("can14-7").style.visibility = "visible";
          document.getElementById("nextButton").style.visibility = "visible";
        }, 2300);
      }, 500);
    };
  } else if (simsubscreennum == 16) {
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("canvas16").style.visibility = "hidden";
    document.getElementById("can15-1").style.visibility = "visible";
    document.getElementById("can15-2").style.visibility = "visible";
    document.getElementById("can15-3").style.visibility = "visible";
    document.getElementById("can14-1").style.visibility = "hidden";
    document.getElementById("can14-2").style.visibility = "hidden";
    document.getElementById("can14-3").style.visibility = "hidden";
    document.getElementById("can14-6").style.visibility = "hidden";
    document.getElementById("can14-7").style.visibility = "hidden";
    setTimeout(() => {
      // simsubscreennum = 8;
      // secondSetup = true;
      document.getElementById("nextButton").style.visibility = "visible";
    }, 200);
  } else if (simsubscreennum == 17) {
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("canvas16").style.visibility = "hidden";
    document.getElementById("can15-1").style.visibility = "hidden";
    document.getElementById("can15-2").style.visibility = "hidden";
    document.getElementById("can15-3").style.visibility = "hidden";

    document.getElementById("main2-0").style.visibility = "visible";
    // document.getElementById("main2").style.visibility = "visible";
    document.getElementById("main2-1").style.visibility = "visible";
    document.getElementById("desktop2").style.visibility = "visible";
    document.getElementById("taskbar2").style.visibility = "visible";
    document.getElementById("cnctwifi2").style.visibility = "visible";

    document.getElementById("heading2").innerHTML =
      "Connect to Trimble website.";

    myInt = setInterval(function () {
      animatearrow();
    }, 500);
    animateArrowATPosition(641.5, 543, 90);
    document.getElementById("cnctwifi2").onclick = function () {
      myStopFunction();
      document.getElementById("connect2").style.visibility = "visible";
      myInt = setInterval(function () {
        animatearrow();
      }, 500);
      animateArrowATPosition(747.5, 310, 360);
      document.getElementById("Wificonnect2").onclick = function () {
        myStopFunction();
        document.getElementById("connect2").style.visibility = "hidden";
        document.getElementById("cnctwifi2").style.visibility = "hidden";
        document.getElementById("cnctdwifi2").style.visibility = "visible";
        myInt = setInterval(function () {
          animatearrow();
        }, 500);
        animateArrowATPosition(142.5, 544, 90);
        document.getElementById("heading2").innerHTML =
          "Connect to Trimble website.";
        document.getElementById("brwsr2").onclick = function () {
          myStopFunction();
          document.getElementById("server2").style.visibility = "visible";
          document.getElementById("desktop2").style.visibility = "hidden";
          myInt = setInterval(function () {
            animatearrow();
          }, 500);
          animateArrowATPosition(368.5, 359, 90);
          document.getElementById("trimble2").onclick = function () {
            myStopFunction();
            document.getElementById("server2").style.visibility = "hidden";
            document.getElementById("cnctdwifi2").style.visibility = "hidden";
            document.getElementById("taskbar2").style.visibility = "hidden";
            document.getElementById("main2-4").style.visibility = "visible";
            document.getElementById("heading2").innerHTML =
              "Enter User name and Password to login.";
            document.getElementById("main2-3").style.visibility = "visible";
            document.getElementById("login2").style.visibility = "visible";
            setTimeout(function () {
              document.getElementById("uname2").style.visibility = "visible";
              setTimeout(function () {
                document.getElementById("pswd2").style.visibility = "visible";
                myInt = setInterval(function () {
                  animatearrow();
                }, 500);
                animateArrowATPosition(291.5, 192, 90);
                document.getElementById("k1btn2").onclick = function () {
                  myStopFunction();
                  myInt = setInterval(function () {
                    animatearrow();
                  }, 500);
                  animateArrowATPosition(202.5, 117, 360);
                  document.getElementById("heading2").innerHTML =
                    "Under Satellite Enable/Disable, Disable all the BeiDou satellites";
                  document.getElementById("butn22").onclick = function () {
                    if (document.getElementById("butn22").value == false) {
                      myStopFunction();
                      document.getElementById("butn22").value = true;
                      document.getElementById("butn22").style.top = "33px";

                      document.getElementById("main2-40").style.visibility =
                        "visible";
                      document.getElementById("butn32").style.top = "254px";
                      document.getElementById("butn42").style.top = "270px";
                      document.getElementById("main2-43").style.top = "101px";
                      document.getElementById("butn22-5").style.fontWeight =
                        "bold";
                      myInt = setInterval(function () {
                        animatearrow();
                      }, 500);
                      animateArrowATPosition(201.5, 198.5, 360);
                      document.getElementById("butn22-5").onclick =
                        function () {
                          if (
                            document.getElementById("butn22-5").value == false
                          ) {
                            myStopFunction();
                            document.getElementById("butn22-5").value = true;
                            document.getElementById("login2").style.visibility =
                              "hidden";
                            document.getElementById("uname2").style.visibility =
                              "hidden";
                            document.getElementById("pswd2").style.visibility =
                              "hidden";
                            document.getElementById(
                              "butn4-22"
                            ).style.fontWeight = "bold";
                            document.getElementById(
                              "main2-8"
                            ).style.visibility = "visible";
                            myInt = setInterval(function () {
                              animatearrow();
                            }, 500);
                            animateArrowATPosition(464, 493.5, 360);
                            document.getElementById("butn2-83").onclick =
                              function () {
                                myStopFunction();
                                document.getElementById("sat-img2").src =
                                  "./images/disabled.png";
                                document.getElementById(
                                  "main2-40"
                                ).style.visibility = "hidden";
                                document.getElementById("butn32").style.top =
                                  "49px";
                                document.getElementById("butn42").style.top =
                                  "65px";
                                document.getElementById("main2-43").style.top =
                                  "-104px";
                                myInt = setInterval(function () {
                                  animatearrow();
                                }, 500);
                                animateArrowATPosition(202.5, 149, 360);
                                document.getElementById("heading2").innerHTML =
                                  "Under receiver configuration set the antenna height and measurement method.";
                                document.getElementById("butn42").onclick =
                                  function () {
                                    if (
                                      document.getElementById("butn42").value ==
                                      false
                                    ) {
                                      myStopFunction();
                                      document.getElementById(
                                        "butn42"
                                      ).value = true;
                                      document.getElementById(
                                        "butn42"
                                      ).style.top = "65px";

                                      document.getElementById(
                                        "main2-8"
                                      ).style.visibility = "hidden";
                                      document.getElementById(
                                        "main2-42"
                                      ).style.visibility = "visible";
                                      document.getElementById(
                                        "main2-43"
                                      ).style.top = "104px";
                                      document.getElementById(
                                        "butn32"
                                      ).style.top = "49px";
                                      myInt = setInterval(function () {
                                        animatearrow();
                                      }, 500);
                                      animateArrowATPosition(201.5, 180.5, 360);
                                      document.getElementById(
                                        "butn4-22"
                                      ).onclick = function () {
                                        if (
                                          document.getElementById("butn4-22")
                                            .value == false
                                        ) {
                                          myStopFunction();
                                          document.getElementById(
                                            "butn4-22"
                                          ).value = true;
                                          document.getElementById(
                                            "login2"
                                          ).style.visibility = "hidden";
                                          document.getElementById(
                                            "uname2"
                                          ).style.visibility = "hidden";
                                          document.getElementById(
                                            "pswd2"
                                          ).style.visibility = "hidden";
                                          document.getElementById(
                                            "butn4-22"
                                          ).style.fontWeight = "bold";
                                          document.getElementById(
                                            "main2-5"
                                          ).style.visibility = "visible";
                                          myInt = setInterval(function () {
                                            animatearrow();
                                          }, 500);
                                          animateArrowATPosition(
                                            657.5,
                                            170.5,
                                            360
                                          );
                                          document.getElementById(
                                            "optns2"
                                          ).onclick = function () {
                                            myStopFunction();
                                            myInt = setInterval(function () {
                                              animatearrow();
                                            }, 500);
                                            animateArrowATPosition(
                                              657.5,
                                              201.5,
                                              360
                                            );
                                            document.getElementById(
                                              "optns2"
                                            ).onchange = function () {
                                              document.getElementById(
                                                "optns2"
                                              ).onclick = function () {
                                                myStopFunction();
                                                document.getElementById(
                                                  "chk2"
                                                ).style.visibility = "visible";
                                                document.getElementById(
                                                  "ht2"
                                                ).placeholder =
                                                  "Enter the height";
                                                document.getElementById(
                                                  "chk2"
                                                ).onclick = function () {
                                                  if (
                                                    document.getElementById(
                                                      "ht2"
                                                    ).value.length == 0
                                                  ) {
                                                    document.getElementById(
                                                      "ht2"
                                                    ).placeholder =
                                                      "No value entered";
                                                  } else if (
                                                    document.getElementById(
                                                      "ht2"
                                                    ).value.length > 0
                                                  ) {
                                                    if (
                                                      document.getElementById(
                                                        "ht2"
                                                      ).value == 2
                                                    ) {
                                                      document.getElementById(
                                                        "rtht2"
                                                      ).style.visibility =
                                                        "visible";
                                                      document.getElementById(
                                                        "chk2"
                                                      ).style.visibility =
                                                        "hidden";
                                                      setTimeout(function () {
                                                        document.getElementById(
                                                          "rtht2"
                                                        ).style.visibility =
                                                          "hidden";
                                                        document.getElementById(
                                                          "ht2"
                                                        ).value = 2;
                                                        document.getElementById(
                                                          "ht2"
                                                        ).disabled = true;
                                                        myInt = setInterval(
                                                          function () {
                                                            animatearrow();
                                                          },
                                                          500
                                                        );
                                                        animateArrowATPosition(
                                                          234.5,
                                                          346.5,
                                                          90
                                                        );
                                                      }, 1000);
                                                    } else {
                                                      document.getElementById(
                                                        "chk2"
                                                      ).value = true;
                                                      document.getElementById(
                                                        "chk2"
                                                      ).style.visibility =
                                                        "hidden";
                                                      document.getElementById(
                                                        "wrht2"
                                                      ).style.visibility =
                                                        "visible";
                                                      setTimeout(function () {
                                                        document.getElementById(
                                                          "wrht2"
                                                        ).style.visibility =
                                                          "hidden";
                                                        document.getElementById(
                                                          "rslt2"
                                                        ).style.visibility =
                                                          "visible";
                                                        document.getElementById(
                                                          "rslt2"
                                                        ).onclick =
                                                          function () {
                                                            document.getElementById(
                                                              "ht2"
                                                            ).value = 2;
                                                            document.getElementById(
                                                              "rslt2"
                                                            ).style.visibility =
                                                              "hidden";
                                                            document.getElementById(
                                                              "ht2"
                                                            ).disabled = true;
                                                            myInt = setInterval(
                                                              function () {
                                                                animatearrow();
                                                              },
                                                              500
                                                            );
                                                            animateArrowATPosition(
                                                              234.5,
                                                              346.5,
                                                              90
                                                            );
                                                          };
                                                      }, 1000);
                                                    }
                                                  }
                                                  document.getElementById(
                                                    "kbtn12"
                                                  ).onclick = function () {
                                                    myStopFunction();
                                                    myInt = setInterval(
                                                      function () {
                                                        animatearrow();
                                                      },
                                                      500
                                                    );
                                                    animateArrowATPosition(
                                                      201.5,
                                                      197,
                                                      360
                                                    );
                                                    document.getElementById(
                                                      "heading2"
                                                    ).innerHTML =
                                                      " In reference station give Here position and click ok.";
                                                    document.getElementById(
                                                      "butn4-32"
                                                    ).onclick = function () {
                                                      if (
                                                        document.getElementById(
                                                          "butn4-32"
                                                        ).value == false
                                                      ) {
                                                        myStopFunction();
                                                        document.getElementById(
                                                          "butn4-32"
                                                        ).value = true;
                                                        document.getElementById(
                                                          "butn4-22"
                                                        ).style.fontWeight =
                                                          "normal";
                                                        document.getElementById(
                                                          "butn4-32"
                                                        ).style.fontWeight =
                                                          "bold";
                                                        document.getElementById(
                                                          "main2-5"
                                                        ).style.visibility =
                                                          "hidden";
                                                        document.getElementById(
                                                          "main2-6"
                                                        ).style.visibility =
                                                          "visible";
                                                        myInt = setInterval(
                                                          function () {
                                                            animatearrow();
                                                          },
                                                          500
                                                        );
                                                        animateArrowATPosition(
                                                          389.5,
                                                          291.5,
                                                          360
                                                        );
                                                        document.getElementById(
                                                          "hrbtn2"
                                                        ).onclick =
                                                          function () {
                                                            if (
                                                              document.getElementById(
                                                                "hrbtn2"
                                                              ).value == false
                                                            ) {
                                                              myStopFunction();
                                                              document.getElementById(
                                                                "hrbtn2"
                                                              ).value = true;
                                                              document.getElementById(
                                                                "refht2"
                                                              ).innerHTML =
                                                                "-90";
                                                              myInt =
                                                                setInterval(
                                                                  function () {
                                                                    animatearrow();
                                                                  },
                                                                  500
                                                                );
                                                              animateArrowATPosition(
                                                                211,
                                                                542.5,
                                                                90
                                                              );
                                                              document.getElementById(
                                                                "kbtn22"
                                                              ).onclick =
                                                                function () {
                                                                  myStopFunction();
                                                                  myInt =
                                                                    setInterval(
                                                                      function () {
                                                                        animatearrow();
                                                                      },
                                                                      500
                                                                    );
                                                                  animateArrowATPosition(
                                                                    202,
                                                                    133.5,
                                                                    360
                                                                  );
                                                                  document.getElementById(
                                                                    "heading2"
                                                                  ).innerHTML =
                                                                    "Data logging, Give Enable to login the data.";
                                                                  document.getElementById(
                                                                    "butn32"
                                                                  ).onclick =
                                                                    function () {
                                                                      if (
                                                                        document.getElementById(
                                                                          "butn32"
                                                                        )
                                                                          .value ==
                                                                        false
                                                                      ) {
                                                                        myStopFunction();
                                                                        document.getElementById(
                                                                          "butn32"
                                                                        ).value = true;
                                                                        document.getElementById(
                                                                          "main2-6"
                                                                        ).style.visibility =
                                                                          "hidden";
                                                                        document.getElementById(
                                                                          "main2-42"
                                                                        ).style.visibility =
                                                                          "hidden";
                                                                        document.getElementById(
                                                                          "main2-41"
                                                                        ).style.visibility =
                                                                          "visible";
                                                                        document.getElementById(
                                                                          "main2-43"
                                                                        ).style.top =
                                                                          "-18px";
                                                                        document.getElementById(
                                                                          "butn42"
                                                                        ).style.top =
                                                                          "151px";
                                                                        document.getElementById(
                                                                          "main2-7"
                                                                        ).style.visibility =
                                                                          "visible";
                                                                        document.getElementById(
                                                                          "tabdl12"
                                                                        ).style.visibility =
                                                                          "visible";
                                                                        myInt =
                                                                          setInterval(
                                                                            function () {
                                                                              animatearrow();
                                                                            },
                                                                            500
                                                                          );
                                                                        animateArrowATPosition(
                                                                          505,
                                                                          256,
                                                                          360
                                                                        );
                                                                        document.getElementById(
                                                                          "dlc2"
                                                                        ).onclick =
                                                                          function () {
                                                                            myStopFunction();
                                                                            document.getElementById(
                                                                              "tabdl12"
                                                                            ).style.visibility =
                                                                              "hidden";
                                                                            document.getElementById(
                                                                              "tabdl22"
                                                                            ).style.visibility =
                                                                              "visible";
                                                                            document.getElementById(
                                                                              "dlc12"
                                                                            ).checked = true;
                                                                            myInt =
                                                                              setInterval(
                                                                                function () {
                                                                                  animatearrow();
                                                                                },
                                                                                500
                                                                              );
                                                                            animateArrowATPosition(
                                                                              669,
                                                                              256,
                                                                              360
                                                                            );
                                                                            document.getElementById(
                                                                              "dlc12"
                                                                            ).onclick =
                                                                              function () {
                                                                                myStopFunction();
                                                                                document.getElementById(
                                                                                  "dlc12"
                                                                                ).checked = true;
                                                                                document.getElementById(
                                                                                  "prmpt2"
                                                                                ).style.visibility =
                                                                                  "visible";
                                                                                document.getElementById(
                                                                                  "tabdl2"
                                                                                ).style.top =
                                                                                  "66px";
                                                                                document.getElementById(
                                                                                  "tabdl22"
                                                                                ).style.top =
                                                                                  "143px";
                                                                                myInt =
                                                                                  setInterval(
                                                                                    function () {
                                                                                      animatearrow();
                                                                                    },
                                                                                    500
                                                                                  );
                                                                                animateArrowATPosition(
                                                                                  546,
                                                                                  158.5,
                                                                                  90
                                                                                );
                                                                                document.getElementById(
                                                                                  "heading2"
                                                                                ).innerHTML =
                                                                                  "Give disable to log out rover.";
                                                                                document.getElementById(
                                                                                  "kbtn32"
                                                                                ).onclick =
                                                                                  function () {
                                                                                    myStopFunction();
                                                                                    document.getElementById(
                                                                                      "prmpt2"
                                                                                    ).style.visibility =
                                                                                      "hidden";
                                                                                    document.getElementById(
                                                                                      "tabdl2"
                                                                                    ).style.top =
                                                                                      "40px";
                                                                                    document.getElementById(
                                                                                      "tabdl12"
                                                                                    ).style.visibility =
                                                                                      "visible";
                                                                                    document.getElementById(
                                                                                      "tabdl22"
                                                                                    ).style.visibility =
                                                                                      "hidden";
                                                                                    document.getElementById(
                                                                                      "dlc2"
                                                                                    ).checked = false;
                                                                                    document.getElementById(
                                                                                      "dlc2"
                                                                                    ).disabled = true;
                                                                                    document.getElementById(
                                                                                      "nextButton"
                                                                                    ).style.visibility =
                                                                                      "visible";
                                                                                  };
                                                                              };
                                                                          };
                                                                      }
                                                                    };
                                                                };
                                                            }
                                                          };
                                                      }
                                                    };
                                                  };
                                                };
                                              };
                                            };
                                          };
                                        }
                                      };
                                    }
                                  };
                              };
                          }
                        };
                    }
                  };
                };
              }, 400);
            }, 300);
          };
        };
      };
    };
  } else if (simsubscreennum == 18) {
    const canvas17 = document.querySelector("#canvas17");
    canvas17.style.opacity = 0;
    document.querySelector(".map-note").classList.remove("menu-para");
    document.querySelector(".map-note").classList.add("note-flex");
  }
}

function nextCanvas() {
  document.getElementById("nextButton").style.visibility = "visible";
}
function nextCanvas1() {
  document.getElementById("can7-4").style.visibility = "visible";
  document.getElementById("can7-5").style.visibility = "visible";
  document.getElementById("note2").style.visibility = "visible";
  document.getElementById("nextButton").style.visibility = "visible";
}

//Typing effect
function typeWriter() {
  document.getElementById("status").style.visibility = "visible";
  if (i < txt.length) {
    document.getElementById("status").innerHTML += txt.charAt(i);
    i++;
    timer = setTimeout(typeWriter, speed);
  } else {
    i = 0;
    clearTimeout(timer);
    document.getElementById("nextButton").style.visibility = "visible";
  }
}

let tableContent = "";
function enableSatellite() {
  tableContent = `
  <table>
  <thead>
    <tr id="main-header">
    <th>GPS</th>
    <th>GLONASS</th>
    <th>Galileo</th>
    <th>BeiDou</th>
    <th>QZSS</th>
    <th>IRNSS</th>
    <th>SBAS</th>
    </tr>
    <tr id="next-header">
    <th>SV</th>
    <th>Enable</th>
    <th>SV</th>
    <th>Enable</th>
    <th>Ignore Health</th>
    <th>SV</th>
    <th>Enable</th>
    <th>Ignore Health</th>
     <th>SV</th>
    <th>Enable</th>
    <th>Ignore Health</th>
    </tr>
  </thead>
  <tbody>
  
  }
  </tbody>
  </table>
  `;
}

const headingResult = document.querySelector("#heading4");
const mapNote = document.querySelector(".map-note");
const menuInfos = document.querySelectorAll(".menu-i");
const menuDescs = document.querySelectorAll(".menu-para");
const menuOption = document.querySelector(".menu__options");
let blinking = 0;

menuInfos.forEach(function (menu) {
  menu.addEventListener("click", function (e) {
    e.stopPropagation();
  });
  menu.addEventListener("mouseover", function (e) {
    e.stopPropagation();
    const tab = e.target.dataset.tab;
    document.querySelector(`.menu-desc-${tab}`).classList.toggle("displayDesc");
  });
  menu.addEventListener("mouseout", function (e) {
    e.stopPropagation();
    const tab = e.target.dataset.tab;
    document.querySelector(`.menu-desc-${tab}`).classList.toggle("displayDesc");
  });
});
menuOption.addEventListener("click", function (e) {
  const clicked = e.target.closest(".menu-btn");
  if (!clicked) return;
  const opt = +e.target.dataset.opt;
  menuDescs.forEach((c, i) => {
    c.classList.remove("para-display");
  });
  document.querySelector(`.menu-data-${opt}`).classList.toggle("para-display");
  document.querySelector(`.menu-btn-${opt}`).disabled = true;
  document.querySelector(`.menu-btn-${opt}`).classList.remove("highlight");
  if (opt === 4 || opt === 6) {
    spotClose.classList.add("menu-para");
    mapNote.classList.remove("note-flex");
    mapNote.classList.add("menu-para");
  }
  if (opt === 3) {
    document.querySelector(".menu-content").classList.remove("menu-border");
  }
  if (opt != 3 && opt != 4 && opt != 6) {
    document
      .querySelector(`.menu-btn-${opt + 1}`)
      .classList.remove("menu-para");
    document.querySelector(`.menu-btn-${opt + 1}`).classList.add("highlight");
    document.querySelector(`.menu-btn-${opt + 1}`).disabled = false;
    headingResult.innerHTML = steps[opt - 1];
    if (opt === 5) {
      mapNote.classList.remove("note-flex");
      mapNote.classList.add("menu-para");
    } else {
      mapNote.classList.add("note-flex");
      mapNote.innerHTML = notes[opt - 1];
    }
  }
});

// Progress Bar

const uploadBtn = document.querySelector(".gcp-upload-btn");
const gcpProgress = document.querySelector(".gcp-progress");
uploadBtn.addEventListener("click", function () {
  uploadBtn.style.display = "none";
  gcpProgress.style.display = "block";
  let progressValue = 0;
  const progressBar = document.querySelector(".gcp-progress");
  document.querySelector(".span-upload").innerHTML = "Uploading...";
  const progressing = () => {
    progressBar.value = progressValue;
    progressValue++;
    if (progressValue > 100) {
      clearInterval(timerProgress);
      document.querySelector(".span-upload").innerHTML = "Upload Successful";
      headingResult.innerHTML = steps[2];
      setTimeout(function () {
        document.querySelector(".menu-data-3").innerHTML =
          '<img class="menu-content-img" src="images/aerial.JPG" alt="">';
        document.querySelector(`.menu-btn-4`).disabled = false;
        document.querySelector(`.menu-btn-4`).classList.remove("menu-para");
        document.querySelector(`.menu-btn-4`).classList.add("highlight");
        document.querySelector(".menu-content").classList.add("menu-border");

        mapNote.innerHTML = notes[2];
      }, 300);
    }
  };
  const timerProgress = setInterval(progressing, 20);
});

const gcpMarkers = document.querySelector(".menu-btn-4");
gcpMarkers.addEventListener("click", function () {
  let mark = 1;
  const displayMarkers = function () {
    document
      .querySelector(`.spot-marker-${mark}`)
      .classList.remove("menu-para");
    mark++;
    if (mark > 4) {
      clearInterval(markers);
      document.querySelector(".map-note").classList.remove("menu-para");
      mapNote.innerHTML = notes[3];
    }
  };
  const markers = setInterval(displayMarkers, 300);
});

// map show
const spotMarker = document.querySelectorAll(".spot-marker");
const spotImages = document.querySelectorAll(".spot-img");
const spotClose = document.querySelector(".spot-close");
const spotDots = document.querySelectorAll(".spot-dot");
const spotOverlay = document.querySelector(".spot-overlay");
spotMarker.forEach((spot) => {
  spot.addEventListener("click", function () {
    const spots = spot.dataset.mark;
    console.log(`spot-img-${spots}`);
    spotOverlay.classList.remove("menu-para");
    spotClose.classList.remove("menu-para");
    document.querySelector(`.spot-img-${spots}`).classList.remove("menu-para");
    document.querySelector(`.spot-dot-${spots}`).classList.remove("menu-para");
    headingResult.innerHTML = steps[3];
  });
});

const closeOverlay = function () {
  spotImages.forEach((imgs) => {
    imgs.classList.add("menu-para");
  });
  spotDots.forEach((dot) => {
    dot.classList.add("menu-para");
  });
  document.querySelector(`.spot-overlay`).classList.add("menu-para");
  document.querySelector(`.spot-close`).classList.add("menu-para");
};

spotClose.addEventListener("click", closeOverlay);
spotOverlay.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("spot-div") ||
    e.target.classList.contains("spot-overlay")
  )
    closeOverlay();
});

let spotArray = [];
spotDots.forEach(function (spot) {
  spot.addEventListener("click", function (e) {
    const dot = e.target.dataset.dot;
    const dt = [1, 2, 3, 4];
    if (dot) {
      spot.classList.remove("menu-para");
      spot.classList.add("mark-dot");
      const exists = spotArray.find((spot) => spot.dot === dot);
      if (!exists) {
        spotArray.push({
          dot: dot,
          marked: true,
        });
      }
      const marked = spotArray.map((s) => +s.dot);
      const unmarked = filteredArray(marked, dt);
      mapNote.classList.add("note-flex");
      mapNote.innerHTML =
        unmarked.length > 0
          ? `Pending GCP to be marked:`
          : `Proceed to reoptimization`;
      if (unmarked.length != 0) {
        unmarked.forEach((u) => {
          mapNote.innerHTML += unmarked.length > 1 ? `${u}, ` : `${u}`;
        });
      }
    }
    if (spotArray.length === 4) {
      document.querySelector(`.menu-btn-5`).disabled = false;
      document.querySelector(`.menu-btn-5`).classList.add("highlight");
      document.querySelector(`.menu-btn-5`).classList.remove("menu-para");
      document.querySelector(".map-note").classList.add("menu-para");
      document.querySelector(`.spot-close`).classList.add("menu-para");

      mapNote.classList.remove("note-flex");
      mapNote.classList.add("menu-para");
    }
  });
});

// ar1: marked(short) ar2: (full sample): returns unmarked points
const filteredArray = function (ar1, ar2) {
  ar1.forEach(function (m) {
    ar2.forEach(function (d) {
      if (m == d) {
        ar2.splice(ar2.indexOf(m), 1);
      }
    });
  });
  return ar2;
};

const orthoMap = document.querySelector(".menu-btn-6");
orthoMap.addEventListener("click", function () {
  document.querySelector(".menu-radio").classList.remove("menu-para");
  document.querySelector(".menu-radio").classList.add("flex-display");
  document.querySelector(".menu").classList.add("menu-modified");
  document.querySelector(".menu").classList.remove("menu");
  document.querySelector(".menu__options").classList.add("menu-para");
  document.querySelector(".last-step").classList.add("menu-para");
  document.querySelector(".last-circle").classList.add("menu-para");
  headingResult.classList.add("menu-para");
  document.querySelector(".end-heading").classList.remove("menu-para");
});

const finalMap = document.querySelector(".menu-content-img-6");
document.querySelector(".menu--dem").addEventListener("click", function () {
  document.querySelector(".end-heading").innerHTML = "DEM";
  finalMap.src = "images/dem.JPG";
});
document.querySelector(".menu--ortho").addEventListener("click", function () {
  document.querySelector(".end-heading").innerHTML = "Orthomosaic Map";
  finalMap.src = "images/ortho.JPG";
});
