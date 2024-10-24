const express = require('express');
const router = express.Router();

// 입장 기록 처리 라우트
router.post('/submit-entry', (req, res) => {
    const { name, purpose } = req.body;

    if (!name || !purpose) {
        return res.status(400).send('이름과 목적을 입력해주세요.');
    }

    // 여기에 입장 데이터를 처리하는 로직을 추가할 수 있습니다.
    // 예를 들어, 데이터베이스에 저장하거나 파일에 기록하는 기능을 추가할 수 있습니다.

    console.log(`입장 기록: 이름=${name}, 목적=${purpose}`);
    res.status(200).send('입장 기록이 완료되었습니다.');
});

module.exports = router;
