// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/booking/TaskScopeBathsScreen.js  –  Step 3: Bathroom count
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import ScopeScreen from '../../components/ScopeScreen';

const OPTIONS = [
  { label: 'None' },
  { label: '1 bathroom' },
  { label: '2 bathrooms' },
  { label: '3 bathrooms' },
  { label: '4+ bathrooms' },
];

export default function TaskScopeBathsScreen({ navigation, route }) {
  const [selected, setSelected] = useState(null);

  return (
    <ScopeScreen
      step={3}
      category={route.params.category}
      title="How many bathrooms need cleaning?"
      options={OPTIONS}
      selected={selected}
      onSelect={setSelected}
      onContinue={() =>
        navigation.navigate('TaskScopeCondition', { ...route.params, baths: selected })
      }
    />
  );
}
