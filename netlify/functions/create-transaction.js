const midtransClient = require('midtrans-client');
const { createClient } = require('@supabase/supabase-js');

// Init Midtrans
const snap = new midtransClient.Snap({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

// Init Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

exports.handler = async (event) => {
  // Hanya terima POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    const { program, nominal, porsi, nama, email, doa } = body;

    // Validasi
    if (!program || !nominal || nominal < 1000) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Data tidak valid' }),
      };
    }

    // Buat order ID unik
    const orderId = `MRBJ-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Simpan transaksi ke Supabase (status: pending)
    const { error: dbError } = await supabase.from('donasi').insert({
      order_id: orderId,
      program,
      nominal,
      porsi: porsi || null,
      nama: nama || 'Hamba Allah',
      email: email || null,
      doa: doa || null,
      status: 'pending',
      created_at: new Date().toISOString(),
    });

    if (dbError) throw dbError;

    // Buat transaksi Midtrans
    const itemName = program.substring(0, 50); // Midtrans max 50 chars
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: nominal,
      },
      item_details: [
        {
          id: program.toLowerCase().replace(/\s/g, '-').substring(0, 50),
          price: nominal,
          quantity: 1,
          name: itemName,
        },
      ],
      customer_details: {
        first_name: (nama || 'Hamba Allah').substring(0, 255),
        email: email || 'donatur@mrbj.id',
      },
      callbacks: {
        finish: `${process.env.URL || 'http://localhost:8888'}/payment-success.html?order_id=${orderId}`,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: transaction.token,
        redirect_url: transaction.redirect_url,
        order_id: orderId,
      }),
    };
  } catch (err) {
    console.error('Error create-transaction:', err?.message || err);
    console.error('Error detail:', JSON.stringify(err?.ApiResponse || err, null, 2));
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err?.ApiResponse?.error_messages?.[0] || err?.message || 'Terjadi kesalahan server' }),
    };
  }
};
