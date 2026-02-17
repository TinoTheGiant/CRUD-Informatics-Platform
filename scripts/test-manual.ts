import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const runTests = async () => {
  try {
    console.log('Testing API...');

    // 1. Create Affiliate
    console.log('Creating Affiliate...');
    const affiliateRes = await axios.post(`${API_URL}/affiliates`, {
      name: 'CrossFit Test',
      city: 'Test City',
      founded: 2010,
    });
    const affiliate = affiliateRes.data;
    console.log('Affiliate Created:', affiliate);

    // 2. Create Athlete
    console.log('Creating Athlete...');
    const athleteRes = await axios.post(`${API_URL}/athletes`, {
      name: 'John Doe',
      gender: 'Male',
      affiliateId: affiliate.id,
    });
    const athlete = athleteRes.data;
    console.log('Athlete Created:', athlete);

    // 3. Create Workout
    console.log('Creating Workout...');
    const workoutRes = await axios.post(`${API_URL}/workouts`, {
      name: 'Fran',
      description: '21-15-9 Thrusters and Pull-ups',
      type: 'FT',
      rxDetails: '95/65 lbs',
    });
    const workout = workoutRes.data;
    console.log('Workout Created:', workout);

    // 4. Create Score
    console.log('Creating Score...');
    const scoreRes = await axios.post(`${API_URL}/scores`, {
      athleteId: athlete.id,
      workoutId: workout.id,
      result: '2:30',
      scaled: false,
    });
    const score = scoreRes.data;
    console.log('Score Created:', score);

    // 5. Fetch all scores
    console.log('Fetching Scores...');
    const scoresRes = await axios.get(`${API_URL}/scores`);
    console.log('Scores:', scoresRes.data);

    console.log('Verification Complete!');
  } catch (error: any) {
    console.error('Verification Failed:', error.response ? error.response.data : error.message);
  }
};

// Wait for server to start
setTimeout(runTests, 3000);
