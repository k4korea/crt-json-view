    
    /*
    const   fs = require('fs');

    fs.open("crt.txt", "r", (err,fd)=>{

        stream = fs.createReadStream(process.argv[2]);


        stream.on('data', function(chunk) {
            process.stdout.write(chunk);
        });

    });
    
*/

/*
process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write(`data: ${chunk}`);
  }
});

process.stdin.on('end', () => {
  process.stdout.write('end');
});
*/


var a = "(known after apply)  ipv6_addresses               = (known after apply) \
+ key_name                     = (known after apply) ";
/*
+ network_interface_id         = (known after apply)
+ outpost_arn                  = (known after apply)
+ password_data                = (known after apply)
+ placement_group              = (known after apply)
+ primary_network_interface_id = (known after apply)
+ private_dns                  = (known after apply)
+ private_ip                   = (known after apply)
+ public_dns                   = (known after apply)
+ public_ip                    = (known after apply)
+ security_groups              = (known after apply)
+ source_dest_check            = true
+ subnet_id                    = (known after apply)
+ tenancy      (known after apply)
+ volume_tags                  = (known after apply)
+ vpc_security_group_ids       = (known after apply)

+ ebs_block_device {
    + delete_on_termination = (known after apply)
    + device_name           = (known after apply)
    + encrypted             = (known after apply)
    + iops                  = (known after apply)";
    */
   process.stdin.setEncoding('utf8');   
const { Readable } = require("stream");
const inStream = new Readable()

console.log(a);




process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write(`data: ${chunk}`);
  }
});


/*
inStream.push(process.stdin);
inStream.push("test");
inStream.push(null) // 더 이상 데이터 없음

inStream.pipe(process.stdout)
*/
    /*
process.stdin.pipe(process.stdout);


const { Readable } = require("stream")

*/
