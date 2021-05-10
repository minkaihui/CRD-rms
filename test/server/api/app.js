const Koa = require('koa');
const router = require('koa-router')();
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

app.use(cors());
app.use(bodyParser());

router.get('/getTest', (ctx) => {
  ctx.body = {
    name: 'test',
  };
});

router.post('/login', (ctx) => {
  ctx.body = {
    code: 0,
    success: true,
    result: {
      userId: '1',
      username: 'mkh',
      realName: 'mkh Admin',
      desc: 'manager',
      password: '123456',
      token: 'fakeToken1',
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super',
        },
      ],
    },
  };
});

router.get('/getUserInfoById', (ctx) => {
  ctx.body = {
    code: 0,
    success: true,
    result: {
      userId: '1',
<<<<<<< HEAD
      username: 'vben',
      realName: 'Vben Admin',
=======
      username: 'mkh',
      realName: 'mkh Admin',
>>>>>>> b896a4530436029556ebfd8e70f83c2f4f0068b5
      desc: 'manager',
      password: '123456',
      token: 'fakeToken1',
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super',
        },
      ],
    },
  };
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3002, () => {
  console.log('server is listen in 3002');
});
