// write.ts
// 日記作成画面用

type Diary = {
    text: string;
    date: string;
};

function getDiaries(): Diary[] {
    const data = localStorage.getItem('diaries');
    return data ? JSON.parse(data) : [];
}

function saveDiaries(diaries: Diary[]) {
    localStorage.setItem('diaries', JSON.stringify(diaries));
}

function getTodayStr(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}/${mm}/${dd}`;
}

function normalizeDateString(date: string): string {
    const [y, m, d] = date.split('/');
    return `${y}/${m.padStart(2, '0')}/${d.padStart(2, '0')}`;
}

function getQueryDate(): string | null {
    const params = new URLSearchParams(window.location.search);
    const dateParam = params.get('date');
    if (!dateParam) return null;
    // 例: 2025-06-08 → 2025/06/08
    const [y, m, d] = dateParam.split('-');
    if (!y || !m || !d) return null;
    return `${y}/${m}/${d}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.getElementById('save-diary');
    const input = document.getElementById('diary-input') as HTMLTextAreaElement;
    if (!saveBtn || !input) return;

    // 編集対象日付を決定
    const queryDate = getQueryDate();
    const targetDate = queryDate || getTodayStr();

    // 日付表示を追加
    const screenDiv = document.querySelector('.screen');
    if (screenDiv) {
        let dateLabel = document.getElementById('diary-date-label');
        if (!dateLabel) {
            dateLabel = document.createElement('div');
            dateLabel.id = 'diary-date-label';
            dateLabel.style.marginBottom = '12px';
            dateLabel.style.fontWeight = 'bold';
            screenDiv.insertBefore(dateLabel, input);
        }
        dateLabel.textContent = `日付: ${targetDate}`;
    }

    // 既にその日の日記があれば入力欄にセット
    const diaries = getDiaries();
    const targetDiary = diaries.find(d => normalizeDateString(d.date) === targetDate);
    if (targetDiary) {
        input.value = targetDiary.text;
    }

    saveBtn.onclick = () => {
        const text = input.value.trim();
        if (!text) {
            alert('日記を入力してください');
            return;
        }
        const diaries = getDiaries();
        const idx = diaries.findIndex(d => normalizeDateString(d.date) === targetDate);
        if (idx !== -1) {
            diaries[idx].text = text; // 既存の日記を上書き
        } else {
            diaries.unshift({ text, date: targetDate }); // 新規追加
        }
        saveDiaries(diaries);
        window.location.href = 'view_default.html';
    };
});

export {};
