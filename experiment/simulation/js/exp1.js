var p=Math.floor(Math.random()*(10));

//  var data=[[1911.5,1911.5,1911.5,1911.5,1911.5,1911.5,1911.5,1911.5,1911.5,1911.5],
 		//   [2410,2426,2466,2453,2431,2443,2445,2458,2460,2463],
 		//   [106.00,89.00,82.00,103.00,78.00,86.00,75.00,110.00,93.00,72.00],
 		//   [21.26379137,17.29834791,14.78809739,19.0212373,15.01443696,16.18062088,14.05810684,20.12808783,16.95533273,13.05530372]];

var flag=true;
var itv = 0;
var qCount = 0;
var inferenceData = [["<10","10-20","20-30",">30"],
						["Exceptionally Strong","Strong","Satisfactory for road surfacing","Weak for road surfacing"]]
var inCount = 0;	
// Prompt questions during simulation using objects

var questions = {
	ans1:0,
	options:[],
	nextFunction:function(){},
	setOptions:function(d1,d2,d3,d4,d5){
		questions.options = new Array(d1,d2,d3,d4,d5);
	},
	setOptions1:function(d1,d2,d3){
		questions.options = new Array(d1,d2,d3);
	},
	setAns:function(ans){
		questions.ans1 = ans;
	},
	frameQuestions:function(qun){
		var myDiv  = document.getElementById("question-div");
		var myDiv1 = document.getElementById("divq");
		// myDiv.style.visibility = "visible";
		myDiv.style.animation = "blinkingText 1s 1";
		myDiv.style.visibility = "visible";
		myDiv.classList.add("fadeIn");
			document.getElementById("divq").innerHTML = qun;
		//Create and append select list
		var selectList = document.createElement("select");
		selectList.setAttribute("id", "mySelect");
		selectList.setAttribute("autocomplete", "off");
		// selectList.setAttribute("onchange", "questions.setAnswer()");
		
		var button1 = document.createElement("input");
		button1.setAttribute("onclick","questions.setAnswer(this)");
		button1.setAttribute("type","button");
		button1.setAttribute("value","OK");
		button1.setAttribute("style","cursor:pointer");
	
		// Appending the contents to the division
		myDiv1.appendChild(selectList);
		myDiv1.appendChild(button1);

	//Create and append the options
		for (var i = 0; i < questions.options.length; i++) {
			var opt = document.createElement("option");
			opt.setAttribute("value", questions.options[i]);
			opt.text = questions.options[i];
			selectList.appendChild(opt);
		}
	},
	setAnswer:function(ev){
		var x = document.getElementById("mySelect");
		var i = x.selectedIndex;
		if(i == 0)
		{
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You have not selected any value";
			document.getElementById("divq").appendChild(dispAns);		
			setTimeout(function(){
				dispAns.innerHTML = "";
			},200);
		}
		else if(i == questions.ans1)
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are right <span class='boldClass'>&#128077;</span> ";
			document.getElementById("divq").appendChild(dispAns);		
			questions.callNextFunction();
		}
		else
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are Wrong <span class='boldClass'>&#128078;</span><br>Answer is: "+x.options[questions.ans1].text;
			document.getElementById("divq").appendChild(dispAns);		
			questions.callNextFunction();
		}
	},
	setCallBack:function(cb){
		nextFunction = cb;
	},
	callNextFunction:function()
	{
		setTimeout(function()
		{
			// document.getElementById("question-div").innerHTML = "";
			document.getElementById("question-div").style.animation="";
			document.getElementById("question-div").style.visibility = "hidden";
			nextFunction();
		},800);
	}
}

//To set the questions division
function generateQuestion(qObject,qn,op1,op2,op3,op4,op5,ansKey,fn,dleft,dright,dwidth,dheight)
{
	document.getElementById('question-div').style.left=dleft+"px";											
	document.getElementById('question-div').style.top=dright+"px";												
	document.getElementById('question-div').style.width=dwidth+"px";
	document.getElementById('question-div').style.height=dheight+"px";
	qObject.setOptions(op1,op2,op3,op4,op5);
	qObject.setAns(ansKey);
	qObject.frameQuestions(qn);	
	qObject.setCallBack(fn);	
}
function generateQuestion1(qObject,qn,op1,op2,op3,ansKey,fn,dleft,dright,dwidth,dheight)
{
	document.getElementById('question-div').style.left=dleft+"px";											
	document.getElementById('question-div').style.top=dright+"px";												
	document.getElementById('question-div').style.width=dwidth+"px";
	document.getElementById('question-div').style.height=dheight+"px";
	qObject.setOptions1(op1,op2,op3);
	qObject.setAns(ansKey);
	qObject.frameQuestions(qn);	
	qObject.setCallBack(fn);	
}

function navNext()
{
	for(temp=0;temp<=9;temp++)
	{
		document.getElementById("canvas"+temp).style.visibility="hidden";
	}
	simsubscreennum+=1;
	document.getElementById("canvas"+simsubscreennum).style.visibility="visible";
	document.getElementById("nextButton").style.visibility="hidden";
	magic();
}

//-----------------------------------------blink arrow on the next step---------------------------------------------
//blink arrow on the next step
function animatearrow()
{
     if (document.getElementById('arrow1').style.visibility=="hidden")
         document.getElementById('arrow1').style.visibility="visible";
     else
         document.getElementById('arrow1').style.visibility="hidden";
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
function myStopFunction() 
{
     clearInterval(myInt);
     document.getElementById('arrow1').style.visibility="hidden";
}

function checkInputValid(e) {
	e.value = e.value.match(/\d*(\.\d*)?/)[0];
}

function magic()
{
	if(simsubscreennum==1)
	{
			myInt = setInterval(function(){ animatearrow(); }, 500);
			animateArrowATPosition(377.5, 510, 90);
			document.getElementById("can1-0").onclick=function()
			{
				    myStopFunction();
					document.getElementById("can1-0").onclick="";
					document.getElementById("can1-0").style.visibility="hidden";
					document.getElementById("can1-1").style.visibility="visible";
					document.getElementById("can1-5").style.visibility="visible";
					myInt = setInterval(function(){ animatearrow(); }, 500);
					//animateArrowATPosition(left, top, rotate);
					animateArrowATPosition(530, 280, 270);
					document.getElementById("can1-5").onclick=function()
					{
						myStopFunction();
						document.getElementById("can1-5").onclick="";
						document.getElementById("can1-5").style.visibility="hidden";
						document.getElementById("can1-2").style.visibility="visible";	
						document.getElementById("can1-3").style.visibility="visible";	
						document.getElementById("can1-3").style.animation="moveBase 1s forwards, moveBaseupdn 1s 4 forwards";
						setTimeout(function()
						{
							document.getElementById("can1-1").style.visibility="hidden";
							document.getElementById("can1-3").style.visibility="hidden"
							document.getElementById("can1-2").style.visibility="hidden"
							document.getElementById("can1-4").style.visibility="visible";
							document.getElementById("nextButton").style.visibility="visible";
						},4001);
					}
			}	
	}
		
	else if(simsubscreennum==2)
	{      
		document.getElementById("can1-4").style.visibility="hidden";
		document.getElementById("nextButton").style.visibility="hidden";
		myInt = setInterval(function(){ animatearrow(); }, 500);
	    animateArrowATPosition(377.5, 390, 90);
		document.getElementById("can2-0").onclick=function()
		{
		    myStopFunction();
			document.getElementById("can2-0").onclick="";
		 	document.getElementById("can2-1").style.visibility="visible";
		 	document.getElementById("can2-1").style.animation="liftTripod 2s forwards";
		 	setTimeout(function()
		 	{   
		 		document.getElementById("can2-1").style.visibility="hidden";
				document.getElementById("can2-0").style.visibility="hidden";
		 		document.getElementById("can2-11").style.visibility="visible";
		 		document.getElementById("can2-11").style.animation="rotateTripod 1.5s forwards";
		 		setTimeout(function()
				{
		 		    document.getElementById("can2-11").style.visibility="hidden";
					document.getElementById("can2-2").style.visibility="visible";
					document.getElementById("can2-13").style.visibility="visible";
		 			myInt = setInterval(function(){ animatearrow(); }, 500);
		 			animateArrowATPosition(430, 256, 360);	
					document.getElementById("can2-13").onclick=function()
					{ 
						myStopFunction();
						document.getElementById("can2-13").onclick="";
						document.getElementById("can2-3").style.visibility="visible";
						document.getElementById("can2-3").style.animation="moveHand 1s forwards, moveHandupdn 1s 4 forwards";
						setTimeout(function()
						{
							document.getElementById("can2-3").style.visibility="hidden";
							document.getElementById("can2-4").style.visibility="visible";
							document.getElementById("can2-4").style.animation="moveHand1 1s forwards";
							setTimeout(function()
							{
								document.getElementById("can2-13").style.visibility="hidden";
								document.getElementById("can2-3").style.visibility="hidden";
								document.getElementById("can2-2").style.visibility="hidden";
								document.getElementById("can2-4").style.visibility="hidden";
								document.getElementById("can2-5").style.visibility="visible";
								document.getElementById("can2-6").style.visibility="hidden";
								document.getElementById("can2-9").style.visibility="visible";
								document.getElementById("can2-9").style.animation="moveLeg 2s forwards";
								setTimeout(function()
								{
									document.getElementById("can2-9").style.visibility="hidden";  
									document.getElementById("can2-6").style.visibility="visible";
									document.getElementById("can2-10").style.visibility="visible";
									document.getElementById("can2-10").style.animation="moveHand4updn 1s forwards";
									setTimeout(function()
									{   
										document.getElementById("can2-5").style.visibility="hidden";
										document.getElementById("can2-6").style.visibility="hidden";
										document.getElementById("can2-10").style.visibility="hidden";	
										document.getElementById("can2-7").style.visibility="visible";	
										document.getElementById("can2-3").style.visibility="visible";
										document.getElementById("can2-3").style.animation="moveHand3 1s forwards, moveHand3dnup 1s 4 forwards";
										document.getElementById("note1").style.visibility="visible";
										setTimeout(function()
										{  
											document.getElementById("note1").style.visibility="hidden";
											document.getElementById("can2-3").style.visibility="hidden";
											document.getElementById("can2-7").style.visibility="hidden";
											document.getElementById("can2-8").style.visibility="visible";
											document.getElementById("nextButton").style.visibility="visible";
										},4001);
									},1001);
								},2001);
							 },1001);
						 },4001);
					 }
		 		},1500);
			},2001);
		 }
	}	
	else if(simsubscreennum==3)
	{
		document.getElementById("can2-8").style.visibility="hidden";
        document.getElementById("nextButton").style.visibility="hidden";
		document.getElementById("note1").style.visibility="hidden";
		document.getElementById("can3-0").style.visibility="visible";
		document.getElementById("can3-1").style.visibility="visible";
		myInt = setInterval(function(){ animatearrow(); }, 500);
	    animateArrowATPosition(207.5, 240, 360);
		document.getElementById("can3-0").onclick=function()
		{
			myStopFunction();
			document.getElementById("can3-0").onclick="";
			document.getElementById("can3-2").style.visibility="visible";
			document.getElementById("can3-2").style.animation="liftTripod1 1.5s forwards";
			setTimeout(function()
			{
				document.getElementById("can3-2").style.visibility="hidden";
				document.getElementById("can3-0").style.visibility="hidden";
				document.getElementById("can3-7").style.visibility="visible";
				document.getElementById("can3-7").style.animation="liftTripod1-1 1s forwards,moveTripod1 1s forwards";
				 setTimeout(function()
			     { 
					document.getElementById("can3-7").style.visibility="hidden";
					document.getElementById("can3-5").style.visibility="visible";
					document.getElementById("can3-8").style.visibility="visible";
					myInt = setInterval(function(){ animatearrow(); }, 500);
					animateArrowATPosition(415.5, 352, 360);
					document.getElementById("can3-8").onclick=function()
					{
						myStopFunction();
						document.getElementById("can3-8").onclick="";
						document.getElementById("can3-8").style.visibility="hidden";
						document.getElementById("can3-11").style.visibility="visible";
						document.getElementById("can3-3").style.visibility="visible";
						document.getElementById("can3-4").style.visibility="visible";
						document.getElementById("can3-4").style.animation="moveHand5updn 1s 4 forwards ";
						setTimeout(function()
						{
							document.getElementById("can3-3").style.visibility="hidden";
							document.getElementById("can3-4").style.visibility="hidden";
							document.getElementById("can3-10").style.visibility="visible";
							document.getElementById("can3-9").style.visibility="visible";
							document.getElementById("can3-10").style.animation="movecentrerod 3s forwards ";
							setTimeout(function()
							{
								document.getElementById("can3-10").style.visibility="hidden";
								document.getElementById("can3-11").style.visibility="hidden";
								document.getElementById("can3-9").style.visibility="hidden";
								document.getElementById("can3-5").style.visibility="hidden";
								document.getElementById("can3-1").style.visibility="hidden";
								document.getElementById("can3-6").style.visibility="visible";
								document.getElementById("nextButton").style.visibility="visible";
							},3000);		
						},4000);
					}
				},1001);
			},1501);
	    }
	}				
	else if(simsubscreennum==4)
	{ 
		document.getElementById("can3-6").style.visibility="hidden";
        document.getElementById("nextButton").style.visibility="hidden";
		 document.getElementById("can4-0").style.visibility="visible";
		 document.getElementById("can4-5").style.visibility="visible";
		 myInt = setInterval(function(){ animatearrow(); }, 500);
	     animateArrowATPosition(227.5, 165, 180);
		 document.getElementById("can4-5").onclick=function()
		 {
		 	myStopFunction();
		 	document.getElementById("can4-5").onclick="";
		 	document.getElementById("can4-5").style.visibility="hidden";
		 	document.getElementById("can4-1").style.visibility="visible";
		 	document.getElementById("can4-2").style.visibility="visible";
		 	document.getElementById("can4-2").style.animation="moveHand6lr 1s 2 forwards ";
		 	setTimeout(function()
		 	{
		 		document.getElementById("can4-2").style.visibility="hidden";
		 		document.getElementById("can4-1").style.visibility="hidden";
		 		document.getElementById("can4-5").style.visibility="hidden";
		 		document.getElementById("can4-0").style.visibility="hidden";
		 		document.getElementById("can4-8").style.visibility="visible";
				 document.getElementById("can4-9").style.visibility="visible";
		 		document.getElementById("can4-7").style.visibility="visible";
		 		document.getElementById("can4-8").style.animation="movefullTripod 2s 2 forwards ";
		 		setTimeout(function(){
		 		document.getElementById("can4-6").style.visibility="visible";
		 		document.getElementById("can4-3").style.visibility="visible";
		 		document.getElementById("can4-4").style.visibility="visible";
		 		document.getElementById("can4-3").style.animation="moveTripod4 2.5s forwards ";
		 		setTimeout(function()
		 		{
		 			document.getElementById("can4-8").style.visibility="hidden";
					 document.getElementById("can4-9").style.visibility="hidden";
		 			document.getElementById("can4-7").style.visibility="hidden";
		 			document.getElementById("can4-0").style.visibility="visible";
		 			document.getElementById("can4-3").style.visibility="hidden";
		 			document.getElementById("can4-4").style.visibility="hidden";
		 			document.getElementById("can4-6").style.visibility="hidden";                         
		 			var q1 = Object.create(questions);																			                                                                      //(ans,nextcanvasfn,left,top,length, height) 
		 			generateQuestion(q1,"What is the full form of DGPS? ","","Differentiate globe position system","Differential global position system","Differential global positioning system","None of the above",3,nextCanvas,450,150,250,150);
		 		},2501);
		 	},4001);
		 	},2000);
		 }
	}
	else if(simsubscreennum==5)
	{
		document.getElementById("can4-0").style.visibility="hidden";
		document.getElementById("nextButton").style.visibility="hidden";
		document.getElementById("can5-3").style.visibility="visible";
		document.getElementById("can5-4").style.visibility="visible";
		myInt = setInterval(function(){ animatearrow(); }, 500);
		animateArrowATPosition(330.5, 270, 180);
		document.getElementById("can5-4").onclick=function()
		{
            myStopFunction();
			document.getElementById("can5-4").onclick="";
			document.getElementById("can5-4").style.visibility="hidden";
			document.getElementById("can5-3").style.visibility="hidden";
			document.getElementById("can5-0").style.visibility="visible";
			document.getElementById("can5-1").style.visibility="visible";
			myInt = setInterval(function(){ animatearrow(); }, 500);
		    animateArrowATPosition(603.5, 135, 270);
			document.getElementById("can5-1").onclick=function()
			{
				myStopFunction();
				document.getElementById("can5-1").style.animation="moveBattery 2.5s forwards ";
			    setTimeout(function()
			     {
					document.getElementById("can5-0").style.visibility="hidden";
			    	document.getElementById("can5-1").style.visibility="hidden";
					document.getElementById("can5-5").style.visibility="visible";
					document.getElementById("can5-6").style.visibility="visible";
	                myInt = setInterval(function(){ animatearrow(); }, 500);
		    		animateArrowATPosition(355.5, 316, 90);
					document.getElementById("can5-6").onclick=function()
					{
						myStopFunction();
						document.getElementById("can5-6").onclick="";
					    document.getElementById("can5-5").style.visibility="hidden";
						document.getElementById("can5-6").style.visibility="hidden";
					    document.getElementById("can5-2").style.visibility="visible";
					    document.getElementById("nextButton").style.visibility="visible";
					}
			     },2501);
			}
		}
	}
	 else if(simsubscreennum==6)
	 {
		document.getElementById("can5-2").style.visibility="hidden";
		document.getElementById("nextButton").style.visibility="hidden";
		document.getElementById("can6-0").style.visibility="visible";
		myInt = setInterval(function(){ animatearrow(); }, 500);
		animateArrowATPosition(89.5, 245, 180);
		document.getElementById("can6-0").onclick=function()
		{
			myStopFunction();
			document.getElementById("can6-0").onclick="";
			document.getElementById("can6-0").style.visibility="hidden";
			document.getElementById("can6-1").style.visibility="visible";
		    document.getElementById("can6-2").style.visibility="visible";
			document.getElementById("can6-1").style.animation="moveHeadlr 1s 2 forwards ";
			setTimeout(function()
			{
			   document.getElementById("can6-1").style.visibility="hidden";
		       document.getElementById("can6-2").style.visibility="hidden";
			   document.getElementById("can6-11").style.visibility="visible";  
			   document.getElementById("can6-12").style.visibility="visible";
			   myInt = setInterval(function(){ animatearrow(); }, 500);
		       animateArrowATPosition(127.5, 352, 180);
			   document.getElementById("can6-11").onclick=function()
			   {
				   myStopFunction();
			       document.getElementById("can6-11").onclick="";
				   document.getElementById("can6-5").style.visibility="visible";
				   document.getElementById("can6-5").style.animation="moveHand8 1s forwards ";
				   setTimeout(function()  
				   {
	                   document.getElementById("can6-11").style.visibility="hidden";
					   document.getElementById("can6-12").style.visibility="hidden";
	                   document.getElementById("can6-5").style.visibility="hidden";
					   document.getElementById("can6-3").style.visibility="visible";
					   document.getElementById("can6-4").style.visibility="visible";
					   document.getElementById("can6-4").style.animation="moveBasetotripod 1s forwards ";
					   setTimeout(function()  
					   {
							document.getElementById("can6-4").style.visibility="hidden";
							document.getElementById("can6-10").style.visibility="visible";
                        	document.getElementById("can6-6").style.visibility="visible";
							document.getElementById("can6-7").style.visibility="visible";
							document.getElementById("can6-8").style.visibility="visible";
							document.getElementById("can6-7").style.animation="moveHandtofix 2.5s 2 forwards ";
							setTimeout(function()
							{
								document.getElementById("can6-3").style.visibility="hidden";
								document.getElementById("can6-10").style.visibility="hidden";
								document.getElementById("can6-6").style.visibility= "hidden";
								document.getElementById("can6-7").style.visibility= "hidden";
								document.getElementById("can6-8").style.visibility="hidden";
								document.getElementById("can6-9").style.visibility="visible";
								var q2 = Object.create(questions);																			                                                                     
					            generateQuestion(q2,"Accuracy that can be achieved by conducting DGPS survey is ______ ","","5cm","1-3cm","10-12cm","1-3 m",2,nextCanvas,500,150,250,150);
							},5000);
						},1000);
				 },1000);
			   }
			},2000);
		}
	 }
	 else if(simsubscreennum==7)
	 {
		document.getElementById("can6-9").style.visibility="hidden";
		document.getElementById("nextButton").style.visibility="hidden";
		document.getElementById("can7-0").style.visibility="visible";
		document.getElementById("can7-1").style.visibility="visible";
		myInt = setInterval(function(){ animatearrow(); }, 500);
		animateArrowATPosition(137.5, 412, 180);
		document.getElementById("can7-1").onclick=function()
	    {
			myStopFunction();
			document.getElementById("can7-1").onclick="";
			document.getElementById("can7-1").style.visibility="hidden";
			document.getElementById("can7-2").style.visibility="visible";
			document.getElementById("can7-3").style.visibility="visible";
			document.getElementById("can7-3").style.animation="takereading 2s forwards ";
			setTimeout(function()
			{
				document.getElementById("can7-3").style.visibility="hidden";
				var q3 = Object.create(questions);																			                                                                     
				generateQuestion(q3,"What is the height of the rod connecting the tripod and the base head?","","25cm","2.5cm","25mm","2.5m",1,nextCanvas1,490,150,250,150);
			},2000);
		}
	 }
	 else if(simsubscreennum==8)
	 {
		document.getElementById("nextButton").style.visibility="visible";
		document.getElementById("can7-0").style.visibility="hidden";
		document.getElementById("can7-2").style.visibility="hidden";
		document.getElementById("can7-4").style.visibility="hidden";
		document.getElementById("can7-5").style.visibility="hidden";
		document.getElementById("note2").style.visibility="hidden";
	 }
	 else if(simsubscreennum==9)
	 {  
		 document.getElementById("main").style.visibility="visible"
		 document.getElementById("desktop").style.visibility="visible"
		 document.getElementById("taskbar").style.visibility="visible"
		 document.getElementById("cnctwifi").style.visibility="visible"
		 myInt = setInterval(function(){ animatearrow(); }, 500);
	 	 animateArrowATPosition(641.5, 543, 90);
		 document.getElementById("cnctwifi").onclick=function()
		 {
			myStopFunction();
			document.getElementById("connect").style.visibility="visible"
			myInt = setInterval(function(){ animatearrow(); }, 500);
	 		animateArrowATPosition(747.5, 310, 360);
			document.getElementById("Wificonnect").onclick=function()
			{
				myStopFunction();
				document.getElementById("connect").style.visibility="hidden"
				document.getElementById("cnctwifi").style.visibility="hidden"
				document.getElementById("cnctdwifi").style.visibility="visible"
				myInt = setInterval(function(){ animatearrow(); }, 500);
	 	    	animateArrowATPosition(142.5, 544, 90);
				 document.getElementById("heading").innerHTML="Connect to Trimble website.";
				document.getElementById("brwsr").onclick=function()
				{
					myStopFunction();
					document.getElementById("server").style.visibility="visible"
					document.getElementById("desktop").style.visibility="hidden"
					myInt = setInterval(function(){ animatearrow(); }, 500);
	 	        	animateArrowATPosition(368.5, 359, 90);
					document.getElementById("trimble").onclick=function()
					{
						myStopFunction();
						document.getElementById("server").style.visibility="hidden"
						document.getElementById("cnctdwifi").style.visibility="hidden"
						document.getElementById("taskbar").style.visibility="hidden"
						document.getElementById("heading").innerHTML="Enter User name and Password to login.";
						document.getElementById("main1-3").style.visibility="visible"
						document.getElementById("login").style.visibility="visible"
						setTimeout(function()
						{
							document.getElementById("uname").style.visibility="visible"
							setTimeout(function()
							{
								document.getElementById("pswd").style.visibility="visible"
								myInt = setInterval(function(){ animatearrow(); }, 500);
	 	            			animateArrowATPosition(291.5, 192, 90);
								document.getElementById("k1btn").onclick=function()
								{
									myStopFunction();
									myInt = setInterval(function(){ animatearrow(); }, 500);
	 	  							animateArrowATPosition(202.5, 149, 360);
									document.getElementById("heading").innerHTML="Under receiver configuration set the antenna height and measurement method.";
									document.getElementById("butn4").onclick=function()
									{
										if(document.getElementById("butn4").value==false)
			 							{
											myStopFunction();
			 								document.getElementById("butn4").value=true
			 								document.getElementById("butn4").style.top="65px"
			 								document.getElementById("main1-42").style.visibility="visible"
			 								document.getElementById("main1-43").style.top="104px"
			 								document.getElementById("butn3").style.top="49px"
											 myInt = setInterval(function(){ animatearrow(); }, 500);
											 animateArrowATPosition(201.5, 180.5, 360);
											 document.getElementById("butn4-2").onclick=function()
											 {
												if(document.getElementById("butn4-2").value==false)
												{  
													myStopFunction();
													document.getElementById("butn4-2").value=true
													document.getElementById("login").style.visibility="hidden"
													document.getElementById("uname").style.visibility="hidden"
													document.getElementById("pswd").style.visibility="hidden"
													document.getElementById("butn4-2").style.fontWeight="bold"
													document.getElementById("main1-5").style.visibility="visible"
											 		myInt = setInterval(function(){ animatearrow(); }, 500);
											 		animateArrowATPosition(657.5, 170.5, 360);
											 		document.getElementById("optns").onclick=function()
													{
														myStopFunction();
														myInt = setInterval(function(){ animatearrow(); }, 500);
	 	  							    				animateArrowATPosition(657.5, 201.5, 360);
													 	document.getElementById("optns").onchange = function() 
			 											{   document.getElementById("optns").onclick = function()
															{								
																myStopFunction();
																document.getElementById("chk").style.visibility="visible"
																document.getElementById("ht").placeholder="Enter the height"
																document.getElementById("chk").onclick=function()
																{  
																	if(document.getElementById("ht").value.length==0)
																	{	
																		document.getElementById("ht").placeholder="No value entered"
																	}
																	else if(document.getElementById("ht").value.length>0)
																	{	if(document.getElementById("ht").value==1.71)
																		{	 document.getElementById("rtht").style.visibility="visible"
																			 document.getElementById("chk").style.visibility="hidden"
																			 setTimeout(function()
																			 {
																			 	document.getElementById("rtht").style.visibility="hidden"
																			 	document.getElementById("ht").value=1.71
																			 	document.getElementById("ht").disabled=true
																			 	myInt = setInterval(function(){ animatearrow(); }, 500);
																			 	animateArrowATPosition(234.5, 346.5, 90);
																			 },1000);
																		}
																		else
																		{  
																			document.getElementById("chk").value=true
																			document.getElementById("chk").style.visibility="hidden"
																			document.getElementById("wrht").style.visibility="visible"
																			setTimeout(function()
																			{
																				document.getElementById("wrht").style.visibility="hidden"
																				document.getElementById("rslt").style.visibility="visible"
																				document.getElementById("rslt").onclick=function()
																				{
																					document.getElementById("ht").value=1.71
																					document.getElementById("rslt").style.visibility="hidden"
																					document.getElementById("ht").disabled=true
																					myInt = setInterval(function(){ animatearrow(); }, 500);
																					animateArrowATPosition(234.5, 346.5, 90);
																				}
																			},1000);
																		}
																	}
																	document.getElementById("kbtn1").onclick=function()
																	{
																		myStopFunction();
																		myInt = setInterval(function(){ animatearrow(); }, 500);
	 	   							    								animateArrowATPosition(201.5,197, 360);
																		document.getElementById("heading").innerHTML=" In reference station give Here position and click ok.";
																		document.getElementById("butn4-3").onclick=function()
																		{
																			if(document.getElementById("butn4-3").value==false)
			 																{
																				myStopFunction();
																				document.getElementById("butn4-3").value=true
			 																	document.getElementById("butn4-2").style.fontWeight="normal"
			 																	document.getElementById("butn4-3").style.fontWeight="bold"
			 																	document.getElementById("main1-5").style.visibility="hidden"
			 																	document.getElementById("main1-6").style.visibility="visible"
																				myInt = setInterval(function(){ animatearrow(); }, 500);
																				animateArrowATPosition(389.5, 291.5, 360);
																				document.getElementById("hrbtn").onclick=function()
																				{
																					if(document.getElementById("hrbtn").value==false)
																					{
																						myStopFunction();
																						document.getElementById("hrbtn").value=true
																						document.getElementById("refht").innerHTML="-90"
																						myInt = setInterval(function(){ animatearrow(); }, 500);
										 												animateArrowATPosition(211, 542.5, 90);
																						document.getElementById("kbtn2").onclick=function()
																						{
																							myStopFunction();
																							myInt = setInterval(function(){ animatearrow(); }, 500);
										   													animateArrowATPosition(202, 133.5, 360);
										   													document.getElementById("heading").innerHTML="Data logging, Give Enable to login the data.";
																							document.getElementById("butn3").onclick=function()
																							{
																								if(document.getElementById("butn3").value==false)
																								{
																									myStopFunction();
																									document.getElementById("butn3").value=true
			 																						document.getElementById("main1-6").style.visibility="hidden"
			 																						document.getElementById("main1-42").style.visibility="hidden"
			 																						document.getElementById("main1-41").style.visibility="visible"
			 																						document.getElementById("main1-43").style.top="-18px"
			 																						document.getElementById("butn4").style.top="151px"
			 																						document.getElementById("main1-7").style.visibility="visible"
			 																						document.getElementById("tabdl1").style.visibility="visible"
																									myInt = setInterval(function(){ animatearrow(); }, 500);
																									animateArrowATPosition(475, 251.5, 360);
																									document.getElementById("dlc").onclick=function()
																									{
																										myStopFunction();   
			 																							document.getElementById("tabdl1").style.visibility="hidden"
			 																							document.getElementById("tabdl2").style.visibility="visible"
			 																							document.getElementById("dlc1").checked=true
																										myInt = setInterval(function(){ animatearrow(); }, 500);
																										animateArrowATPosition(642, 249.5, 360);
																										document.getElementById("dlc1").onclick=function()
																										{
																											myStopFunction();
																											document.getElementById("dlc1").checked=true
			 																								document.getElementById("prmpt").style.visibility="visible"
			 																								document.getElementById("tabdl").style.top="66px"
			 																								document.getElementById("tabdl2").style.top="143px"
																											myInt = setInterval(function(){ animatearrow(); }, 500);
																											animateArrowATPosition(546, 158.5, 90);
																											document.getElementById("heading").innerHTML="Give disable to log out.";
																											document.getElementById("kbtn3").onclick=function()
																											{
																												myStopFunction();
																												document.getElementById("prmpt").style.visibility="hidden"
			 																									document.getElementById("tabdl").style.top="40px"
			 																									document.getElementById("tabdl1").style.visibility="visible"
			 																									document.getElementById("tabdl2").style.visibility="hidden"
			 																									document.getElementById("dlc").checked=false
			 																									document.getElementById("dlc").disabled=true
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}	
																		}
																	}
																}
															}
													 	}
															
													}
												}
											 }
													 
										}

									}
								}
							},400);
						},300);
					}
				}
			}
		}
	}	
} 

function nextCanvas()
{
	document.getElementById("nextButton").style.visibility="visible";
}
function nextCanvas1()
{
	document.getElementById("can7-4").style.visibility="visible";
	document.getElementById("can7-5").style.visibility="visible";
	document.getElementById("note2").style.visibility="visible";
	document.getElementById("nextButton").style.visibility="visible";
}

