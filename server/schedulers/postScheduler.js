import cron from 'node-cron';


const allscheduledPosts = async () => {
    console.log("Fetching all scheduled posts...");
    
    const response = await fetch('http://localhost:8000/api/posts/getallPosts');
    const data = await response.json();
    
    const filtereddata= data.posts.filter(post => post.status === 'scheduled');
        console.log("Fetched posts:", filtereddata);


    const platformslength = filtereddata.length;

    filtereddata.forEach((item , index) => {
      
    });



    // for (let index = 0; index < platformslength ; index++) {
      
      
    // }

    

    console.log("Scheduled posts:", filtereddata);
}


const sheduler = cron.schedule('* * * * * *', () => {
  console.log('running a task every minute'); 
  
  allscheduledPosts();




});

export default sheduler;
// console.log('Post scheduler started');

