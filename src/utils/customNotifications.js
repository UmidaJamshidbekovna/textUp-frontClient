function showNotification({ title = "", text = "" }) {
    // Создаем уведомление
    const notification = new Notification(title, {
        body: text || "",
        icon: "/android-chrome-192x192.png",
    });

    // Попытка использовать системный звук
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        oscillator.type = "sine"; // Тип волны (можно изменить на square, sawtooth, triangle)
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Частота (Гц)
        oscillator.connect(audioContext.destination);
        oscillator.start();
        setTimeout(() => oscillator.stop(), 200); // Звук длительностью 200 мс
    } catch (err) {
        console.warn("Ошибка при создании звука уведомления:", err);
    }

    // Обработка клика на уведомлении
    notification.onclick = () => {
        window.focus();
    };
}


export default showNotification