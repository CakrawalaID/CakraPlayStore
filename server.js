const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database bayangan (untuk simulasi)
let transactions = [];

// 1. Endpoint untuk mencatat transaksi baru
app.post('/api/transaksi', (req, res) => {
    const { idUser, game, item, harga, via, nickname } = req.body;

    const newTransaction = {
        trxId: "TRX-" + Date.now(),
        idUser,
        game,
        item,
        harga,
        via,
        nickname,
        status: "Pending", // Status awal selalu pending
        waktu: new Date().toLocaleString('id-ID')
    };

    transactions.push(newTransaction);
    console.log("Transaksi Baru Masuk:", newTransaction);

    res.json({
        success: true,
        message: "Transaksi berhasil dicatat",
        data: newTransaction
    });
});

// 2. Endpoint untuk cek status transaksi (buat di halaman bayar.html)
app.get('/api/status/:trxId', (req, res) => {
    const trx = transactions.find(t => t.trxId === req.params.trxId);
    if (trx) {
        res.json({ status: trx.status });
    } else {
        res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }
});

app.listen(PORT, () => {
    console.log(`Server CakraPlayStore jalan di http://localhost:${PORT}`);
});
