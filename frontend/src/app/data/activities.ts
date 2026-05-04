export interface ActivityTemplate {
  id: string;
  name: string;
  category: 'recycling' | 'transport' | 'planting' | 'energy' | 'water' | 'food' | 'waste';
  description: string;
  points: number;
  co2Saved: number; // in kg
  icon: string;
}

export const activityTemplates: ActivityTemplate[] = [
  // Recycling
  { id: 'rec-1', name: 'Recycled plastic bottles', category: 'recycling', description: 'Recycled 5+ plastic bottles', points: 15, co2Saved: 0.5, icon: '♻️' },
  { id: 'rec-2', name: 'Recycled paper/cardboard', category: 'recycling', description: 'Recycled paper or cardboard materials', points: 10, co2Saved: 0.3, icon: '📄' },
  { id: 'rec-3', name: 'Recycled glass containers', category: 'recycling', description: 'Recycled glass bottles or jars', points: 12, co2Saved: 0.4, icon: '🍾' },
  { id: 'rec-4', name: 'Recycled electronics', category: 'recycling', description: 'Properly disposed of old electronics', points: 50, co2Saved: 3.0, icon: '📱' },
  { id: 'rec-5', name: 'Composted food waste', category: 'recycling', description: 'Composted organic food scraps', points: 20, co2Saved: 1.0, icon: '🌱' },

  // Transport
  { id: 'tra-1', name: 'Used public transport', category: 'transport', description: 'Took bus/train instead of driving', points: 25, co2Saved: 2.5, icon: '🚌' },
  { id: 'tra-2', name: 'Biked to destination', category: 'transport', description: 'Cycled instead of using motor vehicle', points: 30, co2Saved: 3.0, icon: '🚴' },
  { id: 'tra-3', name: 'Walked instead of driving', category: 'transport', description: 'Walked for short-distance travel', points: 20, co2Saved: 2.0, icon: '🚶' },
  { id: 'tra-4', name: 'Carpooled with others', category: 'transport', description: 'Shared ride with 2+ people', points: 35, co2Saved: 4.0, icon: '🚗' },
  { id: 'tra-5', name: 'Used electric vehicle', category: 'transport', description: 'Drove an electric/hybrid car', points: 20, co2Saved: 1.5, icon: '⚡' },
  { id: 'tra-6', name: 'Worked from home', category: 'transport', description: 'Avoided commute by remote work', points: 40, co2Saved: 5.0, icon: '🏠' },

  // Planting
  { id: 'pla-1', name: 'Planted a tree', category: 'planting', description: 'Planted a new tree', points: 100, co2Saved: 20.0, icon: '🌳' },
  { id: 'pla-2', name: 'Started a garden', category: 'planting', description: 'Created vegetable/herb garden', points: 60, co2Saved: 5.0, icon: '🌿' },
  { id: 'pla-3', name: 'Planted flowers', category: 'planting', description: 'Planted pollinator-friendly flowers', points: 30, co2Saved: 2.0, icon: '🌺' },
  { id: 'pla-4', name: 'Maintained green space', category: 'planting', description: 'Cared for existing plants/trees', points: 15, co2Saved: 1.0, icon: '🪴' },

  // Energy
  { id: 'ene-1', name: 'Used solar energy', category: 'energy', description: 'Utilized solar panels for power', points: 45, co2Saved: 6.0, icon: '☀️' },
  { id: 'ene-2', name: 'Switched to LED bulbs', category: 'energy', description: 'Replaced bulbs with LED', points: 25, co2Saved: 3.0, icon: '💡' },
  { id: 'ene-3', name: 'Unplugged devices', category: 'energy', description: 'Unplugged electronics when not in use', points: 10, co2Saved: 0.5, icon: '🔌' },
  { id: 'ene-4', name: 'Used natural light', category: 'energy', description: 'Avoided artificial lighting during day', points: 15, co2Saved: 1.0, icon: '🪟' },
  { id: 'ene-5', name: 'Adjusted thermostat', category: 'energy', description: 'Set eco-friendly temperature', points: 20, co2Saved: 2.5, icon: '🌡️' },
  { id: 'ene-6', name: 'Air-dried clothes', category: 'energy', description: 'Hung clothes instead of using dryer', points: 18, co2Saved: 2.0, icon: '👕' },

  // Water
  { id: 'wat-1', name: 'Took shorter shower', category: 'water', description: 'Reduced shower time by 5+ minutes', points: 15, co2Saved: 1.0, icon: '🚿' },
  { id: 'wat-2', name: 'Fixed water leak', category: 'water', description: 'Repaired leaking faucet/pipe', points: 40, co2Saved: 3.0, icon: '🔧' },
  { id: 'wat-3', name: 'Collected rainwater', category: 'water', description: 'Harvested rainwater for plants', points: 35, co2Saved: 2.0, icon: '🌧️' },
  { id: 'wat-4', name: 'Used full dishwasher load', category: 'water', description: 'Ran full dishwasher instead of hand wash', points: 12, co2Saved: 0.8, icon: '🍽️' },
  { id: 'wat-5', name: 'Watered plants efficiently', category: 'water', description: 'Used drip irrigation or early morning watering', points: 10, co2Saved: 0.5, icon: '💧' },

  // Food
  { id: 'foo-1', name: 'Ate plant-based meal', category: 'food', description: 'Chose vegetarian/vegan option', points: 25, co2Saved: 3.5, icon: '🥗' },
  { id: 'foo-2', name: 'Bought local produce', category: 'food', description: 'Purchased from local farmers market', points: 30, co2Saved: 2.5, icon: '🛒' },
  { id: 'foo-3', name: 'Used reusable bags', category: 'food', description: 'Shopped with reusable bags', points: 10, co2Saved: 0.3, icon: '👜' },
  { id: 'foo-4', name: 'Avoided food waste', category: 'food', description: 'Used leftovers or meal prepped', points: 20, co2Saved: 1.5, icon: '🍱' },
  { id: 'foo-5', name: 'Grew own food', category: 'food', description: 'Harvested homegrown vegetables', points: 50, co2Saved: 4.0, icon: '🥕' },

  // Waste Reduction
  { id: 'was-1', name: 'Used reusable water bottle', category: 'waste', description: 'Avoided single-use plastic bottles', points: 15, co2Saved: 0.5, icon: '🧴' },
  { id: 'was-2', name: 'Brought reusable coffee cup', category: 'waste', description: 'Used own cup at cafe', points: 12, co2Saved: 0.4, icon: '☕' },
  { id: 'was-3', name: 'Refused plastic straws', category: 'waste', description: 'Said no to single-use straws', points: 8, co2Saved: 0.2, icon: '🥤' },
  { id: 'was-4', name: 'Bought second-hand items', category: 'waste', description: 'Purchased used/thrifted goods', points: 35, co2Saved: 5.0, icon: '♻️' },
  { id: 'was-5', name: 'Repaired instead of replacing', category: 'waste', description: 'Fixed broken item instead of buying new', points: 45, co2Saved: 6.0, icon: '🔨' },
  { id: 'was-6', name: 'Donated unused items', category: 'waste', description: 'Gave away items instead of trashing', points: 25, co2Saved: 2.0, icon: '📦' },
];

export const badges = [
  { id: 'first-act', name: 'First Step', description: 'Log your first green act', icon: '🌱', requirement: 1, type: undefined, category: undefined },
  { id: 'eco-warrior', name: 'Eco Warrior', description: 'Log 10 green acts', icon: '⚔️', requirement: 10, type: undefined, category: undefined },
  { id: 'planet-hero', name: 'Planet Hero', description: 'Log 25 green acts', icon: '🦸', requirement: 25, type: undefined, category: undefined },
  { id: 'sustainability-champion', name: 'Sustainability Champion', description: 'Log 50 green acts', icon: '👑', requirement: 50, type: undefined, category: undefined },
  { id: 'recycling-master', name: 'Recycling Master', description: 'Log 10 recycling activities', icon: '♻️', requirement: 10, category: 'recycling', type: undefined },
  { id: 'transport-expert', name: 'Transport Expert', description: 'Log 10 transport activities', icon: '🚌', requirement: 10, category: 'transport', type: undefined },
  { id: 'tree-hugger', name: 'Tree Hugger', description: 'Log 5 planting activities', icon: '🌳', requirement: 5, category: 'planting', type: undefined },
  { id: 'point-collector', name: 'Point Collector', description: 'Earn 500 points', icon: '💯', requirement: 500, type: 'points', category: undefined },
  { id: 'legend', name: 'Legend', description: 'Earn 1000 points', icon: '🌟', requirement: 1000, type: 'points', category: undefined },
  { id: 'streak-3', name: '3-Day Streak', description: 'Log acts for 3 consecutive days', icon: '🔥', requirement: 3, type: 'streak', category: undefined },
  { id: 'streak-7', name: 'Week Warrior', description: 'Log acts for 7 consecutive days', icon: '🔥', requirement: 7, type: 'streak', category: undefined },
];
