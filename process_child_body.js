
// 
// 시간을 10초이후 3번 Print 하여 값받아오구 특정문구면 끝나기
// 새로운 프로세스에서 받아오기  process stdin stdout


//  for 1 - 3
const { spawn } = require('child_process');
const ls = spawn('node', ['./process_child_work.js']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

// async function lsExample() {
//   //const { stdout, stderr } = await exec('nodejs ./proces_child_work.js');
//   const { stdout, stderr } = await exec('node ./process_child_work.js');
//   console.log('stdout:', stdout);
//   console.error('stderr:', stderr);
// }

// lsExample();


//  function lsExample2() {
//     const { stdout, stderr } =  exec('node ./process_child_work.js');
//     console.log('stdout:', stdout);
//     console.error('stderr:', stderr);
//   }
//   lsExample2();
