# Backend Scala

## Description

This is a backend application written in Scala using Akka HTTP and Akka Streams & Akka Spray JSON.


Functional programming in Scala is implemented through the use of certain features:

1. Higher-order functions: Functions such as path, get, complete, etc., are examples of higher-order functions. They take functions as arguments and/or return functions.
2. Anonymous functions and lambdas: In directives such as path("steps"), get, etc., anonymous functions are used to define the behavior of routes.
3. Immutable data handling: Data structures such as case classes are immutable by default, which favors a functional programming style in Scala.
4. Use of flatMap and map: You use flatMap to manage the binding process (bindingFuture) and map to perform operations on the result of a future operation.
5. Implicit val stepOptionFormat = jsonFormat2(StepOption) and implicit val stepFormat = jsonFormat5(Step).


Although the code uses the Akka HTTP library to create a RESTful server, it also applies functional programming principles such as data immutability, higher-order functions, anonymous functions and implicits to promote a functional approach to Scala development.

## Requirements

- Java 11
- SBT

## Run

```bash
sbt run
```

## Asembly

```bash
sbt assembly
```


## Docker build

```bash
sbt docker:publishLocal
```