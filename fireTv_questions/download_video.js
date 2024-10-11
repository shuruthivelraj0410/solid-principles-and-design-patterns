//  Design a Multi-threaded Download Manager for Video Content

// single responsibility principle

class Download{
    constructor(url,id,name,userid){
        this.url = url;
        this.id = id;
        this.name = name;
        this.userid = userid;
        this.status = "Initiated"
    }
    updateStatus(status){
       this.status = status
    }
}

// observer pattern;

class DownloadProgress{
    constructor(){
        this.download = [];
    }
    async addDownload(url,id,name,userid){
        let downloadMovie = new Download(url,id,name,userid);  // Factory pattern 
        this.download.push(downloadMovie);
        console.log("------>",await this.startDownloading(downloadMovie))
    }
    startDownloading(obj){
        return new Promise((resolve)=>{
            obj.updateStatus("downloading 40%");
            setTimeout(()=>{
            obj.updateStatus("Completed");
            console.log("Download completed ")
            resolve(obj)
            },2000)
        })
    }

}

const movie1 = new DownloadProgress();
movie1.addDownload("sacubvsaub",123,"shuruthi",2345678);
console.log(movie1)
