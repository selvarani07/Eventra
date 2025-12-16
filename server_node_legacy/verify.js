const { exec } = require('child_process');

const BASE_URL = 'http://localhost:5000/api';

async function verify() {
    console.log('Starting verification with fetch...');

    try {
        // Helper for post request
        const post = async (url, body) => {
            const res = await fetch(BASE_URL + url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = await res.json();
            return { status: res.status, data };
        };

        // 1. Register
        console.log('1. Registering user...');
        const regRes = await post('/auth/register', {
            username: 'testu' + Date.now(),
            password: 'password123'
        });
        console.log('   Register status:', regRes.status);
        const token = regRes.data.token;

        // 2. Create Resource
        console.log('2. Creating Resource...');
        const resRes = await post('/resources', {
            name: 'Hall A',
            type: 'Room'
        });
        const resourceId = resRes.data.id;
        console.log('   Resource created:', resourceId);

        // 3. Create Events
        console.log('3. Creating Events...');
        const evt1 = await post('/events', {
            title: 'Workshop 1',
            start_time: '2023-10-10T10:00:00Z',
            end_time: '2023-10-10T12:00:00Z',
            description: 'First'
        });
        const evt2 = await post('/events', {
            title: 'Workshop 2',
            start_time: '2023-10-10T11:00:00Z', // Overlaps
            end_time: '2023-10-10T13:00:00Z',
            description: 'Second'
        });
        console.log(`   Events created: ${evt1.data.id}, ${evt2.data.id}`);

        // 4. Allocate Event 1 -> Success
        console.log('4. Allocating Workshop 1 to Hall A...');
        const alloc1 = await post('/allocations', {
            event_id: evt1.data.id,
            resource_id: resourceId
        });
        if (alloc1.status === 200) console.log('   Allocation successful.');
        else console.error('   Failed allocation:', alloc1.data);

        // 5. Allocate Event 2 -> Fail (Conflict)
        console.log('5. Allocating Workshop 2 to Hall A (expect conflict)...');
        const alloc2 = await post('/allocations', {
            event_id: evt2.data.id,
            resource_id: resourceId
        });

        if (alloc2.status === 409) {
            console.log('   ✅ SUCCESS: Conflict rejected correctly (409).');
        } else {
            console.error('   ❌ FAILED: Unexpected status:', alloc2.status, alloc2.data);
        }

    } catch (err) {
        console.error('Global Verification Error:', err.message);
    }
}

setTimeout(verify, 1000);
