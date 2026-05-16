document.addEventListener('DOMContentLoaded', () => {
    const scheduleBody = document.getElementById('schedule-body');
    const clearBtn = document.getElementById('clear-btn');
    
    // 9 Ders Saati yapilandirmasi
    const periods = 9;
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

    // LocalStorage verisini yukle
    const loadScheduleData = () => {
        const storedData = localStorage.getItem('classScheduleData');
        return storedData ? JSON.parse(storedData) : {};
    };

    // LocalStorage verisini kaydet
    const saveScheduleData = (data) => {
        localStorage.setItem('classScheduleData', JSON.stringify(data));
    };

    let scheduleData = loadScheduleData();

    // Tablo satirlarini olustur
    for (let i = 1; i <= periods; i++) {
        const tr = document.createElement('tr');
        
        // Ders saati hucresi
        const th = document.createElement('th');
        th.className = 'time-col';
        th.textContent = `${i}. Ders`;
        tr.appendChild(th);

        // Gunler icin hucreler
        days.forEach(day => {
            const td = document.createElement('td');
            const innerDiv = document.createElement('div');
            
            innerDiv.className = 'cell-content';
            innerDiv.contentEditable = 'true';
            innerDiv.dataset.day = day;
            innerDiv.dataset.period = i;
            innerDiv.setAttribute('placeholder', '+ Ekle');

            // Kayitlari panele aktar
            const cellKey = `${day}-${i}`;
            if (scheduleData[cellKey]) {
                innerDiv.textContent = scheduleData[cellKey];
            }

            // Metin degistiginde veya guncellendiginde kaydet
            innerDiv.addEventListener('input', (e) => {
                const text = e.target.textContent;
                scheduleData[cellKey] = text;
                saveScheduleData(scheduleData);
            });
            
            // Satir ve sutun hover effect gorselligi eklenebilir
            innerDiv.addEventListener('focus', () => {
                td.classList.add('focused-cell');
            });
            innerDiv.addEventListener('blur', () => {
                td.classList.remove('focused-cell');
            });

            td.appendChild(innerDiv);
            tr.appendChild(td);
        });

        scheduleBody.appendChild(tr);
    }

    // Temizle Butonu
    clearBtn.addEventListener('click', () => {
        if (confirm('Tüm ders programını silmek istediğinize emin misiniz? Bu işlem geri alınamaz!')) {
            localStorage.removeItem('classScheduleData');
            scheduleData = {};
            const allCells = document.querySelectorAll('.cell-content');
            allCells.forEach(cell => {
                cell.textContent = '';
            });
        }
    });

    // Premium Animasyon: Hücreler yüklenirken gecikmeli "fade-in" efekti ekleyelim
    const rows = scheduleBody.querySelectorAll('tr');
    rows.forEach((row, index) => {
        row.style.animationDelay = `${index * 0.05}s`;
        row.classList.add('fade-in-up');
    });
});
