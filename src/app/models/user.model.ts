export interface User {
    uid: string,
    email: string,
    password: string,
    name: string,
    userType: 'Desarrollador' | 'Cliente',
    speciality?: string,
}