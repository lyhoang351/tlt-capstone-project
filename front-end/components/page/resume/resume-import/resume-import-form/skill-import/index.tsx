import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import SectionItemAdditionalButton from '../../../../../custom/section-item-additional-button';
import SkillItems from './skill-items';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
    skillItemsState,
    skillsChangedValueState,
    skillsDetailsState,
} from '../../../../../../recoil-state/resume-state/resume-changed-state/resume-changed-complex-section.state';
import { arrangePosition } from '../../../../../../configs/utils/position';
import { skillTitleValueState } from '../../../../../../recoil-state/resume-state/resume-title.state';
import SectionImportTitle from '../../section-import-title';
import {
    ComplexSectionDetailsDataType,
    SkillItemDataType,
} from '../../../../../../configs/interfaces/resume.interface';
import { Switch } from 'antd';
import axios from 'axios';
import { HOST } from '../../../../../../configs/constants/misc';
import { getAuthHeader } from '../../../../../../configs/restApi/clients';
import { isEmpty } from 'lodash';
import SingleDndContainer from '../../../../../custom/single-sortable/single-dndcontainer';
import { useTranslation } from 'next-i18next';

type SkillProps = {
    className?: string;
    defaultTitle?: string;
    sectionType: any;
};

const SkillImport = (props: SkillProps) => {
    const { t } = useTranslation();
    const { className, defaultTitle, sectionType = 'skills' } = props;
    const [skillTitle, setSkillTitle] = useRecoilState(skillTitleValueState);
    const [disableLevel, setDisableLevel] = useState(false);

    const [skillsDetails, setSkillsDetails] =
        useRecoilState(skillsDetailsState);
    const [skillItems, setSkillItems] = useRecoilState(skillItemsState);

    const addItemHandler = () => {
        const newItem = {
            position: skillItems ? skillItems.length + 1 : 1,
        };
        setSkillItems(prevItems => {
            if (prevItems === undefined) return [newItem];
            return prevItems.concat([newItem]);
        });
    };
    const removeItemHandler = async (position: number, id?: number) => {
        try {
            if (id) {
                const response = await axios.delete(
                    `${HOST}resume-form/${id}/delete-skill`,
                    { headers: getAuthHeader() }
                );
            }
            setSkillItems(prevItems => {
                return prevItems.filter(item => item.position != position);
            });

            setSkillItems(prevItems => {
                return arrangePosition(prevItems);
            });
        } catch (error) {}
    };
    const changeItemHandler = useCallback(
        (changedData: SkillItemDataType) => {
            setSkillItems(prevItems => {
                const { position } = changedData;

                const newItems = prevItems.map(item => {
                    if (item.position === changedData.position) {
                        item = { ...item, ...changedData };
                    }
                    return item;
                });
                return newItems;
            });
        },
        [setSkillItems]
    );
    const changeSwitchHandler = useCallback(
        (checked: boolean) => {
            setDisableLevel(checked);
            setSkillsDetails(prev => {
                return {
                    ...prev,
                    isShownLevel: !checked,
                };
            });
        },
        [setSkillsDetails]
    );
    const dragItemHandler = (items: any) => {
        setSkillItems(
            items.map((item: any, i: number) => {
                return { ...item, position: i + 1 };
            })
        );
    };

    return (
        <SingleDndContainer
            onDragEnd={dragItemHandler}
            items={skillItems}>
            <div className={classNames(className)}>
                <SectionImportTitle
                    onChangeTitle={(title: string) => {
                        setSkillTitle(title);
                    }}
                    defaultTitle={defaultTitle}>
                    {skillTitle}
                </SectionImportTitle>
                <p style={{ color: 'grey', fontSize: '12px' }}>
                    {t('eidt-skill-description', {ns: 'edit'})}
                </p>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Switch
                        defaultChecked={false}
                        onChange={changeSwitchHandler}
                    />
                    <div style={{ paddingLeft: '10px' }}>
                        {t('edit-dont-show-experience-level', {ns: 'edit'})}
                    </div>
                </div>
                {!isEmpty(skillItems) && (
                    <SkillItems
                        items={skillItems}
                        sectionType={sectionType}
                        disableLevel={disableLevel}
                        onRemoveItem={removeItemHandler}
                        onChangeItem={changeItemHandler}
                    />
                )}

                <SectionItemAdditionalButton
                    onAddItem={addItemHandler}
                    className={classNames(className)}
                    sectionType={sectionType}
                />
            </div>
        </SingleDndContainer>
    );
};

export default SkillImport;
