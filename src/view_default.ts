// view_default.ts
// 新しい順で日記を一覧表示

type Diary = {
    text: string;
    date: string;
};

function getDiaries(): Diary[] {
    const data = localStorage.getItem('diaries');
    return data ? JSON.parse(data) : [];
}

function renderDiaryList() {
    const list = document.getElementById('diary-list');
    if (!list) return;
    let diaries = getDiaries();
    diaries = diaries.slice().sort((a, b) => {
        // YYYY/MM/DD 形式を比較
        return b.date.localeCompare(a.date);
    });
    if (diaries.length === 0) {
        list.innerHTML = '<div>まだ日記がありません</div>';
        return;
    }
    list.innerHTML = diaries.map(d =>
        `<div class="diary-item"><div>${d.date}</div><div>${d.text.replace(/\n/g, '<br>')}</div></div>`
    ).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    renderDiaryList();
    const deleteBtn = document.getElementById('delete-all');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            if (confirm('本当に全ての日記を削除しますか？この操作は元に戻せません。')) {
                localStorage.removeItem('diaries');
                renderDiaryList();
            }
        });
    }
});

export {};
