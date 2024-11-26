const { Router } = require("express");

const userRouter = require('../routers/userRouter')
const blogRouter = require('../routers/blogRouter')

const router = Router();

router.use('/',userRouter)
router.use('/',blogRouter)

module.exports = router;