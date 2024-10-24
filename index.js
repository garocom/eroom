const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// body-parser 미들웨어 설정 (POST 요청 데이터를 처리)
app.use(bodyParser.urlencoded({ extended: true }));

// 정적 파일을 제공할 폴더 (예: entry, exit 폴더 안의 HTML 파일)
app.use(express.static('public'));

// 임시 데이터 저장소 (메모리에 저장)
const records = [];

// GET 요청 처리: 입장 폼 페이지 제공 (/entry/room1)
app.get('/entry/room1', (req, res) => {
  res.sendFile(path.join(__dirname, 'entry', 'room1.html'));
});

// GET 요청 처리: 퇴장 폼 페이지 제공 (/exit/room1)
app.get('/exit/room1', (req, res) => {
  res.sendFile(path.join(__dirname, 'exit', 'room1.html'));
});

// POST 요청 처리: 입장 기록 (/submit-entry)
app.post('/submit-entry', (req, res) => {
  const { name, purpose } = req.body;
  const entryRecord = { name, purpose, type: 'entry', timestamp: new Date() };
  records.push(entryRecord);
  res.send('입장 기록이 저장되었습니다.');
});

// POST 요청 처리: 퇴장 기록 (/submit-exit)
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
