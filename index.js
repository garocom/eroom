const express = require('express');
const path = require('path');  // 경로 관리를 위한 path 모듈
const app = express();
const PORT = process.env.PORT || 3000;

// 정적 파일 제공 설정 (public 폴더 안의 파일들 제공)
app.use(express.static('public'));

// 서버가 실행 중일 때 표시되는 메시지
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// body-parser 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 정적 파일 제공 (public 폴더)
app.use(express.static('public'));

// 라우트 파일 가져오기
const entryRoutes = require('./routes/entry');
const exitRoutes = require('./routes/exit');

// 라우트 연결
app.use('/', entryRoutes);
app.use('/', exitRoutes);

// 서버 실행
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
