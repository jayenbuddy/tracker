// Menggunakan Object/Tabel untuk menyimpan data banyak akun sekaligus
let globalAccountsDatabase = {};

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method === 'POST') {
        const { username, userId, totalStone, method, timestamp } = req.body;
        
        // Simpan data berdasarkan UserId unik masing-masing akun Roblox
        globalAccountsDatabase[userId] = {
            username: username,
            totalStone: totalStone,
            method: method,
            timestamp: timestamp
        };
        
        return res.status(200).json({ success: true });
    } 
    
    if (req.method === 'GET') {
        // Mengembalikan seluruh daftar akun yang sedang aktif mendata
        return res.status(200).json(globalAccountsDatabase);
    }

    return res.status(405).json({ message: "Method not allowed" });
}
