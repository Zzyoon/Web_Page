import express, {NextFunction} from 'express'

const app = express() //express 앱 만들기

app.get('/', (req:express.Request, res:express.Response, next:NextFunction)=> {
    console.log('nodemon')
    res.send('hello')
})

app.listen(9000, () => {
    console.log('server running')
})