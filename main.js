song = ""
leftWristX = ""
leftWristY = ""
rightWristX = ""
rightWristY = ""
scoreLeftWrist = ""
scoreRightWrist = ""

function preload()
{
song = loadSound("music.mp3")
}

function setup()
{
canvas = createCanvas(650,500)
canvas.position(400,150)

video = createCapture(VIDEO)
video.hide()

poseNet = ml5.poseNet(video, modelLoaded)
poseNet.on('pose', gotPoses)
}

function gotPoses(results)
{
    if(results.length > 0)
    {

scoreLeftWrist = results[0].pose.keypoints[9].score
scoreRightWrist = results[0].pose.keypoints[10].score
console.log(scoreLeftWrist)
console.log(scoreRightWrist)

        console.log(results)
        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        console.log("Left wrist x = " + leftWristX)
        console.log("Left wrist y = " + leftWristY)
        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        console.log("Right wrist x = " + rightWristX)
        console.log("Right wrist y = " + rightWristY)
    }
}

function modelLoaded()
{
    console.log("MoDeL lOaDeD hUmAnS")
}

function draw()
{
    image(video,0,0,650,500)

    fill("red")
    stroke("black")

if(scoreLeftWrist > 0.2)
{
    circle(leftWristX, leftWristY, 20)
    leftY = Number(leftWristY)
    LeftY = floor(leftY)
    LeftWristY = LeftY/500
    document.getElementById("volume").innerHTML = "Volume- " + LeftWristY
song.setVolume(LeftWristY)
console.log(LeftWristY)
}

if(scoreRightWrist > 0.2)
{
    circle(rightWristX, rightWristY, 20)
    rightY = Number(rightWristY)
    RightY = floor(rightY)
    
    if(RightY => 0 && RightY <= 100)
    {
        song.rate(0.5)
        document.getElementById("speed").innerHTML = "Speed- 0.5 - Very slow"
    }

    if(RightY > 100 && RightY <= 200)
    {
        song.rate(1)
        document.getElementById("speed").innerHTML = "Speed- 1 - Normal"
    }

    if(RightY > 200 & RightY <= 300)
    {
        song.rate(1.5)
        document.getElementById("speed").innerHTML = "Speed- 1.5 - Fast"
    }

    if(RightY > 300 & RightY <= 400)
    {
        song.rate(2)
        document.getElementById("speed").innerHTML = "Speed- 2 - Double"
    }

    if(RightY > 400 & RightY <= 500)
    {
        song.rate(2.5)
        document.getElementById("speed").innerHTML = "Speed- 2.5 - Very Fast"
    }
}
}

function play()
{
    song.play()
    song.rate(1)
}

function pause()
{
    song.pause()
}

function stop()
{
    song.stop()
}