personName="";
blahblah=personName;
personAccuracy="";
personLabel=document.getElementById("guessPerson");
objectLabel=document.getElementById("guessObject");
poseX="";
poseY="";

function setup(){
    video=createCapture(VIDEO);
    video.hide();
    canvas=createCanvas(900,660);
    canvas.center();
    personModel=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/vg_oU7S0D/model.json",personModelLoaded);
    objectModel=ml5.imageClassifier("MobileNet",objectModelLoaded);
    posenetModel=ml5.poseNet(video,posenetModelLoaded);
}

function personModelLoaded(){
    console.log("Person model loaded.")
}

function objectModelLoaded(){
    console.log("Object model loaded.")
}

function posenetModelLoaded(){
    console.log("PoseNet model loaded.")
}

function draw(){
    image(video,0,0,900,660);
    personModel.classify(video,getPerson);
    objectModel.classify(video,getObject);
    posenetModel.on("pose",getPose);
    fill("white");
    text("Person",poseX,poseY);
}

function getPerson(error,personResults){
    if (error){console.error(error);}
    else {
        console.log(personResults);
        personName=personResults[0].label;
        personAccuracy=floor(personResults[0].confidence*100)+"%";
        document.getElementById("guessPerson").innerHTML=personName;
        document.getElementById("accuracyPerson").innerHTML=personAccuracy;
    }
}

function getObject(error,objectResults){
    if (error){console.error(error);}
    else {
        console.log(objectResults);
        objectName=objectResults[0].label;
        objectAccuracy=floor(objectResults[0].confidence*100)+"%";
        document.getElementById("guessObject").innerHTML=objectName;
        document.getElementById("accuracyObject").innerHTML=objectAccuracy;
    }
}

function getPose(poseResults){
    if (poseResults.length>0){
        console.log(poseResults);
        poseX=poseResults[0].pose.nose.x;
        poseY=poseResults[0].pose.nose.y+100;
        personLabel.style.left=poseX;
        personLabel.style.top=poseY;
    }
}