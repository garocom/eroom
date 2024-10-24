const express = require('express');
const router = express.Router();

// 퇴장 기록 처리 라우트
router.post('/submit-exit', (req, res) => {
    const { name, notes } = req.body;

    if (!name || !notes) {
        return res.status(400).send('이름과 비고란을 입력해주세요.');
    }

    // 여기에 퇴장 데이터를 처리하는 로직을 추가할 수 있습니다.
    // 예를 들어, 데이터베이스에 저장하거나 파일에 기록하는 기능을 추가할 수 있습니다.

    console.log(`퇴장 기록: 이름=${name}, 비고=${notes}`);
    res.status(200).send('퇴장 기록이 완료되었습니다.');
});

module.exports = router;
