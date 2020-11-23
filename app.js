const koa = require('koa');
const path = require('path')
const app = new koa();
const views = require('koa-views');
const static = require('koa-static');
const KoaRouter = require('koa-router');
const router = new KoaRouter();


app.use(views(__dirname+"/common/"));
app.use(static((path.join(__dirname,'/'))))

router.get('/', async (ctx ,next)=>{
    // ctx.body="aaaa"
    await ctx.render('index')
    // await next();
})
router.post("/upload",async(ctx,next)=>{
     ctx.body = 'aa';
     await next();
})


app.use(router.routes()).use(router.allowedMethods())

app.listen('3000',function(){
    console.log("http://127.0.0.1:3000")
})