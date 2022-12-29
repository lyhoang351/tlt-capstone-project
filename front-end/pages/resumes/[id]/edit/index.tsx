import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import ResumeExport from '../../../../components/page/resume/resume-export';
import ResumeImport from '../../../../components/page/resume/resume-import';
import { ResumeDataType } from '../../../../configs/interfaces/resume.interface';
import { MOCKED_RESUME } from '../../../../mock/resume.mock';
import { LAYOUT } from '../../../../configs/constants/misc';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { resumeSavedState } from '../../../../recoil-state/resume-state/resume.state';
import {
    personalDetailChangedValueState,
    professionalSummaryChangedValueState,
    resumeChangedValueState,
    resumeInfoState,
} from '../../../../recoil-state/resume-state/resume-changed-state/resume-changed-single-section.state';
import {
    employmentHistoryItemsState,
    educationItemsState,
    linkItemsState,
    skillItemsState,
} from '../../../../recoil-state/resume-state/resume-changed-state/resume-changed-complex-section.state';

import { resumeTitleValueState } from '../../../../recoil-state/resume-state/resume-title.state';
import { get, isEmpty } from 'lodash';

type ResumeEditorProps = {
    initialResumeData: ResumeDataType;
};

const ResumeEditor = (props: ResumeEditorProps) => {
    const { initialResumeData } = props;
    const [resumeSaved, setResumeSaved] = useRecoilState(resumeSavedState);

    const resumeData = useRecoilValue(resumeChangedValueState);
    const setResumeInfo = useSetRecoilState(resumeInfoState);
    const setResumeTitle = useSetRecoilState(resumeTitleValueState);
    const setPersonalDetailsChangedValues = useSetRecoilState(
        personalDetailChangedValueState
    );
    const setProfessionalSummaryChangedValues = useSetRecoilState(
        professionalSummaryChangedValueState
    );
    const setEmploymentHistoryItems = useSetRecoilState(
        employmentHistoryItemsState
    );
    const setEducationItems = useSetRecoilState(educationItemsState);
    const setLinkItems = useSetRecoilState(linkItemsState);
    const setSkillItems = useSetRecoilState(skillItemsState);

    const [isEditing, setIsEditing] = useState(true);

    useEffect(() => {
        console.log('resumeData', resumeData);
    }, [resumeData]);

    useEffect(() => {
        setResumeSaved(initialResumeData);
        setResumeInfo({
            id: initialResumeData.id,
            template: initialResumeData.template,
        });
        setResumeTitle(
            initialResumeData.title ? initialResumeData.title : 'Untitled'
        );
    }, [initialResumeData, setResumeInfo, setResumeSaved, setResumeTitle]);

    useEffect(() => {
        if (!isEmpty(initialResumeData.personalDetails)) {
            setPersonalDetailsChangedValues(initialResumeData.personalDetails);
        }
        if (!isEmpty(initialResumeData.professionalSummary)) {
            setProfessionalSummaryChangedValues(
                initialResumeData.professionalSummary
            );
        }
    }, [
        initialResumeData.personalDetails,
        initialResumeData.professionalSummary,
        setPersonalDetailsChangedValues,
        setProfessionalSummaryChangedValues,
    ]);

    useEffect(() => {
        const employmentHistoriesItems = get(
            initialResumeData,
            'complexSections.sectionDetails.employmentHistories.items'
        );
        const educationsItems = get(
            initialResumeData,
            'complexSections.sectionDetails.educations.items'
        );
        const linksItems = get(
            initialResumeData,
            'complexSections.sectionDetails.links.items'
        );
        const skillsItems = get(
            initialResumeData,
            'complexSections.sectionDetails.skills.items'
        );
        if (employmentHistoriesItems) {
            setEmploymentHistoryItems(employmentHistoriesItems);
        }
        if (educationsItems) {
            setEducationItems(educationsItems);
        }
        if (linksItems) {
            setLinkItems(linksItems);
        }
        if (skillsItems) {
            setSkillItems(skillsItems);
        }
    }, [
        initialResumeData,
        setEducationItems,
        setEmploymentHistoryItems,
        setLinkItems,
        setSkillItems,
    ]);
    const changeLayoutHandler = () => {
        setIsEditing(!isEditing);
    };
    return (
        <>
            {isEditing ? (
                <div className="flex-row">
                    <ResumeImport
                        className="w-50 p-48"
                        initialResume={resumeSaved}
                    />
                    <ResumeExport
                        className="w-50"
                        onChangeLayout={changeLayoutHandler}
                    />
                </div>
            ) : (
                <Button
                    type="primary"
                    onClick={changeLayoutHandler}>
                    Back to Editor
                </Button>
            )}
        </>
    );
};

export default ResumeEditor;

export async function getServerSideProps() {
    const defaultReturnProps = {
        currentLayout: LAYOUT.EDITOR,
    };
    try {
        return {
            props: {
                ...defaultReturnProps,
                initialResumeData: MOCKED_RESUME,
            },
        };
    } catch (error: any) {
        return {
            props: {
                ...defaultReturnProps,
                error: JSON.stringify(error),
            },
        };
    }
}
