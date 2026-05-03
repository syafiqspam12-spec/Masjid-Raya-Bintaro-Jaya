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
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: nominal,
      },
      item_details: [
        {
          id: program.toLowerCase().replace(/\s/g, '-'),
          price: nominal,
          quantity: 1,
          name: program,
        },
      ],
      customer_details: {
        first_name: nama || 'Hamba Allah',
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
    console.error('Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Terjadi kesalahan server' }),
    };
  }
};
