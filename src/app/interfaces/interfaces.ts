export interface Usuario {
    ID: string,
    NOMBRE: string,
    EMAIL: string,
    PASSWORD: string,
    ROL: string,
    AVATAR: string
}

export interface Reto {
    ID: string,
    TITULO: string,
    DESCRIPCION: string,
    TIPO: string,
    NIVEL: string,
    ACTIVO: boolean,
    DESTACADO: boolean,
    RETADOR: string,
    IMAGEN: string,
}

export interface Favorito {
    ID_RETO: string;
    ID_FAV: string;
    ID_USER: string;
  }

export interface MenuOpts {
    icon: string;
    name: string;
    redirectTo: string;
    rol: string;
}