
// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

// async function lsExample() {
//   //const { stdout, stderr } = await exec('nodejs ./proces_child_work.js');
//   const { stdout, stderr } = await exec('terraform');
//   console.log('stdout:', stdout);
//   console.error('stderr:', stderr);
// }

// lsExample();



// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

//  function lsExample() {
//   //const { stdout, stderr } = await exec('nodejs ./proces_child_work.js');
//   const { stdout, stderr } =  exec('terraform');
//   console.log('stdout:', stdout);
//   console.error('stderr:', stderr);
// }

// lsExample();
/*
var sub_arg1 = [];
sub_arg1.push( 'list');
sub_arg1.push('workspace');
*/

const { spawn } = require('child_process');

class PROCESS_TERRAFORM
{

    Plan()
    {

    }
   
    constructor()
    {
        this.sub_arg1 = [];

    }

    ProcessCmd()
    {
    
        //const { spawn } = require('child_process');
        var ls ;
    
        // push 를 거꾸로 넣어야 한다. 
        if(this.sub_arg1.length == 1)
        {
            ls = spawn('node', ['./process_child_work.js']);
         //   ls = spawn('terraform', [sub_arg1.pop()]);
        }
        else if(this.sub_arg1.length == 2)
            ls = spawn('terraform', [this.sub_arg1.pop(),this.sub_arg1.pop()]);
        else if(this.sub_arg1.length == 3)
            ls = spawn('terraform', [this.sub_arg1.pop(),this.sub_arg1.pop(),this.sub_arg1.pop()]);
        //const ls = spawn('terraform workspace ls');
        //const ls = spawn('terraform',[ 'workspace', 'list']);
    
        ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        });
    
        ls.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        });
    
        ls.on('close', (code) => {
        console.log(`terraform command end time %s, %s: `, this._yyyymmdd() , code );
        });
    
    }    

    ProcessCmd2(arg1, arg2, arg3){
    
        const { spawn } = require('child_process');
        var ls ;
    
        if(arg1 != null && arg1 != "" 
        && arg2 != null && arg2 != ""
        && arg3 != null && arg3 != ""
        )
            ls = spawn('terraform', [arg1, arg2, arg3]);
        else if( 
           arg1 != null && arg1 != "" 
        && arg2 != null && arg2 != ""        
        )
            ls = spawn('terraform', [arg1, arg2]);
        else if(arg1 != null && arg1 != "" )
            ls = spawn('terraform', [arg1] );

        
        ls.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });
    
        ls.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
            console.log(`terraform command end time : `, this._yyyymmdd() );
        });
    
        ls.on('close', (code) => {
            //console.log(`child process exited with code ${code}`);
            console.log(`terraform command end time: %s, %s`, this._yyyymmdd() , code);
        });
    
    }    
    _DeleteAgrs(){
        this.sub_arg1.splice(0, this.sub_arg1.length);
        if(  !(this.sub_arg1.length <= 0) )
            console.log(" argument 가 남아 있습니다. ");
    }

    _yyyymmdd() {
        function twoDigit(n) { return (n < 10 ? '0' : '') + n; }
    
        var now = new Date();
        return '' + now.getFullYear() +'-' + twoDigit(now.getMonth() + 1) +'-' + twoDigit(now.getDate())
        + ' ' + now.toTimeString().slice( 0, 8);
        ;
    }
}

var terra_cmd =  new PROCESS_TERRAFORM;
console.log( terra_cmd.ProcessCmd2('plan', '-var-file=../detest/myapp/input/test.tfvars', '') );

/*
var terra_cmd =  new TERRAFORM_CMD;
terra_cmd.sub_arg1.push("test");
//console.log( terra_cmd.ProcessCmd() );
terra_cmd._DeleteAgrs();
terra_cmd.sub_arg1.push("ls");
console.log("date: %s", terra_cmd._yyyymmdd() );
terra_cmd.ProcessCmd()
//terra_cmd.ProcessCmd2("workspaces", 'version', '');
*/


//var PROCES_tErraform = new PROCESS_TERRAFORM();
//module.exports = PROCES_tErraform;


module.exports.PROCESS_TERRAFORM = PROCESS_TERRAFORM;
