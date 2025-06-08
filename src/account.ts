// account.ts
// アカウント設定ページ：名前と公開設定の保存・読み込み

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('account-form') as HTMLFormElement;
    const nameInput = document.getElementById('user-name') as HTMLInputElement;
    const publicToggle = document.getElementById('public-toggle') as HTMLInputElement;

    // ローカルストレージから設定を読み込む
    const savedName = localStorage.getItem('userName') || '';
    const savedPublic = localStorage.getItem('isPublic') === 'true';
    nameInput.value = savedName;
    publicToggle.checked = savedPublic;

    form.onsubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('userName', nameInput.value.trim());
        localStorage.setItem('isPublic', publicToggle.checked ? 'true' : 'false');
        alert('設定を保存しました');
    };
});

export {};

