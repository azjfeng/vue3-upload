const koa = require('koa');
const path = require('path')
const app = new koa();
const views = require('koa-views');
const static = require('koa-static');
const KoaRouter = require('koa-router');
const router = new KoaRouter();
const koaBody = require('koa-body');
// 处理文件上传
app.use(koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 100 * 1024 * 1024,    // 设置上传文件大小最大限制，默认2M
      uploadDir: path.resolve(__dirname, './public/upload'),
      keepExtensions:true,
      hash:'md5'
    }
}))
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
