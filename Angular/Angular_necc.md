# NgModule metadata
An NgModule is defined by a class decorated with `@NgModule()`. <br />
The `@NgModule()` decorator is a function that takes a single metadata object, whose properties describe the module.
| Properties        | meaning           |
| ------------- |:-------------:|
| declarations     | The components, directives, and pipes that belong to this NgModule. |
| exports      | The subset of declarations that should be visible and usable in the component templates of other NgModules |
| imports | Other modules whose exported classes are needed by component templates declared in this NgModule |
| providers | Creators of services that this NgModule contributes to the global collection of services; they become accessible in all parts of the app. (You can also specify providers at the component level, which is often preferred.) |
| bootstrap | The main application view, called the root component, which hosts all other app views. Only the root NgModule should set the bootstrap property |


    
    // import object from other modules
    import { NgModule }      from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    
    // NgModule definition
    @NgModule({
      imports:      [ BrowserModule ],
      providers:    [ Logger ],
      declarations: [ AppComponent ],
      exports:      [ AppComponent ],
      bootstrap:    [ AppComponent ]
    })
    
    // export NgModule
    export class AppModule { }
    
### NgModules and components
NgModules provide a compilation context for their components. A root NgModule always has a root component that is created during bootstrap, but any NgModule can include any number of additional components, which can be loaded through the router or created through the template. The components that belong to an NgModule share a compilation context.



    // import Angular's Component decorator from the @angular/core library
    import { Component } from '@angular/core';
    
    // imports the BrowserModule NgModule from the platform-browser library
    // using the Angular and JavaScript module systems together.
    import { BrowserModule } from '@angular/platform-browser';
    
     // Add it to the @NgModule metadata imports to access that material
     // using the Angular and JavaScript module systems together.
     imports:      [ BrowserModule ], ...


