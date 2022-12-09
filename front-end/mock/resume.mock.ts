import { PersonalDetailsDataType, ResumeDataType } from './../configs/interfaces/resume.interface';

export const PersonalDetailData: PersonalDetailsDataType = {
        id: 1,
        header: 'Personal Detail',
        jobTitle: 'Web Developer',
        firstName: 'Giac',
        lastName: 'Linh',
        email: 'hoanglyhayt@gmail.com',
        phone: '0123456789',
        country: 'Viet Nam',
        address: '',
        nationality: '',
        placeOfBirth: '',
        dateOfBirth: new Date(2001, 0o5, 0o3)
}

export const MOCKED_RESUME: ResumeDataType = {
        id: 1,
        title: 'Mocked Resume',
        templateId: 1,
        personalDetails: {
                header: 'Personal Details',
                jobTitle: 'Web Developer',
                firstName:'Giac',
                // lastName:'Linh',
                email: 'linhgiac@gmail.com',
                phone: '0123456789',
                country: 'Vietnam',
                city: 'Hochiminh'
        },
        professionalSummary: {
                header: 'Professional Summary',
                content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
}