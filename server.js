const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json()); // REST API는 json 타입을 이용해서 데이터를 주고 받는다.
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json'); // db 설정파일 호출
const conf = JSON.parse(data);
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER WHERE isDeleted = 0",
        (err, rows, fields) => { // SELECT 된 데이터는 rows 가 처리할수 있다.
            res.send(rows);
        }
    );
    // query(param1, param2)
    // param1: 실제로 동작할 쿼리
    // param2: callback function.
});

const multer = require('multer');
const upload = multer({ dest: './upload' }); // root/upload 폴더를 사용자의 파일이 업로드가 되는 공간으로 지정!!

// upload란 이름의 폴더를 유저가 접근해서 확인하기 위해, express.static을 이용해 업로드 폴더를 공유한다.
app.use('/image', express.static('./upload')); // 사용자는 도메인/image 로 접근하는데, 실제로는 실제 서버의 업로드 폴더에 접근하는?

app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, ?, now(), 0)';
    let image = '/image/' + req.file.filename; // image는 이미 서버에 있다고 가정하고 유저의 upload 폴더에 담아두므로.. 파일 경로만을 db에 넣도록 한다.
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job]; // sql과 binding 될 배열
    connection.query(sql, params,
        (err, rows, fields) => {
            // err에는 오류가 발생한 경우에 대한 정보가 담김.
            res.send(rows);
        })
});

// delete method로 접속을 한 경우.
app.delete('/api/customers/:id', (req, res) => {
    let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
    let params = [req.params.id];
    connection.query(szl, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    );
})

app.listen(port, () => console.log(`Listening on port ${port}`));

/*
DB에 넣어둘 값
[
        {
            'id': 1,
            'image': 'https://placeimg.com/64/64/any',
            'name': '이순신',
            'birthday': '961222',
            'gender': '남자',
            'job': '대학생'
        },
        {
            'id': 2,
            'image': 'https://placeimg.com/64/64/2',
            'name': '박혁거세',
            'birthday': '901022',
            'gender': '남자',
            'job': '대학생'
        },
        {
            'id': 3,
            'image': 'https://placeimg.com/64/64/3',
            'name': '홍길동',
            'birthday': '911121',
            'gender': '남자',
            'job': '대학생'
        }
    ]
    */