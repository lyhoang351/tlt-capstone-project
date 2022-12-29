import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import SectionItemAdditionalButton from '../../../../../custom/section-item-additional-button';
import {
    EDUCATION_DESCRIPTION,
    EMPLOYMENT_HISTORY_DESCRIPTION,
} from '../../../../../../configs/constants/description.constants';
import SkillItems from './skill-items';
import { useRecoilState } from 'recoil';
import { skillItemsState } from '../../../../../../recoil-state/resume-state/resume-changed-state/resume-changed-complex-section.state';
import { arrangePosition } from '../../../../../../configs/utils/position';
import { skillTitleValueState } from '../../../../../../recoil-state/resume-state/resume-title.state';
import SectionImportTitle from '../../section-import-title';
import {
    ComplexSectionDetailsDataType,
    SkillItemDataType,
} from '../../../../../../configs/interfaces/resume.interface';
import { Switch } from 'antd';

type SkillProps = {
    className?: string;
    defaultTitle?: string;
    sectionType: any;
};

const SkillImport = (props: SkillProps) => {
    const { className, defaultTitle, sectionType = 'skills' } = props;
    const [skillTitle, setSkillTitle] = useRecoilState(skillTitleValueState);
    const [disableLevel, setDisableLevel] = useState(false);

    const [skillItems, setSkillItems] = useRecoilState(skillItemsState);

    const addItemHandler = () => {
        const newItem = {
            position: skillItems ? skillItems.length : 1,
        };
        setSkillItems(prevItems => {
            return prevItems.concat([newItem]);
        });
    };
    const removeItemHandler = async (position: number) => {
        setSkillItems(prevItems => {
            return prevItems.filter(item => item.position != position);
        });

        setSkillItems(prevItems => {
            return arrangePosition(prevItems);
        });
    };
    const changeItemHandler = useCallback(
        (changedData: SkillItemDataType, allData: SkillItemDataType) => {
            setSkillItems(prevItems => {
                const { position } = changedData;

                if (prevItems.length === position) {
                    prevItems.push(changedData);
                } else {
                    const newItems = prevItems.map(item => {
                        if (item.position === changedData.position) {
                            item = { ...item, ...changedData };
                        }
                        return item;
                    });
                    return newItems;
                }
                return prevItems;
            });
        },
        [setSkillItems]
    );
    const changeSwitchHandler = useCallback((checked: boolean) => {
        setDisableLevel(!checked);
    }, []);
    return (
        <div className={classNames(className)}>
            <SectionImportTitle
                onChangeTitle={(title: string) => {
                    setSkillTitle(title);
                }}
                defaultTitle={defaultTitle}>
                {skillTitle}
            </SectionImportTitle>
            <p style={{ color: 'grey', fontSize: '12px' }}>
                {EDUCATION_DESCRIPTION}
            </p>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Switch
                    defaultChecked
                    onChange={changeSwitchHandler}
                />
                <div style={{ paddingLeft: '10px' }}>
                    {`Don't show experience level`}
                </div>
            </div>
            <SkillItems
                items={skillItems}
                sectionType={sectionType}
                disableLevel={disableLevel}
                onRemoveItem={removeItemHandler}
                onChangeItem={changeItemHandler}
            />
            <SectionItemAdditionalButton
                onAddItem={addItemHandler}
                className={classNames(className)}
                sectionType={sectionType}
            />
        </div>
    );
};

export default SkillImport;