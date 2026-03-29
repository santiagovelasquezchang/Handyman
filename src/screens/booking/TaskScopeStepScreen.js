// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/booking/TaskScopeStepScreen.js
//  Generic funnel step — reads category.scoping_details[stepIndex] dynamically.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import ScopeScreen from '../../components/ScopeScreen';

export default function TaskScopeStepScreen({ navigation, route }) {
  const { category, address, stepIndex, answers } = route.params;
  const steps = category.scoping_details;
  const current = steps[stepIndex];
  const totalSteps = steps.length + 1; // +1 for the location step before

  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    const updatedAnswers = { ...answers, [current.key]: selected };
    const nextIndex = stepIndex + 1;

    if (nextIndex < steps.length) {
      navigation.navigate('TaskScopeStep', {
        category,
        address,
        stepIndex: nextIndex,
        answers: updatedAnswers,
      });
    } else {
      navigation.navigate('TaskDateTime', {
        category,
        address,
        answers: updatedAnswers,
      });
    }
  };

  // options in mockData can be plain strings — normalise to { label, key }
  const normalisedOptions = current.options.map((opt) =>
    typeof opt === 'string' ? { label: opt, key: opt } : opt
  );

  return (
    <ScopeScreen
      step={stepIndex + 2}
      totalSteps={totalSteps + 1}
      category={category}
      title={current.title ?? current.question}
      hint={current.hint}
      options={normalisedOptions}
      selected={selected}
      onSelect={setSelected}
      onContinue={handleContinue}
      onBack={() => navigation.goBack()}
    />
  );
}
