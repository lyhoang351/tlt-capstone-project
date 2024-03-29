import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import SectionItemAdditionalButton from '../../../../../custom/section-item-additional-button';
import EmploymentHistoryItems from './employment-history-items';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
    employmentHistoriesDetailsState,
    employmentHistoryItemsState,
} from '../../../../../../recoil-state/resume-state/resume-changed-state/resume-changed-complex-section.state';
import { arrangePosition } from '../../../../../../configs/utils/position';
import { employmentHistoryTitleValueState } from '../../../../../../recoil-state/resume-state/resume-title.state';
import SectionImportTitle from '../../section-import-title';
import {
    ComplexSectionDetailsDataType,
    EmploymentHistoryItemDataType,
} from '../../../../../../configs/interfaces/resume.interface';
import { HOST } from '../../../../../../configs/constants/misc';
import axios from 'axios';
import { getAuthHeader } from '../../../../../../configs/restApi/clients';
import { isEmpty } from 'lodash';
import SingleDndContainer from '../../../../../custom/single-sortable/single-dndcontainer';
import { DragOverlay } from '@dnd-kit/core';
import { useTranslation } from 'next-i18next';

type EmploymentHistoryProps = {
    className?: string;
    defaultTitle?: string;
    sectionType: any;
};

const EmploymentHistoryImport = (props: EmploymentHistoryProps) => {
    const {
        className,
        defaultTitle,
        sectionType = 'employmentHistories',
    } = props;
    const [employmentHistoryTitle, setEmploymentHistoryTitle] = useRecoilState(
        employmentHistoryTitleValueState
    );

    const employmentHistoryDetails = useRecoilValue(
        employmentHistoriesDetailsState
    );
    const { t } = useTranslation();

    const [employmentHistoryItems, setEmploymentHistoryItems] = useRecoilState(
        employmentHistoryItemsState
    );
    // useEffect(() => {
    //     if (initialValue && initialValue.items) {
    //         setEmploymentHistoryItems(initialValue.items);
    //     }
    // }, [initialValue, setEmploymentHistoryItems]);
    const addItemHandler = () => {
        const newItem = {
            position: employmentHistoryItems
                ? employmentHistoryItems.length + 1
                : 1,
        };
        setEmploymentHistoryItems(prevItems => {
            if (prevItems === undefined) return [newItem];
            return prevItems.concat([newItem]);
        });
    };
    const removeItemHandler = async (position: number, id?: number) => {
        try {
            if (id) {
                const response = await axios.delete(
                    `${HOST}resume-form/${id}/delete-employment-history`,
                    { headers: getAuthHeader() }
                );
            }

            setEmploymentHistoryItems(prevItems => {
                return prevItems.filter(item => item.position != position);
            });

            setEmploymentHistoryItems(prevItems => {
                return arrangePosition(prevItems);
            });
        } catch (error) {
            console.log('error :>> ', error);
        }
    };
    const changeItemHandler = useCallback(
        (changedData: EmploymentHistoryItemDataType) => {
            setEmploymentHistoryItems(prevItems => {
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
        [setEmploymentHistoryItems]
    );

    const dragItemHandler = (items: any) => {
        setEmploymentHistoryItems(
            items.map((item: any, i: number) => {
                return { ...item, position: i + 1 };
            })
        );
    };
    return (
        <SingleDndContainer
            onDragEnd={dragItemHandler}
            items={employmentHistoryItems}>
            <div className={classNames(className)}>
                <SectionImportTitle
                    onChangeTitle={(title: string) => {
                        setEmploymentHistoryTitle(title);
                    }}
                    defaultTitle={defaultTitle}>
                    {employmentHistoryTitle}
                </SectionImportTitle>
                <p style={{ color: 'grey', fontSize: '12px' }}>
                    {t('edit-employment-description', {ns: 'edit'})}
                </p>
                {!isEmpty(employmentHistoryItems) && (
                    <EmploymentHistoryItems
                        items={employmentHistoryItems}
                        sectionType={sectionType}
                        onRemoveItem={removeItemHandler}
                        onChangeItem={changeItemHandler}
                        // initialValue={initialValue}
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

export default EmploymentHistoryImport;
