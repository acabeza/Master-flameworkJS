const { exec } = require("child_process");

init = function() {
    let runAngularServer, mongod, backend;
    runAngularServer = 'cd ./AprendiendoAngular'
    exec(runAngularServer);
}