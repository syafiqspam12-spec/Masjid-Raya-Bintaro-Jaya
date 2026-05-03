self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SCHEDULE_ADZAN') {
    const { prayers } = event.data;
    prayers.forEach(({ name, time, delay }) => {
      setTimeout(() => {
        self.registration.showNotification('🕌 Waktu ' + name, {
          body: 'Sudah masuk waktu ' + name + ' — ' + time,
          icon: 'logomasjid.jpg',
          badge: 'logomasjid.jpg',
          tag: 'adzan-' + name,
          renotify: true,
          vibrate: [200, 100, 200]
        });
      }, delay);
    });
  }
});
