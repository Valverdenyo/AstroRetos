export interface Usuario {
    ID: string,
    NOMBRE: string,
    EMAIL: string,
    PASSWORD: string,
    ROL: string,
    AVATAR: string
}

export interface menuOpts {
    icon: string;
    name: string;
    redirectTo: string;
}