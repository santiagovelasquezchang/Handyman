// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/booking/TaskScopeConditionScreen.js  –  Step 4: Space condition
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import ScopeScreen from '../../components/ScopeScreen';

const OPTIONS = [
  {
    label: 'Cleaned regularly',
    subtitle: 'Maintained, just needs a routine touch-up.',
  },
  {
    label: 'Needs a deep clean',
    subtitle: "Dusty or grimy — hasn't been thoroughly cleaned in a while.",
  },
  {
    label: 'Post-construction',
    subtitle: 'New build or after a renovation. Dust and debris present.',
  },
];

export default function TaskScopeConditionScreen({ navigation, route }) {
  const [selected, setSelected] = useState(null);

  return (
    <ScopeScreen
      step={4}
      category={route.params.category}
      title="What best describes your space?"
      options={OPTIONS}
      selected={selected}
      onSelect={setSelected}
      onContinue={() =>
        navigation.navigate('TaskScopePets', { ...route.params, condition: selected })
      }
    />
  );
}
