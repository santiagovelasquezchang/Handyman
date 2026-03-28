// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/booking/TaskScopePetsScreen.js  –  Step 5: Pets
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import ScopeScreen from '../../components/ScopeScreen';

const OPTIONS = [
  { label: 'None',          emoji: '🚫',  subtitle: 'No pets at home.' },
  { label: 'Dogs',          emoji: '🐕',  subtitle: 'One or more dogs.' },
  { label: 'Cats',          emoji: '🐈',  subtitle: 'One or more cats.' },
  { label: 'Dogs & Cats',   emoji: '🐾',  subtitle: 'Both dogs and cats.' },
];

export default function TaskScopePetsScreen({ navigation, route }) {
  const [selected, setSelected] = useState(null);

  return (
    <ScopeScreen
      step={5}
      category={route.params.category}
      title="Do any pets live in your space?"
      hint="This helps Taskers come prepared with the right equipment."
      options={OPTIONS}
      selected={selected}
      onSelect={setSelected}
      onContinue={() =>
        navigation.navigate('TaskLoading', { ...route.params, pets: selected })
      }
    />
  );
}
