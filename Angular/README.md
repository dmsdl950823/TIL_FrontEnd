# Angular TIL

Angular is a platform and framework for building single-page client applications in HTML & Typescript(wirtten in ts) <br />

The basic building blocks are ```NgModuls```, which provde a compliation context for components. : Angular app is defined by a set of NgModules. An app always has at least a ```root module``` that enables bootstrapping, and typicallu has many more feature modules.

1. ```views``` : screen elements sets thtat Angular can choose among & modify according to your program logic & data.
2. ```service``` : provide specifix functionality not directly related to views. Service providers can be ```injected``` into components as ```dependencies```, making your code modular, reusable, and efficient.

Both components and services are simply 'classes', with ```decorators``` that mark their type and provide metadata that tells Angular how to use them.


### Modules
```NgModules``` declares a compilation context for a set of components that is dedicated to an application domain, a workflow, or a closely related set of capabilities.
Every Angular app has a ```root module```, conventionally named ```AppModule```, which provides the bootstrap mechanism that launches the application.

### Components
The ```root component``` that connects a component hierarchy with the page document object model (DOM). Each component defines a ```class``` that contains application data and logic, and is associated with an HTML template that defines a view to be displayed in a target environment.

```@Component()``` decorator identifies the class immediately below it as a component, and provides the template and related component-specific metadata.


#### Templates, directives, and data binding

> ```Templates``` : Combines HTML with Angular markup that can modify HTML elements before they are displayed. Template ```directives``` provide program logic, and binding markup connects your application data and the DOM. There are two types of data binding: meaning that changes in the DOM, such as user choices, are also reflected in your program data.

* Event binding lets your app respond to user input in the target environment by updating your application data.
* Property binding lets you interpolate values that are computed from your application data into the HTML.

Your templates can use pipes to improve the user experience by transforming values for display.

#### Service and dependency injection
```service class``` : Create ``service class`` for data or logic that isn't associated with a specific view, and that you want to share across components. Define with `@Injectable()` decorator, providing the metadata that allows other providers to be injected as dependencies into your class.


#### Routing

> `Router` : Provices a service that lets you define a navigation path among the different application states and view hierarchies in your app. It is modeled on the familiar browser navigation conventions:

* Enter a URL in the address bar and the browser navigates to a corresponding page.

* Click links on the page and the browser navigates to a new page.

* Click the browser's back and forward buttons and the browser navigates backward and forward through the history of pages you've seen.

The router maps URL-like paths to views instead of pages. When a user performs an action, such as clicking a link, that would load a new page in the browser, the router intercepts the browser's behavior, and shows or hides view hierarchies.











