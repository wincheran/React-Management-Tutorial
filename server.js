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
        "SELECT * FROM CUSTOMER",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
    // query(param1, param2)
    // param1: 실제로 동작할 쿼리
    // param2: callback function.
});

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