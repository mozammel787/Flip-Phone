import React from 'react';
import useTitle from '../../Hooks/useTitle';

const Blog = () => {
   
    useTitle('Blog')
    return (
        <div className="w-full pb-10 ">
            <div className='text-pripary flex text-3xl lg:text-5xl font-bold justify-center gap-5 py-10'>
                -
                <h2 > BLOGS</h2>
                -
            </div>

            <article className='max-w-7xl px-6 my-10 lg:px-16 py-24 mx-auto space-y-16  shadow-md' >
                <div className="w-full mx-auto space-y-4">
                    <h1 className="text-3xl lg:text-5xl font-bold leading-none">What are the different ways to manage a state in a React application?</h1>
                </div>
                <div className=" text-justify">

                    <p>In React apps, there are at least seven ways to handle the state. Let us briefly explore a few of them in this part.
                        <br />
                        URL
                        We can use URL to store some data e.g.
                        <ol>
                            <li>The id of the current item, being viewed</li>
                            <li> Filter parameters</li>
                            <li>  Pagination offset and limit</li>
                            <li>  Sorting data</li>

                        </ol>
                        <br />
                        Keeping such data in the URL allows users to share deep links with others.

                        It is recommended to avoid storing such information in the app’s state to avoid the URL in our app getting out of sync. The URL should be used as the system of record, Read from it as needed for information related to sorting, pagination, etc. Update the URL as required when the settings change

                        React Router is a great tool to handle routes and manage the params.
                        We do not need to store the id in a state or pass it as props to the ProductDetails component instead, it can be fetched using useParams().
                        <br />
                        Web Storage
                        <br />
                        The second option is to store the state in the browser via web storage. This is useful when we want to persist state between reloads and reboots. Examples include cookies, local storage, and IndexedDB. These are native browser technologies.

                        Data persisted in the browser is tied to a single browser. So, if the user loads the site in a different browser, the data will not be available.

                        We avoid storing sensitive data in the browser since the user may access the app on a shared machine. Some examples of where web storage might be most useful include storing a user’s shopping cart, saving partially completed form data or storing JWT token in HttpOnly Cookie.

                        Here is an example of saving user preferences locally in the browser or even persist the complete state for one or more of our components.
                        <br />
                        Local State
                        <br />
                        The third option is to use store state locally. It is useful when one component needs the state. Examples include a toggle button, a form, etc.
                        <br />
                        Lifted State
                        <br />
                        The Fourth option is to define the state in the parent component. Often, the same state is used across multiple components. In those cases, it is useful to lift the state to a common parent. The lifting state is a two‑step process. First, we declare the state in a common parent component, and then we pass the state down to child components via props. This pattern should be considered any time a few related components need to use the same state. The lifting state avoids duplicating states in multiple components. It helps to assure that our components all consistently reflect the same state.

                        In the below example, we have lifted the state and the handleChange event in the parent component, helping to maintain consistency.

                        <br />
                        Derived State
                        <br />
                        The fifth option is to compute the new state based on the available state and we do not need to declare a state at all. If there are existing values that can be composed to give us the information we need, then we can calculate that information on each render instead of storing it. Some examples include calling .length on an array to determine the number of records instead of storing a separate numItems variable in the state or deriving an errorsExist boolean by checking if the errors array is empty.

                        So, why bother deriving the state? Well, deriving the state avoids our state values getting out of sync. It simplifies our code since we do not have to remember to keep separate values in sync. When we update the state, derived values are automatically recalculated in the render.

                        For example, we can calculate the items added to the cart and show it on the cart icon like this, this.state.cart.items.length and pass it as a prop to Badge Component. We do not need to store the itemsCount key in a cart state. Each time the cart state gets changed, the count on the Badge will be calculated automatically.</p>
                </div>

            </article>

            <article className="max-w-7xl px-6 my-10 lg:px-16 py-24 mx-auto space-y-16  shadow-md ">
                <div className="w-full mx-auto space-y-4">
                    <h1 className="text-3xl lg:text-5xl font-bold leading-none"> How does prototypical inheritance work?</h1>


                </div>
                <div className="text-justify">

                    <p>WJavaScript is a prototype-based, Object Oriented programming language. After the ES6 updates, JavaScript allowed for “prototypal inheritance”, meaning that objects and methods can be shared, extended, and copied.

                        Sharing amid objects makes for easy inheritance of structure (data fields), behavior (functions / methods), and state (data values).

                        JavaScript is the most common of the prototype-capable languages, and its capabilities are relatively unique. When used appropriately, prototypical inheritance in JavaScript is a powerful tool that can save hours of coding.

                        Today, we want to get you acquainted with prototypal inheritance in JavaScript to get you up to date with the ES6 capabilities.
                        <br />
                        Simply put, prototypical inheritance refers to the ability to access object properties from another object. We use a JavaScript prototype to add new properties and methods to an existing object constructor. We can then essentially tell our JS code to inherit properties from a prototype. Prototypical inheritance allows us to reuse the properties or methods from one JavaScript object to another through a reference pointer function.
                        <br />
                        All JavaScript objects inherit properties and methods from a prototype:

                        Date objects inherit from Date.prototype.
                        Array objects inherit from Array.prototype.
                        Player objects inherit from Player.prototype.
                        The Object.prototype is on top of the prototype inheritance chain. ​ Date objects, Array objects, and Player objects all inherit from Object.prototype.
                        <br />
                        Revisiting an old example
                        <br />
                        Let’s walk through an example of prototypical inheritance you’re likely familiar with from grade school: all squares are rectangles, but not all rectangles are squares. If we think of this as a JS program, we could say that the rectangle is a prototype to the square: the square inherits all properties of a rectangle (i.e. four-sides and closed), while also adding a new feature (i.e. all sides are the same length).

                        We could not, however, construct this same concept using the square as a prototype, because there are properties of a square that do not apply to rectangles (i.e. all sides are the same length).

                        We can see how prototypal inheritance works on the basis of specifying categories within a group from least specific to most – from rectangle to square. In code, this concept can sometimes be lost in the syntax. If you find this happens, speak the relations between objects and listen to where you draw distinctions. If you hear, “all ___ are , but…not all ___ are”, that is where a new prototypical relationship should be added.
                        <br />
                        Cons of Prototypal Inheritance
                        <br />
                        Prototypical inheritance clearly has a lot of benefits for JavaScript programmings, but, like all tools, it does have limitations. Let’s take a look at the key downsides to look out for as you write a prototype-based program:

                        Inheritance cannot flow in circles as this will create an error. For example, if user linked premiumFamily as a prototype in the above program, an error would occur as this would create a loop.

                        Objects cannot inherit from multiple prototypes. As we saw above, they can inherit multiple object’s properties through a chain, however another object linked as a prototype explicitly will cause an error. This is the case even if the additional prototype is within the same chain. For example, familyPremium could not have explicit links to both premiumUser and user.

                        Prototypical relationships can only be made to objects. This is because the __proto__ function works as a forwarder, directing the program where to find the value it is looking for. As the program either knows where to look or it doesn’t, the function can be only either null or an object. All other types will be discarded.


                        <br />
                        __proto__ property
                        <br />
                        In Javascript, every object has its own hidden, internal property, [[Prototype]]. We can access that [[Prototype]] using the __proto__ property. This calls the program to mark the template object as a hidden type. JavaScript objects must be linked to this prototype object. Now, an object’s properties can be accessed by the inheritor object.

                        Let’s take a look at the syntax for accessing and setting the [[Prototype]] property of an object. <br />
                        Object.create
                        <br />
                        JavaScript ECMAScript 5 comes with the function Object.create( ). This method can be used to replacenew. We can use it to create an empty object based on a defined prototype and then assign it to a different prototype.
                        <br />
                        Object.prototype.constructor
                        <br />
                        All objects have a constructor property. If an object is created without the using a constructor function, it will have a constructor property. The constructor property will return a reference to the object’s Object constructor function. It will return 1, true1, and ”test”`. Take a look at an example below.
                        <br />
                        hasOwnProperty
                        <br />
                        Using hasOwnProperty, we can test if an object contains a certain prototype property; the method will return true or false depending. This will help you clarify if an object has its own property or if it is inheriting instead.
                        <br />
                        There are no mandatory claims for a JWT, but overlaying standards may make claims mandatory. For example, when using JWT as bearer access token under OAuth2.0, iss, sub, aud, and exp must be present. some are more common than others.
                        <br />
                        The Prototype Chain
                        <br />
                        Prototypal inheritance uses the concept of prototype chaining. Let’s explore that concept. Every object created contains [[Prototype]], which points either to another object or null. Envision an object C with a [[Prototype]] property that points to object B. Object B’s [[Prototype]] property points to prototype object A. This continues onward, forming a kind of chain called the prototype chain.

                        This concept is used when searching our code. When we need to find a property in an object, it is first searched for in the object, and if not found, it is searched for on that object’s prototype, and so on. Thus, the entire prototype chain is traversed until the property is found or null is reached.

                        In the following sections, we’ll take a look at some implementations using the handling of accounts in a streaming service.
                    </p>
                </div>

            </article>

            <article className="max-w-7xl px-6 my-10 lg:px-16 py-24 mx-auto space-y-16  shadow-md ">
                <div className="w-full mx-auto space-y-4">
                    <h1 className="text-3xl lg:text-5xl font-bold leading-none"> What is a unit test? Why should we write unit tests? </h1>

                </div>
                <div className=" text-justify ">

                    What is Unit Testing?
                    <br />
                    nit testing is a type of software testing where individual units or software components are tested. Its purpose is to validate that each unit of code performs as expected. A unit can be anything you want it to be — a line of code, a method, or a class.

                    Generally, smaller tests are better as they give a more granular view of your code’s performance. Also, when you test very small units, your tests can run fast, like a thousand tests in a second fast.
                    <br />
                    There are two types of unit testing:

                    Manual: As the name implies, unit tests are run manually to verify the correctness of your code. This is done before writing automated tests. Its drawback is that you have to manually test your functions/classes whenever you make changes to them.
                    Automated: This is the preferred unit testing method as it can be carried out by simply running a script. Automated tests also make it easier to run tests when your application scales.
                    <br />
                    Why should we write unit tests?
                    <br />
                    To justify any effort in business, there must be a positive impact on the bottom line. Here are a few benefits to writing unit tests:

                    Unit tests save time and money. Usually, we tend to test the happy path more than the unhappy path. If you release such an app without thorough testing, you would have to keep fixing issues raised by your potential users. The time to fix these issues could’ve been used to build new features or optimize the existing system. Bear in mind that fixing bugs without running tests could also introduce new bugs into the system.
                    Well-written unit tests act as documentation for your code. Any developer can quickly look at your tests and know the purpose of your functions.
                    It simplifies the debugging process.
                    Unit testing is an integral part of extreme programming. Extreme programming is basically a “test-everything-that-can-possibly-break” programming strategy.
                    Unit tests make code reuse easier. If you want to reuse existing code in a new project, you can simply migrate both the code and tests to your new project, then run your tests to make sure you have the desired results.
                    Unit testing improves code coverage. A debatable topic is to have 100% code coverage across your application.
                    In the testing pyramid, unit tests are faster than integration and end-to-end. They are more assertive and return quick feedback.
                    <br />
                    Unit Testing Techniques
                    <br />
                    There are three unit testing techniques to test code in isolation. Your application’s requirements would determine which to adopt:

                    Black Box Testing: Testing the user interface, input, and output,
                    White Box Testing: Testing the behavior of your functions,
                    Grey Box Testing: Executing test suites, test cases, and risk analysis
                    <br />
                    Best Practices, Pros, and Cons
                    <br />
                    Now that we understand unit testing, testing techniques, and tools, let’s look at factors you need to consider to write effective unit tests:

                    All test cases should be independent of each other. For example, one test case shouldn’t be a prerequisite for another to run. This ensures that if one test case fails, others wouldn’t be affected by it.
                    If you run your automated unit tests and one or more tests fail, you should fix those before proceeding to the next phase of the SDLC.
                    Always write tests around areas where you fix bugs so that you have the confidence of the bug not re-occurring without knowing.
                    Name your tests appropriately. It could act as documentation and help you when debugging failing tests.
                    Mock external dependencies as much as possible.
                    Let your test coverage report guide you. You can easily detect uncovered lines of code from your test coverage report.
                    Don’t ignore tests. If a test fails, try debugging; check if the error originated from your test or the code itself. Ensure all tests pass before merging your pull request.
                    Let’s look at some of the advantages of unit testing:

                    You can test units or functions of your project in isolation.
                    Unit tests act as documentation for your code.
                    They enable you to catch bugs early in the development process.
                    Automated unit tests help a great deal with regression testing.
                    They detect code smells in your codebase. For example, if you’re having a hard time writing unit tests for a piece of code, it might be a sign that your function is too complex.
                    They contribute to higher code quality.
                    Here are a few limitations of unit testing:

                    Unit tests cannot catch integration-level bugs.
                    Unit testing increases the amount of code to be written.
                    Writing some complex test cases could take some time, especially if you’re adopting TDD (Test-Driven Development).


                </div>
        

            </article >

    <article className="max-w-7xl px-6 my-10 lg:px-16 py-24 mx-auto space-y-16  shadow-md ">
        <div className="w-full mx-auto space-y-4">
            <h1 className="text-3xl lg:text-5xl font-bold leading-none">React vs. Angular vs. Vue? </h1>
           
        </div>
        <div className=" text-justify">

            <p>This post is a comprehensive guide on which is perhaps the right solution for you: Angular vs React vs Vue.

Just a couple of years ago, developers were mainly debating whether they should be using Angular vs React for their projects. But over the course of the last couple of years, we’ve seen a growth of interest in a third player called Vue.js.

If you are a developer starting out on a project and cannot decide on which JavaScript framework to use, this guide should help you make a decision.
                <br />
                Here we’ll cover various aspects of Angular, Vue, and React to see how they suit your needs. This post is not just a guide on Angular vs React vs Vue but aims to provide a structure to help judge front-end JavaScript frameworks in general. In case a new framework arrives next year, you will know exactly what parameters to look at!
                <br />
                TL;DR: Are you looking for direct, head-to-head comparisons between Angular vs React, Angular vs Vue, and React vs Vue? Check out these short summaries here:
                <br />
                Angular vs React
                <br />
                React often requires extra modules and components, which keeps the core library small, but means there’s extra work involved when incorporating outside tools. Angular, on the other hand, is more of a full-fledged solution that doesn’t require extras like React often does, though it does have a steeper learning curve for its core compared to React.

React is more suitable for intermediate to advanced JavaScript developers who are familiar with concepts from ES6 and up, while Angular favors those same developers who are also familiar with TypeScript.
                <br />
                React vs Vue
                <br />
                The choice between React vs Vue is often debated and it’s not an easy one. Vue has a vibrant and ever-growing community and has taken over popularity vs. React in many respects. React developers are still churning out lots of new components and extras, so there’s no sign that React is on the decline either.
                <br />
Vue is generally more suited to smaller, less complex apps and is easier to learn from scratch compared to React. Vue can be easier to integrate into new or existing projects and many feel its use of HTML templates along with JSX is an advantage.
<br />
Overall, Vue might be the best choice if you’re a newer developer and not as familiar with advanced JavaScript concepts, while React is quite well suited for experienced programmers and developers who have worked with object-oriented JavaScript, functional JavaScript, and similar concepts.
                <br />
                How is NodeJS better than traditional multithreaded request response model?
                With traditional multithreaded request/response model, every client gets a different thread where as with NodeJS, the simpler request are all handled directly by the EventLoop. This is an optimization of thread pool resources and there is no overhead of creating the threads for every client request.  
                <br /> 
                Angular vs Vue
                <br />
                
In most cases, you probably wouldn’t be deciding between only Angular and Vue. They are vastly different libraries with very different feature sets and learning curves. Vue is the clear choice for less experienced developers, and Angular would be preferred for those working on larger apps.
                <br />
                A large library like Angular would require more diligence in keeping up with what’s new, while Vue would be less demanding in this regard and the fact that the two most recent major releases of Vue are in separate repositories helps.
                <br />
                It should also be noted that Vue was created by a developer who formerly worked on Angular for Google, so that’s another thing to keep in mind, though that wouldn’t have a huge impact on your decision.
                </p>
        </div>

    </article>

        </div >
    );
};

export default Blog;