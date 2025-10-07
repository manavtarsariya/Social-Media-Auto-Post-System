import cron from 'node-cron';
import Post from '../models/Post.js';
import Log from '../models/Log.js';


async function callAPI(item) {

  let postid;

  try {

    for (let index = 0; index < item.platforms.length; index++) {

      try {
        const res = await fetch(`http://localhost:8000/mock/api/${item.platforms[index]}`, {
          method: "GET",

        })

        const answer = await res.json();
        console.log(answer)


        // const response = await fetch("http://localhost:8000/api/log/create", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json"
        //   },
        //   credentials: "include",
        //   body: JSON.stringify({
        //     postId: item._id,
        //     platform: item.platforms,
        //     status: answer.success,
        //     finaleresponse: answer.message
        //   })
        // })

        const log = await Log.create({
          postId: item._id,
          platform: item.platforms, // or a single platform if needed
          status: answer.success,
          finaleresponse: answer.message,
          userId: item.userId
        });

        console.log("log data :", log)

        if (!postid) {
          postid = log.postId
        }

        // return successresults;

      } catch (error) {
        console.log("scheduler error :", error);
      }

    }
    // console.log(postid)
    return postid

  } catch (error) {
    console.log(error)
  }


}


const allscheduledPosts = async () => {
  console.log("Fetching all scheduled posts...");

  // const response = await fetch('http://localhost:8000/api/posts/getallPosts', {
  //   credentials: "include" // ✅ add this
  // });
  const now = new Date();
  const scheduledPosts = await Post.find({
    status: "scheduled",
    scheduleTime: { $lte: now }
  })
  console.log(scheduledPosts)
  // const data = await response.json();

  if (!scheduledPosts) {
    return;
  }


  // filtereddata.forEach(async (item) => {

  //   const now = new Date();
  //   const scheduledDate = new Date(item.scheduleTime);

  //   const nowTrimmed = new Date(
  //     now.getUTCFullYear(),
  //     now.getUTCMonth(),
  //     now.getUTCDate(),
  //     now.getUTCHours(),
  //     now.getUTCMinutes()
  //   );

  //   const scheduledTrimmed = new Date(
  //     scheduledDate.getUTCFullYear(),
  //     scheduledDate.getUTCMonth(),
  //     scheduledDate.getUTCDate(),
  //     scheduledDate.getUTCHours(),
  //     scheduledDate.getUTCMinutes()
  //   );

  //   if (nowTrimmed.getTime() === scheduledTrimmed.getTime()) {

  //     console.log(item)



  //   }
  // });


  for (const post of scheduledPosts) {

    const result = callAPI(post);

    (async function () {
      try {
        const res = await Post.findByIdAndUpdate({_id : post._id}, { // just pass result directly
          status: "posted"
        }, { new: true }); // optional: return the updated doc

        console.log("Post updated:", res);
      } catch (err) {
        console.error("Error updating post:", err);
      } 
    })();

  }


}


const sheduler = cron.schedule('* * * * *', () => {
  console.log('running a task every minute');

  allscheduledPosts();


});

export default sheduler;

