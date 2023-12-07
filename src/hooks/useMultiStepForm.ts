import { ReactElement, useState } from "react";

//we pass an array of react components
export function useMultiStepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  //Functions for traversing through the form:
  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) {
        return i; //we can't have a step index with a value above the number of elements we have
      } else {
        return i + 1;
      }
    });
  }

  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0) {
        return i; // we can't have a step index with a negative value
      } else {
        return i - 1;
      }
    });
  }

  function goto(index: number) {
    setCurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    currentStep: steps[currentStepIndex], // the value that holds the current step
    goto,
    next,
    back,
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
  };
}