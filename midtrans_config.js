const midtransClient = require('midtrans-client');

// Create Snap API instance
let snap = new midtransClient.Snap({
    isProduction : true, // Ganti dengan true jika di lingkungan produksi
    serverKey : "SB-Mid-server-zo4BiJ1BYcHm8zQAYgwldbpF",
    clientKey : "SB-Mid-client-encxuRse_9xk0GUh"
});

module.exports = snap;
