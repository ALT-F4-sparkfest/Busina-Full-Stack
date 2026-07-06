import { createClient } from '@supabase/supabase-js'
import mqtt from 'mqtt'

// 1. Initialize Supabase Client
const supabaseUrl = 'https://tpciapryqvoyshfsjkix.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwY2lhcHJ5cXZveXNoZnNqa2l4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mjg1NjEwMiwiZXhwIjoyMDk4NDMyMTAyfQ.eGvkRyyF_eRcR-RHLrpmuOtsWbBbHQwk2tDRpZr0MHo'
const supabase = createClient(supabaseUrl, supabaseKey)

// 2. Connect to HiveMQ
const client = mqtt.connect('mqtts://185b147bc1d74ec6b458e48818d39b22.s1.eu.hivemq.cloud:8883', {
  username: 'ESP32',
  password: 'eSP_32!access',
  rejectUnauthorized: true // Keeps the secure connection stable
});
client.on('connect', () => {
  // Changing this from '#' back to your specific topic isolates the feed
  client.subscribe('busina/vehicles/ESP32 TEST/telemetry')
  console.log('Connected to HiveMQ and subscribed strictly to ESP32 TEST!')
})

client.on('message', async (topic, message) => {
  // 1. DIAGNOSTIC LOGS - This will tell us if the script is hearing ANY text
  console.log('------------------------------------')
  console.log(`📡 Message received on topic: ${topic}`)
  console.log(`📝 Raw Payload: ${message.toString()}`)
  console.log('------------------------------------')

  try {
    const payload = JSON.parse(message.toString())

    const { data, error } = await supabase
      .from('telemetry')
      .insert([
        {
          device_name: payload.device_name,
          timestamp: payload.timestamp,
          latitude: payload.latitude,
          longitude: payload.longitude,
          gps_fix: payload.gps_fix,
          satellites: payload.satellites,
          rssi: payload.rssi
        }
      ])

    if (error) {
      console.error('❌ Supabase Error:', error.message)
    } else {
      console.log('✅ Successfully pushed data to Supabase!')
    }

  } catch (err) {
    console.error('❌ Failed to parse JSON message:', err.message)
  }
})