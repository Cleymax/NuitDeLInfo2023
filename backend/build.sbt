name := "NoelJsonRestAPI"

version := "1.0"

scalaVersion := "2.13.8"

libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-http" % "10.2.8",
  "com.typesafe.akka" %% "akka-stream" % "2.6.17",
  "com.typesafe.akka" %% "akka-http-spray-json" % "10.2.8",
)

mainClass in Compile := Some("RestApi")

assembly / assemblyJarName := "NoelJsonRestAPI.jar"

assembly / mainClass := Some("RestApi")

enablePlugins(JavaAppPackaging)