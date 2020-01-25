# Vainilla NodeJS server for streaming audio/video from file
A quick vainilla server to stream media content from files, using "206 Partial Content" status and its related headers

## Introduction
There are a lot of frameworks that provide a layer of abstraction to handle routings, straming data, etc...

Besides they are super usefull, knowing how NodeJS works behind the curtains can provide valuable insights about file manipulations, streams, non-blocking code, and so on.

Although this can be tricky and it isn't the most quick and organized way to work, it also true that it excercise the capacity of thinking out of the box to create tools to solve problems that the frameworks allready handle, and to think strategies to put order where there is nothing to contain the potentiall mess.

Because of that, the aim of this little project was to exemplify how to use the native NodeJS API to stream audio and video from a file, but without making just an application example that puts all the code in `http.createServer()` as:
  ```
  http.createServer(function(req,res){/* A super long function that makes it hard to maintain */ });
  ```
... but in a way that provides a reasonable pattern to scale up its functionallities if needed.

## Instructions
1. Download the code from this repo
2. Run `npm run start`;
3. Open your browser and go to `localhost:3000`
4. Open the devTools and see on the **Network** tab.
5. Click on one of the buttons from the body and check how the network calls are progressily made as the content is required.



