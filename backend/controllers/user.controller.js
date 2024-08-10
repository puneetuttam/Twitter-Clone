import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username }).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getUserProfile", error.message);
        res.status(500).json({ error: error.message });
    }
};
export const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToModify = await User.findById(id);
        const currrentUser = await User.findById(req.user._id);

        if (id === req.user._id.toString()) {
            return res
                .status(400)
                .json({ error: "You can't follow/Unfollow yourself" });
        }

        if (!userToModify || !currrentUser) {
            return res.status(400).json({ error: "User not found" });
        }

        const isfollowing = currrentUser.following.includes(id);
        if (isfollowing) {
            //Unfollow

            await User.findByIdAndUpdate(id, {
                $pull: { followers: req.user._id },
            });
            await User.findByIdAndUpdate(req.user._id, {
                $pull: { following: id },
            });
            res.status(200).json({ message: "User unfollowed successsfully" });
        } else {
            //follow
            await User.findByIdAndUpdate(id, {
                $push: { followers: req.user._id },
            });
            await User.findByIdAndUpdate(req.user._id, {
                $push: { following: id },
            });

            const newNotification = new Notification({
                type: "follow",
                from: req.user._id,
                to: userToModify._id,
            });

            await newNotification.save();

            res.status(200).json({ message: "user followed Successfully" });
        }
    } catch (error) {
        console.log("Error in followUnfollowUser", error.message);
        res.status(500).json({ error: error.message });
    }
};
export const getSuggestedUsers = async (req, res) => {
    try {
        const userId = req.user._id;
        const userFollowedByMe = await User.findById(userId).select(
            "following"
        );

        const users = await User.aggregate([
            {
                $match: {
                    _id: { $ne: userId },
                },
            },
            { $sample: { size: 10 } },
        ]);

        const filterUsers=users.filter((user)=>!userFollowedByMe.following.includes(user._id))
        const suggestedUsers=filterUsers.slice(0,4)

        suggestedUsers.forEach(user=>user.password=null)

        res.status(200).json(suggestedUsers)

    } catch (error) {
        console.log("Error in getUserProfile", error.message);
        res.status(500).json({ error: error.message });
    }
};
export const updateUser=async(req,res)=>{
    const {fullName,email,username,currentPassword,newPassword,bio,link}=req.body;
    let {}
}
