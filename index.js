const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// body-parser 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: true }));

// 임시 데이터 저장소 (메모리 내 저장)
const records = [];

// 기본 페이지
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 입장 기록 처리
app.post('/submit-entry', (req, res) => {
  const { name, purpose } = req.body;
  const entryRecord = { name, purpose, type: 'entry', timestamp: new Date() };
  records.push(entryRecord);
  res.send('입장 기록이 저장되었습니다.');
});

// 퇴장 기록 처리
app.post('/submit-exit', (req, res) => {
  const { name, notes } = req.body;
  const exitRecord = { name, notes, type: 'exit', timestamp: new Date() };
  records.push(exitRecord);
  res.send('퇴장 기록이 저장되었습니다.');
});

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
