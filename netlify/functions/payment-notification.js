const midtransClient = require('midtrans-client');
const { createClient } = require('@supabase/supabase-js');

const coreApi = new midtransClient.CoreApi({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const notification = JSON.parse(event.body);

    // Verifikasi notifikasi dari Midtrans
    const statusResponse = await coreApi.transaction.notification(notification);
    const { order_id, transaction_status, fraud_status } = statusResponse;

    let status = 'pending';
    if (transaction_status === 'capture' || transaction_status === 'settlement') {
      status = fraud_status === 'accept' ? 'success' : 'fraud';
    } else if (['cancel', 'deny', 'expire'].includes(transaction_status)) {
      status = 'failed';
    }

    // Update status di Supabase
    await supabase
      .from('donasi')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('order_id', order_id);

    return { statusCode: 200, body: 'OK' };
  } catch (err) {
    console.error('Notification error:', err);
    return { statusCode: 500, body: 'Error' };
  }
};
