export interface Usuario {
    ID: string,
    NOMBRE: string,
    EMAIL: string,
    PASSWORD: string,
    ROL: string,
    AVATAR: string
}

export interface MenuOpts {
    icon: string;
    name: string;
    redirectTo: string;
}