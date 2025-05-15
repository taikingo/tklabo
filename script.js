async function handleForm() {
  const form = document.getElementById("getintouchform");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const body = formData.get("body");

    // 入力バリデーション
    if (!name || !email || !body) {
      UIkit.modal.alert("すべての項目を入力してください。");
      return;
    }

    try {
      const res = await fetch("https://royal-wind-1d38.taikingo66.workers.dev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          body
        }),
      });

      if (res.ok) {
        UIkit.modal.alert("お問い合わせありがとうございました。正常に送信されました。");
        form.reset();
      } else {
        const errorText = await res.text();
        UIkit.modal.alert("送信に失敗しました: " + errorText);
      }
    } catch (error) {
      UIkit.modal.alert("通信エラー: " + error.message);
    }
  });
}

document.addEventListener("DOMContentLoaded", handleForm);