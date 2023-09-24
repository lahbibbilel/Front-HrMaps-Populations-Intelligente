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
                    <a href="index.html" data-type="index-link">front-hr-maps-populations-intelligente documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-39eb823e6b79c2c964d017e1134ec0de122765fdaa7a0b8d01f6c08ec3a189350f3201732ba47af83fb6f9080618d56101d7ff0b6b905edbd74e1364f15c6c96"' : 'data-bs-target="#xs-components-links-module-AppModule-39eb823e6b79c2c964d017e1134ec0de122765fdaa7a0b8d01f6c08ec3a189350f3201732ba47af83fb6f9080618d56101d7ff0b6b905edbd74e1364f15c6c96"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-39eb823e6b79c2c964d017e1134ec0de122765fdaa7a0b8d01f6c08ec3a189350f3201732ba47af83fb6f9080618d56101d7ff0b6b905edbd74e1364f15c6c96"' :
                                            'id="xs-components-links-module-AppModule-39eb823e6b79c2c964d017e1134ec0de122765fdaa7a0b8d01f6c08ec3a189350f3201732ba47af83fb6f9080618d56101d7ff0b6b905edbd74e1364f15c6c96"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeleteCollabBodyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeleteCollabBodyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeletePopulationBodyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeletePopulationBodyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogBodyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogBodyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GetpopulationNameBodyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GetpopulationNameBodyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PopulationsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PopulationsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfilAdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfilAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UpdateCollabBodyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateCollabBodyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UpdatePopulationBodyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdatePopulationBodyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UpdateProfilComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateProfilComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link" >MaterialModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/DialogBodyComponent-1.html" data-type="entity-link" >DialogBodyComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserlistComponent.html" data-type="entity-link" >UserlistComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdminService.html" data-type="entity-link" >AdminService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CollaboratorDataServiceService.html" data-type="entity-link" >CollaboratorDataServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CollaboratorsService.html" data-type="entity-link" >CollaboratorsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PopulationDataServiceService.html" data-type="entity-link" >PopulationDataServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PopulationServiceService.html" data-type="entity-link" >PopulationServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenService.html" data-type="entity-link" >TokenService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/TokenInterceptor.html" data-type="entity-link" >TokenInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Authority.html" data-type="entity-link" >Authority</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Authority-1.html" data-type="entity-link" >Authority</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Collaborators.html" data-type="entity-link" >Collaborators</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CollaboratorsAdd.html" data-type="entity-link" >CollaboratorsAdd</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DialogData.html" data-type="entity-link" >DialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Employees.html" data-type="entity-link" >Employees</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/employees.html" data-type="entity-link" >employees</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmployeesGet.html" data-type="entity-link" >EmployeesGet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmployeeT.html" data-type="entity-link" >EmployeeT</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Emptoken.html" data-type="entity-link" >Emptoken</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Population.html" data-type="entity-link" >Population</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Populations.html" data-type="entity-link" >Populations</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Profil.html" data-type="entity-link" >Profil</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});