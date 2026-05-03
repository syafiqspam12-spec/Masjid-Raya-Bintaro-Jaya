const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

exports.handler = async (event) => {
  try {
    const program = event.queryStringParameters?.program;

    let query = supabase
      .from('donasi')
      .select('program, nominal, nama, created_at')
      .eq('status', 'success')
      .order('created_at', { ascending: false })
      .limit(10);

    if (program) query = query.eq('program', program);

    const { data, error } = await query;
    if (error) throw error;

    // Hitung total
    const { data: total } = await supabase
      .from('donasi')
      .select('nominal')
      .eq('status', 'success')
      .eq('program', program || 'all');

    const totalNominal = total?.reduce((sum, d) => sum + d.nominal, 0) || 0;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ donasi: data, total: totalNominal }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
