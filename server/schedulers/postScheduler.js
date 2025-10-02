import cron from 'node-cron';


const sheduler = cron.schedule('* * * * * *', () => {
  console.log('running a task every second');
});

export default sheduler;
// console.log('Post scheduler started');

