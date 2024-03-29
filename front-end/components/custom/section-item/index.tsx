import {
    DeleteOutlined,
    DownOutlined,
    HolderOutlined,
    UpOutlined,
} from '@ant-design/icons';
import React, { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import SectionForm from '../section-form';
import { SECTION_TYPE } from '../../../configs/constants/resume.constants';
import { Modal } from 'antd';
import PopupModal from '../popup-modal';
import {
    ComplexSectionItemDataType,
    EmploymentHistoryItemDataType,
} from '../../../configs/interfaces/resume.interface';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';

type Props = {
    index: number;
    position: number;
    className?: string;
    itemHeader: string;
    children?: string;
    sectionType: string;
    disableLevel?: boolean;
    item?: ComplexSectionItemDataType;
    onRemove: (id?: number) => void;
    onChangeItem: (changedData: EmploymentHistoryItemDataType) => void;
};

const SectionItem = (props: Props) => {
    const {
        index,
        position,
        className,
        itemHeader,
        children,
        sectionType,
        disableLevel,
        item,
        onRemove,
        onChangeItem,
    } = props;
    const { t } = useTranslation();
    const labelList = useMemo(() => SECTION_TYPE[sectionType], [sectionType]);
    const [isVisible, setIsVisible] = useState(false);
    const [isModalOpened, setIsModalOpened] = useState(false);
    const clickHandler = () => {
        setIsVisible(!isVisible);
    };
    const showModal = () => {
        setIsModalOpened(true);
    };
    const deleteHandler = () => {
        onRemove(item?.id);
        setIsModalOpened(false);
    };

    const changeItemValueHandler = useCallback(
        (itemChangedFields: any) => {
            if (itemChangedFields.startDate) {
                itemChangedFields.startDate = moment(
                    itemChangedFields.startDate
                ).format('YYYY/MM');
            }
            if (itemChangedFields.endDate) {
                itemChangedFields.endDate = moment(
                    itemChangedFields.endDate
                ).format('YYYY/MM');
            }
            const changedData = {
                ...itemChangedFields,
                position,
                id: item?.id,
            };
            onChangeItem(changedData);
        },
        [item?.id, onChangeItem, position]
    );

    return (
        <div className="w-100">
            <div
                className={classNames(
                    className,
                    styles['section-item__container']
                )}>
                <div className={styles['section-item__content']}>
                    <div
                        className={classNames(
                            'flex-row',

                            styles['section-item__header']
                        )}
                        onClick={clickHandler}>
                        <div>{itemHeader}</div>
                        <div
                            className={classNames(
                                'center',
                                styles['section-item__icon']
                            )}>
                            {!isVisible ? <DownOutlined /> : <UpOutlined />}
                        </div>
                    </div>
                    <div
                        className={classNames(
                            'center',
                            styles['section-item__remove']
                        )}
                        onClick={showModal}>
                        <DeleteOutlined />
                    </div>
                </div>
                <div className={styles['section-item__form']}>
                    {isVisible && (
                        <SectionForm
                            value={item}
                            labelList={labelList}
                            disabledLevel={disableLevel}
                            onChangeItemValue={changeItemValueHandler}
                        />
                    )}
                </div>
            </div>
            <div>
                <PopupModal
                    title={t('edit-delete-title', {ns: 'edit'})}
                    description={t('edit-delete-des', {ns: 'edit'}) as string} 
                    type={'confirm'}
                    visible={isModalOpened}
                    okText={t('edit-delete-confirm', {ns: 'edit'}) as string}
                    cancelText={t('edit-delete-cancel', {ns: 'edit'}) as string}
                    onCancel={() => {
                        setIsModalOpened(false);
                    }}
                    onOk={deleteHandler}
                />
            </div>
        </div>
    );
};

export default SectionItem;
