var released = 1;
var v = 0;
function navNext() {
  for (temp = 0; temp <= 13; temp++) {
    document.getElementById("canvas" + temp).style.visibility = "hidden";
  }
  simsubscreennum += 1;
  document.getElementById("canvas" + simsubscreennum).style.visibility =
    "visible";
  document.getElementById("nextButton").style.visibility = "hidden";
  magic();
}
let checkCount = 0;
function animatearrow() {
  if (document.getElementById("arrow1").style.visibility == "hidden")
    document.getElementById("arrow1").style.visibility = "visible";
  else document.getElementById("arrow1").style.visibility = "hidden";
}
function myStopFunction() {
  clearInterval(myInt);
  document.getElementById("arrow1").style.visibility = "hidden";
}

function magic() {
  if (simsubscreennum == 1) {
    myInt = setInterval(function () {
      animatearrow();
    }, 500);
    document.getElementById("arrow1").style =
      "visibility:visible; left:372px; top:291px; position:absolute; height:30px;";
    document.getElementById("arrow1").style.WebkitTransform = "rotate(90deg)";
    document.getElementById("arrow1").style.msTransform = "rotate(90deg)";
    document.getElementById("arrow1").style.transform = "rotate(90deg)";
    document.getElementById("1-1a").onclick = function () {
      myStopFunction();
      document.getElementById("1-1a").onclick = "";
      document.getElementById("1-1a").style.visibility = "hidden";
      document.getElementById("1-1a").style.visibility = "visible";
      document.getElementById("1-1a").style.transformOrigin = "83% 51%";
      document.getElementById("1-1a").style.animation = "antena1 1.5s forwards";
      setTimeout(function () {
        myInt = setInterval(function () {
          animatearrow();
        }, 500);
        document.getElementById("arrow1").style =
          "visibility:visible; left:372px; top:291px; position:absolute;height:30px;";
        document.getElementById("arrow1").style.WebkitTransform =
          "rotate(90deg)";
        document.getElementById("arrow1").style.msTransform = "rotate(90deg)";
        document.getElementById("arrow1").style.transform = "rotate(90deg)";
        document.getElementById("1-1b").style.visibility = "visible";
        document.getElementById("1-1b").onclick = function () {
          myStopFunction();
          document.getElementById("1-1b").onclick = "";
          document.getElementById("1-1b").style.visibility = "visible";
          document.getElementById("1-1b").style.transformOrigin = "13% 9%";
          document.getElementById("1-1b").style.animation =
            "antena2 1.5s forwards";
          setTimeout(function () {
            document.getElementById("nextButton").style.visibility = "visible";
          }, 1500);
        };
      }, 1500);
    };
  } else if (simsubscreennum == 2) {
    document.getElementById("1-1a").style.visibility = "hidden";
    document.getElementById("1-1b").style.visibility = "hidden";
    myInt = setInterval(function () {
      animatearrow();
    }, 500);
    document.getElementById("arrow1").style =
      "visibility:visible; left:649px; top:101px; position:absolute;height:30px;";
    document.getElementById("arrow1").style.WebkitTransform = "rotate(-90deg)";
    document.getElementById("arrow1").style.msTransform = "rotate(-90deg)";
    document.getElementById("arrow1").style.transform = "rotate(-90deg)";
    document.getElementById("2-2").style.visibility = "visible";
    document.getElementById("2-2").onclick = function () {
      myStopFunction();
      document.getElementById("2-2").onclick = "";
      document.getElementById("2-2").style.transformOrigin = "16% 11%";
      document.getElementById("2-2").style.animation = "movehand 2.5s forwards";
      setTimeout(function () {
        document.getElementById("2-1").style.visibility = "hidden";
        document.getElementById("2-2").style.visibility = "hidden";
        setTimeout(function () {});
        // document.getElementById('2-3').style.visibility="visible";
        myInt = setInterval(function () {
          animatearrow();
        }, 500);
        document.getElementById("arrow1").style =
          "visibility:visible; left:649px; top:101px; position:absolute;height:30px;";
        document.getElementById("arrow1").style.WebkitTransform =
          "rotate(-90deg)";
        document.getElementById("arrow1").style.msTransform = "rotate(-90deg)";
        document.getElementById("arrow1").style.transform = "rotate(-90deg)";
        document.getElementById("2-3").style.visibility = "visible";
        document.getElementById("2-4").style.visibility = "visible";
        document.getElementById("2-4").onclick = function () {
          myStopFunction();
          document.getElementById("2-4").onclick = "";
          document.getElementById("2-4").style.visibility = "visible";
          document.getElementById("2-4").style.transformOrigin = "16% 11%";
          document.getElementById("2-4").style.animation = "ipad 2s forwards";
          setTimeout(function () {
            myInt = setInterval(function () {
              animatearrow();
            }, 500);
            document.getElementById("arrow1").style =
              "visibility:visible; left:117px; top:206px; position:absolute;height:30px;";
            document.getElementById("arrow1").style.WebkitTransform =
              "rotate(-178deg)";
            document.getElementById("arrow1").style.msTransform =
              "rotate(-178deg)";
            document.getElementById("arrow1").style.transform =
              "rotate(-178deg)";
            document.getElementById("2-4a").style.visibility = "visible";
            document.getElementById("2-4a").onclick = function () {
              myStopFunction();
              document.getElementById("2-4a").onclick = "";
              document.getElementById("2-4a").style.transformOrigin = "16% 11%";
              document.getElementById("2-4a").style.animation =
                "ipadfix 2s forwards";
              document.getElementById("2-4").style.visibility = "hidden";
              setTimeout(function () {
                document.getElementById("nextButton").style.visibility =
                  "visible";
              }, 2000);
            };
          }, 2000);
        };
      }, 2500);
    };
  } else if (simsubscreennum == 3) {
    document.getElementById("2-3").style.visibility = "hidden";
    document.getElementById("2-4a").style.visibility = "hidden";
    myInt = setInterval(function () {
      animatearrow();
    }, 500);
    document.getElementById("arrow1").style =
      "visibility:visible; left:42px; top:342px; position:absolute;height:30px;";
    document.getElementById("arrow1").style.WebkitTransform = "rotate(180deg)";
    document.getElementById("arrow1").style.msTransform = "rotate(180deg)";
    document.getElementById("arrow1").style.transform = "rotate(180deg)";
    // document.getElementById('3-4').style.visibility="visible";
    document.getElementById("3-4").onclick = function () {
      myStopFunction();
      document.getElementById("3-4").onclick = "";
      document.getElementById("3-1").style.visibility = "visible";
      document.getElementById("3-2").style.visibility = "visible";
      document.getElementById("3-2").style.transformOrigin = "16% 11%";
      document.getElementById("3-2").style.animation = "battery 2.5s forwards";
      setTimeout(function () {
        document.getElementById("3-1").style.visibility = "hidden";
        document.getElementById("3-2").style.visibility = "hidden";
        document.getElementById("3-3").style.visibility = "visible";
        // myInt=setInterval(function(){animatearrow();},500);
        // document.getElementById('arrow1').style="visibility:visible; left:254px; top:272px; position:absolute;height:30px;";
        // document.getElementById('arrow1').style.WebkitTransform="rotate(-180deg)";
        // document.getElementById('arrow1').style.msTransform="rotate(-180deg)";
        // document.getElementById('arrow1').style.transform="rotate(-180deg)";
        // document.getElementById('3-3').style.visibility="visible";
        // document.getElementById('3-3').onclick=function(){
        // 	myStopFunction();
        // 	document.getElementById('3-3').onclick="";
        // 	document.getElementById('3-3').style.transformOrigin="16% 11%";
        // 	document.getElementById('3-3').style.animation="batteryset 1s forwards";
        setTimeout(function () {
          document.getElementById("p1-1").style.visibility = "visible";
          document.getElementById("p1-2").style.visibility = "visible";
          document.getElementById("3-4").style.visibility = "visible";
          document.getElementById("nextButton").style.visibility = "visible";
        }, 1000);
      }, 2500);
    };
  } else if (simsubscreennum == 4) {
    document.getElementById("3-3").style.visibility = "hidden";
    document.getElementById("3-4").style.visibility = "hidden";
    document.getElementById("p1-1").style.visibility = "hidden";
    document.getElementById("p1-2").style.visibility = "hidden";
    myInt = setInterval(function () {
      animatearrow();
    }, 500);
    document.getElementById("arrow1").style =
      "visibility:visible; left:227px; top:303px; position:absolute;height:30px;";
    document.getElementById("arrow1").style.WebkitTransform = "rotate(-90deg)";
    document.getElementById("arrow1").style.msTransform = "rotate(-90deg)";
    document.getElementById("arrow1").style.transform = "rotate(-90deg)";
    // document.getElementById('4-1a').style.visibility="visible";
    document.getElementById("4-1a").onclick = function () {
      myStopFunction();
      document.getElementById("4-1a").onclick = "";
      document.getElementById("4-1a").style.visibility = "hidden";
      document.getElementById("4-2a").style.visibility = "visible";

      myInt = setInterval(function () {
        animatearrow();
      }, 500);
      document.getElementById("arrow1").style =
        "visibility:visible; left:369px; top:303px; position:absolute;height:30px;";
      document.getElementById("arrow1").style.WebkitTransform =
        "rotate(-90deg)";
      document.getElementById("arrow1").style.msTransform = "rotate(-90deg)";
      document.getElementById("arrow1").style.transform = "rotate(-90deg)";
      // document.getElementById('4-1a').style.visibility="visible";
      document.getElementById("4-1b").onclick = function () {
        myStopFunction();
        document.getElementById("4-1b").onclick = "";
        document.getElementById("4-1b").style.visibility = "hidden";
        document.getElementById("4-2b").style.visibility = "visible";

        myInt = setInterval(function () {
          animatearrow();
        }, 500);
        document.getElementById("arrow1").style =
          "visibility:visible; left:503px; top:309px; position:absolute;height:30px;";
        document.getElementById("arrow1").style.WebkitTransform =
          "rotate(-90deg)";
        document.getElementById("arrow1").style.msTransform = "rotate(-90deg)";
        document.getElementById("arrow1").style.transform = "rotate(-90deg)";
        // document.getElementById('4-1a').style.visibility="visible";
        document.getElementById("4-1c").onclick = function () {
          myStopFunction();
          document.getElementById("4-1c").onclick = "";
          document.getElementById("4-1c").style.visibility = "hidden";
          document.getElementById("4-2c").style.visibility = "visible";

          myInt = setInterval(function () {
            animatearrow();
          }, 500);
          document.getElementById("arrow1").style =
            "visibility:visible; left:366px; top:233px; position:absolute;height:30px;";
          document.getElementById("arrow1").style.WebkitTransform =
            "rotate(-90deg)";
          document.getElementById("arrow1").style.msTransform =
            "rotate(-90deg)";
          document.getElementById("arrow1").style.transform = "rotate(-90deg)";
          document.getElementById("4-1").onclick = function () {
            myStopFunction();
            document.getElementById("4-1").onclick = "";
            document.getElementById("4-1").style.visibility = "hidden";
            document.getElementById("4-2a").style.visibility = "hidden";
            document.getElementById("4-2b").style.visibility = "hidden";
            document.getElementById("4-2c").style.visibility = "hidden";
            document.getElementById("4-3").style.visibility = "visible";
            document.getElementById("4-4").style.visibility = "visible";

            myInt = setInterval(function () {
              animatearrow();
            }, 500);
            document.getElementById("arrow1").style =
              "visibility:visible; left:170px; top:295px; position:absolute;height:30px;";
            document.getElementById("arrow1").style.WebkitTransform =
              "rotate(180deg)";
            document.getElementById("arrow1").style.msTransform =
              "rotate(180deg)";
            document.getElementById("arrow1").style.transform =
              "rotate(180deg)";
            document.getElementById("4-4").onclick = function () {
              myStopFunction();
              document.getElementById("4-4").onclick = "";
              document.getElementById("4-4").style.animation =
                "zoomOutDrone1 1s forwards";
              document.getElementById("4-3").style.animation =
                "zoomOutDrone 1s forwards";

              // document.getElementById('4-4').style.visibility="visible";
              document.getElementById("4-5").style.animation =
                "takedrone 3s forwards";
              document.getElementById("4-3").style.visibility = "hidden";
              // document.getElementById('4-4').style.visibility="hidden";
              document.getElementById("4-5").style.visibility = "visible";
              setTimeout(function () {
                document.getElementById("nextButton").style.visibility =
                  "visible";
              }, 3000);
            };
          };
        };
      };
    };
  } else if (simsubscreennum == 5) {
    document.getElementById("4-5").style.visibility = "hidden";

    myInt = setInterval(function () {
      animatearrow();
    }, 500);
    document.getElementById("arrow1").style =
      "visibility:visible; left:296px; top:135px; position:absolute;height:30px;";
    document.getElementById("arrow1").style.WebkitTransform = "rotate(-180deg)";
    document.getElementById("arrow1").style.msTransform = "rotate(-180deg)";
    document.getElementById("arrow1").style.transform = "rotate(-180deg)";
    document.getElementById("5-3").onclick = function () {
      myStopFunction();
      document.getElementById("5-3").onclick = "";
      document.getElementById("5-3").style.transformOrigin = "40% 98%";
      document.getElementById("5-3").style.animation = "arm1 2s forwards";

      setTimeout(function () {
        document.getElementById("5-3").style.visibility = "hidden";
        document.getElementById("5-a").style.visibility = "visible";
        document.getElementById("5-4").style.visibility = "visible";

        myInt = setInterval(function () {
          animatearrow();
        }, 500);
        document.getElementById("arrow1").style =
          "visibility:visible; left:261px; top:196px; position:absolute;height:30px;";
        document.getElementById("arrow1").style.WebkitTransform =
          "rotate(-180deg)";
        document.getElementById("arrow1").style.msTransform = "rotate(-180deg)";
        document.getElementById("arrow1").style.transform = "rotate(-180deg)";
        document.getElementById("5-4").onclick = function () {
          myStopFunction();
          document.getElementById("5-4").onclick = "";
          document.getElementById("5-4").style.transformOrigin = "-9% 84%";
          document.getElementById("5-4").style.animation =
            "armtight1 2s forwards";
          setTimeout(function () {
            myInt = setInterval(function () {
              animatearrow();
            }, 500);
            document.getElementById("arrow1").style =
              "visibility:visible; left:433px; top:160px; position:absolute;height:30px;";
            document.getElementById("arrow1").style.WebkitTransform =
              "rotate(0deg)";
            document.getElementById("arrow1").style.msTransform =
              "rotate(0deg)";
            document.getElementById("arrow1").style.transform = "rotate(0deg)";
            document.getElementById("5-3a").onclick = function () {
              myStopFunction();
              document.getElementById("5-3a").onclick = "";
              document.getElementById("5-3a").style.transformOrigin = "46% 89%";
              document.getElementById("5-3a").style.animation =
                "arm2 2s forwards";
              setTimeout(function () {
                document.getElementById("5-3a").style.visibility = "hidden";
                document.getElementById("5-b").style.visibility = "visible";
                document.getElementById("5-4a").style.visibility = "visible";

                myInt = setInterval(function () {
                  animatearrow();
                }, 500);
                document.getElementById("arrow1").style =
                  "visibility:visible; left:467px; top:196px; position:absolute;height:30px;";
                document.getElementById("arrow1").style.WebkitTransform =
                  "rotate(-360deg)";
                document.getElementById("arrow1").style.msTransform =
                  "rotate(-360deg)";
                document.getElementById("arrow1").style.transform =
                  "rotate(-360deg)";
                document.getElementById("5-4a").onclick = function () {
                  myStopFunction();
                  document.getElementById("5-4a").onclick = "";
                  document.getElementById("5-4a").style.transformOrigin =
                    "16% 11%";
                  document.getElementById("5-4a").style.animation =
                    "armtight2 2s forwards";

                  setTimeout(function () {
                    document.getElementById("dialog1").style.visibility =
                      "visible";
                    document.getElementById("divp1").style.visibility =
                      "visible";
                  }, 2000);
                };
              }, 2000);
            };
          }, 2000);
        };
      }, 2000);
    };
  } else if (simsubscreennum == 6) {
    document.getElementById("5-5").style.visibility = "hidden";
    myInt = setInterval(function () {
      animatearrow();
    }, 500);
    document.getElementById("arrow1").style =
      "visibility:visible; left:682px; top:148px; position:absolute;height:30px;";
    document.getElementById("arrow1").style.WebkitTransform = "rotate(-90deg)";
    document.getElementById("arrow1").style.msTransform = "rotate(-90deg)";
    document.getElementById("arrow1").style.transform = "rotate(-90deg)";
    document.getElementById("6-2").onclick = function () {
      myStopFunction();
      document.getElementById("6-2").onclick = "";
      document.getElementById("6-3a").style.visibility = "visible";
      document.getElementById("6-3a").style.transformOrigin = "48% 54%";
      document.getElementById("6-3a").style.animation =
        "moveblade 2s 1 forwards";
      setTimeout(function () {
        document.getElementById("6-3a").style.visibility = "hidden";
        document.getElementById("6-3aa").style.visibility = "visible";
        document.getElementById("6-3b").style.visibility = "visible";
        document.getElementById("6-3b").style.transformOrigin = "48% 54%";
        document.getElementById("6-3b").style.animation =
          "moveblade1 2s 1 forwards";
        setTimeout(function () {
          document.getElementById("6-3b").style.visibility = "hidden";
          document.getElementById("6-3bb").style.visibility = "visible";
          document.getElementById("6-3c").style.visibility = "visible";
          document.getElementById("6-3c").style.transformOrigin = "48% 54%";
          document.getElementById("6-3c").style.animation =
            "moveblade2 2s 1 forwards";
          setTimeout(function () {
            document.getElementById("6-2").style.visibility = "hidden";
            document.getElementById("6-3c").style.visibility = "hidden";
            document.getElementById("6-3cc").style.visibility = "visible";
            document.getElementById("6-3d").style.visibility = "visible";
            document.getElementById("6-3d").style.transformOrigin = "48% 54%";
            document.getElementById("6-3d").style.animation =
              "moveblade3 2s 1 forwards";
            setTimeout(function () {
              document.getElementById("6-3dd").style.visibility = "visible";
              document.getElementById("6-3d").style.visibility = "hidden";

              document.getElementById("nextButton").style.visibility =
                "visible";
            }, 2000);
          }, 2000);
        }, 2000);
      }, 2000);
    };
  } else if (simsubscreennum == 7) {
    document.getElementById("6-3aa").style.visibility = "hidden";
    document.getElementById("6-3bb").style.visibility = "hidden";
    document.getElementById("6-3cc").style.visibility = "hidden";
    document.getElementById("6-3dd").style.visibility = "hidden";

    myInt = setInterval(function () {
      animatearrow();
    }, 500);
    document.getElementById("arrow1").style =
      "visibility:visible; left:108px; top:279px; position:absolute;height:30px;";
    document.getElementById("arrow1").style.WebkitTransform = "rotate(-90deg)";
    document.getElementById("arrow1").style.msTransform = "rotate(-90deg)";
    document.getElementById("arrow1").style.transform = "rotate(-90deg)";
    document.getElementById("7-1").onclick = function () {
      myStopFunction();
      document.getElementById("7-1").onclick = "";
      document.getElementById("7-1").style.visibility = "visible";
      document.getElementById("7-1").style.transformOrigin = "33% 54%";
      document.getElementById("7-1").style.animation =
        "moveBattery 2s forwards";
      setTimeout(function () {
        document.getElementById("7-1").style.visibility = "hidden";
        document.getElementById("7-2").style.visibility = "hidden";
        document.getElementById("7-4").style.visibility = "visible";
        setTimeout(function () {
          document.getElementById("dialog2").style.visibility = "visible";
          document.getElementById("divp2").style.visibility = "visible";
        });
      }, 2000);
    };
  } else if (simsubscreennum == 8) {
    document.getElementById("7-4").style.visibility = "hidden";
    document.getElementById("dialog").style.visibility = "visible";
    document.getElementById("divp").style.visibility = "visible";
    document.getElementById("8-1").onclick = function () {
      document.getElementById("8-2").style.visibility = "visible";
      document.getElementById("dialog").style.visibility = "hidden";
      document.getElementById("divp").style.visibility = "hidden";
      myInt = setInterval(function () {
        animatearrow();
      }, 500);
      document.getElementById("arrow1").style =
        "visibility:visible; left:357px; top:181px; position:absolute;height:30px;";
      document.getElementById("arrow1").style.WebkitTransform =
        "rotate(-90deg)";
      document.getElementById("arrow1").style.msTransform = "rotate(-90deg)";
      document.getElementById("arrow1").style.transform = "rotate(-90deg)";
      document.getElementById("8-2").onclick = function () {
        myStopFunction();
        document.getElementById("8-2").onclick = "";
        document.getElementById("8-2").style.visibility = "hidden";
        document.getElementById("8-3").style.animation = "openland 1s forwards";
        document.getElementById("8-3").style.visibility = "visible";
        setTimeout(function () {
          document.getElementById("8-3").style.animation =
            "openland2 1s forwards";
          setTimeout(function () {
            document.getElementById("8-4").style.visibility = "visible";
            document.getElementById("8-3").style.visibility = "hidden";

            myInt = setInterval(function () {
              animatearrow();
            }, 500);
            document.getElementById("arrow1").style =
              "visibility:visible; left:392px; top:206px; position:absolute;height:30px;";
            document.getElementById("arrow1").style.WebkitTransform =
              "rotate(-90deg)";
            document.getElementById("arrow1").style.msTransform =
              "rotate(-90deg)";
            document.getElementById("arrow1").style.transform =
              "rotate(-90deg)";
            document.getElementById("8-4").onclick = function () {
              myStopFunction();
              document.getElementById("8-5").style.visibility = "visible";
              document.getElementById("8-5").style.transform = "rotateX(60deg)";
              document.getElementById("8-4").style.visibility = "hidden";
              document.getElementById("8-6").style.visibility = "visible";
              myInt = setInterval(function () {
                animatearrow();
              }, 500);
              document.getElementById("arrow1").style =
                "visibility:visible; left:189px; top:264px; position:absolute;height:30px;";
              document.getElementById("arrow1").style.WebkitTransform =
                "rotate(-90deg)";
              document.getElementById("arrow1").style.msTransform =
                "rotate(-90deg)";
              document.getElementById("arrow1").style.transform =
                "rotate(-90deg)";
              document.getElementById("8-6").onclick = function () {
                myStopFunction();
                document.getElementById("8-6").onclick = "";
                document.getElementById("8-6").style.animation =
                  "dronemove2 2s forwards";
                setTimeout(function () {
                  document.getElementById("8-6").style.animation =
                    "moveleft 1s forwards";
                  document.getElementById("8-5").style.animation =
                    "moveleft1 1s forwards";
                  document.getElementById("nextButton").style.visibility =
                    "visible";
                }, 2000);
              };
            };
          }, 1000);
        }, 1000);
      };
    };
  } else if (simsubscreennum == 9) {
    document.getElementById("8-5").style.visibility = "hidden";
    document.getElementById("8-6").style.visibility = "hidden";
    document.getElementById("9-1").style.visibility = "visible";
    document.getElementById("9-2").style.visibility = "visible";
    myInt = setInterval(function () {
      animatearrow();
    }, 500);
    document.getElementById("arrow1").style =
      "visibility:visible; left:104px; top:289px; position:absolute;height:30px;";
    document.getElementById("arrow1").style.WebkitTransform = "rotate(-90deg)";
    document.getElementById("arrow1").style.msTransform = "rotate(-90deg)";
    document.getElementById("arrow1").style.transform = "rotate(-90deg)";
    document.getElementById("9-2").onclick = function () {
      myStopFunction();
      document.getElementById("9-2").onclick = "";
      document.getElementById("9-2").style.animation =
        "movecameraHand 2s forwards";
      setTimeout(function () {
        // document.getElementById("9-2").style.visibility="hidden";
        document.getElementById("9-5").style.visibility = "visible";
        document.getElementById("9-5a").style.visibility = "visible";
        // document.getElementById("9-5d").style.visibility="visible";
        document.getElementById("9-5c").style.visibility = "visible";
        // document.getElementById("9-5b").style.transformOrigin = "48% 54%";
        // document.getElementById("9-5b").style.animation ="knobHand 2s 1 forwards";
        setTimeout(function () {
          // document.getElementById('9-5b').style.visibility="hidden";
          document.getElementById("9-5c").style.transformOrigin = "48% 54%";
          document.getElementById("9-5c").style.animation =
            "knobHand1 2s forwards";
          setTimeout(function () {
            document.getElementById("9-5c").style.visibility = "hidden";
            document.getElementById("9-2").style.visibility = "hidden";
            document.getElementById("dialog3").style.visibility = "visible";
            document.getElementById("divp3").style.visibility = "visible";
            document.getElementById("9-6").onclick = function () {
              myStopFunction();
              document.getElementById("9-6").onclick = "";
              document.getElementById("9-6").style.animation =
                "moveCamera 2s forwards";
              setTimeout(function () {
                document.getElementById("9-6A").style.visibility = "visible";
                setTimeout(function () {
                  document.getElementById("9-6A").style.transformOrigin =
                    "48% 54%";
                  document.getElementById("9-6A").style.animation =
                    "camhand1 2s forwards";
                  setTimeout(function () {
                    document.getElementById("9-6A").style.visibility = "hidden";
                    document.getElementById("9-5a").style.visibility = "hidden";
                    document.getElementById("9-6").style.visibility = "hidden";
                    document.getElementById("9-1").style.visibility = "hidden";
                    document.getElementById("9-5").style.visibility = "hidden";
                    document.getElementById("9-3").style.visibility = "hidden";
                    document.getElementById("9-7").style.visibility = "visible";
                  }, 2000);
                });

                // setTimeout(function(){
                //
                // 	// document.getElementById('9-6').style.visibility="hidden";
                // 	// document.getElementById('9-6').style.visibility="hidden";
                // },2000);
                // document.getElementById('9-5b').style.visibility="visible";

                // document.getElementById('9-5b').style.visibility="hidden";
                document.getElementById("nextButton").style.visibility =
                  "visible";
              }, 2000);
            };
            // })
          }, 2000);
        });
      }, 2000);
    };
  } else if (simsubscreennum == 10) {
    document.getElementById("9-7").style.visibility = "hidden";
    // document.getElementById('nextButton').style.visibility="visible";
    // document.getElementById('9-5c').style.visibility="hidden";
    // document.getElementById("5-4").style.visibility = "hidden";
    // document.getElementById("5-5").style.visibility = "hidden";
    document.getElementById("7-1-1").style.visibility = "visible";
    // document.getElementById("7-1-4").style.visibility = "visible";
    document.getElementById("7-1-3").style.visibility = "visible";

    myInt = setInterval(function () {
      animatearrow();
    }, 500);
    document.getElementById("arrow1").style =
      "visibility:visible; position:absolute; left:376px; top:514px; height:40px; z-index:10;";
    document.getElementById("arrow1").style.WebkitTransform = "rotate(0deg)";
    document.getElementById("arrow1").style.msTransform = "rotate(0deg)";
    document.getElementById("arrow1").style.transform = "rotate(0deg)";
    setTimeout(function () {
      document.getElementById("7-1-3").onclick = function () {
        myStopFunction();
        document.getElementById("7-1-3").onclick = "";
        document.getElementById("7-1-3").style.animation =
          "moveHand 1s forwards";
        setTimeout(function () {
          document.getElementById("7-1-3").style.visibility = "hidden";
          document.getElementById("7-1-1").style.animation =
            "zoomin 1s forwards";
          document.getElementById("7-1-4").style.animation =
            "zoominipad 1s forwards";
          setTimeout(function () {
            document.getElementById("7-1-4").style.visibility = "visible";
            document.getElementById("tab").style.visibility = "visible";
            document.getElementById("7-1-2").style.visibility = "visible";
            document.getElementById("7-1-7").style.visibility = "visible";
            document.getElementById("7-1-8").style.visibility = "visible";
            document.getElementById("tab2").style.visibility = "visible";
            document.getElementById("plan").onclick = function () {
              document.getElementById("fh").disabled = false;
            };
            //change1();
            document.getElementById("7-a").onclick = function () {
              let value = document.getElementById("fh").value;
              if (document.getElementById("7-a").checked) {
                document.getElementById("7-aa").style.visibility = "visible";
                switch (value) {
                  case "50":
                    acre();
                    document.getElementById("7-1-2").style.visibility =
                      "hidden";
                    document.getElementById("7-1-5").style.visibility =
                      "hidden";
                    document.getElementById("7-1-9").style.visibility =
                      "visible";
                    document.getElementById("7-1-10").style.visibility =
                      "hidden";
                    document.getElementById("7-1-6").style.visibility =
                      "visible";

                    document.getElementById("sub1").disabled = false;
                    document.getElementById("sub1").onclick = function () {
                      document.getElementById("7-1-6").style.animation =
                        "movearrow 30s forwards";
                      move();
                      document.getElementById("7-6a").style.visibility =
                        "visible";
                      document.getElementById("sub1").disabled = true;
                      document.getElementById("fh").disabled = true;
                      document.getElementById("num-1").style.visibility =
                        "visible";
                      document.getElementById("num-2").style.visibility =
                        "visible";
                      document.getElementById("handleCount").style.visibility =
                        "visible";
                      document.getElementById("num-3").style.visibility =
                        "visible";
                      setTimeout(function () {
                        // var u = document.getElementById("upload");
                        // u.disabled = false;

                        document.getElementById("note1").style.visibility =
                          "visible";
                        document.getElementById("fh").disabled = false;
                        document.getElementById("divi7").style.visibility =
                          "visible";

                        document.getElementById("8-1").style.visibility =
                          "visible";
                        document.getElementById("fh").disabled = false;
                        document.getElementById("upload").disabled = false;
                        document.getElementById("fh").disabled = true;
                        document.getElementById("7-6a").style.visibility =
                          "hidden";
                        document.getElementById("7-1-6").style.visibility =
                          "hidden";

                        document.getElementById("upload").onclick =
                          function () {
                            // document.getElementById("7-1-1").style.animation = "spin 1s forwards";
                            // setTimeout(function(){
                            // 	fun();
                            // },1000)
                            // function fun(){
                            // 	$('#loader').addClass("hide-loader");
                            // }

                            if (document.getElementById("upload").checked) {
                              document.getElementById(
                                "7-1-9"
                              ).style.visibility = "hidden";
                              document.getElementById(
                                "7-1-11"
                              ).style.visibility = "visible";
                              document.getElementById("plan").disabled = true;
                              document.getElementById("sub1").disabled = true;
                              document.getElementById("out1").style.visibility =
                                "visible";
                              document.getElementById(
                                "output1"
                              ).style.visibility = "visible";
                              document.getElementById("10-4").style.visibility =
                                "visible";
                              document.getElementById("10-1").style.visibility =
                                "visible";
                              document.getElementById(
                                "7-1-2"
                              ).style.visibility = "hidden";
                              document.getElementById(
                                "7-1-5"
                              ).style.visibility = "hidden";
                              document.getElementById(
                                "7-1-6"
                              ).style.visibility = "hidden";
                              // document.getElementById("7-6a").style.visibility="hidden";

                              //   document.getElementById("10-4").style.visibility = "visible";
                              //   document.getElementById("10-1").style.visibility = "visible";
                              //   document.getElementById("7-1-6").style.visibility = "hidden";
                              document.getElementById("10-1").onclick =
                                function () {
                                  // $('#loader').addClass("hide-loader");
                                  document.getElementById(
                                    "10-1"
                                  ).style.visibility = "hidden";
                                  document.getElementById(
                                    "7-1-11"
                                  ).style.visibility = "hidden";
                                  document.getElementById(
                                    "10-4"
                                  ).style.visibility = "hidden";
                                  document.getElementById(
                                    "10-2"
                                  ).style.visibility = "visible";
                                  move3();
                                  // document.getElementById("loader").style.animation = "loader 1s forwards";
                                  setTimeout(function () {
                                    document.getElementById(
                                      "l1"
                                    ).style.visibility = "visible";
                                    document.getElementById(
                                      "up1"
                                    ).style.visibility = "visible";
                                    document.getElementById(
                                      "fh"
                                    ).disabled = false;
                                    document.getElementById(
                                      "out1"
                                    ).style.visibility = "hidden";
                                    document.getElementById(
                                      "output1"
                                    ).style.visibility = "hidden";
                                    document.getElementById(
                                      "l1"
                                    ).style.visibility = "hidden";
                                    document.getElementById(
                                      "next1"
                                    ).style.visibility = "visible";
                                    document.getElementById("next1").onclick =
                                      function () {
                                        document.getElementById(
                                          "form1"
                                        ).style.visibility = "hidden";
                                        document.getElementById(
                                          "tab3"
                                        ).style.visibility = "visible";
                                        document.getElementById(
                                          "7-aa"
                                        ).style.visibility = "hidden";
                                        document.getElementById(
                                          "sub1"
                                        ).style.visibility = "hidden";
                                        document.getElementById(
                                          "handleCount"
                                        ).style.visibility = "hidden";
                                        document.getElementById(
                                          "num-3"
                                        ).style.visibility = "hidden";
                                        document.getElementById(
                                          "10-2"
                                        ).style.visibility = "hidden";
                                        document.getElementById(
                                          "up1"
                                        ).style.visibility = "hidden";
                                        document.getElementById(
                                          "7-1-4"
                                        ).style.visibility = "hidden";
                                        document.getElementById(
                                          "tab"
                                        ).style.visibility = "hidden";
                                        document.getElementById(
                                          "7-1-7"
                                        ).style.visibility = "hidden";
                                        document.getElementById(
                                          "7-1-8"
                                        ).style.visibility = "hidden";
                                        document.getElementById(
                                          "8-1-1"
                                        ).style.visibility = "visible";
                                        document.getElementById(
                                          "8-1-5"
                                        ).style.visibility = "visible";
                                      };
                                    // fun();
                                  }, 2000);
                                };
                            } else {
                              document.getElementById("out1").style.visibility =
                                "hidden";
                              document.getElementById(
                                "output1"
                              ).style.visibility = "hidden";
                              document.getElementById("l1").style.visibility =
                                "hidden";
                              document.getElementById("load").style.visibility =
                                "hidden";
                              document.getElementById("up1").style.visibility =
                                "hidden";
                              document.getElementById(
                                "next1"
                              ).style.visibility = "hidden";
                              document.getElementById("plan").disabled = false;
                              document.getElementById(
                                "7-1-11"
                              ).style.visibility = "hidden";
                              //   document.getElementById("up1").style.visibility = "hidden";
                              document.getElementById("10-2").style.visibility =
                                "hidden";
                              document.getElementById(
                                "handleCount"
                              ).style.visibility = "hidden";
                              document.getElementById("out1").style.visibility =
                                "hidden";
                              document.getElementById(
                                "output1"
                              ).style.visibility = "hidden";
                            }
                          };
                      }, 30000);
                    };
                    break;
                  case "60":
                    document.getElementById("plan").disabled = false;
                    document.getElementById("nextButton").style.visibility =
                      "hidden";
                    document.getElementById("next1").style.visibility =
                      "hidden";
                    document.getElementById("up1").style.visibility = "hidden";
                    document.getElementById("10-2").style.visibility = "hidden";
                    document.getElementById("7-1-5").style.visibility =
                      "hidden";
                    document.getElementById("7-1-2").style.visibility =
                      "hidden";
                    document.getElementById("7-1-9").style.visibility =
                      "visible";
                    document.getElementById("7-1-10").style.visibility =
                      "visible";
                    document.getElementById("7-1-11").style.visibility =
                      "hidden";
                    document.getElementById("next1").style.visibility =
                      "hidden";
                    document.getElementById("7-1-6").style.visibility =
                      "visible";

                    document.getElementById("sub1").disabled = false;
                    document.getElementById("sub1").onclick = function () {
                      document.getElementById("7-1-6").style.animation =
                        "movearrow1 30s forwards";
                      move1();
                      document.getElementById("7-6a").style.visibility =
                        "visible";
                      document.getElementById("sub1").disabled = true;
                      document.getElementById("fh").disabled = true;
                      document.getElementById("num-1").style.visibility =
                        "visible";
                      document.getElementById("num-2").style.visibility =
                        "visible";
                      document.getElementById("handleCount").style.visibility =
                        "visible";
                      document.getElementById("num-3").style.visibility =
                        "visible";
                      setTimeout(function () {
                        document.getElementById("note1").style.visibility =
                          "visible";
                        document.getElementById("fh").disabled = false;
                        document.getElementById("divi7").style.visibility =
                          "visible";
                        document.getElementById("8-1").style.visibility =
                          "visible";
                        document.getElementById("upload").disabled = false;
                        document.getElementById("upload").onclick =
                          function () {
                            if (document.getElementById("upload").checked) {
                              document.getElementById("7-6a").style.visibility =
                                "hidden";
                              document.getElementById(
                                "7-1-10"
                              ).style.visibility = "hidden";
                              document.getElementById(
                                "7-1-11"
                              ).style.visibility = "visible";
                              document.getElementById("plan").disabled = true;
                              document.getElementById("fh").disabled = true;
                              document.getElementById("out1").style.visibility =
                                "visible";
                              document.getElementById(
                                "output1"
                              ).style.visibility = "visible";
                              document.getElementById("10-4").style.visibility =
                                "visible";
                              document.getElementById(
                                "7-1-9"
                              ).style.visibility = "hidden";
                              document.getElementById(
                                "7-1-5"
                              ).style.visibility = "hidden";
                              //   document.getElementById('7-1-10').style.visibility="hidden";
                              //   document.getElementById("7-1-11").visibility = "visible";
                              document.getElementById("10-1").style.visibility =
                                "visible";
                              document.getElementById(
                                "7-1-6"
                              ).style.visibility = "hidden";
                              //   document.getElementById("7-6a").style.visibility="hidden";
                              document.getElementById("10-1").onclick =
                                function () {
                                  document.getElementById(
                                    "10-1"
                                  ).style.visibility = "hidden";
                                  document.getElementById(
                                    "7-1-11"
                                  ).style.visibility = "hidden";
                                  document.getElementById(
                                    "10-4"
                                  ).style.visibility = "hidden";
                                  document.getElementById(
                                    "10-2"
                                  ).style.visibility = "visible";
                                  move3();
                                  setTimeout(function () {
                                    document.getElementById(
                                      "l1"
                                    ).style.visibility = "hidden";
                                    document.getElementById(
                                      "up1"
                                    ).style.visibility = "visible";
                                    document.getElementById(
                                      "next1"
                                    ).style.visibility = "visible";
                                    document.getElementById("next1").onclick =
                                      function () {
                                        document.getElementById(
                                          "form1"
                                        ).style.visibility = "hidden";
                                        document.getElementById(
                                          "tab3"
                                        ).style.visibility = "visible";
                                        document.getElementById(
                                          "7-aa"
                                        ).style.visibility = "hidden";
                                        document.getElementById(
                                          "sub1"
                                        ).style.visibility = "hidden";
                                        document.getElementById(
                                          "handleCount"
                                        ).style.visibility = "hidden";
                                        document.getElementById(
                                          "num-3"
                                        ).style.visibility = "hidden";
                                        document.getElementById(
                                          "10-2"
                                        ).style.visibility = "hidden";
                                        document.getElementById(
                                          "up1"
                                        ).style.visibility = "hidden";
                                        document.getElementById(
                                          "7-1-4"
                                        ).style.visibility = "hidden";
                                        document.getElementById(
                                          "tab"
                                        ).style.visibility = "hidden";
                                        document.getElementById(
                                          "7-1-7"
                                        ).style.visibility = "hidden";
                                        document.getElementById(
                                          "7-1-8"
                                        ).style.visibility = "hidden";
                                        document.getElementById(
                                          "8-1-1"
                                        ).style.visibility = "visible";
                                        document.getElementById(
                                          "8-1-5"
                                        ).style.visibility = "visible";
                                      };
                                  }, 2000);
                                  //   document.getElementById("10-1").style.visibility =
                                  //     "hidden";
                                  //   document.getElementById(
                                  //     "7-1-11"
                                  //   ).style.visibility = "hidden";
                                };
                            } else {
                              document.getElementById("plan").disabled = false;
                              document.getElementById(
                                "7-1-11"
                              ).style.visibility = "hidden";
                              document.getElementById("up1").style.visibility =
                                "hidden";
                              document.getElementById("10-2").style.visibility =
                                "hidden";
                              //   document.getElementById("three").onclick =
                              //   document.getElementById('8-1-4').style.visibility ="visible";
                            }
                          };
                      }, 30000);
                    };
                    break;
                }
              } else {
                document.getElementById("7-1-2").style.visibility = "visible";
                document.getElementById("7-1-10").style.visibility = "hidden";
                document.getElementById("7-1-9").style.visibility = "hidden";
                document.getElementById("7-1-5").style.visibility = "hidden";
                document.getElementById("7-1-6").style.visibility = "hidden";
                document.getElementById("7-6a").style.visibility = "hidden";
                document.getElementById("up1").style.visibility = "hidden";
                document.getElementById("10-2").style.visibility = "hidden";
                document.getElementById("load").style.visibility = "hidden";
              }

              setTimeout(function () {}, 500);
            };
          }, 1000);
        }, 1500);
      };
    }, 500);
  } else if (simsubscreennum == 11) {
    document.getElementById("7-1-7").style.visibility = "hidden";
    document.getElementById("7-1-8").style.visibility = "hidden";
    document.getElementById("10-1").style.visibility = "hidden";
    document.getElementById("7-1-4").style.visibility = "hidden";
    document.getElementById("tab").style.visibility = "hidden";
    document.getElementById("7-1-5").style.visibility = "hidden";
    document.getElementById("7-1-9").style.visibility = "hidden";
    document.getElementById("7-1-10").style.visibility = "hidden";
    document.getElementById("form1").style.visibility = "hidden";
    document.getElementById("7-1-2").style.visibility = "hidden";
    document.getElementById("8-1-1").style.visibility = "hidden";
    document.getElementById("tab3").style.visibility = "hidden";
    document.getElementById("one").style.visibility = "hidden";
    document.getElementById("two").style.visibility = "hidden";
    // document.getElementById("three").style.visibility = "hidden";
    document.getElementById("grad1").style.visibility = "hidden";
    document.getElementById("range1").style.visibility = "hidden";
    // document.getElementById("grad2").style.visibility = "hidden";
    // document.getElementById("range2").style.visibility = "hidden";
    document.getElementById("imagedest").style.visibility = "hidden";
    document.getElementById("8-1-2").style.visibility = "hidden";
    document.getElementById("8-1-3").style.visibility = "hidden";
    // document.getElementById("8-1-4").style.visibility = "hidden";
    document.getElementById("8-1-5").style.visibility = "hidden";
    document.getElementById("out1").style.visibility = "hidden";
    document.getElementById("output1").style.visibility = "hidden";
    document.getElementById("num-2").style.visibility = "hidden";
    document.getElementById("num-1").style.visibility = "hidden";
    document.getElementById("next1").style.visibility = "hidden";
    document.getElementById("l1").style.visibility = "hidden";

    document.getElementById("11-1").style.visibility = "visible";
    document.getElementById("button1").style.visibility = "visible";
    myInt = setInterval(function () {
      animatearrow();
    }, 500);
    document.getElementById("arrow1").style =
      "visibility:visible; left:45px; top:153px; position:absolute;height:30px;";
    document.getElementById("arrow1").style.WebkitTransform = "rotate(-90deg)";
    document.getElementById("arrow1").style.msTransform = "rotate(-90deg)";
    document.getElementById("arrow1").style.transform = "rotate(-90deg)";
    document.getElementById("button1").onclick = function () {
      myStopFunction();
      document.getElementById("button1").onclick = "";
      document.getElementById("button1").style.visibility = "hidden";
      document.getElementById("11-2").style.visibility = "visible";
      document.getElementById("11-2").style.animation = "zoomImage 1s forwards";

      myInt = setInterval(function () {
        animatearrow();
      }, 500);
      document.getElementById("arrow1").style =
        "visibility:visible; left:236px; top:162px; position:absolute;height:30px;";
      document.getElementById("arrow1").style.WebkitTransform =
        "rotate(-90deg)";
      document.getElementById("arrow1").style.msTransform = "rotate(-90deg)";
      document.getElementById("arrow1").style.transform = "rotate(-90deg)";
      document.getElementById("button2").style.visibility = "visible";
      document.getElementById("button2").onclick = function () {
        myStopFunction();
        document.getElementById("button2").onclick = "";
        document.getElementById("button2").style.visibility = "hidden";
        document.getElementById("11-3").style.visibility = "visible";
        document.getElementById("11-3").style.animation =
          "zoomImage1 1s forwards";
        // myInt=setInterval(function(){animatearrow();},500);
        // document.getElementById('arrow1').style="visibility:visible; left:236px; top:336px; position:absolute;height:30px;";
        // document.getElementById('arrow1').style.WebkitTransform="rotate(-90deg)";
        // document.getElementById('arrow1').style.msTransform="rotate(-90deg)";
        // document.getElementById('arrow1').style.transform="rotate(-90deg)";
        document.getElementById("button3").style.visibility = "visible";
        document.getElementById("button3").onclick = function () {
          myStopFunction();
          document.getElementById("button3").onclick = "";
          document.getElementById("button3").style.visibility = "hidden";
          document.getElementById("11-4").style.visibility = "visible";
          document.getElementById("11-4").style.animation =
            "zoomImage2 1s forwards";
          document.getElementById("nextButton").style.visibility = "visible";
        };
      };
    };
  } else if (simsubscreennum == 12) {
    document.getElementById("11-1").style.visibility = "hidden";
    document.getElementById("11-2").style.visibility = "hidden";
    document.getElementById("11-3").style.visibility = "hidden";
    document.getElementById("11-4").style.visibility = "hidden";
  }
}
function hidedialog() {
  document.getElementById("dialog").style.visibility = "hidden";
  document.getElementById("divp").style.visibility = "hidden";
}

function hidedialog1() {
  document.getElementById("5-1").style.visibility = "hidden";
  document.getElementById("5-5").style.visibility = "visible";
  document.getElementById("5-4").style.visibility = "hidden";
  document.getElementById("5-4a").style.visibility = "hidden";
  document.getElementById("dialog1").style.visibility = "hidden";
  document.getElementById("divp1").style.visibility = "hidden";
  document.getElementById("5-a").style.visibility = "hidden";
  document.getElementById("5-b").style.visibility = "hidden";
  document.getElementById("5-3b").style.visibility = "hidden";
  document.getElementById("5-3c").style.visibility = "hidden";

  // document.getElementById('5-3').style.visibility="hidden";

  // document.getElementById('5-3a').style.visibility="hidden";
  //

  // document.getElementById('5-5b').style.visibility="visible";
  // document.getElementById('5-3c').style.visibility="hidden";

  // document.getElementById('5-3c').style.visibility="hidden";

  document.getElementById("nextButton").style.visibility = "visible";
}
function hidedialog2() {
  document.getElementById("dialog2").style.visibility = "hidden";
  document.getElementById("divp2").style.visibility = "hidden";
  document.getElementById("nextButton").style.visibility = "visible";
}
function hidedialog3() {
  document.getElementById("dialog3").style.visibility = "hidden";
  document.getElementById("divp3").style.visibility = "hidden";
  document.getElementById("9-1").style.visibility = "hidden";
  document.getElementById("9-3").style.visibility = "visible";
  // document.getElementById('9-1').style.visibility="hidden";
  // document.getElementById('9-5a').style.visibility="hidden";
  // document.getElementById('9-5c').style.visibility="hidden";
  // document.getElementById('9-2').style.visibility="hidden";
  // document.getElementById('9-5').style.visibility="hidden";
  document.getElementById("9-6").style.visibility = "visible";
  // document.getElementById('9-6').style.visibility="visible";

  myInt = setInterval(function () {
    animatearrow();
  }, 500);
  document.getElementById("arrow1").style =
    "visibility:visible; left:104px; top:289px; position:absolute;height:30px;";
  document.getElementById("arrow1").style.WebkitTransform = "rotate(-90deg)";
  document.getElementById("arrow1").style.msTransform = "rotate(-90deg)";
  document.getElementById("arrow1").style.transform = "rotate(-90deg)";
  // document.getElementById('nextButton').style.visibility="visible";
}
function hidedialog8() {
  document.getElementById("note1").style.visibility = "hidden";
  document.getElementById("divi7").style.visibility = "hidden";
  document.getElementById("7-1-9").style.visibility = "visible";
  document.getElementById("8-1").style.visibility = "hidden";
  // document.getElementById('nextButton').style.visibility="visible";
}
function myFunction(e) {
  //console.log(e.value)
  let value = e.value;
  let resolution;
  let fightTime;
  let images;
  switch (value) {
    case "50":
      resolution = "2.5";
      fightTime = "8.04";
      images = "131";
      //  document.getElementById("7-1-5").style.visibility = "visible";
      // document.getElementById("7-1-9").style.visibility = "hidden";
      // document.getElementById("7-1-6").style.visibility = "hidden";
      break;
    case "60":
      resolution = "3";
      fightTime = "6.25";
      images = "94";
      // document.getElementById("7-1-5").style.visibility = "hidden";
      // document.getElementById("7-1-9").style.visibility = "visible";
      // document.getElementById("7-1-6").style.visibility = "hidden";
      break;
  }

  document.getElementById("demo").innerHTML =
    "Resolution  (cm/px): " + resolution;
  document.getElementById("demo1").innerHTML =
    " Flight Time (min): " + fightTime;
  document.getElementById("demo2").innerHTML = " Images: " + images;
}
var y;
function handleFlightSelection(e) {
  //console.log(e.value)
  let value = e.value;
  let resolution;
  let fightTime;
  let images;
  document.getElementById("7-a").disabled = false;
  document.getElementById("7-a").checked = false;
  document.getElementById("upload").disabled = true;
  document.getElementById("upload").checked = false;
  switch (value) {
    case "50":
      resolution = "2.5";
      fightTime = "8.04";
      images = "131";

      break;
    case "60":
      resolution = "3";
      fightTime = "6.25";
      images = "94";

      break;
  }

  document.getElementById("demo").innerHTML =
    "Resolution (cm/px): " + resolution;
  document.getElementById("demo1").innerHTML =
    " Flight Time (min): " + fightTime;
  document.getElementById("demo2").innerHTML = " Images: " + images;
}

function change1() {
  var checkBox = document.getElementById("Ipad");
  var b = document.getElementById("sub1");
  if (checkBox.checked == true) {
    b.style.visibility = "visible";
  } else {
    b.style.visibility = "hidden";
  }
}
//   function change2() {
// 	var checkBox = document.getElementById("Ipad1");
// 	var b = document.getElementById("sub1");
// 	if (checkBox.checked == true) {
// 	  b.style.visibility = "visible";
// 	} else {
// 	  b.style.visibility = "hidden";
// 	}
//   }
// function showArea() {

// }
function up() {
  if (document.getElementById("upload").checked) {
    document.getElementById("7-1-11").visibility = "visible";
  }
}
//   function up1() {
// 	if (document.getElementById("fly").checked) {
// 	  document.getElementById("fh").visibility = "visible";
// 	}
//   }

var myVar;

function loadFunction() {
  myVar = setTimeout(showPage, 500);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}
var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 201);

    function frame() {
      if (width >= 131) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
        elem.innerHTML = width;
      }
    }
  }
}
function move3() {
  document.getElementById("l1").style.visibility = "visible";
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("load");
    var width = 10;
    var id = setInterval(frame, 20);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
        elem.innerHTML = width + "%";
      }
    }
  }
}
function move1() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 285);

    function frame() {
      if (width >= 94) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
        elem.innerHTML = width;
      }
    }
  }
}
function move2() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 90);

    function frame() {
      if (width >= 286) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
        elem.innerHTML = width;
      }
    }
  }
}
//   function move3() {
// 	document.getElementById("l1").style.visibility = "visible";
// 	if (i == 0) {
// 	  i = 1;
// 	  var elem = document.getElementById("loader");
// 	  var width = 10;
// 	  var id = setInterval(frame, 20);
// 	  function frame() {
// 		if (width >= 100) {
// 		  clearInterval(id);
// 		  i = 0;
// 		} else {
// 		  width++;
// 		  elem.style.width = width + "%";
// 		  elem.innerHTML = width + "%";
// 		}
// 	  }
// 	}
//   }
function acre() {
  if (document.getElementById("7-a").checked == false) {
    document.getElementById("7-aa").style.visibility = "hidden";
  } else {
    document.getElementById("7-aa").style.visibility = "visible";
  }
}

function check_value() {
  document.getElementById("8-1-5").style.visibility = "visible";
  switch (document.test.field.value) {
    case "one":
      document.getElementById("8-1-2").style.visibility = "visible";
      document.getElementById("8-1-3").style.visibility = "hidden";
      // document.getElementById("8-1-4").style.visibility = "hidden";
      document.getElementById("range1").style.visibility = "hidden";

      document.getElementById("grad1").style.visibility = "hidden";
      // document.getElementById("grad2").style.visibility = "hidden";
      break;

    case "two":
      document.getElementById("8-1-2").style.visibility = "hidden";
      document.getElementById("8-1-3").style.visibility = "visible";
      // document.getElementById("8-1-4").style.visibility = "hidden";
      document.getElementById("grad1").style.visibility = "visible";
      document.getElementById("range1").style.visibility = "visible";
      document.getElementById("nextButton").style.visibility = "visible";
      // document.getElementById("range2").style.visibility = "hidden";
      break;

    //   case "three":
    // 	document.getElementById("8-1-2").style.visibility = "hidden";
    // 	document.getElementById("grad2").style.visibility = "visible";
    // 	document.getElementById("8-1-3").style.visibility = "hidden";
    // 	document.getElementById("8-1-4").style.visibility = "visible";
    // 	document.getElementById("grad1").style.visibility = "hidden";
    // 	document.getElementById("range1").style.visibility = "hidden";
    // 	document.getElementById("range2").style.visibility = "visible";
    // 	document.getElementById("nextButton").style.visibility = "visible";
    // 	break;
  }
}

function checkClicked(evt) {
  checkCount += evt.target.checked == true ? 1 : -1;
  document.getElementById("sub1").style.visibility =
    checkCount == 4 ? "visible" : "hidden";
}

function content() {
  document.getElementById("checker1").style.visibility = "visible";
}
function res() {
  document.getElementById("grad1").style.visibility = "visible";
  // document.getElementById("range1").style.visibility="visible";
}
// function res1() {
//   document.getElementById("grad2").style.visibility = "visible";
// }
function setTitle(evt) {
  document.getElementById("output1").innerText = evt.target.value;
}

//   function thermal() {
// 	// document.getElementById("8-1-4").style.visibility = "visible";
//   }
// // function check_value()
// //     {
// //         switch(document.test.field.value)
// //         {
// //             case "one":

// //                 document.getElementById("imagedest").innerHTML = "<img src='images/image'>";
// //                 break;

// //             case "two":

// //                 document.getElementById("imagedest").innerHTML = "<img src='images/red_background.jpg'>";
// //                 break;

// //             case "three":

// //                 document.getElementById("imagedest").innerHTML = "<img src='images/black_background.jpg'>";
// //                 break;
// //         }
// //     }
// // 	function checkClicked(evt){
// // 		checkCount += evt.target.checked == true ? 1 : -1;
// // 		document.getElementById("sub1").style.visibility=
// // 		checkCount == 4 ? "visible" : "hidden";

// // 	}
// 	function content(){
// 		document.getElementById("checker1").style.visibility= "visible";
// 		// document.getElementById("drone").style.visibility= "visible";
// 		// document.getElementById("transmitter").style.visibility= "visible";
// 		// document.getElementById("land").style.visibility= "visible";
// 		// document.getElementById("Ipad").style.visibility= "visible";
// 	}
