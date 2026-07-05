import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, Loader } from 'lucide-react';

export default function DeviceSetup() {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [deviceName, setDeviceName] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchDevices();
        const interval = setInterval(fetchDevices, 5000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, []);

    async function fetchDevices() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/vehicles`
            );
            const data = await response.json();
            setDevices(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch devices:', error);
            setLoading(false);
        }
    }

    async function handlePairDevice(e) {
        e.preventDefault();
        if (!selectedDevice || !deviceName.trim()) {
            alert('Please select a device and enter a name');
            return;
        }

        setSaving(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/devices/register`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        device_name: deviceName.trim(),
                        latitude: 14.5995,
                        longitude: 120.9842,
                    }),
                }
            );

            const result = await response.json();
            if (result.status === 'ok') {
                alert(`✓ Device paired as "${deviceName}"`);
                setDeviceName('');
                setSelectedDevice(null);
                fetchDevices();
            } else {
                alert('Error: ' + result.error);
            }
        } catch (error) {
            alert('Failed to pair device: ' + error.message);
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        🚌 Device Setup
                    </h1>
                    <p className="text-gray-600">
                        Pair your Busina hardware with the platform
                    </p>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
                    <h2 className="font-bold text-blue-900 mb-2">
                        How to pair your device:
                    </h2>
                    <ol className="list-decimal list-inside text-blue-800 text-sm space-y-1">
                        <li>Press the pairing button on your hardware</li>
                        <li>
                            Connect to the WiFi network: "Busina-Setup-XXXX"
                        </li>
                        <li>Open http://192.168.4.1 in your browser</li>
                        <li>
                            Fill in your WiFi details and device name there
                        </li>
                        <li>
                            Device will restart and appear here in 30 seconds
                        </li>
                    </ol>
                </div>

                {/* Unpaired Devices */}
                {loading ? (
                    <div className="text-center py-12">
                        <Loader className="mx-auto mb-3 animate-spin text-indigo-600" />
                        <p className="text-gray-600">
                            Looking for devices...
                        </p>
                    </div>
                ) : devices.length === 0 ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                        <AlertCircle className="mx-auto mb-3 text-yellow-600" />
                        <p className="text-yellow-800">
                            No devices found. Press the pairing button on your
                            hardware to get started.
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
                        <div className="px-6 py-4 bg-gray-50 border-b">
                            <h2 className="font-bold text-gray-800">
                                Available Devices
                            </h2>
                        </div>

                        <div className="divide-y">
                            {devices.map((device) => (
                                <div
                                    key={device.id}
                                    className={`p-4 cursor-pointer transition-colors ${
                                        selectedDevice?.id === device.id
                                            ? 'bg-indigo-50 border-l-4 border-indigo-600'
                                            : 'hover:bg-gray-50'
                                    }`}
                                    onClick={() =>
                                        setSelectedDevice(device)
                                    }
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                {device.id ||
                                                    'Unnamed Device'}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Last seen:{' '}
                                                {new Date(
                                                    device.last_update
                                                ).toLocaleTimeString()}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {selectedDevice?.id ===
                                            device.id ? (
                                                <CheckCircle className="text-indigo-600" />
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Pairing Form */}
                {selectedDevice && (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Pair: {selectedDevice.id}
                        </h2>

                        <form onSubmit={handlePairDevice}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2">
                                    Device Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Golden Sunshine - Route 25"
                                    value={deviceName}
                                    onChange={(e) =>
                                        setDeviceName(e.target.value)
                                    }
                                    disabled={saving}
                                    maxLength="31"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    This name will appear on the commuter app
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                            >
                                {saving ? (
                                    <>
                                        <Loader className="animate-spin h-5 w-5" />
                                        <span>Pairing...</span>
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="h-5 w-5" />
                                        <span>
                                            Pair Device
                                        </span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}

                {/* Already Paired Devices */}
                {devices.some((d) => d.id && d.id.length > 0) && (
                    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            ✓ Paired Devices
                        </h2>
                        <div className="space-y-2">
                            {devices
                                .filter((d) => d.id && d.id.length > 0)
                                .map((device) => (
                                    <div
                                        key={device.id}
                                        className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg"
                                    >
                                        <CheckCircle className="text-green-600 h-5 w-5" />
                                        <span className="text-green-800 font-semibold">
                                            {device.id}
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}