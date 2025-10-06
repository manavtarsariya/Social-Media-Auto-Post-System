import cron from 'node-cron';


async function callAPI(item) {


  try {
    for (let index = 0; index < item.platforms.length; index++) {

      try {
        const res = await fetch(`http://localhost:8000/mock/api/${item.platforms[index]}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            content: (item.content)
          })
        })

        const answer = await res.json();


        const response = await fetch("http://localhost:8000/api/log/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            postId: item._id,
            platform: item.platforms,
            status: answer.success,
            finaleresponse: answer.message
          })
        })

        const printlog = await response.json()

        console.log("log data :", printlog)

      } catch (error) {
        console.log("scheduler error :", error);
      }

    }

  } catch (error) {
    console.log(error)
  }


}


const allscheduledPosts = async () => {
  console.log("Fetching all scheduled posts...");

  const response = await fetch('http://localhost:8000/api/posts/getallPosts');
  const data = await response.json();

  if(!data.posts){
    return ;
  }

  const filtereddata = data.posts.filter(post => post.status === 'scheduled');


  filtereddata.forEach(async (item) => {

    const now = new Date();
    const scheduledDate = new Date(item.scheduleTime);

    const nowTrimmed = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes()
    );

    const scheduledTrimmed = new Date(
      scheduledDate.getUTCFullYear(),
      scheduledDate.getUTCMonth(),
      scheduledDate.getUTCDate(),
      scheduledDate.getUTCHours(),
      scheduledDate.getUTCMinutes()
    );

    if (nowTrimmed.getTime() === scheduledTrimmed.getTime()) {

      console.log(item)

      callAPI(item);


    }
  });

}


const sheduler = cron.schedule('* * * * *', () => {
  console.log('running a task every minute');

  allscheduledPosts();


});

export default sheduler;

