import { atom } from 'recoil';
import { ResumeDataType } from './../../configs/interfaces/resume.interface';

export const resumeSavedState = atom<any>({
    key: 'resumeSavedState',
    default: {},
});
