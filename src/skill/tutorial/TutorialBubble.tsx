import { Coachmark, TeachingBubbleContent } from 'office-ui-fabric-react';
import React, { useEffect, useState, createRef } from 'react';
import { IEventService } from '../../core/event';
import { Inject } from '../../core/ioc';
import { TUTORIAL_STEP_CHANGED_EVENT } from './change/TutorialStepChangedEvent';
import { getStep, updateStep } from './state/TurorialState';

interface IProps {
    stepKey: string;
    children: any;
}
export default function TutorialBubble({ stepKey, children }: IProps) {
    const [target, setTarget] = useState<any>(createRef<HTMLDivElement>());
    const [step, setStep] = useState(getStep(stepKey));
    const onDismiss = () => {
        if (!step) {
            return;
        }
        updateStep({ ...step, isVisible: false });
        setStep(getStep(stepKey));
    };
    useEffect(() => {
        const eventService: IEventService = Inject(IEventService);
        const onStepChanged = () => {
            setStep(getStep(stepKey));
        };
        eventService.on(
            TUTORIAL_STEP_CHANGED_EVENT,
            onStepChanged,
            'TutorialBubble'
        );
        return () => {
            eventService.off(
                TUTORIAL_STEP_CHANGED_EVENT,
                onStepChanged,
                'TutorialBubble'
            );
        };
    }, [stepKey]);

    if (!step || !step.isVisible) {
        return <>{children}</>;
    }

    return (
        <>
            <div ref={setTarget}>{children}</div>
            <Coachmark
                target={target}
                positioningContainerProps={{
                    directionalHint: step.directionalHint,
                    doNotLayer: false,
                }}
            >
                <TeachingBubbleContent
                    hasCloseIcon={true}
                    closeButtonAriaLabel="Close"
                    onDismiss={onDismiss}
                >
                    {step.text}
                </TeachingBubbleContent>
            </Coachmark>
        </>
    );
}
