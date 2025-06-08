// select_date.ts
// 日付を選んで「日記を書く」画面に遷移

document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('select-date') as HTMLInputElement;
    const goBtn = document.getElementById('go-write') as HTMLButtonElement;
    if (!dateInput || !goBtn) return;

    // デフォルトで今日をセット
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.value = `${yyyy}-${mm}-${dd}`;

    goBtn.onclick = () => {
        if (!dateInput.value) {
            alert('日付を選択してください');
            return;
        }
        window.location.href = `write.html?date=${dateInput.value}`;
    };
});

export {};

