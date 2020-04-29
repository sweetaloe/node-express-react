const router = require('express').Router()

function GetData(num) {
    var cp = require('child_process');
    var childProcess = cp.spawnSync('python', ["./python/parser.py", num], {
        cwd: process.cwd(),
        env: process.env,
        stdio: 'pipe',
        encoding: 'utf-8'
    });  
    
    console.log(childProcess.output[1])
    return childProcess.output[1]
}

router.route('/plot').get((req, res) => {
    var h = req.query
    console.log(h.data)
    res.send(JSON.parse(GetData(h.data)))
})


module.exports = router