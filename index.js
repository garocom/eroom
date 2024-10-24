const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// body-parser 미들웨어 설정 (POST 요청 데이터를 처리)
app.use(bodyParser.urlencoded({ extended: true }));

// 임시 데이터 저장소 (메모리에 저장)
const records = [];

// 정적 파일 제공
app.use(express.static('public'));

// GET 요청 처리: 입장 폼 제공
app.get('/entry/room1', (req, res) => {
  res.sendFile(path.join(__dirname, 'entry', 'room1.html'));
});

// GET 요청 처리: 퇴장 폼 제공
app.get('/exit/room1', (req, res) => {
  res.sendFile(path.join(__dirname, 'exit', 'room1.html'));
});

// POST 요청 처리: 입장 기록 저장
app.post('/submit-entry', (req, res) => {
  const { name, purpose } = req.body;
  
  if (!name || !purpose) {
    return res.status(400).send('입력 값이 누락되었습니다.');
  }

  const entryRecord = { name, purpose, type: 'entry', timestamp: new Date() };
  records.push(entryRecord); // 데이터를 메모리에 저장
  
  // 리다이렉트 또는 응답을 통해 확인 메시지 표시
  res.send(`
    <html>
      <head><title>입장 기록 완료</title></head>
      <body>
        <h1>입장 기록이 저장되었습니다!</h1>
        <p>이름: ${name}</p>
        <p>출입 목적: ${purpose}</p>
        <a href="/entry/room1">다시 입력하기</a>
      </body>
    </html>
  `);
});

// POST 요청 처리: 퇴장 기록 저장
app.post('/submit-exit', (req, res) => {
  const { name, notes } = req.body;
  
  if (!name) {
    return res.status(400).send('입력 값이 누락되었습니다.');
  }

  const exitRecord = { name, notes, type: 'exit', timestamp: new Date() };
  records.push(exitRecord); // 데이터를 메모리에 저장
  
  res.send(`
    <html>
      <head><title>퇴장 기록 완료</title></head>
      <body>
        <h1>퇴장 기록이 저장되었습니다!</h1>
        <p>이름: ${name}</p>
        <p>비고: ${notes}</p>
        <a href="/exit/room1">다시 입력하기</a>
      </body>
    </html>
  `);
});

// 기록 조회 기능 추가 (모든 기록 조회)
app.get('/records', (req, res) => {
  res.json(records); // 기록을 JSON 형식으로 응답
});

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
