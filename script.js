let classifier;
let video;
var spring = 0.05;
var gravity = 0.03;
var friction = -0.9;
var balls = [];
var drawing_balls = [];
var start_prediction = false;
var button;
var button_question;
//var socket = io();
var maskImage;
var canvas;
var ctx;

image_width = 600;
image_height = 420;
image_x = window.innerWidth/2-(image_width/2);
image_y = window.innerHeight/2-(image_height/2);


function setup() {
  bg = loadImage("back2.png");
  createCanvas(window.innerWidth, window.innerHeight);
  //maskImage = createGraphics(512,512);
  frameRate(10);

  //creating a button that will start the classifier
  //canvas = document.getElementById('defaultCanvas0');
  //ctx = canvas.getContext('2d');
  button = createButton("Let's find out!");
  button.position(window.innerWidth/2 - 70, window.innerHeight/2 + image_height/2 + 50);
  var github_link = createP("<h4><font color ='white'>Designed by Krishna Gaire - <a href = 'https://github.com/kg1642/WhatDoesTheComputerSeesInYou'></font> GitHub</h4>");
  //var text = document.createTextNode("Designed by Krishna - GitHub");
  //github_link.setAttribute("href", "https://github.com/kg1642/WhatDoesTheComputerSeesInYou");
  //github_link.appendChild(text);
  button.mousePressed(start_prediction_input);

  button_question = createButton('?');
  button_question.position(button.x+230, button.y);
  github_link.position(window.innerWidth/2 - 150,  window.innerHeight-40)
  button_question.mousePressed(show_popup);
  
  // Create a camera input
  video = createCapture(VIDEO);
  //size is 0,0 so that a secondary display is not shown.
  video.size(0,0);

  // Initialize the Image Classifier method with MobileNet and the video as the second argument
  //socket.emit('classify', video)
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);
}
//socket.emit('classify', video);

//hides the buttona and changes start_prediction to true once the button is pressed
function start_prediction_input(){
  start_prediction = true;
  button.hide();
  button_question.hide();
}

function show_popup(){
  //alert('The website guesses what it sees from your webcam. It represents that information in terms of circle. Size of the circle corressponds to how confident the wesbite is in its prediction. HAVE FUN!!!')
  //var x = document.getElementById("myModal");
  //x.style.display = "block";
  $("#myModal").modal();
} 

function modelReady() {
  // Change the status of the model once its ready
  // Call the classifyVideo function to start classifying the video
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.predict(gotResult);
}

//list of all class names predicted. This allows me to check if a class was already predicted or not.
var class_names_list = [];

function update_class_names_list(remove_balls){
  if (remove_balls.length > 0){
    remove_balls.forEach(ball=>{
      try {
        class_names_list.splice(class_names_list.indexOf(ball.txt), 1);
      }
      catch(err) {
        console.log(err.message)
      }
    })
  }
}

// When we get a result
function gotResult(err, results) {

  //if the results exists and the start_prediction is true
  if (results != undefined && start_prediction==true){

    //looping through the results
    for (i = 0; i<results.length; i++){
      //spilitting the class name 
      class_name_per_label = results[i].className.split(',');
      //looping through the class names of the label
      k = balls.length;

      //if the class name alraedy exist do nothing. If it does not create it to create a ball
      if (class_names_list.indexOf(class_name_per_label[0]) < 0 && results[i].probability > 0.2){
        console.log(results[i].probability)
          var new_pos_found = false;
          //loop until the position of the ball does not overlap with other balls
          while (!new_pos_found){
            ball_diameter = (results[i].probability*200)+70;
            ball_height = random(150, height-(ball_diameter/2));
            ball_width = random(0+(ball_diameter/2), width-(ball_diameter/2));
            new_pos_found = true;
            balls.forEach(ball => {
              var dx = ball.x - ball_width;
                var dy = ball.y - ball_height;
                var distance = sqrt(dx * dx + dy * dy);
                var minDist = ball.diameter / 2 + ball_diameter / 2;
                if (distance < minDist) {
                  new_pos_found = false;
                }
              });
            }
            //creating a new ball
          balls[k] = new Ball(ball_width, ball_height, ball_diameter, k, 255, class_name_per_label[0], results[i].probability);
          noStroke();
          fill(255, 204);
          class_names_list.push(class_name_per_label[0]);
      } 
      
       //removing balls whose transparency is less than 20
      remove_balls = balls.filter(function (ball) { return ball.trans < 20;});
      update_class_names_list(remove_balls);
      balls = balls.filter(function (ball) { return ball.trans > 20;});
    }
    //select('#result').html(results[0].className);
    //select('#probability').html(nf(results[0].probability, 0, 2));
  }
    classifyVideo();
}


function draw() {
  //setting backgroud
  background(bg);

  //setting the heading 
  textFont('Orbitron');
  textSize(46);
  textAlign(CENTER);
  fill(255);
  text('What Does the Computer See In You?', innerWidth/2, 100);

  //if the start_prediction is true then shrink the webcam video size and start predicting
  if (start_prediction == true){
      if (image_height > 120) {
        image_width = image_width - 24;
        image_height = image_height - 16;
        image_x = window.innerWidth/2 - image_width/2;
        image_y = window.innerHeight/2 - image_height/2;
        image(video, image_x, image_y, image_width, image_height);
        tint(255, 127); 
        return;
      }

      //ctx.image(video, 250, 200, 120, 120);
      //requestAnimationFrame(update);
    // now we change the gCO
      //ctx.globalCompositeOperation='destination-in';
      //ctx.beginPath();
      //ctx.arc(75, 75, 50, 0, Math.PI*2);
      //ctx.fillStyle = "#0095DD";
      //ctx.fill();
    // reset to default
      //ctx.globalCompositeOperation='source-over';
      image(video, image_x, image_y, image_width, image_height);
      tint(255, 127); 
  }
  else {
     //maskImage.beginDraw();
    //maskImage.background(video);
    //maskImage.image(video, 150, 75, 60, 60);
    image(video, image_x, image_y, image_width, image_height);
    //image(maskImage, 50, 75);
    tint(255, 255); 
  }
  
  //displaying each ball if balls exist
  if (balls.length > 0){
    balls.forEach(ball => {
       ball.collide();
      ball.move();
      ball.display();
      ball.transparency();
    });
  }
}


function Ball(xin, yin, din, idin, trans, txt, probs) {
  this.probs = probs
  this.x = xin;
  this.y = yin;
  var vx = 0;
  var vy = 0;
  this.diameter = din;
  this.id = idin;
  this.others = balls;
  this.trans = trans;
  this.txt = txt;

  this.r = random(255);
  this.g = random(255);
  this.b = random(255);

  //this function detects collision
  this.collide = function() {
    for (var i = this.id+1; i < this.others.length; i++) {
      try {
        var dx = this.others[i].x - this.x;
        var dy = this.others[i].y - this.y;
        var distance = sqrt(dx * dx + dy * dy);
        var minDist = this.others[i].diameter / 2 + this.diameter / 2;
          if (distance < minDist){
            console.log("Collided");
            var angle = atan2(dy, dx);
            var targetX = this.x + cos(angle) * minDist;
            var targetY = this.y + sin(angle) * minDist;
            var ax = (targetX - this.others[i].x) * spring;
            var ay = (targetY - this.others[i].y) * spring;
            vx -= ax;
            vy -= ay;
            this.others[i].vx += ax;
            this.others[i].vy += ay;
        }
      }
      catch (err){
        console.log(err.message);
      }
    }
  };

//this function moves the bal downwards each frame
  this.move = function() {
    vy += gravity;
    this.x += vx;
    this.y += vy;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      vy *= friction;
    }
  };

  //increase the transparency of the balls
  this.transparency = function (){
    this.trans = this.trans-2;
    fill(255);
    textSize(20);
    text(txt, this.x, this.y);
    //console.log(this.trans);  
  }

  //displays the ball
  this.display = function() {
    fill(this.r, this.g, this.b, this.trans);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };
}
