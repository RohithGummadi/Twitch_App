import User from "../../models/User.js";

export const getFollowedChannels = async(req,res)=>{
    try{
        const {userId} = req.user;

        const {followedChannels}  = await User.findById(userId, {followedChannels: 1});

        //const followedChannels = FetchfollowedChannels.followedChannels

        return res.status(200).json({
            followedChannels
        })

    }catch(err){
        console.log(err);
        return res.status(500).send("Something went wrong");
    }

}