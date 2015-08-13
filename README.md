## Project Ares Web Shop

This project showcases a use case of the payworks platform -- accepting payments with a card reader straight from a web shop!

The whole project features 2 components:
1. The Web shop, which the merchant uses to initiate a transaction
2. The Payment app, which takes over the payment once it is started

The web shop starts the payment app from the browser, which makes use of the [payworks Pay Button](http://www.payworks.mpymnt.com/paybutton#android) to process card payments using a card reader. We trigger the native app using the deep-linking.

This repository is the web shop part of the project. The demo of the web shop application can be accessed at:

https://webshop.qa.payworks.io

### Application Sequence Diagram
The communication of parts of Project Ares is described on the following diagram:

![sequence diagram](https://webshop.qa.payworks.io/files/ProjectAresSequenceDiag.png)

The web application registers the transaction on the payworks' back end. The user is shown the details of the transaction and given a link to start it. When he clicks it, the native app takes over and completes the transaction. The web application gets a webhook from payworks' backend informing it about the transaction status. The web application displays this status to the user, who has now returned back from the native app.

Communication with the native app is via a link with a certain scheme. The scheme here is set to `payworks`, any URI with this scheme will trigger this activity. In this sample application we use the following URI with the `payworks` scheme:

```
payworks://transaction/charge?sessionIdentifier=zxcv1234
                             &providerMode=TEST
                             &accessoryFamily=MIURA_MPI
                             &merchantIdentifier=asdf1234
                             &merchantSecretKey=qwer1234
```

### Technical overview
This sample application is built on [Node.js](https://nodejs.org) using [Express.js](http://expressjs.com/) framework. For updating the transaction status we use [socket.io](http://socket.io/).

The server-side code is written in [TypeScript](http://www.typescriptlang.org/), this simple project is our experiment with this language and Node. In the end, TypeScript is compiled into standard JavaScript. The client code is for the most part simple, old school JavaScript + jQuery.

### Run it
1. Install Node.js (e.g. `brew install node` on Mac with Homebrew)
2. Install Node.js dependencies: `npm install`
3. Replace credentials in `app.ts` (or `app.js` if you don't want to compile TypeScript) with your values
4. Run the server: `npm start`, server is listening on http://localhost:3000
5. If you would like to make changes to the code install TypeScript compiler: `npm install -g typescript`
  * We recommend using [Atom](https://atom.io/) editor with [atom-typescript plugin](https://atom.io/packages/atom-typescript). The plugin is set to compile the TypeScript files into JS on every save, there is currently no batch job set up to compile every source code file.

### License
    ProjectAres : http://www.payworksmobile.com

    The MIT License (MIT)

    Copyright (c) 2015 payworks GmbH

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
