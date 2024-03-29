import { isEmpty } from 'lodash';
import React from 'react';
import { EmploymentHistoryItemDataType } from '../../../../../../../configs/interfaces/resume.interface';
import Draggable from '../../../../../../custom/draggable';
import SingleDroppable from '../../../../../../custom/single-sortable/single-droppable';
import SectionItem from '../../../../../../custom/section-item';
import { useTranslation } from 'next-i18next';

type EmploymentHistoryItemsProps = {
    className?: string;
    sectionType: string;
    items: EmploymentHistoryItemDataType[];

    onRemoveItem: (position: number, id?: number) => void;
    onChangeItem: (changedData: EmploymentHistoryItemDataType) => void;
};

const EmploymentHistoryItems = (props: EmploymentHistoryItemsProps) => {
    const { className, sectionType, items, onRemoveItem, onChangeItem } = props;
    const { t } = useTranslation();
    return (
        <SingleDroppable
            id={sectionType}
            items={items}>
            <div>
                {items?.map((item, i) => {
                    return (
                        <Draggable
                            key={i}
                            index={i}
                            id={item.position}
                            item={item}
                            dragIcon={true}>
                            <SectionItem
                                index={i}
                                position={item.position}
                                itemHeader={
                                    item.jobTitle
                                        ? item.jobTitle
                                        : t('edit-not-specified', {ns: 'edit'})
                                }
                                sectionType={sectionType}
                                item={item}
                                onChangeItem={onChangeItem}
                                onRemove={onRemoveItem.bind(
                                    null,
                                    item.position
                                )}
                            />
                        </Draggable>
                    );
                })}
            </div>
        </SingleDroppable>
    );
};

export default EmploymentHistoryItems;
