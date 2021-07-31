hp = ""
pan = ""
leftWristX = ""
leftWristY = ""
rightWristX = ""
rightWristY = ""
scoreLeftWrist = 0
scoreRightWrist = 0
songName = ""

function preload() {
    hp = loadSound("harrypotter.mp3"); 
    pan = loadSound("peterpan.mp3"); 
}


function setup() {
    canvas = createCanvas(600, 450)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)
}

function modelLoaded() {
    console.log("MoDeL lOaDeD hUmAnS")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results)
        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        console.log("Left wrist x = " + leftWristX)
        console.log("Left wrist y = " + leftWristY)
        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        console.log("Right wrist x = " + rightWristX)
        console.log("Right wrist y = " + rightWristY)
        scoreLeftWrist = results[0].pose.keypoints[9].score
        scoreRightWrist = results[0].pose.keypoints[10].score
    }
}


    function draw() {
        image(video, 0, 0, 600, 450)

        fill("red")
        stroke("black")

        if(scoreLeftWrist > 0.2)
        {
            circle(leftWristX, leftWristY, 20)
            pan.play()
            hp.stop()
            songName = "Peter Pan Song"
            document.getElementById("song_header").innerHTML = "Song Name: " + songName
            checkpan = "playing"
        }
        if (scoreRightWrist > 0.2)
        {
            circle(rightWristX, rightWristY, 20)
            pan.stop()
            hp.play()
            songName = "Harry Potter Theme Song"
            document.getElementById("song_header").innerHTML = "Song Name: " + songName
        }
    }
