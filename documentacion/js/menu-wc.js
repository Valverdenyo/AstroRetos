'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">Documentación de AstroRetos</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Escribe para buscar"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Comenzando</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Descripción general
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencias
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Propiedades
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Módulos</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AboutPageModule.html" data-type="entity-link" >AboutPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AboutPageModule-440545e55a17e9fbb1abdcc2b84d78b85105fce77751ec5396e63ccfad9fbda10026da0704c9560e93298634859f5351b72cfa38229746346278b83747306890"' : 'data-target="#xs-components-links-module-AboutPageModule-440545e55a17e9fbb1abdcc2b84d78b85105fce77751ec5396e63ccfad9fbda10026da0704c9560e93298634859f5351b72cfa38229746346278b83747306890"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AboutPageModule-440545e55a17e9fbb1abdcc2b84d78b85105fce77751ec5396e63ccfad9fbda10026da0704c9560e93298634859f5351b72cfa38229746346278b83747306890"' :
                                            'id="xs-components-links-module-AboutPageModule-440545e55a17e9fbb1abdcc2b84d78b85105fce77751ec5396e63ccfad9fbda10026da0704c9560e93298634859f5351b72cfa38229746346278b83747306890"' }>
                                            <li class="link">
                                                <a href="components/AboutPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AboutPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AboutPageRoutingModule.html" data-type="entity-link" >AboutPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AdminPageModule.html" data-type="entity-link" >AdminPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdminPageModule-fff63b51239049a5e1766a9b07a2c50062fc0e7c2fd8e4ab862b4a2829508cfed61fb806eb8a6820adb5ebd41ec41b4bf86abfc60c519a59926b2a14c112038c"' : 'data-target="#xs-components-links-module-AdminPageModule-fff63b51239049a5e1766a9b07a2c50062fc0e7c2fd8e4ab862b4a2829508cfed61fb806eb8a6820adb5ebd41ec41b4bf86abfc60c519a59926b2a14c112038c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminPageModule-fff63b51239049a5e1766a9b07a2c50062fc0e7c2fd8e4ab862b4a2829508cfed61fb806eb8a6820adb5ebd41ec41b4bf86abfc60c519a59926b2a14c112038c"' :
                                            'id="xs-components-links-module-AdminPageModule-fff63b51239049a5e1766a9b07a2c50062fc0e7c2fd8e4ab862b4a2829508cfed61fb806eb8a6820adb5ebd41ec41b4bf86abfc60c519a59926b2a14c112038c"' }>
                                            <li class="link">
                                                <a href="components/AdminPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminPageRoutingModule.html" data-type="entity-link" >AdminPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-68a3bf1dbd439de24e9762d12449a311b919c63dc561478923c84eaaa0462c26e41f76eb6d9752a32b6be5ccb60ea499bed116f707dae24a60e13bd3d9f1d39f"' : 'data-target="#xs-components-links-module-AppModule-68a3bf1dbd439de24e9762d12449a311b919c63dc561478923c84eaaa0462c26e41f76eb6d9752a32b6be5ccb60ea499bed116f707dae24a60e13bd3d9f1d39f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-68a3bf1dbd439de24e9762d12449a311b919c63dc561478923c84eaaa0462c26e41f76eb6d9752a32b6be5ccb60ea499bed116f707dae24a60e13bd3d9f1d39f"' :
                                            'id="xs-components-links-module-AppModule-68a3bf1dbd439de24e9762d12449a311b919c63dc561478923c84eaaa0462c26e41f76eb6d9752a32b6be5ccb60ea499bed116f707dae24a60e13bd3d9f1d39f"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ComponentsModule.html" data-type="entity-link" >ComponentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ComponentsModule-55f6f037f96bd21c10a23480a1569accf985f3f64219ace8cf580dfc6fe3fee0fb560c438436b05a605f9788ea934c7aec9373f72c35dd0650cb6cb3b153cd1a"' : 'data-target="#xs-components-links-module-ComponentsModule-55f6f037f96bd21c10a23480a1569accf985f3f64219ace8cf580dfc6fe3fee0fb560c438436b05a605f9788ea934c7aec9373f72c35dd0650cb6cb3b153cd1a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ComponentsModule-55f6f037f96bd21c10a23480a1569accf985f3f64219ace8cf580dfc6fe3fee0fb560c438436b05a605f9788ea934c7aec9373f72c35dd0650cb6cb3b153cd1a"' :
                                            'id="xs-components-links-module-ComponentsModule-55f6f037f96bd21c10a23480a1569accf985f3f64219ace8cf580dfc6fe3fee0fb560c438436b05a605f9788ea934c7aec9373f72c35dd0650cb6cb3b153cd1a"' }>
                                            <li class="link">
                                                <a href="components/FabLoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FabLoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InfoRetoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InfoRetoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewRetoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewRetoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NoticiaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NoticiaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NoticiasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NoticiasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegistroComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegistroComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RetoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RetoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RetosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RetosComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FavoritosPageModule.html" data-type="entity-link" >FavoritosPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FavoritosPageModule-6b8fe1f9712be0b6962e14f2932809859dc91958455d09ac3ec87603301f3686cda47492dc68f90ee2d058e5b1a8e883edb8e27f1a9a99793f8571b0957048e1"' : 'data-target="#xs-components-links-module-FavoritosPageModule-6b8fe1f9712be0b6962e14f2932809859dc91958455d09ac3ec87603301f3686cda47492dc68f90ee2d058e5b1a8e883edb8e27f1a9a99793f8571b0957048e1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FavoritosPageModule-6b8fe1f9712be0b6962e14f2932809859dc91958455d09ac3ec87603301f3686cda47492dc68f90ee2d058e5b1a8e883edb8e27f1a9a99793f8571b0957048e1"' :
                                            'id="xs-components-links-module-FavoritosPageModule-6b8fe1f9712be0b6962e14f2932809859dc91958455d09ac3ec87603301f3686cda47492dc68f90ee2d058e5b1a8e883edb8e27f1a9a99793f8571b0957048e1"' }>
                                            <li class="link">
                                                <a href="components/FavoritosPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FavoritosPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FavoritosPageRoutingModule.html" data-type="entity-link" >FavoritosPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageModule.html" data-type="entity-link" >HomePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomePageModule-20f284bc6b625d740b687ce41f5fdf743e4984da0c800c30f643734a0f6e87351b5ccf9a261597ee6c2f090ddfb314539cdcf2c1cc73da55de966dc7045d4a70"' : 'data-target="#xs-components-links-module-HomePageModule-20f284bc6b625d740b687ce41f5fdf743e4984da0c800c30f643734a0f6e87351b5ccf9a261597ee6c2f090ddfb314539cdcf2c1cc73da55de966dc7045d4a70"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomePageModule-20f284bc6b625d740b687ce41f5fdf743e4984da0c800c30f643734a0f6e87351b5ccf9a261597ee6c2f090ddfb314539cdcf2c1cc73da55de966dc7045d4a70"' :
                                            'id="xs-components-links-module-HomePageModule-20f284bc6b625d740b687ce41f5fdf743e4984da0c800c30f643734a0f6e87351b5ccf9a261597ee6c2f090ddfb314539cdcf2c1cc73da55de966dc7045d4a70"' }>
                                            <li class="link">
                                                <a href="components/HomePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageRoutingModule.html" data-type="entity-link" >HomePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MisRetosPageModule.html" data-type="entity-link" >MisRetosPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MisRetosPageModule-ad3fc300a2dd552e89c55fb33a48f583782776ea5d7bad8b48575c6b1d037379cd6837f99a9e094fd3de8a3d5ac5b2795d8a8f3c01b237e6c301f6284a0f775e"' : 'data-target="#xs-components-links-module-MisRetosPageModule-ad3fc300a2dd552e89c55fb33a48f583782776ea5d7bad8b48575c6b1d037379cd6837f99a9e094fd3de8a3d5ac5b2795d8a8f3c01b237e6c301f6284a0f775e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MisRetosPageModule-ad3fc300a2dd552e89c55fb33a48f583782776ea5d7bad8b48575c6b1d037379cd6837f99a9e094fd3de8a3d5ac5b2795d8a8f3c01b237e6c301f6284a0f775e"' :
                                            'id="xs-components-links-module-MisRetosPageModule-ad3fc300a2dd552e89c55fb33a48f583782776ea5d7bad8b48575c6b1d037379cd6837f99a9e094fd3de8a3d5ac5b2795d8a8f3c01b237e6c301f6284a0f775e"' }>
                                            <li class="link">
                                                <a href="components/MisRetosPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MisRetosPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MisRetosPageRoutingModule.html" data-type="entity-link" >MisRetosPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NewsPagePageModule.html" data-type="entity-link" >NewsPagePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NewsPagePageModule-e70643b55ca50c911a1129d1d310184320297d3ede724eb28ba266e05a516ce3b045f57db1ea17ba2255dfce0db9cab5c5407fe9fff4c0360a37cb97080603b1"' : 'data-target="#xs-components-links-module-NewsPagePageModule-e70643b55ca50c911a1129d1d310184320297d3ede724eb28ba266e05a516ce3b045f57db1ea17ba2255dfce0db9cab5c5407fe9fff4c0360a37cb97080603b1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NewsPagePageModule-e70643b55ca50c911a1129d1d310184320297d3ede724eb28ba266e05a516ce3b045f57db1ea17ba2255dfce0db9cab5c5407fe9fff4c0360a37cb97080603b1"' :
                                            'id="xs-components-links-module-NewsPagePageModule-e70643b55ca50c911a1129d1d310184320297d3ede724eb28ba266e05a516ce3b045f57db1ea17ba2255dfce0db9cab5c5407fe9fff4c0360a37cb97080603b1"' }>
                                            <li class="link">
                                                <a href="components/NewsPagePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewsPagePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NewsPagePageRoutingModule.html" data-type="entity-link" >NewsPagePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PerfilPageModule.html" data-type="entity-link" >PerfilPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PerfilPageModule-1512e9017761befe89ca4b309bfb005aa1912e26e47a0951c37e3b0770d4952193506c841c47cfe99ca9c2d50e0b3e33d6f5fb96c8b2db0b0253888b6b933e5e"' : 'data-target="#xs-components-links-module-PerfilPageModule-1512e9017761befe89ca4b309bfb005aa1912e26e47a0951c37e3b0770d4952193506c841c47cfe99ca9c2d50e0b3e33d6f5fb96c8b2db0b0253888b6b933e5e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PerfilPageModule-1512e9017761befe89ca4b309bfb005aa1912e26e47a0951c37e3b0770d4952193506c841c47cfe99ca9c2d50e0b3e33d6f5fb96c8b2db0b0253888b6b933e5e"' :
                                            'id="xs-components-links-module-PerfilPageModule-1512e9017761befe89ca4b309bfb005aa1912e26e47a0951c37e3b0770d4952193506c841c47cfe99ca9c2d50e0b3e33d6f5fb96c8b2db0b0253888b6b933e5e"' }>
                                            <li class="link">
                                                <a href="components/PerfilPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PerfilPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PerfilPageRoutingModule.html" data-type="entity-link" >PerfilPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RankingPageModule.html" data-type="entity-link" >RankingPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RankingPageModule-cb4c8ccc0c8465548f7cf4eb1b11f17ea5032aca7d1d7c8eb6b10300e34ac2494f355e431e96c45bcf41fa51eaf5a41d04111e7e30a2efe5461f97f7c31b3b78"' : 'data-target="#xs-components-links-module-RankingPageModule-cb4c8ccc0c8465548f7cf4eb1b11f17ea5032aca7d1d7c8eb6b10300e34ac2494f355e431e96c45bcf41fa51eaf5a41d04111e7e30a2efe5461f97f7c31b3b78"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RankingPageModule-cb4c8ccc0c8465548f7cf4eb1b11f17ea5032aca7d1d7c8eb6b10300e34ac2494f355e431e96c45bcf41fa51eaf5a41d04111e7e30a2efe5461f97f7c31b3b78"' :
                                            'id="xs-components-links-module-RankingPageModule-cb4c8ccc0c8465548f7cf4eb1b11f17ea5032aca7d1d7c8eb6b10300e34ac2494f355e431e96c45bcf41fa51eaf5a41d04111e7e30a2efe5461f97f7c31b3b78"' }>
                                            <li class="link">
                                                <a href="components/RankingPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RankingPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RankingPageRoutingModule.html" data-type="entity-link" >RankingPageRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Inyectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AvisosService.html" data-type="entity-link" >AvisosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MenuService.html" data-type="entity-link" >MenuService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MultimediaService.html" data-type="entity-link" >MultimediaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NewsService.html" data-type="entity-link" >NewsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RetoService.html" data-type="entity-link" >RetoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Article.html" data-type="entity-link" >Article</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ArticlesByCategoryAndPage.html" data-type="entity-link" >ArticlesByCategoryAndPage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Error.html" data-type="entity-link" >Error</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Favorito.html" data-type="entity-link" >Favorito</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuOpts.html" data-type="entity-link" >MenuOpts</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewsResponse.html" data-type="entity-link" >NewsResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Reto.html" data-type="entity-link" >Reto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RetoConseguido.html" data-type="entity-link" >RetoConseguido</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Source.html" data-type="entity-link" >Source</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Usuario.html" data-type="entity-link" >Usuario</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscelánea</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Rutas</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Cobertura de la documentación</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});