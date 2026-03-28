// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/booking/TaskScopeRoomsScreen.js  –  Step 2: Room count
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import ScopeScreen from '../../components/ScopeScreen';

const OPTIONS = [
  { label: '1 room' },
  { label: '2 rooms' },
  { label: '3 rooms' },
  { label: '4+ rooms' },
];

export default function TaskScopeRoomsScreen({ navigation, route }) {
  const [selected, setSelected] = useState(null);

  return (
    <ScopeScreen
      step={2}
      category={route.params.category}
      title="How many rooms would you like cleaned?"
      hint="Select the number of rooms that need attention."
      options={OPTIONS}
      selected={selected}
      onSelect={setSelected}
      onContinue={() =>
        navigation.navigate('TaskScopeBaths', { ...route.params, rooms: selected })
      }
    />
  );
}
