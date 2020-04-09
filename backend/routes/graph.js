const router = require('express').Router()

router.route('/graph/1').get((req, res) => {

    var cp = require('child_process');
    var childProcess = cp.spawnSync('python', ["./python/SNtot.py", "SN_m_tot_V2.0"], {
        cwd: process.cwd(),
        env: process.env,
        stdio: 'pipe',
        encoding: 'utf-8'
    });

    var result = childProcess.output[1]
    console.log(childProcess.output)
    res.send(JSON.parse(result))

})

router.route('/graph/2').get((req, res) => {

    var cp = require('child_process');
    var childProcess = cp.spawnSync('python', ["./python/SNtot.py", "SN_ms_tot_V2.0"], {
        cwd: process.cwd(),
        env: process.env,
        stdio: 'pipe',
        encoding: 'utf-8'
    });

    var result = childProcess.output[1]
    console.log(childProcess.output)
    res.send(JSON.parse(result))

})

router.route('/graph/4').get((req, res) => {

    var cp = require('child_process');
    var childProcess = cp.spawnSync('python', ["./python/KFpr.py", "KFprediCM"], {
        cwd: process.cwd(),
        env: process.env,
        stdio: 'pipe',
        encoding: 'utf-8'
    });

    var result = childProcess.output[1]
    console.log(childProcess.output)
    res.send(JSON.parse(result))

})

router.route('/graph/5').get((req, res) => {

    var cp = require('child_process');
    var childProcess = cp.spawnSync('python', ["./python/KFpr.py", "KFprediML"], {
        cwd: process.cwd(),
        env: process.env,
        stdio: 'pipe',
        encoding: 'utf-8'
    });

    var result = childProcess.output[1]
    console.log(childProcess.output)
    res.send(JSON.parse(result))

})

router.route('/graph/3').get((req, res) => {

    var cp = require('child_process');
    var childProcess = cp.spawnSync('python', ["./python/KFpr.py", "KFprediSC"], {
        cwd: process.cwd(),
        env: process.env,
        stdio: 'pipe',
        encoding: 'utf-8'
    });

    var result = childProcess.output[1]
    console.log(childProcess.output)
    res.send(JSON.parse(result))

})





module.exports = router