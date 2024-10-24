document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function(event) {
        event.preventDefault(); // 폼 기본 제출 동작 막기

        const formData = new FormData(form);

        const response = await fetch("/submit-exit", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            alert("퇴장 기록이 완료되었습니다.");
        } else {
            alert("오류가 발생했습니다. 다시 시도하세요.");
        }
    });
});
