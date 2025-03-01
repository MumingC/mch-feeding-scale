document.addEventListener('DOMContentLoaded', function() {
    // 計算按鈕事件
    const calculateBtn = document.getElementById('calculate-btn');
    calculateBtn.addEventListener('click', calculateScore);

    function calculateScore() {
        // 需要逆轉分數的題目（1,3,4,8,10,12,13）
        const reverseItems = [1, 3, 4, 8, 10, 12, 13];
        let totalScore = 0;
        
        // 收集所有回答
        for (let i = 1; i <= 14; i++) {
            const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
            
            if (!selectedOption) {
                alert(`請回答第 ${i} 題`);
                return;
            }
            
            let score = parseInt(selectedOption.value);
            
            // 如果是需要逆轉分數的題目
            if (reverseItems.includes(i)) {
                score = 8 - score; // 將1變成7, 2變成6, 等等
            }
            
            totalScore += score;
        }
        
        // 計算T分數和解釋
        let tScore = calculateTScore(totalScore);
        let interpretation = getInterpretation(tScore);
        
        // 顯示結果
        document.getElementById('raw-score').textContent = totalScore;
        document.getElementById('t-score').textContent = tScore;
        document.getElementById('interpretation').textContent = interpretation;
        document.getElementById('results').style.display = 'block';
    }
    
    function calculateTScore(rawScore) {
        // T分數對應表 (簡化版，完整版可以在這裡擴充)
        const tScoreTable = {
            14: 35, 15: 36, 16: 37, 17: 38, 18: 39, 19: 39, 20: 40,
            // 更多映射...
            50: 64, 51: 65, 52: 65, 53: 66, 54: 67, 55: 68
        };
        
        if (rawScore in tScoreTable) {
            return tScoreTable[rawScore];
        } else if (rawScore > 55) {
            // 超出表格範圍的估計
            return 68 + Math.floor((rawScore - 55) / 2);
        } else {
            return "未知";
        }
    }
    
    function getInterpretation(tScore) {
        if (tScore >= 61 && tScore <= 65) {
            return "輕度困難";
        } else if (tScore >= 66 && tScore <= 70) {
            return "中度困難";
        } else if (tScore > 70) {
            return "嚴重困難";
        } else {
            return "正常範圍";
        }
    }
});
