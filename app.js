const koa = require('koa');
const path = require('path')
const app = new koa();
const views = require('koa-views');
const static = require('koa-static');
const KoaRouter = require('koa-router');
const router = new KoaRouter();
const koaBody = require('koa-body');

const OptPool = require('./mysql/mysql.js');
const { resolve } = require('path');

const optPool = new OptPool();

const pool = optPool.getPool();

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
    console.log(ctx.request.origin)
    ctx.body = 'aa';
    // console.log(ctx.request.files.file0.path.split('\\'))
    let len = Object.keys(ctx.request.files).length;
    let key = '';
    let params = '';
    for (let i = 0; i < len; i++) {
        key = ctx.request.files['file'+i].path.split('\\').length;
        params =  ctx.request.files['file'+i].path.split('\\')[key -1];
        let url =ctx.request.origin+'/public/upload/'+params
        

        pool.getConnection((err, conn) => {
            if(err){
                console.log(err+'aaaaaaaa')
            }
            const sql = "insert into cdn(id,url,time) values(?,?,?)";
            conn.query(sql,[null,url,new Date()], (err, result) => {
               if(err){
                   console.log(err)
                   return ;
               }
             conn.release();
            });
        });
    }
    // console.log(Object.keys(ctx.request.files))

})

router.get('/getFile',async(ctx,next)=>{
  let promise = new Promise((reslove,reject)=>{
        pool.getConnection((err, conn) => {
            if(err){
                console.log(err+'aaaaaaaa')
            }
            const sql = 'select * from cdn';
            conn.query(sql, (err, result) => {
               if(err){
                   console.log(err)
                   return ;
               }
             conn.release();
             reslove(result)
            });
        });
    })
   let data = await promise
   ctx.body = data


})


app.use(router.routes()).use(router.allowedMethods())

app.listen('3000',function(){
    console.log("http://127.0.0.1:3000")
})
