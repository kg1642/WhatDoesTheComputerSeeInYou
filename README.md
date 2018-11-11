# About

[What Does the Computer Sees In You](https://kg1642.github.io/WhatDoesTheComputerSeesInYou/) predicts what it sees from the webcam of the user's device. The users needs to allow the website to use the webcam. It uses the [MobileNet (ml5 image classification model)](https://ml5js.org/docs/video-classification-example) model to make a prediction.
The prediction made are represented by the circles. The size of the circle corresponds to how confident the website in its prediction. Users are encouraged to actively interact with the website. However, unlike 
many other websites, participatory medium is not keybpard or mouse but it is webcam where users interact by showing different objects in front of the webcam and see whether the website predicts the objects. It is a different kind of .

[HAVE FUN!!!](https://kg1642.github.io/WhatDoesTheComputerSeesInYou/)

![](https://github.com/kg1642/WhatDoesTheComputerSeesInYou/blob/master/start_window.png 'Start Window')

![](https://github.com/kg1642/WhatDoesTheComputerSeesInYou/blob/master/bottle_predicted.png 'Predicted water bottle with high confidence')

# Motivation and Process
As an aspiring Machine Learning Engineer, I am in awe of the ability of machine learning models and algorithms to solve complex problems. Although, many people have used softwares that use machine learning models and algorithms, most are unaware about these algorithms' capabilities and in some cases their existence. Therefore, I
wanted to use this opportunity to create an interactive project where I could present Machine Learning in a fun way. Although, the project, does not tell the user much about how the algorithms works, I hope it encourages the user to learn about more machine learning or at least makes them aware of algorithms' capabilities and existence.

I decided to use p5 and ml5 for this project. As I was interested in using machine learning algorithms, ml5 became an obvious choice
due to its ease of use. However, I had not used p5 before and did not know much about it. But I thought it would be an interesting opportunity to learn about a new tool(p5).

# Design Decision
As the project is about Machine Learning, I wanted to go with sci-fi theme. The fonts chosen are geometric. The geometric fonts represents the digital nature of the computers. The font has more straight lines (digital). Similarly, the background also adds to the sci-fi theme.
After the users click 'Lets find out!' button, the webcam footage size appears to decrease and go inside the core of a seemingly computing device adding more to the sci-fi theme.

# Resources
- [p5](https://p5js.org/)
- [ml5](https://ml5js.org/)

# Major Challenges

Most of the challenges I faced were learning the nuances of p5. p5 draws on the screen and runs the draw function number of times (usually 30-60 times) per second. As I using predicting on a live webcam
footage, the project required a lot more computing power than a normal webpage. Therefore, I had to make sure that my code was efficient so that users could use the website without having their device struggling to perform.
Other than that, there were not any specific challenges but a lot of small ones which for most part were p5 nuances.

# Next Steps

The next steps for this project would be to add other machine learning models. This would allow the users to compare results from different models. Also, the website is not well optimized for smaller screens. Making it well optimized for all screen sizes would be very useful.
In addition to that, I would add more information about the machine learning models used. 

