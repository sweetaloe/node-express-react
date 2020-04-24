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

router.route('/graph/plot').get((req, res) => {
    var h = req.query
    
    res.send(JSON.parse(GetData(h.a)))
})

module.exports = router