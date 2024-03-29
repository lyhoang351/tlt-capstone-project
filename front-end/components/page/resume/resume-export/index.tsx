import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import ResumeExportSelection from './resume-export-selection';
import { ResumeDataType } from '../../../../configs/interfaces/resume.interface';
import ResumeExportMain from './resume-export-main';
import ResumeExportPagination from './resume-export-pagination';
import SectionImportTitle from '../resume-import/section-import-title';
// import { resumeTemplate } from '../../../../configs/utils/template.utils';
// import ResumeExportContainer from './resume-export-container';

type ResumeExportProps = {
    className?: string;
    onChangeLayout: () => void;
};

const ResumeExport = ({ className, onChangeLayout }: ResumeExportProps) => {
    return (
        <div className={classNames(className, styles['resume-export'])}>
            <div className={classNames(styles['resume-export__container'])}>
                <ResumeExportPagination
                    className={styles['resume-export-pagination']}
                />
                <ResumeExportMain className={styles['resume-export-main']} />
                <ResumeExportSelection
                    className={styles['resume-export-selection']}
                    onChangeEditorLayout={onChangeLayout}
                />
            </div>
        </div>
    );
};

export default ResumeExport;
