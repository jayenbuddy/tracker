// Menggunakan global variable sementara di serverless edge (untuk tes instan)
let latestData = {
    username: "Menunggu Data...",
    totalStone: 0,
    method: "-",
    timestamp: "-"
};

export default function handler(req, res) {
    // Mengizinkan website diakses dari luar (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        const { username, totalStone, method, timestamp } = req.body;
        latestData = { username, totalStone, method, timestamp };
        
        // Mengirim data balik ke Discord Webhook secara otomatis dari Server Web (Opsional)
        return res.status(200).json({ success: true, data: latestData });
    } 
    
    if (req.method === 'GET') {
        return res.status(200).json(latestData);
    }

    return res.status(405).json({ message: "Method not allowed" });
}
