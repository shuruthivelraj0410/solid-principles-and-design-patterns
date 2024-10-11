class Recommendation{
    FetchRecommendation(){};
}

class ContentViewedRecommendation extends Recommendation{ //ocp
    FetchRecommendation(userId){
        return ["1234Moview","dfgj","dfghbn","serdfghbnj"]
    }
}

class LikedRecommendation extends Recommendation{
    FetchRecommendation(userId){
        return ["1234Moview","dfgj","dfghbn","serdfghbnj"]
    }
}

class wishListRecommendation extends Recommendation{
    FetchRecommendation(userId){
        return ["1234Moview","dfgj","dfghbn","serdfghbnj"]
    }
}

class PausedVideoRecommendation extends Recommendation{
    FetchRecommendation(userId){
        return ["1234Moview","dfgj","dfghbn","serdfghbnj"]
    }
}

class TrendingRecommendation extends Recommendation{
    FetchRecommendation(userId){
        return ["1234Moview","dfgj","dfghbn","serdfghbnj"]
    }
}

class UserHomePageRecommendationList{
    constructor(userId){
        this.userId = userId;
        this.movieList = [];
        this.ContentViewedRecommendation = new ContentViewedRecommendation();
        this.TrendingRecommendation = new TrendingRecommendation();
        this.PausedVideoRecommendation = new PausedVideoRecommendation();
        this.wishListRecommendation = new wishListRecommendation();
        this.LikedRecommendation = new LikedRecommendation();
    }
    getRecommendation(){
        this.movieList.push(...this.ContentViewedRecommendation.FetchRecommendation(this.userId))
        this.movieList.push(...this.TrendingRecommendation.FetchRecommendation(this.userId))
        this.movieList.push(...this.PausedVideoRecommendation.FetchRecommendation(this.userId))
        this.movieList.push(...this.wishListRecommendation.FetchRecommendation(this.userId))
        this.movieList.push(...this.LikedRecommendation.FetchRecommendation(this.userId))
        return this.movieList
    }
}

const user1 = new UserHomePageRecommendationList("1234");
console.log(user1.getRecommendation())