/**
 * Interface para el manejo del Usuario. COLECCION: usuarios
 */
export interface Usuario {
  /**
   * Identificador del usuario. Es el mismo que el autogenerado por Firebase para facilitar el manejo del objeto
   */
  ID: string,

  /**
   * Nombre del usuario
   */
  NOMBRE: string,

  /**
   * Email del usuario
   */
  EMAIL: string,

  /**
   * Contraseña del usuario. No se envia ni se guarda. Solo se usa para el método de cambio de Password
   */
  PASSWORD: string,

  /**
   * Rol del usuario. Puede ser Anónimo, Retador o Administrador
   */
  ROL: string,

  /**
   * URL de acceso al avatar.
   */
  AVATAR: string,

  /**
   * Puntos totales según el número de retos conseguidos
   */
  PUNTOS: number
}

/**
 * Interface para el manejo de retos. COLECCION: retos
 */
export interface Reto {

  /**
   * Identificador del Reto. Es el mismo que el autogenerado por Firestore.
   */
  ID: string,

  /**
   * Titulo del reto
   */
  TITULO: string,

  /**
   * Descripcion larga del reto
   */
  DESCRIPCION: string,

  /**
   * Tipo de reto. Puede ser ocular, prismaticos o telescopio
   */
  TIPO: string,

  /**
   * Nivel del reto. Puede ser facil, intermedio o dificil
   */
  NIVEL: string,

  /**
   * Indica si el reto esta activo o no. El retador puede manejar los suyos. Los administradores, todos.
   */
  ACTIVO: boolean,

  /**
   * Marca retos destacados. TODAVIA NO ESTA IMPLEMENTADO
   */
  DESTACADO: boolean,

  /**
   * Email del retador.
   */
  RETADOR: string,

  /**
   * Imagen del reto subida por el retador
   */
  IMAGEN: string,
}

/**
 * Interface para manejar Favoritos. COLECCION: favoritos
 */
export interface Favorito {
  /**
   * Identificador del Reto.
   */
  ID_RETO: string;

  /**
   * Identificador de Favorito. Se guarda como campo el Identificador autogenerado para que sea más accesible 
   */
  ID_FAV: string;

  /**
   * Email del usuario que marca el Favorito
   */
  USER: string;
}

/**
 * Interface para el manejo de los retos conseguidos. COLECCION: retosconseguidos
 */
export interface RetoConseguido {
  /**
   * Identificador del Reto.
   */
  ID_RETO: string;

  /**
   * Identificador del objeto, igual al autogenerado por Firestore
   */
  ID_RETO_CONSEGUIDO: string;

  /**
   * Email dle usuario que ha conseguido el reto
   */
  USER: string;

  /**
   * Puntos conseguidos por ese reto
   */
  PUNTOS: number;
}

/**
 * Interface para el manejo del Menu. Segun el rol del usuario, se cargaran unas opciones u otras.
 */
export interface MenuOpts {

  /**
   * Icono de la opcion de menu
   */
  icon: string;

  /**
   * Nombre a mostrar en el menu
   */
  name: string;

  /**
   * Página o tura a la que nos lleva la opcion
   */
  redirectTo: string;

  /**
   * Roles que tienen acceso: all, retador, administrador
   */
  rol: string;
}