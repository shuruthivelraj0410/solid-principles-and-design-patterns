// changing streamings or movies while watching in between or switch to something. 
// when ever you have a switch keyword use strategy pattern and dependecy inversion principle.

class Video{  // Encapsulation and Abstraction
    play(){}
    stop(){}
    pause(){}
}

class Serial extends Video{  // OCP principle
    constructor(videoId,userId,videoCompletedTime){
        super();
        this.videoId = videoId;
        this.userId = userId;
        this.videoCompletedTime = videoCompletedTime;
    }
    play(){
        //updateDb(this)
        console.log(`${this.userId} ---> playing---> ${this.videoId}`)
    }
    stop(){
        //updateDb(this)
        console.log(`${this.userId} ---> stopped---> ${this.videoId}`)
    }
    pause(){
        //updateDb(this)
        console.log(`${this.userId} ---> paused---> ${this.videoId}`)
    }
}

class Movie extends Video{
    constructor(videoId,userId,videoCompletedTime,gener){
        super();
        this.gener = gener
        this.videoId = videoId;
        this.userId = userId;
        this.videoCompletedTime = videoCompletedTime;
    }
    play(){
        //updateDb(this)
        console.log(`${this.userId} ---> playing---> ${this.videoId}`)
    }
    stop(){
        //updateDb(this)
        console.log(`${this.userId} ---> stopped---> ${this.videoId}`)
    }
    pause(){
        //updateDb(this)
        console.log(`${this.userId} ---> paused---> ${this.videoId}`)
    }
}

class Stream{  // DI principle
    constructor(obj){
        this.streaming = obj;
    }
    play(){
    this.streaming.play();
    }
    stop(){
    this.streaming.stop();
    }
    pause(){
    this.streaming.pause();
    }
    changeVideo(video_obj){  // strategy pattern 
        this.streaming = video_obj;
    }
}

// prepare objects

const Mettioli = new Serial(123,234,"16mins");
const Goat = new Movie(908,987,"56mins","Entertainment");

const watch = new Stream(Mettioli);



// do actions with objects

watch.play();
watch.pause();
watch.changeVideo(Goat);
watch.stop();
watch.play();
watch.play();



