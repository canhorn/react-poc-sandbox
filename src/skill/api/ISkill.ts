export interface ISkill extends ISkillEffectBase {
    $$pendingSave?: boolean;
    id: string;
    name: string;
    description: string;
    type: string | 'ACTIVE';
    target: string | 'ENTITY';
}

export interface ISkillValidator {
    validator: string;
    comment?: string;
    data?: GeneralSkillData;
}

export interface ISkillEffect extends ISkillEffectBase {
    effect: string;
    comment?: string;
    duration?: number;
    data?: GeneralSkillData;
}

export interface ISkillEffectBase {
    validatorList?: ISkillValidator[];
    next?: ISkillEffect[];
    failedList?: ISkillEffect[];
}

export type GeneralSkillData = {
    [key: string]: any;
};

/**
 * "id": "fire_ball",
      "name": "Fire Ball",
      "description": "Fire a flaming ball at a target.",
      "type": "ACTIVE",
      "target": "ENTITY",
      "validatorList":[{
        name
      }]
      "failedList": [
        {
            "comment": "Send a message to Caster client about why the validation failed for the Skill.",
            "effect": "Effects_SkillValidationFailed.csx",
            "data": {
                "messageCode": "skill_validation_failed",
                "messageTemplateKey": "skillFailedForReason"
            }
        }
    ],
    "effectList": [
        {
            "comment": "Set CoolDown on Caster.",
            "effect": "Effects_SetCasterSkillCoolDown.csx",
            "data": {
                "coolDown": 1000
            }
        },
 */
