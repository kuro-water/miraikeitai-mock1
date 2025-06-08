// view_calendar.ts
// カレンダーで日付を選択し、その日の日記を表示

type Diary = {
    text: string;
    date: string;
};

function getDiaries(): Diary[] {
    const data = localStorage.getItem('diaries');
    return data ? JSON.parse(data) : [];
}

function normalizeDateString(date: string): string {
    // 例: 2025/6/8 → 2025/06/08
    const [y, m, d] = date.split('/');
    return `${y}/${m.padStart(2, '0')}/${d.padStart(2, '0')}`;
}

function renderDiaryByDate(dateStr: string) {
    const list = document.getElementById('calendar-diary');
    if (!list) return;
    const diaries = getDiaries();
    // 日記の日付を正規化して比較
    const diary = diaries.find(d => normalizeDateString(d.date) === dateStr);
    if (!diary) {
        list.innerHTML = '<div>この日の日記はありません</div>';
        return;
    }
    list.innerHTML = `<div class="diary-item"><div>${diary.date}</div><div>${diary.text.replace(/\n/g, '<br>')}</div></div>`;
}

document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar') as HTMLInputElement;
    if (calendar) {
        // デフォルトで今日を選択
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const todayStr = `${yyyy}/${mm}/${dd}`;
        calendar.value = `${yyyy}-${mm}-${dd}`;
        renderDiaryByDate(todayStr);
        calendar.addEventListener('change', () => {
            const val = calendar.value;
            if (val) {
                const [y, m, d] = val.split('-');
                const dateStr = `${y}/${m}/${d}`;
                renderDiaryByDate(dateStr);
            }
        });
    }
    // 全削除ボタン
    const deleteBtn = document.getElementById('delete-all');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            if (confirm('本当に全ての日記を削除しますか？この操作は元に戻せません。')) {
                localStorage.removeItem('diaries');
                if (calendar) {
                    const val = calendar.value;
                    if (val) {
                        const [y, m, d] = val.split('-');
                        const dateStr = `${y}/${m}/${d}`;
                        renderDiaryByDate(dateStr);
                    }
                }
            }
        });
    }
});

export {};
