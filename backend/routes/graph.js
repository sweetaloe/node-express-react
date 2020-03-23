const router = require('express').Router()


router.route('/graph').get((req, res) => {

    var cp = require('child_process');
    var childProcess = cp.spawnSync('python', ["./python/points.py"], {
        cwd: process.cwd(),
        env: process.env,
        stdio: 'pipe',
        encoding: 'utf-8'
    });

    var result = childProcess.output[1]
    res.send(JSON.parse(result))

})



module.exports = router