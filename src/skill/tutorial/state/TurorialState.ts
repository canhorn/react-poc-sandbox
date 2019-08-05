import tutorialSteps from './tutorial-steps.json';
import { DirectionalHint } from 'office-ui-fabric-react';
import { IEventService } from '../../../core/event';
import { Inject } from '../../../core/ioc';
import { createTutorialStepChangedEvent } from '../change/TutorialStepChangedEvent';

interface ITutorialStep {
    key: string;
    text: string;
    isVisible?: boolean;
    directionalHint?: DirectionalHint;
}
interface IState {
    tutorialStep: Map<string, ITutorialStep>;
}
const STATE: IState = {
    tutorialStep: new Map(),
};

export const getStep = (key: string) => STATE.tutorialStep.get(key);
export const updateStep = (
    step: ITutorialStep,
    eventService: IEventService = Inject(IEventService)
) => {
    STATE.tutorialStep.set(step.key, step);
    eventService.publish(createTutorialStepChangedEvent({}));
};

// Setup the steps from the embedded file
(() => {
    tutorialSteps.steps.forEach(step =>
        STATE.tutorialStep.set(step.key, step as ITutorialStep)
    );
})();
