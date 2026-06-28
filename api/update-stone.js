let globalAccountsDatabase = {};

export default function handler(req, res) {
    // 🌐 Konfigurasi CORS agar bisa diakses dari luar
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight request dari browser
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 🔒 1. PROTEKSI UTK 'GET' (KETIKA WEBSITE TRACKER MEMINTA DATA)
    if (req.method === 'GET') {
        const clientPassword = req.headers['authorization'];
        
        // Cek apakah password kosong atau tidak cocok
        if (!clientPassword || clientPassword !== "jayencuokk12958") {
            return res.status(401).json({ error: "Unauthorized access. Password salah atau tidak disertakan!" });
        }
        
        // Jika password lolos verifikasi, kirim database batu ke website
        return res.status(200).json(globalAccountsDatabase);
    }

    // 📥 2. RECEIVER UTK 'POST' (KETIKA EXECUTOR ROBLOX MENGIRIM DATA BATU)
    if (req.method === 'POST') {
        try {
            const { username, userId, totalStone, timestamp } = req.body;
            
            // Validasi data dasar agar tidak terjadi crash
            if (!userId || !username) {
                return res.status(400).json({ error: "Data tidak lengkap (userId/username kosong)" });
            }

            // Simpan atau update data berdasarkan UserId unik masing-masing akun Roblox
            globalAccountsDatabase[userId] = {
                username: username,
                totalStone: totalStone || 0,
                timestamp: timestamp || new Date().toISOString()
            };

            return res.status(200).json({ success: true, message: "Data berhasil diperbarui" });
        } catch (error) {
            return res.status(500).json({ error: "Gagal memproses data dari executor" });
        }
    }

    // Handle jika ada method selain GET, POST, atau OPTIONS
    return res.status(405).json({ error: "Method tidak diizinkan" });
}
