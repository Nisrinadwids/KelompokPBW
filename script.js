const asalBandara = {
    'Soekarno Hatta': 65000,
    'Husein Sastranegara': 50000,
    'Abdul Rachman Saleh': 40000,
    'Juanda': 30000
  };
  
  const tujuanBandara = {
    'Ngurah Rai': 85000,
    'Hasanuddin': 70000,
    'Inanwatan': 90000,
    'Sultan Iskandar Muda': 60000
  };
  
  const hargaMaskapai = {
    'WiwiwiAirlines': [10000000, 13000000],
    'UyayaAirWays': [9000000, 14000000],
    'Bekasi Airlines': [4000000, 7000000],
    'Moonfly': [4000000, 8000000],
    'Flyme': [2000000, 11000000],
    'VelocityAir': [1500000, 7000000],
    'EagleEyes': [800000, 9000000],
    'Singaperbangsa': [1800000, 10000000]
  };
  
  const kelasList = ['Ekonomi', 'Bisnis', 'Premier'];
  const form = document.getElementById('flightForm');
  const kelasSelect = document.getElementById('ticketClass');
  const hargaPreview = document.getElementById('hargaPreview');
  const output = document.getElementById('output');
  
  const asalSelect = document.getElementById('departureAirport');
  const tujuanSelect = document.getElementById('arrivalAirport');
  
  Object.keys(asalBandara).sort().forEach(nama => {
    const opt = document.createElement('option');
    opt.value = nama;
    opt.textContent = nama;
    asalSelect.appendChild(opt);
  });
  
  Object.keys(tujuanBandara).sort().forEach(nama => {
    const opt = document.createElement('option');
    opt.value = nama;
    opt.textContent = nama;
    tujuanSelect.appendChild(opt);
  });
  
  function isiKelas() {
    kelasSelect.innerHTML = '<option value="">-- Pilih Kelas --</option>';
    kelasList.forEach(k => {
      const opt = document.createElement('option');
      opt.value = k;
      opt.textContent = k;
      kelasSelect.appendChild(opt);
    });
    hargaPreview.innerHTML = '';
  }
  
  function previewHarga() {
    const maskapai = form.airline.value;
    const kelas = form.ticketClass.value;
    if (!maskapai || !kelas) {
      hargaPreview.innerHTML = '';
      return;
    }
  
    const [min, max] = hargaMaskapai[maskapai];
    let harga = min;
    if (kelas === 'Bisnis') harga = Math.round(min + (max - min) * 0.5);
    if (kelas === 'Premier') harga = max;
  
    hargaPreview.innerHTML = Estimasi biaya untuk kelas <strong>${kelas}</strong>: Rp ${harga.toLocaleString()};
  }
  
  function buatKodeTiket() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let kode = 'TKT-';
    for (let i = 0; i < 6; i++) {
      kode += chars[Math.floor(Math.random() * chars.length)];
    }
    return kode;
  }
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
  
    const maskapai = form.airline.value;
    const asal = form.departureAirport.value;
    const tujuan = form.arrivalAirport.value;
    const kelas = form.ticketClass.value;
    const tanggal = form.departureDate.value;
  
    if (!maskapai || !asal || !tujuan || !kelas || !tanggal || asal === tujuan) {
      alert('Pastikan semua kolom telah diisi dan asal ≠ tujuan');
      return;
    }
  
    const pajak = asalBandara[asal] + tujuanBandara[tujuan];
    const [min, max] = hargaMaskapai[maskapai];
    let base = min;
    if (kelas === 'Bisnis') base = Math.round(min + (max - min) * 0.5);
    else if (kelas === 'Premier') base = max;
  
    const total = base + pajak;
    const kode = buatKodeTiket();
  
    output.innerHTML = `
      <h3>Detail Pemesanan:</h3>
      <p><strong>Kode Tiket:</strong> ${kode}</p>
      <p><strong>Maskapai:</strong> ${maskapai}</p>
      <p><strong>Tanggal:</strong> ${tanggal}</p>
      <p><strong>Kelas:</strong> ${kelas}</p>
      <p><strong>Dari:</strong> ${asal}</p>
      <p><strong>Ke:</strong> ${tujuan}</p>
      <p><strong>Harga Tiket:</strong> Rp ${base.toLocaleString()}</p>
      <p><strong>Pajak:</strong> Rp ${pajak.toLocaleString()}</p>
      <p><strong>Total Bayar:</strong> <strong>Rp ${total.toLocaleString()}</strong></p>
    `;
  });